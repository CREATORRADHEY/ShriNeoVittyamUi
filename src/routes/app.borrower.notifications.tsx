import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, AlertTriangle, Sparkles, CreditCard, User, Mail, ChevronRight } from "lucide-react";

import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/prototype/state";
import { toast } from "sonner";

export const Route = createFileRoute("/app/borrower/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — ShriNeo Capital" },
      { name: "description", content: "Actionable notifications for your loan applications, offers and EMIs." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BorrowerNotificationsPage,
});

interface AlertItem {
  id: string;
  timestamp: string;
  icon: any;
  title: string;
  body: string;
  channels: string[];
  read: boolean;
  actionLabel: string;
  actionTo: string;
}

function BorrowerNotificationsPage() {
  const { data } = usePrototype();

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "ntf-1",
      timestamp: "12 Mar 2026, 11:20",
      icon: AlertTriangle,
      title: "Document Action Required",
      body: "Lender raised a query on REQ-884021 regarding address proof bank statements.",
      channels: ["SMS", "Email", "In-App"],
      read: false,
      actionLabel: "Resolve in Action Centre",
      actionTo: "/app/borrower/action-centre"
    },
    {
      id: "ntf-2",
      timestamp: "09 Mar 2026, 18:04",
      icon: Sparkles,
      title: "Lender Offers Ready",
      body: "Three custom quote proposals are ready for comparison on your Personal Loan file.",
      channels: ["App"],
      read: true,
      actionLabel: "Compare Quotes",
      actionTo: "/app/borrower"
    },
    {
      id: "ntf-3",
      timestamp: "01 Mar 2026, 07:00",
      icon: CreditCard,
      title: "EMI Collected Successfully",
      body: "Your Feb EMI of ₹11,540 was processed automatically via NACH bank mandate.",
      channels: ["SMS"],
      read: true,
      actionLabel: "View Receipt",
      actionTo: "/app/borrower/payments"
    },
    {
      id: "ntf-4",
      timestamp: "28 Feb 2026, 14:10",
      icon: User,
      title: "Profile Contact Verified",
      body: "Mobile OTP verification completed successfully.",
      channels: ["Email"],
      read: true,
      actionLabel: "Manage Settings",
      actionTo: "/app/borrower/profile"
    }
  ]);

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
    toast.success("All notifications marked as read.");
  };

  const isNewOrEmpty = data === "empty";

  return (
    <PortalShell
      role="borrower"
      title="Notifications"
      subtitle="Track alerts, task reminders and transaction receipts sent to your account"
      actions={
        alerts.some(a => !a.read) && (
          <Button size="sm" variant="outline" onClick={handleMarkAllRead}>
            Mark all read
          </Button>
        )
      }
    >
      {isNewOrEmpty ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-muted-foreground">
            <Bell className="size-6" />
          </div>
          <h2 className="mt-4 text-base font-semibold">Nothing to catch up on</h2>
          <p className="mt-2 max-w-[45ch] text-xs text-muted-foreground">
            Alerts about your applications, credit updates, and payments will collect here when sent.
          </p>
        </div>
      ) : (
        <SectionCard title="Alert History">
          <div className="divide-y divide-border text-xs">
            {alerts.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className={`py-4 flex gap-4 items-start ${!item.read ? "bg-primary/5 -mx-4 px-4 border-l-4 border-primary" : ""}`}>
                  <div className={`p-2 rounded-full mt-0.5 shrink-0 ${!item.read ? "bg-primary/10 text-primary" : "bg-neutral-100 text-muted-foreground"}`}>
                    <IconComp className="size-4" />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <span className="text-[10px] text-muted-foreground font-mono">{item.timestamp}</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.body}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono bg-neutral-100 border border-border rounded px-2 py-0.5">
                        <Mail className="size-3" /> Sent via: {item.channels.join(", ")}
                      </div>
                      <Button asChild size="xs" variant={!item.read ? "default" : "outline"} className="flex items-center gap-1">
                        <Link to={item.actionTo}>
                          {item.actionLabel} <ChevronRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </PortalShell>
  );
}
