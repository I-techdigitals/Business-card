# Digital Business Card + Dynamic QR Code

Production-ready Next.js app for a premium digital business card. The QR code encodes only a stable public URL (`/card/[slug]`), so profile updates never invalidate printed or displayed QR codes.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

- Home: http://localhost:3000
- Card: http://localhost:3000/card/anam-rashid
- Event QR: http://localhost:3000/card/anam-rashid/qr
- Admin: http://localhost:3000/admin (password from `ADMIN_PASSWORD`)

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site origin used in QR codes (e.g. `https://yourdomain.com`) |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_SESSION_SECRET` | Cookie signing secret |

## Updating the card

1. Sign in at `/admin`
2. Edit personal, contact, business, and social fields
3. Save / Publish
4. Preview the public card — the QR URL stays the same unless you intentionally change the slug

## Deploy on Vercel

1. Push the repo and import into Vercel
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain
3. Set a strong `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`
4. Deploy

Card data is stored in `src/data/card.json`. For multi-instance production persistence, connect a database later using the same `DigitalCard` model.
# Business-card
# Business-card
