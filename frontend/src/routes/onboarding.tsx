import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your practice — BusinessOS" },
      { name: "description", content: "Teach BusinessOS about your business in four quiet steps." },
      { property: "og:title", content: "Set up your practice — BusinessOS" },
      { property: "og:description", content: "Teach BusinessOS about your business in four quiet steps." },
    ],
  }),
  component: Onboarding,
});

const categories = ["Clinic", "Legal", "Architecture", "Consulting", "Agency", "Salon", "Coaching", "Freelance"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const prefs = [
  ["Morning briefing at 06:00", "A written summary of the day before you arrive."],
  ["Draft payment reminders", "Prepared automatically, sent only on your approval."],
  ["Detect scheduling conflicts", "Flag double-bookings and unrealistic gaps."],
  ["Surface drifting clients", "Notice when a regular stops returning."],
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("Clinic");
  const [open, setOpen] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [chosen, setChosen] = useState<string[]>(prefs.map((p) => p[0]));
  const navigate = useNavigate();

  const steps = ["Business", "Category", "Hours", "Team", "Preferences"];
  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const next = () => (step < steps.length - 1 ? setStep(step + 1) : navigate({ to: "/app" }));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
        <div className="mb-12 flex items-center gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkle className="size-3.5" />
          </span>
          <div className="flex-1">
            <div className="mb-2 flex justify-between">
              <span className="label-mono">Step {step + 1} of {steps.length}</span>
              <span className="label-mono">{steps[step]}</span>
            </div>
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-foreground transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div key={step} className="animate-reveal flex-1">
          {step === 0 && (
            <Section
              title="What should I call your practice?"
              sub="This is how I'll refer to your business in every briefing."
            >
              <Input label="Business name" placeholder="Aris Clinic" />
              <Input label="Your name" placeholder="Dr. Aris Menon" />
              <Input label="City" placeholder="Bengaluru" />
            </Section>
          )}

          {step === 1 && (
            <Section title="What kind of work do you do?" sub="I adapt my vocabulary and insights to your field.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-xl border p-4 text-sm font-medium transition-colors ${
                      category === c ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-surface hover:bg-accent"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {step === 2 && (
            <Section title="When are you open?" sub="I'll never suggest a slot outside these hours.">
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggle(open, setOpen, d)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      open.includes(d) ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Opens" placeholder="09:00" />
                <Input label="Closes" placeholder="18:00" />
              </div>
            </Section>
          )}

          {step === 3 && (
            <Section title="Who else works with you?" sub="Invite later if you'd rather move on.">
              <Input label="Teammate email" placeholder="frontdesk@practice.com" />
              <Input label="Role" placeholder="Reception" />
              <div className="rounded-xl border border-border bg-surface-sunken p-4 text-sm text-muted-foreground">
                You can add unlimited teammates from Settings at any time.
              </div>
            </Section>
          )}

          {step === 4 && (
            <Section title="How proactive should I be?" sub="You can change any of this later.">
              <div className="space-y-2">
                {prefs.map(([t, d]) => {
                  const on = chosen.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggle(chosen, setChosen, t)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                        on ? "border-foreground bg-surface" : "border-border bg-surface opacity-60"
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${
                          on ? "border-foreground bg-primary text-primary-foreground" : "border-border"
                        }`}
                      >
                        {on && <Check className="size-2.5" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{t}</span>
                        <span className="block text-xs text-muted-foreground">{d}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`text-xs text-muted-foreground hover:text-foreground ${step === 0 ? "invisible" : ""}`}
          >
            Back
          </button>
          <button
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            {step === 4 ? "Open my workspace" : "Continue"} <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-balance">{title}</h1>
        <p className="text-sm text-muted-foreground">{sub}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="label-mono mb-2 block">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}
