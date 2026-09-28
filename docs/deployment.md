# Deployment

The production topology is designed for a small server running Docker Compose behind Cloudflare.

- Cloudflare terminates public DNS/TLS and forwards traffic to the server.
- Only the Next.js service publishes a host port.
- NestJS is reachable only on the Compose network.
- A named volume persists the SQLite database.
- Container health checks prevent the web service from starting before the API is ready.
- Both services run as non-root users and use `restart: unless-stopped`.

Start or update the deployment with:

```bash
docker compose up --build -d
```

Inspect it with:

```bash
docker compose ps
docker compose logs -f
```

Back up the SQLite volume before destructive infrastructure changes. The application does not include an automated backup policy because that depends on the target server.
