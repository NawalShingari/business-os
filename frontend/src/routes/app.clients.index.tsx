import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, PageHeader, Pill } from "@/components/os-kit";
import { clients, currency } from "@/lib/demo-data";

export const Route = createFileRoute("/app/clients/")({
  head: () => ({
    meta: [
      { title: "Clients — BusinessOS" },
      { name: "description", content: "Every client with AI summaries, visit history, balances and remembered patterns." },
      { property: "og:title", content: "Clients — BusinessOS" },
      { property: "og:description", content: "Client records with memory, history and AI summaries." },
    ],
  }),
  component: Clients,
});

function Clients() {
  const [q, setQ] = useState("");
  const list = useMemo(
    () => clients.filter((c) => (c.name + c.tag).toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow={`${clients.length} clients · 1,284 facts remembered`}
        title="Clients"
        sub="Each record carries what the workspace has learned, not just what you typed."
      />

      <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or category…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {list.length === 0 ? (
        <EmptyState title="No clients match that search" body="Try a name, a category, or clear the field to see everyone." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((c) => (
            <Link
              key={c.id}
              to="/app/clients/$clientId"
              params={{ clientId: c.id }}
              className="panel group p-5 transition-colors hover:border-foreground"
            >
              <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-sunken font-mono text-xs">
                    {c.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{c.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {c.tag} · since {c.since}
                    </span>
                  </span>
                </div>
                {c.balance > 0 ? <Pill tone="danger">{currency(c.balance)} due</Pill> : <Pill tone="positive">Settled</Pill>}
              </div>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{c.summary}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-muted-foreground">
                <span>{c.visits} visits</span>
                <span>{currency(c.lifetime)} lifetime</span>
                <span>{c.nextVisit ? `Next: ${c.nextVisit}` : "No upcoming visit"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
