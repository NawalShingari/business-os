import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader, Panel, Pill } from "@/components/os-kit";
import { appointments } from "@/lib/demo-data";

export const Route = createFileRoute("/app/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — BusinessOS" },
      { name: "description", content: "Day, week and month scheduling with conflict detection and AI slot suggestions." },
      { property: "og:title", content: "Appointments — BusinessOS" },
      { property: "og:description", content: "Intelligent scheduling with conflict detection and AI suggestions." },
    ],
  }),
  component: Appointments,
});

const views = ["Day", "Week", "Month"] as const;
const hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
const weekDays = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25"];

const statusTone = (s: string) =>
  s === "Overdue" || s === "Unconfirmed" ? "warning" : s === "Next up" ? "positive" : "muted";

function Appointments() {
  const [view, setView] = useState<(typeof views)[number]>("Day");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Thursday, 24 October"
        title="Appointments"
        sub="8 booked · 6h 30m of clinical time · one conflict detected"
        action={
          <button
            onClick={() => toast.success("Quick booking opened — pick a slot.")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            <Plus className="size-3.5" /> Book
          </button>
        }
      />

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-warning/40 bg-surface p-5 lg:col-span-2">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="size-4 shrink-0 text-warning" />
            <span className="label-mono !text-warning">Conflict detected</span>
          </div>
          <p className="text-sm leading-relaxed">
            Siddharth’s 14:00 procedure runs 60 minutes, leaving no buffer before Ananya at 16:00 if it
            overruns — it has on 2 of the last 3 occasions. Shall I move Ananya to 16:30?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => toast.success("Ananya moved to 16:30. She's been notified.")}
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              Move to 16:30
            </button>
            <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent">
              Keep as is
            </button>
          </div>
        </div>

        <Panel title="AI suggestions">
          <ul className="space-y-3 text-xs leading-relaxed">
            <li>Open a 15-minute acute slot on Wednesdays — demand exceeds capacity.</li>
            <li>Rahul historically attends evenings; 18:30 is free tomorrow.</li>
            <li>Fridays close at 16:00 but you rarely book after 15:00. Shorten?</li>
          </ul>
        </Panel>
      </div>

      <div className="mb-4 inline-flex rounded-full border border-border bg-surface p-1">
        {views.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "Day" && (
        <Panel>
          <div className="space-y-2">
            {appointments.map((a) => (
              <div
                key={a.time}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-foreground"
              >
                <span className="shrink-0 font-mono text-[13px] text-muted-foreground">{a.time}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{a.client}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {a.type} · {a.duration}
                  </span>
                </span>
                <Pill tone={statusTone(a.status) as "muted"}>{a.status}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {view === "Week" && (
        <Panel>
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[48px_repeat(6,minmax(0,1fr))] gap-1">
                <div />
                {weekDays.map((d) => (
                  <div key={d} className="label-mono pb-2 text-center">{d}</div>
                ))}
                {hours.map((h) => (
                  <>
                    <div key={h} className="pr-2 text-right font-mono text-[10px] text-muted-foreground">{h}:00</div>
                    {weekDays.map((d) => {
                      const filled = (h.charCodeAt(1) + d.length) % 3 === 0;
                      return (
                        <div
                          key={d + h}
                          className={`h-9 rounded-md border ${filled ? "border-foreground/20 bg-surface-sunken" : "border-border"}`}
                        >
                          {filled && <div className="truncate p-1 text-[9px] text-muted-foreground">Consult</div>}
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      )}

      {view === "Month" && (
        <Panel>
          <div className="grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="label-mono pb-2 text-center">{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 2;
              const load = day > 0 && day <= 31 ? (day * 7) % 13 : 0;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-md border p-1.5 ${day === 24 ? "border-foreground bg-surface-sunken" : "border-border"}`}
                >
                  {day > 0 && day <= 31 && (
                    <>
                      <div className="font-mono text-[10px] text-muted-foreground">{day}</div>
                      {load > 3 && (
                        <div className="mt-1 h-1 rounded-full bg-foreground" style={{ opacity: Math.min(load / 12, 1) }} />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>
      )}
    </div>
  );
}
