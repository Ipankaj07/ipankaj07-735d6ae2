import { useMemo } from "react";
import { usePortfolio } from "@/lib/portfolioStore";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card/70 p-4 text-sm text-emerald-100">
    <code className="font-mono leading-6">{children}</code>
  </pre>
);

const parseInline = (text: string) => {
  const nodes: Array<string | JSX.Element> = [];
  let buffer = "";
  let index = 0;
  const pushBuffer = () => {
    if (buffer) {
      nodes.push(buffer);
      buffer = "";
    }
  };

  while (index < text.length) {
    const rest = text.slice(index);
    const boldMatch = rest.match(/^\*\*(.+?)\*\*/);
    const codeMatch = rest.match(/^`([^`]+)`/);
    const italicMatch = rest.match(/^\*(.+?)\*/);

    if (boldMatch) {
      pushBuffer();
      nodes.push(
        <strong key={`bold-${nodes.length}`} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      index += boldMatch[0].length;
      continue;
    }

    if (codeMatch) {
      pushBuffer();
      nodes.push(
        <code
          key={`code-${nodes.length}`}
          className="rounded bg-background/60 px-1 py-0.5 font-mono text-[0.85em] text-emerald-200"
        >
          {codeMatch[1]}
        </code>
      );
      index += codeMatch[0].length;
      continue;
    }

    if (italicMatch) {
      pushBuffer();
      nodes.push(
        <em key={`italic-${nodes.length}`} className="italic text-foreground/80">
          {italicMatch[1]}
        </em>
      );
      index += italicMatch[0].length;
      continue;
    }

    buffer += text[index];
    index += 1;
  }

  pushBuffer();
  return nodes;
};

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
          {parseInline(text)}
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
              {parseInline(item)}
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
              {parseInline(item)}
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
                  {parseInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-b border-border/60">
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="px-2 py-2">
                    {parseInline(cell)}
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
        const Tag = level === 1 ? "h3" : level === 2 ? "h4" : "h5";
        const className =
          level === 1
            ? "text-xl font-semibold"
            : level === 2
              ? "text-lg font-semibold"
              : "text-base font-semibold";
        blocks.push(
          <Tag key={`heading-${index}`} id={id} className={className}>
            {parseInline(text)}
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
          {parseInline(quote)}
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
  const chapterNav = useMemo(
    () =>
      data.blog.chapters.map((chapter) => ({
        title: chapter.title,
        id: slugify(chapter.title),
      })),
    [data.blog.chapters]
  );
  const chapterHeadings = useMemo(
    () =>
      data.blog.chapters.map((chapter) => ({
        id: slugify(chapter.title),
        headings: extractHeadings(chapter.content).filter((heading) => heading.level <= 2),
      })),
    [data.blog.chapters]
  );

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
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {chapterNav.map((chapter) => (
              <div key={chapter.id} className="space-y-2">
                <a
                  href={`#${chapter.id}`}
                  className="text-sm font-semibold text-foreground transition hover:text-primary"
                >
                  {chapter.title}
                </a>
                <div className="space-y-1">
                  {chapterHeadings
                    .find((item) => item.id === chapter.id)
                    ?.headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block text-xs text-muted-foreground transition hover:text-primary"
                      >
                        {heading.text}
                      </a>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {data.blog.chapters.map((chapter) => (
          <section
            key={chapter.title}
            id={slugify(chapter.title)}
            className="space-y-6 rounded-xl border border-border bg-card/40 p-6"
          >
            <div>
              <h2 className="text-xl font-semibold">{chapter.title}</h2>
            </div>
            <div className="space-y-6">{renderMarkdown(chapter.content)}</div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default BlogIndex;
