import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, StatusDot } from "@/components/os-kit";
import { appointments, currency, memoryFeed, recommendations, revenueByMonth } from "@/lib/demo-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Daily briefing — BusinessOS" },
      { name: "description", content: "Your AI daily briefing: today's appointments, revenue, pending payments and recommended actions." },
      { property: "og:title", content: "Daily briefing — BusinessOS" },
      { property: "og:description", content: "What your business needs right now, in one paragraph." },
    ],
  }),
  component: Briefing,
});

function Briefing() {
  const pending = 7400;
  const today = 18300;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader eyebrow="Thursday, 24 October" title="Good morning, Aris." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="animate-reveal rounded-xl border border-border bg-surface-sunken p-6 sm:p-8 [animation-delay:120ms]">
            <div className="mb-4 flex items-center gap-2">
              <StatusDot />
              <span className="label-mono">Briefing synthesised 06:00</span>
            </div>
            <p className="text-lg leading-relaxed sm:text-xl">
              You have <strong className="font-bold">8 appointments</strong> today and{" "}
              <strong className="font-bold">{currency(today)}</strong> of expected revenue.{" "}
              <span className="text-muted-foreground">
                Rahul usually prefers late evenings but is booked at 10:00 — worth confirming. Two invoices
                totalling {currency(6200)} are overdue, and Sarah’s thyroid follow-up has been pending for 22
                days. Everything else is on track.
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Prepare today’s plan", "Send 2 reminders", "Message Rahul"].map((a) => (
                <button
                  key={a}
                  onClick={() => toast.success(`${a} — queued for your approval.`)}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Panel title="Revenue this month">
              <div className="text-3xl font-extrabold tracking-tight">{currency(121300)}</div>
              <div className="text-sm font-medium text-positive">+12% vs September</div>
              <div className="mt-6 flex h-14 items-end gap-1.5">
                {revenueByMonth.map((m, i) => (
                  <div key={m.month} className="flex-1">
                    <div
                      className={i === revenueByMonth.length - 1 ? "rounded-t-sm bg-foreground" : "rounded-t-sm bg-border"}
                      style={{ height: `${(m.revenue / 130000) * 56}px` }}
                    />
                    <div className="mt-1 text-center text-[9px] text-muted-foreground">{m.month}</div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Pending payments">
              <div className="text-3xl font-extrabold tracking-tight">{currency(pending)}</div>
              <div className="text-sm text-muted-foreground">across 3 clients</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[["Aarav Sharma", 3800], ["Rahul Mehta", 2400], ["James Wu", 1200]].map(([n, v]) => (
                  <li key={n as string} className="flex items-center justify-between gap-3">
                    <span className="truncate">{n}</span>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">{currency(v as number)}</span>
                  </li>
                ))}
              </ul>
              <Link to="/app/payments" className="mt-5 inline-flex items-center gap-1 text-xs font-medium hover:underline">
                Open payments <ArrowUpRight className="size-3" />
              </Link>
            </Panel>
          </div>

          <Panel title="Today’s schedule" action={<Link to="/app/appointments" className="label-mono hover:text-foreground">Calendar</Link>}>
            <div className="space-y-2">
              {appointments.slice(0, 5).map((a) => (
                <div
                  key={a.time}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-3 font-mono text-[13px] transition-colors hover:border-foreground"
                >
                  <span className="min-w-0 truncate">
                    {a.time} — {a.client}
                  </span>
                  <span className="shrink-0 text-muted-foreground">{a.type}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-primary p-6 text-primary-foreground">
            <div className="mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-positive animate-breathe" />
              <span className="label-mono !text-primary-foreground/60">Business memory</span>
            </div>
            <div className="space-y-4">
              {memoryFeed.slice(0, 3).map((m) => (
                <div key={m.text} className="border-b border-primary-foreground/10 pb-4 last:border-0 last:pb-0">
                  <div className="mb-1 text-[11px] opacity-60">{m.kind}</div>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Panel title="Recommendations">
            <div className="space-y-4">
              {recommendations.map((r) => (
                <div key={r.title} className="space-y-1.5 border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm font-medium">{r.title}</span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{r.impact}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{r.detail}</p>
                  <button
                    onClick={() => toast.success("Approved. I'll handle it.")}
                    className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                  >
                    <Check className="size-3" /> Approve
                  </button>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Business health">
            <div className="space-y-4">
              {[["Retention", 88], ["Schedule density", 74], ["Collection rate", 93]].map(([l, v]) => (
                <div key={l as string}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-muted-foreground">{l}</span>
                    <span className="font-mono">{v}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-surface-sunken">
                    <div className="h-full bg-foreground" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Recent activity">
            <ul className="space-y-3 text-xs">
              {[
                ["8m ago", "Priya Das paid ₹5,600"],
                ["1h ago", "Sarah Jenkins checked in"],
                ["3h ago", "Elena Rodriguez booked 13:00"],
                ["Yesterday", "Lab report uploaded for Rahul"],
              ].map(([t, e]) => (
                <li key={e} className="flex gap-3">
                  <span className="w-16 shrink-0 font-mono text-muted-foreground">{t}</span>
                  <span className="min-w-0">{e}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> Next briefing tomorrow at 06:00
          </div>
        </div>
      </div>
    </div>
  );
}
