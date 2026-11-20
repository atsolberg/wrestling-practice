import { Children, isValidElement, type ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const TIME_RE =
  /^(\d{1,2}:\d{2}(?:\s?[ap]m)?\s*-\s*\d{1,2}:\d{2}(?:\s?[ap]m)?)\s*(?:-\s*)?/i;

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return textOf(node.props.children);
  return "";
}

// Each `####` heading is a block of practice time, e.g. "3:00-3:20 Warmup Game".
// Pull the time range out into a badge so the schedule is easy to scan.
function BlockHeading({ children }: { children?: ReactNode }) {
  const kids = Children.toArray(children);
  const first = kids[0];
  const match = typeof first === "string" ? first.match(TIME_RE) : null;

  if (!match) {
    const isBreak = /break/i.test(textOf(children));
    return (
      <h4 className={isBreak ? "agenda-block agenda-break" : "agenda-block"}>
        {children}
      </h4>
    );
  }

  const rest = [(first as string).slice(match[0].length), ...kids.slice(1)];
  return (
    <h4 className="agenda-block">
      <span className="agenda-time">{match[1].replace(/\s+/g, "")}</span>
      <span>{rest}</span>
    </h4>
  );
}

const components: Components = {
  h4: ({ children }) => <BlockHeading>{children}</BlockHeading>,
  // GFM task list items: make the whole row tappable. State is intentionally
  // not persisted; a reload resets every checkbox.
  li: ({ className, children }) => {
    if (className?.includes("task-list-item")) {
      return (
        <li className="task-item">
          <label>{children}</label>
        </li>
      );
    }
    return <li>{children}</li>;
  },
  input: ({ type, checked }) =>
    type === "checkbox" ? (
      <input type="checkbox" defaultChecked={checked} />
    ) : (
      <input type={type} />
    ),
};

export function Agenda({ markdown }: { markdown: string }) {
  return (
    <div className="agenda">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </Markdown>
    </div>
  );
}
