// Practice agendas are bundled at build time from the /md folder.
// Add a new `Practice_N.md` file and it shows up automatically.
const files = import.meta.glob<string>("../../md/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type PracticeSummary = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
};

export type Practice = PracticeSummary & { markdown: string };

function parse(path: string, markdown: string): Practice {
  const base = path.split("/").pop()!.replace(/\.md$/, "");
  const number = Number(base.match(/(\d+)/)?.[1] ?? 0);
  const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const heading =
    markdown.match(/^#\s+(.+?)\s*$/m)?.[1] ?? base.replace(/_/g, " ");
  const [title, ...rest] = heading.split(/\s+-\s+/);
  return { slug, number, title, subtitle: rest.join(" · "), markdown };
}

const practices: Practice[] = Object.entries(files)
  .map(([path, md]) => parse(path, md))
  .sort((a, b) => a.number - b.number);

export function listPractices(): PracticeSummary[] {
  return practices.map(({ markdown: _markdown, ...summary }) => summary);
}

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
