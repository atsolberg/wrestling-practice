# Osseo Wrestling Practice Plans

Practice agendas for the Osseo High School wrestling team, live at
<https://osseo-wrestling-practice.fly.dev>.

Built with React Router v7 framework mode (the successor to Remix) and Tailwind CSS v4.

## Adding or editing a practice

Practice plans are Markdown files in [`md/`](md/) named `Practice_N.md`. Add a file
and it appears on the home page automatically, sorted by `N`.

- The first `# ` heading is used as the title. Text after ` - ` becomes the subtitle,
  for example `# Practice #6 - Monday Nov 30 - Takedowns`.
- `#### 3:00-3:20 Something` headings get a time badge.
- `- [ ] item` task lists render as tappable checkboxes. They reset on reload.

## Development

```sh
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build && npm start   # production build on http://localhost:3000
```

## Deployment

Every push to `main` runs typecheck and build, then deploys to Fly.io through
`.github/workflows/fly-deploy.yml`. There is no staging environment.

The workflow needs a `FLY_API_TOKEN` repo secret, which you can create with:

```sh
fly tokens create deploy -a osseo-wrestling-practice | gh secret set FLY_API_TOKEN
```

To deploy by hand, run `fly deploy`.
