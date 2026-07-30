import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Sparkle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { StatusDot } from "@/components/os-kit";
import { currency } from "@/lib/demo-data";

export const Route = createFileRoute("/app/assistant")({
  head: () => ({
    meta: [
      { title: "AI assistant — BusinessOS" },
      { name: "description", content: "Ask your business anything: schedules, pending payments, client history and performance." },
      { property: "og:title", content: "AI assistant — BusinessOS" },
      { property: "og:description", content: "Natural-language commands for your whole practice." },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "ai"; text: string; actions?: string[] };

const answers: { match: RegExp; reply: Msg }[] = [
  {
    match: /appoint|schedule|today/i,
    reply: {
      role: "ai",
      text: "You have 8 appointments today, from 09:00 to 16:30. Six are confirmed, Ananya at 16:00 is unconfirmed, and Siddharth's 14:00 procedure risks overrunning into it.",
      actions: ["Open calendar", "Confirm Ananya", "Add buffer at 15:00"],
    },
  },
  {
    match: /pay|owe|due|invoice/i,
    reply: {
      role: "ai",
      text: `Three clients owe you ${currency(7400)}. Aarav Sharma (${currency(3800)}, 24 days), Rahul Mehta (${currency(2400)}, 6 days) and James Wu (${currency(1200)}, pending). Aarav's delay is well above his usual pattern.`,
      actions: ["Draft all reminders", "Call Aarav", "Open payments"],
    },
  },
  {
    match: /rahul/i,
    reply: {
      role: "ai",
      text: "Rahul Mehta has visited 11 times since March 2023, almost always in the evening. He's booked at 10:00 today — against his pattern — and has an invoice 6 days overdue. He usually pays within 48 hours of a nudge.",
      actions: ["Open profile", "Message Rahul", "Send invoice reminder"],
    },
  },
  {
    match: /month|performance|summar/i,
    reply: {
      role: "ai",
      text: `October: ${currency(121300)} collected, up 12% on September. 61 active clients, 6 new. Retention is 88% and your collection rate improved to 93%. Wednesdays remain your bottleneck.`,
      actions: ["Open analytics", "Add Wednesday slot"],
    },
  },
];

const suggestions = [
  "Show today's appointments",
  "Who has pending payments?",
  "Tell me about Rahul",
  "Summarise this month",
];

function Assistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Good morning, Aris. I've read everything since yesterday evening. Ask me about your day, your clients, or your numbers.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const found = answers.find((a) => a.match.test(text));
      setMsgs((m) => [
        ...m,
        found?.reply ?? {
          role: "ai",
          text: "I don't have that in memory yet. Try asking about today's schedule, pending payments, a specific client, or this month's performance.",
        },
      ]);
      setThinking(false);
      inputRef.current?.focus();
    }, 700);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col px-4 py-8 sm:px-8">
      <div className="mb-6 flex items-center gap-2">
        <StatusDot />
        <span className="label-mono">Connected to business memory · 1,284 facts</span>
      </div>

      <div className="flex-1 space-y-6">
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="animate-reveal flex gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border">
                <Sparkle className="size-3.5" />
              </span>
              <div className="min-w-0 space-y-3">
                <p className="text-sm leading-relaxed">{m.text}</p>
                {m.actions && (
                  <div className="flex flex-wrap gap-2">
                    {m.actions.map((a) => (
                      <button
                        key={a}
                        onClick={() => send(a)}
                        className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-accent"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}
        {thinking && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border">
              <Sparkle className="size-3.5" />
            </span>
            <span className="animate-pulse">Reading your business…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-20 mt-8 space-y-3 bg-background pb-2 lg:bottom-6">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2"
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask BusinessOS…"
            className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
