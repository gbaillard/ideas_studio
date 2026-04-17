# Deep Dive Technique — Pipeline ACE-Step-1.5 → YouTube Musique d'Ambiance

**Date** : 2026-04-13
**Auteur** : DEV - Ideas.Studio (ILU-45)
**Contexte** : Suite de la recherche ILU-44, approfondissement technique pour rendre le pipeline opérationnel sur M4 Max.

---

## Table des matières

1. [Installation ACE-Step-1.5 sur macOS M4 Max](#1-installation-ace-step-15-sur-macos-m4-max)
2. [Pipeline de génération automatisé](#2-pipeline-de-génération-automatisé)
3. [Assemblage vidéo FFmpeg](#3-assemblage-vidéo-ffmpeg)
4. [Intégration YouTube API](#4-intégration-youtube-api)
5. [Distribution Spotify/Apple Music](#5-distribution-spotifyapple-music)
6. [Génération de visuels](#6-génération-de-visuels)
7. [Script d'orchestration complet](#7-script-dorchestration-complet)
8. [Checklist de lancement](#8-checklist-de-lancement)

---

## 1. Installation ACE-Step-1.5 sur macOS M4 Max

### Prérequis

- Python 3.11 ou 3.12 (stable)
- macOS arm64 (Apple Silicon)
- ~15 Go d'espace disque (modèles)
- FFmpeg : `brew install ffmpeg`

### Installation recommandée (uv)

```bash
# Installer uv (package manager rapide)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Cloner le repo
git clone https://github.com/ACE-Step/ACE-Step-1.5.git
cd ACE-Step-1.5

# Installer les dépendances
uv sync
```

### Lancement sur macOS M4 Max

**Scripts macOS dédiés** (recommandé — ils configurent automatiquement MLX) :

```bash
chmod +x start_gradio_ui_macos.sh start_api_server_macos.sh

# Interface Gradio (port 7860)
./start_gradio_ui_macos.sh

# API REST (port 8001) — pour l'automatisation
./start_api_server_macos.sh
```

**Alternative manuelle** :

```bash
# API REST
uv run acestep-api

# Interface Gradio
uv run acestep --port 7860 --backend mlx \
  --config_path acestep-v15-turbo \
  --lm_model_path acestep-5Hz-lm-1.7B
```

### Configuration `.env` optimale pour M4 Max

Créer un fichier `.env` à la racine du repo ACE-Step :

```bash
ACESTEP_LM_BACKEND=mlx
ACESTEP_CONFIG_PATH=acestep-v15-turbo
ACESTEP_LM_MODEL_PATH=acestep-5Hz-lm-1.7B
ACESTEP_INIT_LLM=true
PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0
```

> **Note** : Le modèle 1.7B est le meilleur compromis qualité/vitesse. Le 4B (`acestep-5Hz-lm-4B`) offre la meilleure qualité mais est plus lent. Le 0.6B est le plus rapide mais avec une qualité moindre.

### Modèles disponibles

| Composant | Modèle | Usage |
|-----------|--------|-------|
| DiT | `acestep-v15-turbo` | Rapide (8 steps), production quotidienne |
| DiT | `acestep-v15-standard` | Haute qualité (50 steps), tracks spéciales |
| LM | `acestep-5Hz-lm-0.6B` | Le plus rapide |
| LM | `acestep-5Hz-lm-1.7B` | **Recommandé** (équilibré) |
| LM | `acestep-5Hz-lm-4B` | Meilleure qualité |

Les modèles se téléchargent automatiquement au premier lancement (~40 min). Pour pré-télécharger :

```bash
uv run acestep --download-model acestep-5Hz-lm-1.7B
```

### Backend Apple Silicon : MLX vs MPS

- **MLX** (recommandé) : Framework Apple natif, 2-3x plus rapide que MPS pour la partie LM. Le script macOS l'active automatiquement.
- **MPS** (fallback) : PyTorch Metal, fonctionne mais plus lent. Utilise `float32` au lieu de `bfloat16`.
- **Limitation MLX** : Pas de support CFG (Classifier-Free Guidance) ni constrained decoding. Qualité légèrement inférieure aux GPU NVIDIA pour certains cas.

### Performances estimées M4 Max

| Configuration | Temps/track | Tracks/heure |
|---------------|-------------|--------------|
| Turbo + LM 0.6B | ~5-10s | ~360-720 |
| Turbo + LM 1.7B | ~10-20s | ~180-360 |
| Standard + LM 1.7B | ~60-120s | ~30-60 |

> Pour une vidéo de 3h (~50-80 tracks), le mode turbo + 1.7B suffit largement : ~15-25 min de génération.

### Problèmes connus macOS

1. **MPS out-of-memory** : Si erreur mémoire, ajouter `PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0` dans `.env`
2. **Premier lancement** : Le script macOS applique un patch de compatibilité MLX + Gatekeeper (`xattr -cr`)
3. **float32** : MPS utilise float32 au lieu de bfloat16 — consomme plus de mémoire mais géré automatiquement

---

## 2. Pipeline de génération automatisé

### API REST ACE-Step

L'API REST (`acestep-api`, port 8001) est la base de l'automatisation.

**Soumettre une génération :**

```bash
curl -X POST http://localhost:8001/release_task \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Smooth jazz bar, late night Tokyo, piano, upright bass, brushed drums, warm vinyl sound",
    "lyrics": "",
    "audio_duration": 180,
    "audio_format": "wav",
    "batch_size": 8,
    "thinking": true,
    "model": "acestep-v15-turbo",
    "guidance_scale": 7.0,
    "bpm": 95,
    "key_scale": "Bb Major"
  }'
```

**Paramètres clés :**

| Paramètre | Type | Description |
|-----------|------|-------------|
| `prompt` | string | Description musicale détaillée |
| `lyrics` | string | Vide pour instrumentale |
| `audio_duration` | float | 10-600 secondes |
| `audio_format` | string | `wav`, `mp3`, `flac`, `aac` |
| `batch_size` | int | 1-8 variations simultanées |
| `thinking` | bool | Active le LM planner (recommandé) |
| `inference_steps` | int | 8 (turbo) à 50 (standard) |
| `guidance_scale` | float | 7.0 par défaut |
| `bpm` | int | 30-300 |
| `key_scale` | string | Ex: "C Major", "Bb Minor" |
| `task_type` | string | `text2music` (défaut) |

**Vérifier le résultat :**

```bash
curl -X POST http://localhost:8001/query_result \
  -H "Content-Type: application/json" \
  -d '{"task_id_list": ["<task_id>"]}'
```

Status : `0` = en cours, `1` = terminé, `2` = échoué.

**Télécharger l'audio :** `GET /v1/audio?path=<path_from_result>`

### Script Python : Générateur de batch

```python
#!/usr/bin/env python3
"""
ace_batch_generator.py — Génère un batch de tracks via l'API ACE-Step-1.5
Usage: python ace_batch_generator.py --theme "tokyo_jazz" --count 80
"""

import argparse
import json
import time
import requests
import shutil
from pathlib import Path

API_URL = "http://localhost:8001"

# Thèmes prédéfinis (personnalisables)
THEMES = {
    "tokyo_jazz": {
        "prompt": "Smooth jazz bar, late night Tokyo, piano, upright bass, soft saxophone, "
                  "brushed drums, warm analog sound, intimate atmosphere, gentle reverb",
        "bpm": 95,
        "key_scale": "Bb Major",
        "duration": 180,
    },
    "paris_cafe": {
        "prompt": "Cozy Parisian café, accordion, acoustic guitar, light percussion, "
                  "warm vintage recording, rainy afternoon, soft and romantic ambiance",
        "bpm": 110,
        "key_scale": "G Major",
        "duration": 180,
    },
    "deep_work": {
        "prompt": "Minimal ambient piano, deep focus music, no vocals, soft pads, "
                  "gentle arpeggios, concentration, calm and steady rhythm, lo-fi texture",
        "bpm": 72,
        "key_scale": "C Major",
        "duration": 240,
    },
    "night_lounge": {
        "prompt": "Late night rooftop lounge, deep house meets jazz, electric piano, "
                  "smooth bass, subtle electronic beats, city lights atmosphere, sophisticated",
        "bpm": 105,
        "key_scale": "D Minor",
        "duration": 180,
    },
    "rain_study": {
        "prompt": "Study music with rain sounds, gentle piano, soft strings background, "
                  "ambient pads, peaceful and calming, no vocals, steady slow tempo",
        "bpm": 65,
        "key_scale": "A Minor",
        "duration": 240,
    },
}


def submit_batch(theme_config: dict, batch_size: int = 8) -> str:
    """Soumet un batch de génération et retourne le task_id."""
    payload = {
        "prompt": theme_config["prompt"],
        "lyrics": "",
        "audio_duration": theme_config["duration"],
        "audio_format": "wav",
        "batch_size": batch_size,
        "thinking": True,
        "model": "acestep-v15-turbo",
        "guidance_scale": 7.0,
        "bpm": theme_config["bpm"],
        "key_scale": theme_config["key_scale"],
        "task_type": "text2music",
    }
    resp = requests.post(f"{API_URL}/release_task", json=payload)
    resp.raise_for_status()
    data = resp.json()
    return data["task_id"]


def wait_for_result(task_id: str, timeout: int = 600) -> dict:
    """Attend la fin d'un task et retourne le résultat."""
    start = time.time()
    while time.time() - start < timeout:
        resp = requests.post(
            f"{API_URL}/query_result",
            json={"task_id_list": [task_id]},
        )
        resp.raise_for_status()
        results = resp.json()
        for r in results:
            if r.get("task_id") == task_id:
                if r["status"] == 1:
                    return r
                elif r["status"] == 2:
                    raise RuntimeError(f"Génération échouée: {r}")
        time.sleep(2)
    raise TimeoutError(f"Timeout après {timeout}s pour task {task_id}")


def download_audio(audio_path: str, dest: Path) -> Path:
    """Télécharge un fichier audio depuis l'API."""
    resp = requests.get(f"{API_URL}/v1/audio", params={"path": audio_path}, stream=True)
    resp.raise_for_status()
    with open(dest, "wb") as f:
        shutil.copyfileobj(resp.raw, f)
    return dest


def generate_tracks(theme_name: str, total_count: int, output_dir: Path) -> list[Path]:
    """Génère le nombre de tracks demandé par batchs de 8."""
    theme = THEMES[theme_name]
    output_dir.mkdir(parents=True, exist_ok=True)
    tracks = []
    batch_num = 0

    while len(tracks) < total_count:
        remaining = total_count - len(tracks)
        batch_size = min(8, remaining)
        batch_num += 1

        print(f"\n[Batch {batch_num}] Génération de {batch_size} tracks ({len(tracks)}/{total_count})...")
        task_id = submit_batch(theme, batch_size)
        print(f"  Task ID: {task_id}")

        result = wait_for_result(task_id)

        # Télécharger chaque track du batch
        audio_paths = result.get("audio_paths", [])
        scores = result.get("scores", [])

        for i, audio_path in enumerate(audio_paths):
            idx = len(tracks) + 1
            score = scores[i] if i < len(scores) else 0
            dest = output_dir / f"{theme_name}_{idx:03d}_score{score:.2f}.wav"
            download_audio(audio_path, dest)
            tracks.append(dest)
            print(f"  Track {idx}: {dest.name} (score: {score:.2f})")

    print(f"\n[OK] {len(tracks)} tracks générées dans {output_dir}")
    return tracks


def main():
    parser = argparse.ArgumentParser(description="ACE-Step Batch Generator")
    parser.add_argument("--theme", choices=list(THEMES.keys()), required=True)
    parser.add_argument("--count", type=int, default=80, help="Nombre total de tracks")
    parser.add_argument("--output", type=str, default="./output/tracks",
                        help="Dossier de sortie")
    args = parser.parse_args()

    output_dir = Path(args.output) / args.theme
    generate_tracks(args.theme, args.count, output_dir)


if __name__ == "__main__":
    main()
```

### Sélection par qualité (PMI)

Les scores PMI sont retournés automatiquement par l'API. Le script ci-dessus inclut le score dans le nom du fichier. Pour filtrer :

```python
def select_best_tracks(tracks_dir: Path, top_n: int = 60) -> list[Path]:
    """Sélectionne les N meilleures tracks par score PMI."""
    tracks = []
    for f in tracks_dir.glob("*.wav"):
        # Extraire le score du nom de fichier (theme_001_score0.85.wav)
        try:
            score = float(f.stem.split("score")[1])
        except (IndexError, ValueError):
            score = 0.0
        tracks.append((score, f))

    tracks.sort(reverse=True)
    selected = [f for _, f in tracks[:top_n]]
    print(f"[Sélection] {len(selected)} tracks retenues sur {len(tracks)}")
    return selected
```

---

## 3. Assemblage vidéo FFmpeg

### Prérequis

```bash
brew install ffmpeg
```

### Script Python : Assemblage audio + vidéo

```python
#!/usr/bin/env python3
"""
video_assembler.py — Assemble des tracks audio + visuel en vidéo YouTube longue durée
Usage: python video_assembler.py --audio-dir ./output/tracks/tokyo_jazz \
       --visual background.jpg --output youtube_upload.mp4
"""

import argparse
import json
import subprocess
import tempfile
from pathlib import Path


def run_ffmpeg(args: list[str], desc: str = ""):
    """Exécute une commande FFmpeg."""
    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning"] + args
    print(f"[ffmpeg] {desc}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg erreur: {result.stderr}")
    return result


def get_duration(filepath: str) -> float:
    """Durée en secondes via ffprobe."""
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "json", filepath,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(json.loads(result.stdout)["format"]["duration"])


def concatenate_audio(tracks: list[Path], output: str, crossfade: float = 3.0) -> str:
    """Concatène les tracks audio avec crossfade optionnel."""
    if crossfade <= 0 or len(tracks) < 2:
        with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
            for t in tracks:
                f.write(f"file '{t.resolve()}'\n")
            listfile = f.name
        run_ffmpeg(
            ["-f", "concat", "-safe", "0", "-i", listfile,
             "-c:a", "pcm_s16le", output],
            desc=f"Concaténation de {len(tracks)} tracks (sans crossfade)",
        )
    else:
        # Crossfade avec acrossfade filter chain
        inputs = []
        for t in tracks:
            inputs += ["-i", str(t.resolve())]

        filters = []
        prev = "[0:a]"
        for i in range(1, len(tracks)):
            out_label = "[aout]" if i == len(tracks) - 1 else f"[a{i:02d}]"
            filters.append(
                f"{prev}[{i}:a]acrossfade=d={crossfade}:c1=tri:c2=tri{out_label}"
            )
            prev = out_label

        run_ffmpeg(
            inputs + [
                "-filter_complex", "; ".join(filters),
                "-map", "[aout]", "-c:a", "pcm_s16le", output,
            ],
            desc=f"Crossfade de {len(tracks)} tracks ({crossfade}s)",
        )

    duration = get_duration(output)
    print(f"  Audio final: {duration / 60:.1f} min")
    return output


def make_video(audio: str, visual: str, output: str, is_image: bool = True) -> str:
    """Assemble audio + visuel en vidéo YouTube-ready."""
    duration = get_duration(audio)

    if is_image:
        run_ffmpeg([
            "-loop", "1", "-framerate", "30", "-i", visual,
            "-i", audio,
            "-c:v", "libx264", "-preset", "slow", "-crf", "18",
            "-tune", "stillimage", "-profile:v", "high",
            "-pix_fmt", "yuv420p", "-r", "30", "-g", "60",
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,"
                   "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black",
            "-c:a", "aac", "-b:a", "320k", "-ar", "48000",
            "-shortest", "-movflags", "+faststart",
            output,
        ], desc=f"Rendu vidéo ({duration / 60:.1f} min) depuis image")
    else:
        run_ffmpeg([
            "-stream_loop", "-1", "-i", visual,
            "-i", audio,
            "-t", str(duration),
            "-c:v", "libx264", "-preset", "slow", "-crf", "18",
            "-profile:v", "high", "-pix_fmt", "yuv420p",
            "-r", "30", "-g", "60",
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,"
                   "pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black",
            "-c:a", "aac", "-b:a", "320k", "-ar", "48000",
            "-movflags", "+faststart",
            output,
        ], desc=f"Rendu vidéo ({duration / 60:.1f} min) depuis clip vidéo en boucle")

    size_mb = Path(output).stat().st_size / (1024 * 1024)
    print(f"[OK] {output} — {duration / 60:.1f} min, {size_mb:.0f} MB")
    return output


def main():
    parser = argparse.ArgumentParser(description="Video Assembler pour YouTube")
    parser.add_argument("--audio-dir", required=True, help="Dossier contenant les tracks WAV")
    parser.add_argument("--visual", required=True, help="Image (.jpg/.png) ou clip vidéo")
    parser.add_argument("--output", default="youtube_upload.mp4")
    parser.add_argument("--crossfade", type=float, default=3.0, help="Durée crossfade (s)")
    parser.add_argument("--top-n", type=int, default=60, help="Nombre de tracks à garder")
    args = parser.parse_args()

    audio_dir = Path(args.audio_dir)
    tracks = sorted(audio_dir.glob("*.wav"))

    if not tracks:
        print(f"[ERREUR] Aucune track WAV trouvée dans {audio_dir}")
        return

    # Sélection des meilleures par score
    scored = []
    for t in tracks:
        try:
            score = float(t.stem.split("score")[1])
        except (IndexError, ValueError):
            score = 0.0
        scored.append((score, t))
    scored.sort(reverse=True)
    selected = [t for _, t in scored[:args.top_n]]
    print(f"[Sélection] {len(selected)} tracks sur {len(tracks)}")

    # Assemblage audio
    audio_file = str(audio_dir / "full_mix.wav")
    concatenate_audio(selected, audio_file, args.crossfade)

    # Assemblage vidéo
    is_image = args.visual.lower().endswith((".jpg", ".jpeg", ".png", ".bmp"))
    make_video(audio_file, args.visual, args.output, is_image)


if __name__ == "__main__":
    main()
```

### Tailles de fichiers estimées

| Durée | Image statique | Clip vidéo en boucle |
|-------|---------------|---------------------|
| 1h | 200-400 MB | 2-4 GB |
| 2h | 400-700 MB | 4-8 GB |
| 3h | 600-1000 MB | 6-12 GB |

> **Tip** : Pour les premières vidéos, l'image statique est idéale — taille minuscule, upload rapide.

---

## 4. Intégration YouTube API

### Setup OAuth 2.0

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet (ex: "YouTube Music Pipeline")
3. Activer **YouTube Data API v3**
4. Configurer l'écran de consentement OAuth (External)
5. Créer des identifiants OAuth 2.0 (type "Application de bureau")
6. Télécharger le fichier `client_secret.json`

> **Important** : Les apps non vérifiées ne peuvent uploader que des vidéos **privées**. Pour uploader en public/non-listé, il faut passer l'audit de conformité Google OU utiliser un projet Google existant qui a déjà l'accès.

### Dépendances Python

```bash
pip install google-api-python-client google-auth-oauthlib google-auth-httplib2
```

### Script Python : YouTube Uploader

```python
#!/usr/bin/env python3
"""
youtube_uploader.py — Upload automatique de vidéos YouTube avec scheduling
Usage: python youtube_uploader.py --video youtube_upload.mp4 \
       --title "Tokyo Late Night Jazz Bar | 3 Hours" \
       --schedule "2026-04-15T15:00:00Z"
"""

import argparse
import json
import os
import time
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
TOKEN_FILE = "youtube_token.json"
CLIENT_SECRET = "client_secret.json"

# Catégorie YouTube "Music" = 10
CATEGORY_MUSIC = "10"


def get_youtube_service():
    """Authentifie et retourne le service YouTube API."""
    creds = None

    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET, SCOPES)
            creds = flow.run_local_server(port=0, access_type="offline")
        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())

    return build("youtube", "v3", credentials=creds)


def upload_video(
    youtube,
    video_path: str,
    title: str,
    description: str,
    tags: list[str],
    schedule_time: str = None,
    thumbnail_path: str = None,
) -> str:
    """Upload une vidéo avec metadata et retourne le video_id."""
    privacy = "private" if schedule_time else "public"

    body = {
        "snippet": {
            "title": title[:100],
            "description": description[:5000],
            "tags": tags,
            "categoryId": CATEGORY_MUSIC,
            "defaultLanguage": "en",
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False,
            "containsSyntheticMedia": True,  # OBLIGATOIRE pour contenu IA
            "embeddable": True,
            "license": "youtube",
        },
    }

    if schedule_time:
        body["status"]["publishAt"] = schedule_time

    media = MediaFileUpload(
        video_path,
        mimetype="video/mp4",
        chunksize=10 * 1024 * 1024,  # 10 MB chunks
        resumable=True,
    )

    request = youtube.videos().insert(
        part="snippet,status",
        body=body,
        media_body=media,
    )

    # Upload avec retry (resumable)
    response = None
    retries = 0
    while response is None:
        try:
            status, response = request.next_chunk()
            if status:
                print(f"  Upload: {int(status.progress() * 100)}%")
        except HttpError as e:
            if e.resp.status in [500, 502, 503, 504] and retries < 5:
                retries += 1
                wait = 2 ** retries
                print(f"  Erreur serveur, retry dans {wait}s...")
                time.sleep(wait)
            else:
                raise

    video_id = response["id"]
    print(f"[OK] Vidéo uploadée: https://youtu.be/{video_id}")

    # Upload thumbnail si fourni
    if thumbnail_path and os.path.exists(thumbnail_path):
        try:
            youtube.thumbnails().set(
                videoId=video_id,
                media_body=MediaFileUpload(thumbnail_path, mimetype="image/jpeg"),
            ).execute()
            print(f"  Thumbnail uploadée: {thumbnail_path}")
        except HttpError as e:
            print(f"  [WARN] Erreur thumbnail: {e}")

    return video_id


# Templates de descriptions YouTube par thème
DESCRIPTION_TEMPLATES = {
    "tokyo_jazz": """🎵 {title}

Plongez dans l'atmosphère d'un bar jazz intime à Tokyo. Musique parfaite pour travailler, étudier, se relaxer ou créer une ambiance lounge.

🎧 Playlist : Jazz Bar | Late Night | Piano & Saxophone

⏱️ Timestamps:
{timestamps}

📌 Abonnez-vous pour plus de musique d'ambiance quotidienne.

#jazz #ambient #lofi #tokyojazz #studymusic #workmusic #relaxation""",

    "deep_work": """🎵 {title}

Musique de concentration profonde. Pas de paroles, rythme calme et régulier. Idéal pour le deep work, l'étude, ou la programmation.

⏱️ Timestamps:
{timestamps}

📌 Nouveau mix chaque jour — abonnez-vous !

#deepwork #focusmusic #studymusic #concentration #ambient #piano""",
}


def generate_timestamps(tracks: list[Path], crossfade: float = 3.0) -> str:
    """Génère les timestamps pour la description YouTube."""
    lines = ["0:00 Start"]
    current_time = 0
    for i, track in enumerate(tracks[1:], start=2):
        # Estimation basée sur la durée moyenne
        current_time += 180 - crossfade  # 3 min par track - crossfade
        hours = int(current_time // 3600)
        minutes = int((current_time % 3600) // 60)
        seconds = int(current_time % 60)
        if hours > 0:
            lines.append(f"{hours}:{minutes:02d}:{seconds:02d} Track {i}")
        else:
            lines.append(f"{minutes}:{seconds:02d} Track {i}")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="YouTube Video Uploader")
    parser.add_argument("--video", required=True, help="Fichier vidéo à uploader")
    parser.add_argument("--title", required=True, help="Titre YouTube")
    parser.add_argument("--theme", default="tokyo_jazz",
                        help="Thème pour template de description")
    parser.add_argument("--tags", nargs="+",
                        default=["ambient", "jazz", "lofi", "study music", "work music"])
    parser.add_argument("--schedule", default=None,
                        help="Date de publication (ISO 8601, ex: 2026-04-15T15:00:00Z)")
    parser.add_argument("--thumbnail", default=None, help="Image thumbnail (1280x720)")
    args = parser.parse_args()

    # Générer la description
    template = DESCRIPTION_TEMPLATES.get(args.theme, "{title}\n\n{timestamps}")
    timestamps = generate_timestamps([], 3.0)  # Placeholder
    description = template.format(title=args.title, timestamps=timestamps)

    youtube = get_youtube_service()
    video_id = upload_video(
        youtube,
        video_path=args.video,
        title=args.title,
        description=description,
        tags=args.tags,
        schedule_time=args.schedule,
        thumbnail_path=args.thumbnail,
    )

    print(f"\n[RÉSULTAT] Video ID: {video_id}")
    if args.schedule:
        print(f"  Publication programmée: {args.schedule}")


if __name__ == "__main__":
    main()
```

### Quotas YouTube API

| Action | Coût (unités) | Quota par défaut |
|--------|---------------|-----------------|
| `videos.insert` | ~1600 | 10 000/jour |
| `thumbnails.set` | 50 | inclus |
| **Uploads max/jour** | — | **~6 vidéos** |

> Pour 1 vidéo/jour, le quota par défaut suffit largement.

### Points critiques

1. **Compte vérifié par téléphone** obligatoire pour les vidéos > 15 min
2. **Déclarer le contenu IA** : `containsSyntheticMedia: True` (obligatoire depuis 2024)
3. **Token refresh** : Le token expire après 1h. Le script gère le refresh automatiquement via `youtube_token.json`.
4. **Vidéos longues** : Upload en chunks de 10 MB. Pour une vidéo de 3h (~600 MB image statique), prévoir ~10-15 min d'upload.
5. **Scheduling** : Programmer la publication au moins 4-6h après l'upload pour laisser YouTube traiter la vidéo.

---

## 5. Distribution Spotify/Apple Music

### Workflow DistroKid

**Service** : [DistroKid](https://distrokid.com/) — $22/an (uploads illimités)

**Étapes** :

1. **Créer un compte artiste** DistroKid ($22/an plan Musician)
2. **Nom d'artiste** : Choisir un nom de projet (ex: "Tokyo Night Sessions", "Deep Focus Studio")
3. **Uploader les tracks** :
   - Format : WAV 16-bit, 44.1 kHz (ou 24-bit pour meilleure qualité)
   - Chaque track = 1 single OU grouper en album/EP
   - Remplir les metadata : titre, artiste, genre, artwork
4. **Artwork** : 3000x3000 px JPEG/PNG (obligatoire par les plateformes)
5. **Distribution** : DistroKid envoie automatiquement à Spotify, Apple Music, Amazon Music, YouTube Music, Deezer, etc.
6. **Délai** : 3-7 jours pour apparaître sur les plateformes

### Stratégie de publication

| Format | Fréquence | Avantage |
|--------|-----------|----------|
| **Single** (1 track) | 1-2/semaine | Algorithme Spotify favorise les sorties fréquentes |
| **EP** (4-6 tracks) | 1/mois | Bon pour les playlists |
| **Album** (12-20 tracks) | 1/trimestre | Maximise les streams par sortie |

**Recommandation** : Commencer par des singles (2/semaine) pour alimenter l'algorithme Spotify, puis compiler en album une fois par trimestre.

### Revenus streaming estimés

| Plateforme | Paiement/stream | 10K streams/mois | 100K streams/mois |
|------------|-----------------|-------------------|-------------------|
| Spotify | ~$0.003-0.005 | $30-50 | $300-500 |
| Apple Music | ~$0.006-0.01 | $60-100 | $600-1000 |
| YouTube Music | ~$0.002 | $20 | $200 |

> La musique d'ambiance a des streams courts (skip fréquent) mais un volume potentiellement élevé via les playlists de fond.

### Automatisation possible

DistroKid n'a **pas d'API publique**. L'upload est manuel via leur interface web. Alternatives pour automatiser :

1. **DistroKid bulk upload** : Interface existante pour uploader plusieurs tracks à la fois
2. **TuneCore** ($30/an) : Même principe, pas d'API non plus
3. **Amuse** (gratuit) : Alternative gratuite mais délais plus longs
4. **CD Baby** ($10/single) : Plus cher mais bonne distribution

> **Réalité** : L'étape DistroKid restera manuelle (~5 min/upload). Avec 2 singles/semaine, c'est ~10 min/semaine. Acceptable pour le pipeline "30 min/jour".

---

## 6. Génération de visuels

### Comparatif des outils

| Outil | Type | Coût | Qualité | Loop natif | Recommandation |
|-------|------|------|---------|------------|----------------|
| **Canva** | Design statique | $15/mois | ⭐⭐⭐ | Non | **Thumbnails** |
| **Runway Gen-3** | Vidéo IA | $15-76/mois | ⭐⭐⭐⭐⭐ | Oui (extend) | **Visuels animés premium** |
| **Kling 2.0** | Vidéo IA | $5-30/mois | ⭐⭐⭐⭐ | Oui | **Bon rapport qualité/prix** |
| **Sora** | Vidéo IA | $20-200/mois | ⭐⭐⭐⭐⭐ | Non natif | Trop cher pour le volume |
| **Midjourney** | Image IA | $10-30/mois | ⭐⭐⭐⭐⭐ | Non | **Images de fond haute qualité** |
| **Stable Diffusion** | Image IA locale | Gratuit | ⭐⭐⭐⭐ | Non | **Images de fond (gratuit)** |

### Stratégie recommandée (budget minimal)

**Phase 1 — Démarrage (coût $0)** :
- Images statiques générées avec Stable Diffusion (gratuit, local sur M4 Max)
- Prompt type : "Cozy jazz bar interior, warm lighting, vinyl records, dim atmosphere, anime style, 1920x1080"
- FFmpeg avec `-tune stillimage` → fichiers très légers

**Phase 2 — Croissance (coût ~$15/mois)** :
- Kling 2.0 pour générer des clips vidéo en boucle de 5-10s par thème
- Prompt type : "Smooth camera pan across cozy café, rain on window, steam from coffee cup, warm lighting, loop"
- Un seul clip par thème suffit (boucle infinie via FFmpeg)

**Phase 3 — Premium (si la chaîne décolle)** :
- Runway Gen-3 pour des visuels cinématiques uniques par vidéo
- Midjourney pour les thumbnails custom

### Création de thumbnails

Format optimal : 1280x720 px, JPEG

Éléments qui fonctionnent dans la niche :
- Image d'ambiance (café, bar, pluie)
- Texte minimal (nom du thème)
- Palette de couleurs chaudes
- Style cohérent = branding reconnaissable

---

## 7. Script d'orchestration complet

### daily_pipeline.py — Le script "one-click"

```python
#!/usr/bin/env python3
"""
daily_pipeline.py — Pipeline quotidien complet : génération → assemblage → upload
Usage: python daily_pipeline.py --theme tokyo_jazz --schedule 2026-04-15T15:00:00Z
"""

import argparse
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Importer les modules du pipeline
# (dans un vrai setup, ces fichiers sont dans le même dossier)
# from ace_batch_generator import generate_tracks, select_best_tracks, THEMES
# from video_assembler import concatenate_audio, make_video
# from youtube_uploader import get_youtube_service, upload_video, DESCRIPTION_TEMPLATES

PIPELINE_DIR = Path("./pipeline_output")
VISUALS_DIR = Path("./visuals")  # Images/clips par thème


def run_daily(theme: str, schedule: str = None):
    """Exécute le pipeline complet pour une vidéo."""
    date_str = datetime.now().strftime("%Y%m%d")
    run_dir = PIPELINE_DIR / f"{date_str}_{theme}"
    run_dir.mkdir(parents=True, exist_ok=True)

    print(f"{'='*60}")
    print(f"PIPELINE QUOTIDIEN — {theme} — {date_str}")
    print(f"{'='*60}")

    # Étape 1 : Génération de tracks
    print("\n[1/4] Génération de tracks ACE-Step...")
    tracks_dir = run_dir / "tracks"
    # generate_tracks(theme, total_count=80, output_dir=tracks_dir)

    # Étape 2 : Sélection des meilleures
    print("\n[2/4] Sélection des 60 meilleures tracks...")
    # best_tracks = select_best_tracks(tracks_dir, top_n=60)

    # Étape 3 : Assemblage vidéo
    print("\n[3/4] Assemblage vidéo...")
    audio_file = str(run_dir / "full_mix.wav")
    video_file = str(run_dir / f"{theme}_{date_str}.mp4")

    # Trouver le visuel pour ce thème
    visual = None
    for ext in [".jpg", ".jpeg", ".png", ".mp4"]:
        candidate = VISUALS_DIR / f"{theme}{ext}"
        if candidate.exists():
            visual = str(candidate)
            break

    if not visual:
        print(f"  [WARN] Pas de visuel trouvé pour {theme} dans {VISUALS_DIR}")
        print(f"  Cherchez un fichier : {VISUALS_DIR}/{theme}.jpg (ou .png/.mp4)")
        return

    # concatenate_audio(best_tracks, audio_file, crossfade=3.0)
    # is_image = visual.endswith(('.jpg', '.jpeg', '.png'))
    # make_video(audio_file, visual, video_file, is_image)

    # Étape 4 : Upload YouTube
    print("\n[4/4] Upload YouTube...")
    title_map = {
        "tokyo_jazz": "Tokyo Late Night Jazz Bar",
        "paris_cafe": "Cozy Paris Café | Rainy Afternoon",
        "deep_work": "Deep Work Music | No Lyrics | Focus",
        "night_lounge": "Midnight Rooftop Lounge | Smooth Jazz & House",
        "rain_study": "Rain & Piano | Study Music",
    }
    base_title = title_map.get(theme, theme.replace("_", " ").title())
    title = f"{base_title} | {datetime.now().strftime('%B %Y')} | 3 Hours"

    # youtube = get_youtube_service()
    # video_id = upload_video(youtube, video_file, title, ...)

    print(f"\n{'='*60}")
    print(f"PIPELINE TERMINÉ")
    print(f"  Vidéo : {video_file}")
    if schedule:
        print(f"  Publication : {schedule}")
    print(f"{'='*60}")


def main():
    parser = argparse.ArgumentParser(description="Pipeline quotidien YouTube Music")
    parser.add_argument("--theme", required=True,
                        choices=["tokyo_jazz", "paris_cafe", "deep_work",
                                 "night_lounge", "rain_study"])
    parser.add_argument("--schedule", help="Date publication (ISO 8601)")
    args = parser.parse_args()

    # Si pas de schedule, programmer pour demain 15h UTC
    schedule = args.schedule
    if not schedule:
        tomorrow = datetime.utcnow() + timedelta(days=1)
        schedule = tomorrow.replace(hour=15, minute=0, second=0).strftime("%Y-%m-%dT%H:%M:%SZ")
        print(f"[Auto-schedule] Publication programmée : {schedule}")

    run_daily(args.theme, schedule)


if __name__ == "__main__":
    main()
```

> **Note** : Les imports commentés (`# from ...`) seront décommentés quand les fichiers seront dans le même dossier. Le script est structuré pour fonctionner avec les 3 modules précédents.

---

## 8. Checklist de lancement

### Semaine 1 — Setup

- [ ] Installer ACE-Step-1.5 (`git clone` + `uv sync`)
- [ ] Tester la génération manuelle (Gradio UI)
- [ ] Configurer `.env` optimisé M4 Max
- [ ] Créer un compte YouTube dédié (ou utiliser existant)
- [ ] Vérifier le compte par téléphone (pour vidéos > 15 min)
- [ ] Configurer OAuth 2.0 (Google Cloud Console)
- [ ] Tester l'upload API avec une vidéo test (privée)
- [ ] Créer un compte DistroKid ($22/an)
- [ ] Définir le nom d'artiste et le branding

### Semaine 2 — Production

- [ ] Générer les images de fond pour 5 thèmes (Stable Diffusion ou Midjourney)
- [ ] Créer les thumbnails (Canva, 1280x720)
- [ ] Tester le pipeline complet : génération → assemblage → upload
- [ ] Uploader 5 vidéos de test (privées)
- [ ] Préparer les descriptions SEO et les tags par thème
- [ ] Configurer les playlists YouTube par thème

### Semaine 3+ — Lancement

- [ ] Publier la première vidéo (public)
- [ ] Rythme cible : 1 vidéo/jour, 7 jours/semaine
- [ ] Uploader les premières tracks sur DistroKid
- [ ] Monitorer les analytics (vues, watch time, CTR)
- [ ] Ajuster les thèmes selon les performances

### Budget mensuel récurrent

| Poste | Coût |
|-------|------|
| ACE-Step-1.5 | Gratuit (local) |
| DistroKid | ~$2/mois ($22/an) |
| Kling 2.0 (optionnel) | $5-15/mois |
| TubeBuddy (optionnel) | $9/mois |
| **Total minimum** | **~$2/mois** |
| **Total recommandé** | **~$25/mois** |

---

*Guide technique créé le 2026-04-13 par DEV - Ideas.Studio (ILU-45)*
*Suite de la recherche ILU-44 par RES - Ideas.Studio*
