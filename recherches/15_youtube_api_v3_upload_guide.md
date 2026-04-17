# YouTube Data API v3 - Automated Video Upload Guide

**Date:** 2026-04-13
**Objectif:** Upload automatise de videos YouTube (musique ambiance, 2-4h) via Python

---

## 1. Setup des Credentials (OAuth 2.0)

### Etape 1 : Creer un projet Google Cloud

1. Aller sur https://console.cloud.google.com/
2. Creer un nouveau projet (ex: "YouTube Auto Uploader")
3. Dans "APIs & Services" > "Library", chercher **YouTube Data API v3** et l'activer

### Etape 2 : Configurer l'ecran de consentement OAuth

1. "APIs & Services" > "OAuth consent screen"
2. Selectionner **External** (sauf si compte Google Workspace)
3. Remplir : App name, User support email, Developer contact
4. Ajouter le scope : `https://www.googleapis.com/auth/youtube.upload`
5. Ajouter ton email comme "Test user" (tant que l'app n'est pas verifiee)

### Etape 3 : Creer les credentials OAuth 2.0

1. "APIs & Services" > "Credentials" > "Create Credentials" > "OAuth Client ID"
2. Type : **Desktop application**
3. Telecharger le fichier JSON > le renommer `client_secret.json`

### IMPORTANT : Verification de l'app

- Les apps creees apres juillet 2020 qui n'ont pas passe un audit de conformite ne peuvent uploader que des videos **privees**
- Pour publier en public/unlisted, il faut passer la verification Google (2-4 semaines)
- Alternative : rester en "Testing" avec tes propres comptes comme test users

### IMPORTANT : Verification du channel YouTube

- Par defaut, les videos sont limitees a **15 minutes**
- Pour uploader des videos de 2-4h, le channel doit etre **verifie par telephone**
- Verification : YouTube Studio > Settings > Channel > Feature eligibility > Intermediate features
- Un numero de telephone ne peut verifier que 2 channels par an

---

## 2. Libraries Python necessaires

```bash
pip install google-api-python-client google-auth-oauthlib google-auth-httplib2
```

### Packages et leurs roles :

| Package | Role |
|---------|------|
| `google-api-python-client` | Client principal pour appeler l'API YouTube |
| `google-auth-oauthlib` | Flow OAuth 2.0 (InstalledAppFlow) |
| `google-auth-httplib2` | Transport HTTP pour l'authentification |

**Ne PAS utiliser `oauth2client`** - c'est deprecie. Utiliser `google-auth-oauthlib` a la place.

---

## 3. Code complet : Upload de video avec Python

```python
#!/usr/bin/env python3
"""
YouTube Video Uploader - Python 3
Utilise l'API YouTube Data v3 avec OAuth 2.0
Support: resumable upload, retry avec backoff exponentiel,
         scheduling, thumbnails, metadata complete
"""

import os
import sys
import json
import random
import time
import datetime
import http.client
import httplib2
from pathlib import Path

import google.oauth2.credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

# ============================================================
# CONFIGURATION
# ============================================================

CLIENT_SECRETS_FILE = "client_secret.json"
TOKEN_FILE = "token.json"  # Stocke le refresh token pour reutilisation

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

# Retry config
MAX_RETRIES = 10
RETRIABLE_STATUS_CODES = [500, 502, 503, 504]
RETRIABLE_EXCEPTIONS = (
    httplib2.HttpLib2Error,
    IOError,
    http.client.NotConnected,
    http.client.IncompleteRead,
    http.client.ImproperConnectionState,
    http.client.CannotSendRequest,
    http.client.CannotSendHeader,
    http.client.ResponseNotReady,
    http.client.BadStatusLine,
)

# Pour les longues videos (2-4h), utiliser des chunks de 10 MB
# Le chunk size DOIT etre un multiple de 256 KB (262144 bytes)
# -1 = upload en un seul morceau (deconseille pour gros fichiers)
CHUNK_SIZE = 10 * 1024 * 1024  # 10 MB


# ============================================================
# AUTHENTIFICATION
# ============================================================

def get_authenticated_service():
    """
    Authentifie via OAuth 2.0.
    - Premiere fois : ouvre le navigateur pour autoriser
    - Fois suivantes : reutilise le refresh token stocke dans token.json
    """
    credentials = None

    # Charger les credentials existants
    if os.path.exists(TOKEN_FILE):
        credentials = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    # Si pas de credentials valides, lancer le flow OAuth
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            from google.auth.transport.requests import Request
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRETS_FILE, SCOPES
            )
            # run_local_server ouvre un navigateur automatiquement
            credentials = flow.run_local_server(
                port=8080,
                prompt="consent",  # Force le consentement pour obtenir refresh_token
                access_type="offline",  # Necessaire pour refresh_token
            )

        # Sauvegarder les credentials pour la prochaine fois
        with open(TOKEN_FILE, "w") as token_file:
            token_file.write(credentials.to_json())

    return build(API_SERVICE_NAME, API_VERSION, credentials=credentials)


# ============================================================
# UPLOAD DE VIDEO
# ============================================================

def upload_video(
    youtube,
    file_path: str,
    title: str,
    description: str = "",
    tags: list = None,
    category_id: str = "10",       # 10 = Music
    privacy_status: str = "private",
    publish_at: str = None,         # ISO 8601: "2026-04-20T15:00:00.000Z"
    thumbnail_path: str = None,
    made_for_kids: bool = False,
    notify_subscribers: bool = True,
    default_language: str = None,
    contains_synthetic_media: bool = False,
):
    """
    Upload une video sur YouTube avec metadata complete.

    Args:
        youtube: Service YouTube authentifie
        file_path: Chemin vers le fichier video
        title: Titre (max 100 caracteres)
        description: Description (max 5000 caracteres)
        tags: Liste de tags (total max 500 caracteres)
        category_id: ID de categorie YouTube (voir liste ci-dessous)
        privacy_status: "public", "private", ou "unlisted"
        publish_at: Date de publication programmee (ISO 8601, UTC)
                    Requiert privacy_status="private"
        thumbnail_path: Chemin vers l'image thumbnail (JPEG/PNG, max 2MB, 1280x720)
        made_for_kids: Si la video est destinee aux enfants
        notify_subscribers: Notifier les abonnes (default True)
        default_language: Code langue (ex: "fr", "en")
        contains_synthetic_media: Si la video contient du contenu genere par IA

    Returns:
        dict: Response de l'API avec video ID et metadata
    """

    # --- Construire le body de la requete ---
    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": tags or [],
            "categoryId": category_id,
        },
        "status": {
            "privacyStatus": privacy_status,
            "selfDeclaredMadeForKids": made_for_kids,
        },
    }

    # Ajouter la langue par defaut si specifiee
    if default_language:
        body["snippet"]["defaultLanguage"] = default_language

    # Ajouter la date de publication programmee
    if publish_at:
        # publishAt requiert que privacyStatus soit "private"
        body["status"]["privacyStatus"] = "private"
        body["status"]["publishAt"] = publish_at

    # Declarer le contenu IA/synthetique
    if contains_synthetic_media:
        body["status"]["containsSyntheticMedia"] = True

    # --- Creer le MediaFileUpload (resumable) ---
    media = MediaFileUpload(
        file_path,
        chunksize=CHUNK_SIZE,
        resumable=True,
        mimetype="video/*",
    )

    # --- Lancer l'upload ---
    insert_request = youtube.videos().insert(
        part=",".join(body.keys()),
        body=body,
        media_body=media,
        notifySubscribers=notify_subscribers,
    )

    response = _resumable_upload(insert_request)

    # --- Upload du thumbnail apres l'upload de la video ---
    if thumbnail_path and response and "id" in response:
        upload_thumbnail(youtube, response["id"], thumbnail_path)

    return response


def _resumable_upload(request):
    """
    Execute un upload resumable avec retry et backoff exponentiel.
    Affiche la progression du upload.
    """
    response = None
    error = None
    retry = 0

    while response is None:
        try:
            status, response = request.next_chunk()
            if status:
                pct = int(status.progress() * 100)
                print(f"  Upload: {pct}% complete")
            if response is not None:
                if "id" in response:
                    video_id = response["id"]
                    print(f"  Video uploadee avec succes! ID: {video_id}")
                    print(f"  URL: https://www.youtube.com/watch?v={video_id}")
                    return response
                else:
                    print(f"  ERREUR: Upload echoue avec reponse inattendue: {response}")
                    return None

        except HttpError as e:
            if e.resp.status in RETRIABLE_STATUS_CODES:
                error = f"Erreur HTTP retriable {e.resp.status}: {e.content.decode()}"
            else:
                raise

        except RETRIABLE_EXCEPTIONS as e:
            error = f"Erreur retriable: {e}"

        if error is not None:
            print(f"  {error}")
            retry += 1
            if retry > MAX_RETRIES:
                print("  Abandon apres trop de retries.")
                return None

            max_sleep = 2 ** retry
            sleep_seconds = random.random() * max_sleep
            print(f"  Retry {retry}/{MAX_RETRIES} dans {sleep_seconds:.1f}s...")
            time.sleep(sleep_seconds)
            error = None

    return response


# ============================================================
# UPLOAD DE THUMBNAIL
# ============================================================

def upload_thumbnail(youtube, video_id: str, thumbnail_path: str):
    """
    Upload un thumbnail custom pour une video.
    Requiert que le channel soit verifie par telephone.

    Args:
        video_id: ID de la video YouTube
        thumbnail_path: Chemin vers l'image (JPEG/PNG, max 2MB, 1280x720 recommande)
    """
    print(f"  Upload du thumbnail pour video {video_id}...")

    try:
        response = youtube.thumbnails().set(
            videoId=video_id,
            media_body=MediaFileUpload(thumbnail_path, mimetype="image/png"),
        ).execute()
        print(f"  Thumbnail uploade avec succes.")
        return response

    except HttpError as e:
        print(f"  ERREUR thumbnail: {e.resp.status} - {e.content.decode()}")
        return None


# ============================================================
# HELPERS
# ============================================================

def schedule_publish_time(year, month, day, hour=12, minute=0, tz_offset="+02:00"):
    """
    Genere un timestamp ISO 8601 pour programmer la publication.
    Par defaut en heure de Paris (UTC+2 en ete, UTC+1 en hiver).

    Exemple: schedule_publish_time(2026, 4, 20, 15, 0) -> "2026-04-20T15:00:00.000+02:00"
    """
    dt = datetime.datetime(year, month, day, hour, minute, 0)
    return dt.strftime(f"%Y-%m-%dT%H:%M:%S.000{tz_offset}")


# Categories YouTube les plus utiles :
YOUTUBE_CATEGORIES = {
    "1":  "Film & Animation",
    "2":  "Autos & Vehicles",
    "10": "Music",
    "15": "Pets & Animals",
    "17": "Sports",
    "19": "Travel & Events",
    "20": "Gaming",
    "22": "People & Blogs",
    "23": "Comedy",
    "24": "Entertainment",
    "25": "News & Politics",
    "26": "Howto & Style",
    "27": "Education",
    "28": "Science & Technology",
}


# ============================================================
# EXEMPLE D'UTILISATION
# ============================================================

if __name__ == "__main__":
    # 1. Authentification
    youtube = get_authenticated_service()

    # 2. Upload d'une video de musique ambiance
    response = upload_video(
        youtube,
        file_path="/path/to/ambient_music_video.mp4",
        title="Relaxing Rain Sounds for Deep Sleep | 3 Hours",
        description="""3 hours of relaxing rain sounds for deep sleep, study, and meditation.

This ambient soundscape combines gentle rainfall with soft background music to help you relax, focus, and sleep better.

Tags: rain sounds, sleep music, ambient, relaxation, meditation, study music, 3 hours

---
Generated with AI tools.
""",
        tags=[
            "rain sounds", "sleep music", "ambient music", "relaxation",
            "meditation music", "study music", "3 hours", "deep sleep",
            "white noise", "nature sounds"
        ],
        category_id="10",  # Music
        privacy_status="private",
        publish_at=schedule_publish_time(2026, 4, 20, 15, 0),  # 20 avril 2026 a 15h
        thumbnail_path="/path/to/thumbnail_1280x720.png",
        made_for_kids=False,
        contains_synthetic_media=True,  # Important si genere par IA
    )

    if response:
        print(f"\nVideo ID: {response['id']}")
        print(f"Programmee pour publication automatique.")
```

---

## 4. Metadata : Details complets

### 4.1 Snippet (contenu de la video)

| Champ | Type | Limite | Notes |
|-------|------|--------|-------|
| `title` | string | 100 chars max | Obligatoire |
| `description` | string | 5000 chars max | Supporte les liens, timestamps |
| `tags` | list[str] | 500 chars total (tous tags combines) | SEO important |
| `categoryId` | string | Voir table YOUTUBE_CATEGORIES | "10" pour Music |
| `defaultLanguage` | string | Code BCP-47 | "fr", "en", etc. |

### 4.2 Status (publication)

| Champ | Type | Valeurs | Notes |
|-------|------|---------|-------|
| `privacyStatus` | string | "public", "private", "unlisted" | |
| `publishAt` | string | ISO 8601 UTC | Requiert privacyStatus="private" |
| `selfDeclaredMadeForKids` | bool | true/false | Obligatoire legalement (COPPA) |
| `embeddable` | bool | true/false | Autoriser l'embed sur d'autres sites |
| `license` | string | "youtube", "creativeCommon" | |
| `publicStatsViewable` | bool | true/false | Montrer les stats publiquement |
| `containsSyntheticMedia` | bool | true/false | Declarer le contenu genere par IA |

### 4.3 Thumbnail (apres upload)

- **Endpoint separe** : `thumbnails.set(videoId=VIDEO_ID)`
- **Formats** : JPEG, PNG (image/jpeg, image/png)
- **Taille max** : 2 MB
- **Resolution recommandee** : 1280 x 720 pixels (ratio 16:9)
- **Cout quota** : 50 units
- **Prerequis** : Channel verifie par telephone

### 4.4 Programmer une publication (publishAt)

```python
# Le video doit etre uploadee en "private"
# publishAt prend un timestamp ISO 8601
body = {
    "status": {
        "privacyStatus": "private",
        "publishAt": "2026-04-20T15:00:00.000Z",  # UTC
    }
}
# YouTube publiera automatiquement la video a cette date/heure
# La video passera de "private" a "public" automatiquement
```

---

## 5. Quotas et Rate Limits

### Couts par operation

| Operation | Cout (units) |
|-----------|-------------|
| `videos.insert` (upload) | **1600 units** (certaines sources disent 100 - verifier dans la console) |
| `thumbnails.set` | 50 units |
| `videos.update` (modifier metadata) | 50 units |
| `videos.list` (lire info) | 1 unit |
| `search.list` | 100 units |

### Limites

| Limite | Valeur |
|--------|--------|
| **Quota journalier par defaut** | 10 000 units/jour |
| **Reset** | Minuit Pacific Time (PT) |
| **Uploads par jour (estimation)** | ~6 videos (si 1600 units/upload) |
| **Taille max fichier** | 256 GB |
| **Duree max video** | 12 heures |

### Note sur la confusion 100 vs 1600 units

La documentation officielle de `videos.insert` indique 100 units, mais le quota calculator et de nombreuses sources fiables indiquent 1600 units. En pratique, **planifier sur la base de 1600 units par upload** est plus prudent. Verifier dans Google Cloud Console > APIs & Services > YouTube Data API v3 > Quotas pour voir la consommation reelle.

### Demander plus de quota

1. Google Cloud Console > APIs & Services > YouTube Data API v3
2. Cliquer sur "Quotas" > "Edit Quotas"
3. Ou soumettre le formulaire : https://support.google.com/youtube/contact/yt_api_form
4. Delai : 2-4 semaines, justification necessaire

---

## 6. Programmer une video (publication future)

### Methode

```python
# 1. Uploader avec privacyStatus="private" et publishAt
response = upload_video(
    youtube,
    file_path="video.mp4",
    title="My Scheduled Video",
    privacy_status="private",        # OBLIGATOIRE pour scheduling
    publish_at="2026-04-20T15:00:00.000Z",  # Heure UTC
)

# 2. YouTube publiera automatiquement a la date/heure specifiee
# La video passera de "private" a "public"
```

### Points importants

- `publishAt` **requiert** que `privacyStatus` soit `"private"`
- Le timestamp est en **UTC** (ajouter le decalage si necessaire)
- YouTube gere la publication automatiquement, pas besoin de script supplementaire
- La video apparait comme "Scheduled" dans YouTube Studio
- On peut modifier la date de publication apres upload avec `videos.update()`

---

## 7. Gotchas pour les longues videos (2-4 heures)

### 7.1 Verification du channel obligatoire

- **Sans verification** : limite a 15 minutes
- **Avec verification telephone** : jusqu'a 12h / 256 GB
- Verifier dans YouTube Studio > Settings > Channel > Feature eligibility

### 7.2 Utiliser le resumable upload obligatoirement

- **Ne JAMAIS utiliser chunksize=-1** pour les gros fichiers (upload en un bloc = pas de recovery)
- Utiliser **chunksize = 10 MB** (10485760 bytes) ou plus
- Le chunk size **doit etre un multiple de 256 KB** (262144 bytes)
- Le protocole resumable permet de reprendre apres une coupure reseau

### 7.3 Timeouts et interruptions

- Les uploads de 2-4h a 1080p (5-15 GB) peuvent prendre 30min-2h selon la connexion
- Implementer un **retry avec backoff exponentiel** (voir code ci-dessus)
- Codes HTTP retriables : 500, 502, 503, 504
- Si une session expire (erreur 404), il faut **recommencer l'upload depuis zero** avec une nouvelle session URI

### 7.4 Processing time cote YouTube

- Apres upload, YouTube doit traiter/encoder la video
- Videos courtes : quelques minutes
- Videos 4K longues (2-4h) : **30 minutes a plusieurs heures**
- La video n'est pas disponible en haute resolution immediatement
- Programmer la publication au moins **4-6h apres l'upload** pour laisser le temps au processing

### 7.5 Token expiration pendant l'upload

- Les access tokens expirent apres **1 heure**
- Pour les longs uploads, le `google-auth` library gere le refresh automatiquement si on a un `refresh_token`
- S'assurer d'avoir `access_type="offline"` dans le flow OAuth pour obtenir le refresh token
- S'assurer d'avoir `prompt="consent"` pour forcer l'obtention d'un nouveau refresh token

### 7.6 App non verifiee = videos privees uniquement

- Si l'app n'a pas passe l'audit de conformite Google, les videos uploadees ne peuvent etre que **privees**
- Cela bloque aussi le scheduling (car la publication automatique met la video en "public")
- Solutions :
  - Passer la verification OAuth (2-4 semaines)
  - Rester en mode "Testing" avec ton compte comme test user (fonctionne pour l'upload, mais limite a 100 test users)

### 7.7 Quota pour batch uploads

- Avec 10 000 units/jour et ~1600 units par upload : max **6 videos/jour**
- Chaque thumbnail ajoute 50 units
- Planifier les uploads sur plusieurs jours si batch important

### 7.8 containsSyntheticMedia

- Depuis 2024, YouTube exige de declarer le contenu genere par IA
- Pour les videos de musique ambiance generees par IA, mettre `containsSyntheticMedia=True`
- Ne pas le declarer peut entrainer des penalites sur le channel

---

## 8. Workflow complet recommande

```
1. Setup (une seule fois) :
   - Creer projet Google Cloud
   - Activer YouTube Data API v3
   - Creer credentials OAuth 2.0 (Desktop app)
   - Telecharger client_secret.json
   - Verifier le channel YouTube par telephone
   - Lancer le script une fois pour autoriser et stocker le token

2. Pour chaque video :
   - Generer la video (musique + visuel)
   - Generer le thumbnail (1280x720, PNG/JPEG, < 2MB)
   - Preparer metadata (titre, description, tags)
   - Lancer upload_video() avec publish_at programme
   - Verifier dans YouTube Studio que tout est OK
   - Attendre le processing avant la date de publication
```

---

## Sources

- [Upload a Video - Google Developers](https://developers.google.com/youtube/v3/guides/uploading_a_video)
- [Videos: insert - Google Developers](https://developers.google.com/youtube/v3/docs/videos/insert)
- [Resumable Uploads - Google Developers](https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol)
- [Thumbnails: set - Google Developers](https://developers.google.com/youtube/v3/docs/thumbnails/set)
- [Quota Calculator - Google Developers](https://developers.google.com/youtube/v3/determine_quota_cost)
- [Upload videos longer than 15 minutes - YouTube Help](https://support.google.com/youtube/answer/71673)
- [YouTube API upload guide - Postproxy](https://postproxy.dev/blog/youtube-upload-api-guide/)
- [Official Python samples - GitHub](https://github.com/youtube/api-samples/blob/master/python/upload_video.py)
- [Quota and Compliance Audits - Google Developers](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)
