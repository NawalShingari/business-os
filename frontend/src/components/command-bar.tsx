import { useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  CreditCard,
  Search,
  Sparkle,
  Users,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { clients } from "@/lib/demo-data";

export function CommandBar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Ask BusinessOS or type a command…" />
      <CommandList>
        <CommandEmpty>Nothing matched. Try “pending payments”.</CommandEmpty>
        <CommandGroup heading="Ask the assistant">
          <CommandItem onSelect={() => go("/app/assistant")}>
            <Sparkle className="size-4" /> Show today’s appointments
          </CommandItem>
          <CommandItem onSelect={() => go("/app/assistant")}>
            <Sparkle className="size-4" /> Who has pending payments?
          </CommandItem>
          <CommandItem onSelect={() => go("/app/assistant")}>
            <Sparkle className="size-4" /> Summarise this month
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/app/appointments")}>
            <CalendarDays className="size-4" /> Appointments
          </CommandItem>
          <CommandItem onSelect={() => go("/app/clients")}>
            <Users className="size-4" /> Clients
          </CommandItem>
          <CommandItem onSelect={() => go("/app/payments")}>
            <CreditCard className="size-4" /> Payments
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Clients">
          {clients.slice(0, 5).map((c) => (
            <CommandItem key={c.id} onSelect={() => go(`/app/clients/${c.id}`)}>
              <Search className="size-4" /> {c.name}
              <span className="ml-auto text-xs text-muted-foreground">{c.tag}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
