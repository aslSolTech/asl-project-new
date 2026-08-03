import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Sent",
    value: "₹10,58,450.00",
    change: "+8.2%",
    icon: ArrowUpRight,
    color: "emerald",
  },
  {
    title: "Success Rate",
    value: "1,247 Transfers",
    change: "98.5%",
    icon: CheckCircle2,
    color: "indigo",
  },
  {
    title: "In Progress",
    value: "18 Transfers",
    change: "Pending",
    icon: Clock,
    color: "amber",
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
    status: "Pending",
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
    method: "UPI",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Transactions & Transfer Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage and track your domestic UPI & NEFT/IMPS transactions securely with PayZones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/50 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div
                className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center"
              >
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge
                variant="secondary"
                className="bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 hover:bg-orange-100"
              >
                {stat.change}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/50 dark:border-slate-800 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-100">Recent Transfers</CardTitle>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-orange-500 font-medium transition-colors">
            View All
          </button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3">Recipient</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-slate-800 flex items-center justify-center text-white text-xs font-bold border border-orange-500/30">
                        {tx.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{tx.recipient}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{tx.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={
                        tx.status === "Completed"
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100"
                          : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{tx.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{tx.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}