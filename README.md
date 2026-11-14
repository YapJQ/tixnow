# TixNow

Event ticketing: organizers create events, people buy tickets and get a QR code they show at the door.

Built with Next.js 15 (App Router, TypeScript), Tailwind CSS 4 and Prisma.

## What works so far

- Sign up, log in and log out
- Browse upcoming events
- Create an event (title, description, venue, start time, price, capacity)
- Event detail page

Ticket purchase, QR codes and check-in scanning are next.

## Run it locally

```bash
npm install
cp .env.example .env      # then set SESSION_SECRET to a long random string
npm run db:push           # creates the local SQLite database
npm run dev               # http://localhost:3000
```

## Instant accounts (no email verification)

By default a new account works the moment it's created: no verification
email or code is sent, and the user is logged in right after signup.

To require verification instead, set `REQUIRE_EMAIL_VERIFICATION="true"` in
`.env`. Login is then blocked until the user's `emailVerified` field is set.
Sending the verification email itself isn't built yet (there's a TODO in
`src/app/actions/auth.ts`).

## Database

Local development uses SQLite so there's nothing to install. For production,
change the `provider` in `prisma/schema.prisma` to `"postgresql"` and point
`DATABASE_URL` at your Postgres database.
