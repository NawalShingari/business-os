import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:mb-12">
      <div className="min-w-0">
        <span className="label-mono">{eyebrow}</span>
        <h1 className="animate-reveal mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {sub && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{sub}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel p-5 sm:p-6", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="label-mono">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusDot({ tone = "positive" }: { tone?: "positive" | "warning" | "muted" }) {
  const color =
    tone === "positive" ? "bg-positive" : tone === "warning" ? "bg-warning" : "bg-muted-foreground";
  return <span className={cn("size-1.5 shrink-0 rounded-full animate-breathe", color)} />;
}

export function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "positive" | "warning" | "danger" }) {
  const tones = {
    muted: "border-border text-muted-foreground",
    positive: "border-positive/30 text-positive",
    warning: "border-warning/40 text-warning",
    danger: "border-destructive/30 text-destructive",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center">
      <p className="text-sm font-medium">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">{body}</p>
    </div>
  );
}
