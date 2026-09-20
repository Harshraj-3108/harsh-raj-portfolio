# Portfolio — Harsh Raj

Next.js 16 + TypeScript + Tailwind CSS v4 portfolio.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Before running

Edit `src/config/site.ts` and set your real LinkedIn URL, GitHub URL, and email.
The "Let's Connect" button and the navbar's LinkedIn icon both use `site.links.linkedin`.

## Supabase (contact form)

The contact form saves messages to a Supabase table called `contact_messages`
(columns: `id`, `email`, `message`, `created_at`). A project has already been
created for you and `.env.local` is filled in with its URL and public key —
just run `npm install` and `npm run dev` and the form will work.

To see submitted messages, open your project at supabase.com → Table Editor →
`contact_messages`.

If you ever move this to a new Supabase project, update the two values in
`.env.local` (see `.env.local.example` for the variable names) and re-run the
SQL below in the new project's SQL Editor:

```sql
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Public can insert contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);
```

This lets visitors submit messages but not read anyone else's — only you can
read them, from the Supabase dashboard (or by connecting with your own
service-role key, which should never be exposed in frontend code).

`.env.local` is already git-ignored, so your keys won't be committed if you
push this to GitHub. When deploying (e.g. to Vercel), add the same two
environment variables in the project's dashboard settings.

## Structure

- `src/app/layout.tsx` — fonts, global providers (ambient background, custom cursor, scroll-to-top)
- `src/app/globals.css` — design tokens, animations
- `src/components/Navbar.tsx` — floating pill navbar with scroll-spy active state
- `src/components/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`, `Footer.tsx` — page sections
- `src/components/CustomCursor.tsx` — minimal ring + dot cursor (desktop only)
- `src/components/AmbientBackground.tsx` — drifting glows, faint grid, mouse-follow glow
- `src/config/site.ts` — name, role, email, social links
- `src/config/techStack.ts` — tech stack badges shown in About
- `src/lib/supabaseClient.ts` — Supabase client used by the contact form

## Next steps (optional)

1. Add real projects to `src/components/Projects.tsx` (currently a "Coming Soon" placeholder)
2. Deploy (e.g. Vercel) — remember to set the two Supabase env vars in the deployment's settings
