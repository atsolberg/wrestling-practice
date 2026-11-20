import { Link } from "react-router";
import type { Route } from "./+types/home";
import { listPractices } from "~/lib/practices.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Osseo Wrestling Practice Plans" },
    {
      name: "description",
      content: "Practice agendas for the Osseo High School wrestling team.",
    },
  ];
}

export function loader() {
  return { practices: listPractices() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { practices } = loaderData;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        2026 / 2027 Season
      </p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-fg sm:text-4xl">
        Practice Plans
      </h1>

      <ul className="mt-8 grid grid-cols-1 gap-3">
        {practices.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/practices/${p.slug}`}
              prefetch="intent"
              className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/12 text-xl font-black text-primary">
                {p.number}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-fg group-hover:text-primary">
                  {p.title}
                </span>
                {p.subtitle && (
                  <span className="block text-sm text-muted">
                    {p.subtitle}
                  </span>
                )}
              </span>
              <span
                aria-hidden
                className="text-muted transition group-hover:translate-x-0.5 group-hover:text-primary"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
