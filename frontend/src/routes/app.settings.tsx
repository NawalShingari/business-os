import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader, Panel, Pill } from "@/components/os-kit";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — BusinessOS" },
      { name: "description", content: "Business profile, working hours, team access and AI behaviour controls." },
      { property: "og:title", content: "Settings — BusinessOS" },
      { property: "og:description", content: "Control your practice profile, team and AI autonomy." },
    ],
  }),
  component: SettingsPage,
});

const team = [
  { name: "Dr. Aris Thorne", role: "Owner", email: "aris@thorneclinic.com" },
  { name: "Priya Raman", role: "Front desk", email: "priya@thorneclinic.com" },
  { name: "Dev Kapoor", role: "Accounts", email: "dev@thorneclinic.com" },
];

const aiControls = [
  ["Draft messages for approval", "AI writes, you send.", true],
  ["Flag scheduling conflicts", "Warns before overlaps and overruns.", true],
  ["Auto-send payment reminders", "Sends without asking after 7 days.", false],
  ["Surface client patterns", "Learns habits from history.", true],
] as const;

function SettingsPage() {
  const [toggles, setToggles] = useState(aiControls.map((c) => c[2] as boolean));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader eyebrow="Thorne Clinic" title="Settings" sub="Profile, team and how much your AI is allowed to do." />

      <div className="space-y-6">
        <Panel title="Business profile">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Business name", "Thorne Clinic"],
              ["Category", "Medical practice"],
              ["Email", "hello@thorneclinic.com"],
              ["Phone", "+91 98200 41120"],
            ].map(([l, v]) => (
              <label key={l} className="block">
                <span className="label-mono mb-2 block">{l}</span>
                <input
                  defaultValue={v}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                />
              </label>
            ))}
          </div>
          <button
            onClick={() => toast.success("Profile saved.")}
            className="mt-5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Save changes
          </button>
        </Panel>

        <Panel title="Working hours">
          <div className="space-y-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d, i) => (
              <div
                key={d}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-2 last:border-0"
              >
                <span className="truncate text-sm">{d}</span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {i === 6 ? "Closed" : i === 5 ? "09:00 – 13:00" : "09:00 – 17:00"}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Team">
          <div className="space-y-3">
            {team.map((m) => (
              <div key={m.email} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.email}</div>
                </div>
                <Pill tone={m.role === "Owner" ? "positive" : "muted"}>{m.role}</Pill>
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.success("Invite link copied.")}
            className="mt-5 rounded-md border border-border px-4 py-2 text-xs font-medium hover:bg-accent"
          >
            Invite teammate
          </button>
        </Panel>

        <Panel title="AI behaviour">
          <div className="space-y-4">
            {aiControls.map((c, i) => (
              <div key={c[0]} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium">{c[0]}</div>
                  <div className="text-xs text-muted-foreground">{c[1]}</div>
                </div>
                <button
                  role="switch"
                  aria-checked={toggles[i]}
                  aria-label={c[0]}
                  onClick={() => setToggles((t) => t.map((v, j) => (j === i ? !v : v)))}
                  className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${toggles[i] ? "bg-primary" : "bg-border"}`}
                >
                  <span
                    className={`block size-5 rounded-full bg-background transition-transform ${toggles[i] ? "translate-x-5" : ""}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
