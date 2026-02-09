import { useMemo } from "react";
import { usePortfolio } from "@/lib/portfolioStore";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card/70 p-4 text-sm text-foreground">
    <code>{children}</code>
  </pre>
);

const renderMarkdown = (content: string) => {
  const lines = content.split("\n");
  const blocks: JSX.Element[] = [];
  let codeBuffer: string[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let orderedBuffer: string[] = [];
  let tableBuffer: string[] = [];
  let inCode = false;
  let inTable = false;
  let tableHeaderParsed = false;

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(" ").trim();
    if (text) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="text-sm leading-7 text-muted-foreground">
          {text}
        </p>
      );
    }
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="space-y-1 pl-6 text-sm text-muted-foreground">
          {listBuffer.map((item, index) => (
            <li key={`${item}-${index}`} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
    if (orderedBuffer.length > 0) {
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="space-y-1 pl-6 text-sm text-muted-foreground">
          {orderedBuffer.map((item, index) => (
            <li key={`${item}-${index}`} className="list-decimal">
              {item}
            </li>
          ))}
        </ol>
      );
      orderedBuffer = [];
    }
  };

  const flushTable = () => {
    if (!inTable || tableBuffer.length === 0) return;
    const rows = tableBuffer.map((row) =>
      row
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
    );
    const header = rows[0] ?? [];
    const body = rows.slice(2);
    blocks.push(
      <div key={`table-${blocks.length}`} className="overflow-x-auto">
        <table className="mt-2 w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border">
            <tr>
              {header.map((cell, index) => (
                <th key={`${cell}-${index}`} className="px-2 py-2 font-semibold text-foreground">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-b border-border/60">
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="px-2 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
    inTable = false;
    tableHeaderParsed = false;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        blocks.push(
          <CodeBlock key={`code-${blocks.length}`}>{codeBuffer.join("\n")}</CodeBlock>
        );
        codeBuffer = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        flushTable();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeBuffer.push(line);
      return;
    }

    if (inTable) {
      if (trimmed === "") {
        flushTable();
        return;
      }
      tableBuffer.push(line);
      return;
    }

    if (trimmed.startsWith("#")) {
      flushParagraph();
      flushList();
      flushTable();
      const match = trimmed.match(/^(#{1,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = slugify(text);
        const Tag = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
        const className =
          level === 1
            ? "text-2xl font-semibold"
            : level === 2
              ? "text-xl font-semibold"
              : "text-lg font-semibold";
        blocks.push(
          <Tag key={`heading-${index}`} id={id} className={className}>
            {text}
          </Tag>
        );
      }
      return;
    }

    if (trimmed === "---") {
      flushParagraph();
      flushList();
      flushTable();
      blocks.push(
        <hr key={`hr-${blocks.length}`} className="my-4 border-border/60" />
      );
      return;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      flushTable();
      const quote = trimmed.replace(/^>\s?/, "");
      blocks.push(
        <blockquote
          key={`quote-${blocks.length}`}
          className="border-l-2 border-primary/60 pl-4 text-sm italic text-muted-foreground"
        >
          {quote}
        </blockquote>
      );
      return;
    }

    const isOrdered = /^\d+\.\s+/.test(trimmed);
    const isUnordered = /^-\s+/.test(trimmed);

    if (isOrdered) {
      flushParagraph();
      flushTable();
      orderedBuffer.push(trimmed.replace(/^\d+\.\s+/, ""));
      return;
    }

    if (isUnordered) {
      flushParagraph();
      flushTable();
      listBuffer.push(trimmed.replace(/^-\s+/, ""));
      return;
    }

    if (trimmed.includes("|") && lines[index + 1]?.trim().includes("|")) {
      const nextLine = lines[index + 1]?.trim() ?? "";
      if (/^\|?[-\s:]+\|/.test(nextLine)) {
        flushParagraph();
        flushList();
        inTable = true;
        tableHeaderParsed = true;
        tableBuffer.push(line);
        return;
      }
    }

    if (trimmed === "") {
      flushParagraph();
      flushList();
      flushTable();
      return;
    }

    paragraphBuffer.push(trimmed);
  });

  flushParagraph();
  flushList();
  if (inTable && tableHeaderParsed) {
    flushTable();
  }

  return blocks;
};

const extractHeadings = (content: string) => {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const match = line.match(/^(#{1,3})\s+(.*)$/);
      if (!match) return null;
      const level = match[1].length;
      const text = match[2];
      return { level, text, id: slugify(text) };
    })
    .filter((heading): heading is { level: number; text: string; id: string } => !!heading);
};

const BlogIndex = () => {
  const { data } = usePortfolio();
  const headings = useMemo(() => extractHeadings(data.blog.content), [data.blog.content]);
  const renderedContent = useMemo(() => renderMarkdown(data.blog.content), [data.blog.content]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {data.blog.subtitle}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">{data.blog.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {data.blog.tagline}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-sm border border-primary px-4 py-2 text-sm text-primary transition hover:bg-primary/10"
            >
              Back to Home
            </a>
            <a
              href="#navigation"
              className="rounded-sm border border-border px-4 py-2 text-sm text-foreground transition hover:border-primary"
            >
              Jump to Index
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-12 px-6 py-10">
        <section id="navigation" className="rounded-xl border border-border bg-card/50 p-6">
          <h2 className="text-xl font-semibold">Quick Navigation</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {headings
              .filter((heading) => heading.level <= 2)
              .map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  {heading.text}
                </a>
              ))}
          </div>
        </section>

        <section className="space-y-6 rounded-xl border border-border bg-card/40 p-6">
          {renderedContent}
        </section>
      </main>
    </div>
  );
};

export default BlogIndex;
