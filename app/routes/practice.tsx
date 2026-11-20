import { data, Link } from "react-router";
import type { Route } from "./+types/practice";
import { Agenda } from "~/components/agenda";
import { getPractice, listPractices } from "~/lib/practices.server";

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Not found · Osseo Wrestling" }];
  const { practice } = loaderData;
  return [
    {
      title: `${practice.title}${practice.subtitle ? ` – ${practice.subtitle}` : ""} · Osseo Wrestling`,
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const practice = getPractice(params.slug);
  if (!practice) throw data(null, { status: 404 });

  const all = listPractices();
  const i = all.findIndex((p) => p.slug === practice.slug);
  return { practice, prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
}

export default function PracticePage({ loaderData }: Route.ComponentProps) {
  const { practice, prev, next } = loaderData;
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <Link
        to="/"
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← All practices
      </Link>

      {/* key resets checkbox state when navigating between practices */}
      <article key={practice.slug} className="mt-4">
        <Agenda markdown={practice.markdown} />
      </article>

      <nav className="mt-12 grid grid-cols-2 gap-3 border-t border-line pt-6 text-sm">
        {prev ? (
          <Link
            to={`/practices/${prev.slug}`}
            prefetch="intent"
            className="rounded-lg border border-line bg-surface p-3 hover:border-primary"
          >
            <span className="block text-muted">← Previous</span>
            <span className="font-semibold text-fg">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/practices/${next.slug}`}
            prefetch="intent"
            className="rounded-lg border border-line bg-surface p-3 text-right hover:border-primary"
          >
            <span className="block text-muted">Next →</span>
            <span className="font-semibold text-fg">{next.title}</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
