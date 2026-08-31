import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NoticeBoard } from "@/modules/merchant/components/notice-board/NoticeBoard";
import { DashboardCharts } from "@/modules/merchant/components/dashboard/DashboardCharts";

const stats = [
  {
    title: "Total Volume Settled",
    value: "₹10,58,450.00",
    change: "+8.2% today",
    icon: ArrowUpRight,
    isPositive: true,
  },
  {
    title: "Success Rate",
    value: "1,247 Transfers",
    change: "99.8% uptime",
    icon: CheckCircle2,
    isPositive: true,
  },
  {
    title: "In Progress / Processing",
    value: "18 Transfers",
    change: "Auto-clearing",
    icon: Clock,
    isPositive: false,
  },
];

const transactions = [
  {
    id: 1,
    recipient: "Rahul Sharma",
    email: "rahul@example.com",
    initials: "RS",
    amount: "₹50,000.00",
    status: "Completed",
    date: "Aug 2, 2026",
    method: "UPI (IMPS)",
  },
  {
    id: 2,
    recipient: "Priya Patel",
    email: "priya@example.com",
    initials: "PP",
    amount: "₹1,25,000.00",
    status: "Processing",
    date: "Aug 1, 2026",
    method: "NEFT / RTGS",
  },
  {
    id: 3,
    recipient: "Rohan Verma",
    email: "rohan@example.com",
    initials: "RV",
    amount: "₹32,000.00",
    status: "Completed",
    date: "Jul 30, 2026",
    method: "AEPS Cashout",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <NoticeBoard />
      
      {/* Header Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Transactions & Terminal Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time telemetry and instant multi-pipe settlement logs for your CSP retail node.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="text-xs font-semibold">
            Export Logs
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground font-semibold shadow-xs">
            + Quick Transfer
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-card/90 backdrop-blur-xl border-border/80 shadow-xs hover:shadow-md transition-all hover:border-primary/40"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <stat.icon className="w-5 h-5" />
              </div>
              <Badge
                variant="secondary"
                className="bg-secondary/10 text-secondary border border-secondary/20 text-[11px] font-bold"
              >
                {stat.change}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-2xl font-black text-foreground tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics & Volume Charts (Recharts with Shadcn/UI Tooltip) */}
      <DashboardCharts />

      {/* Recent Live Transactions Card */}
      <Card className="bg-card/90 backdrop-blur-xl border-border/80 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 py-4 px-6">
          <div>
            <CardTitle className="text-base font-bold text-foreground">Recent Live Settlement Feed</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time multi-pipe transactions across retail nodes</p>
          </div>
          <Badge variant="outline" className="text-[11px] font-semibold border-border bg-muted/40">
            Auto-Sync 10s
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 px-6 hover:bg-muted/40 transition-colors text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                    {txn.initials}
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">{txn.recipient}</span>
                    <span className="text-xs text-muted-foreground">{txn.email} • {txn.method}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-foreground block">{txn.amount}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                    txn.status === 'Completed' 
                      ? 'bg-secondary/10 text-secondary' 
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}