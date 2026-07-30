import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Panel } from "@/components/os-kit";
import { currency, memoryFeed, revenueByMonth, weekdayLoad } from "@/lib/demo-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — BusinessOS" },
      { name: "description", content: "Revenue trends, client growth, retention and appointment patterns explained in plain language." },
      { property: "og:title", content: "Analytics — BusinessOS" },
      { property: "og:description", content: "Meaningful business insight, not chart soup." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const max = Math.max(...revenueByMonth.map((m) => m.revenue));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Last 6 months"
        title="Analytics"
        sub="Three things are working, one needs attention."
      />

      <div className="mb-6 rounded-xl bg-primary p-6 text-primary-foreground sm:p-8">
        <div className="label-mono mb-3 !text-primary-foreground/60">What the numbers mean</div>
        <p className="text-base leading-relaxed sm:text-lg">
          Revenue has grown for three consecutive months, driven mostly by returning clients rather than new
          ones — retention is doing the heavy lifting at 88%. Your constraint is capacity on Wednesdays, where
          demand exceeds available slots by roughly four appointments a week.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Revenue" className="lg:col-span-2">
          <div className="mb-6 flex items-end gap-3">
            <span className="text-3xl font-extrabold tracking-tight">{currency(121300)}</span>
            <span className="mb-1 text-sm font-medium text-positive">+12%</span>
          </div>
          <div className="flex h-40 items-end gap-2">
            {revenueByMonth.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-sm ${i === revenueByMonth.length - 1 ? "bg-foreground" : "bg-border"}`}
                  style={{ height: `${(m.revenue / max) * 140}px` }}
                />
                <span className="label-mono">{m.month}</span>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Client growth">
            <div className="text-3xl font-extrabold tracking-tight">61</div>
            <div className="mb-4 text-xs text-muted-foreground">active clients · +6 this month</div>
            <div className="flex h-12 items-end gap-1">
              {revenueByMonth.map((m) => (
                <div key={m.month} className="flex-1 rounded-t-sm bg-border" style={{ height: `${m.clients}%` }} />
              ))}
            </div>
          </Panel>

          <Panel title="Retention">
            <div className="text-3xl font-extrabold tracking-tight">88%</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Clients who return within 90 days. Two regulars are drifting: Vikram Sethi and Neha Gupta.
            </p>
          </Panel>
        </div>

        <Panel title="Appointment patterns" className="lg:col-span-2">
          <div className="flex h-32 items-end gap-3">
            {weekdayLoad.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">{d.appts}</span>
                <div
                  className={`w-full rounded-t-sm ${d.appts >= 12 ? "bg-warning" : "bg-border"}`}
                  style={{ height: `${d.appts * 7}px` }}
                />
                <span className="label-mono">{d.day}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Wednesday runs 40% denser than your average day. Adding two 15-minute acute slots would absorb the
            overflow without extending hours.
          </p>
        </Panel>

        <Panel title="Memory highlights">
          <div className="space-y-4">
            {memoryFeed.map((m) => (
              <div key={m.text} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="label-mono mb-1">{m.kind}</div>
                <p className="text-xs leading-relaxed">{m.text}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{m.when}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
