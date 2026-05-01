# Session State — Agent Feed

> État persistant du feed user → agent. Lu/écrit à chaque heartbeat.
> Source de vérité pour le tracking des commentaires/brief_notes laissés par Guillaume sur les idées en `en-etude`.

## last_seen_feed_at

2026-04-19T16:45:00.000Z

<!-- Remplacé à chaque heartbeat après traitement du feed. Format ISO-8601 UTC strict. -->

## Notes

- Endpoint : `GET /api/agent-feed?since=<last_seen_feed_at>`
- Chaque entrée = `{ type, id, ideaId, ideaTitle, ideaStatus, text, date, author }`
- L'agent répond via `POST /api/ideas/:ideaId/comments` avec `author: "DEV - Ideas.Studio"`
- Après traitement : écrire `last_seen_feed_at = max(date)` des entrées traitées
