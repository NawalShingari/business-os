import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText, Phone, Mail } from "lucide-react";

import { EmptyState, PageHeader, Panel, Pill } from "@/components/os-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clients, currency, type Client } from "@/lib/demo-data";

export const Route = createFileRoute("/app/clients/$clientId")({
  loader: ({ params }): { client: Client } => {
    const client = clients.find((c) => c.id === params.clientId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Client not found — BusinessOS" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.client.name} — BusinessOS`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.client.summary.slice(0, 150) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.client.summary.slice(0, 150) },
      ],
    };
  },
  component: ClientProfile,
});

function ClientProfile() {
  const { clientId } = Route.useParams();
  const client = clients.find((c) => c.id === clientId) as Client;


  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <Link
        to="/app/clients"
        className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All clients
      </Link>

      <PageHeader
        eyebrow={`${client.tag} · client since ${client.since}`}
        title={client.name}
        action={client.balance > 0 ? <Pill tone="danger">{currency(client.balance)} due</Pill> : <Pill tone="positive">Settled</Pill>}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {[
          ["Visits", String(client.visits)],
          ["Lifetime value", currency(client.lifetime)],
          ["Last visit", client.lastVisit],
          ["Next visit", client.nextVisit ?? "—"],
        ].map(([l, v]) => (
          <div key={l} className="panel p-4">
            <div className="label-mono mb-2">{l}</div>
            <div className="truncate text-sm font-semibold">{v}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-xl bg-primary p-6 text-primary-foreground">
        <div className="label-mono mb-3 !text-primary-foreground/60">AI summary</div>
        <p className="text-sm leading-relaxed sm:text-base">{client.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {client.memory.map((m) => (
            <span key={m} className="rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px]">
              {m}
            </span>
          ))}
        </div>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Panel>
            <ol className="relative space-y-6 border-l border-border pl-6">
              {client.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1.5 size-2 rounded-full border border-border bg-surface" />
                  <div className="label-mono mb-1">
                    {t.date} · {t.type}
                  </div>
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.detail}</div>
                </li>
              ))}
            </ol>
          </Panel>
        </TabsContent>

        <TabsContent value="notes">
          {client.notes.length === 0 ? (
            <EmptyState title="No notes yet" body="Anything you write here becomes part of this client's memory." />
          ) : (
            <div className="space-y-3">
              {client.notes.map((n) => (
                <Panel key={n.date}>
                  <div className="label-mono mb-2">{n.date}</div>
                  <p className="text-sm leading-relaxed">{n.body}</p>
                </Panel>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents">
          {client.documents.length === 0 ? (
            <EmptyState title="No documents" body="Upload reports, contracts or scans and they'll be indexed into memory." />
          ) : (
            <div className="space-y-2">
              {client.documents.map((d) => (
                <div key={d.name} className="panel flex items-center gap-3 p-4">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate text-sm">{d.name}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{d.size}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contact">
          <Panel>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-muted-foreground" /> {client.phone}
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{client.email}</span>
              </div>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
