"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3 } from "lucide-react";

const volumeData = [
  { date: "2026-08-25", settlements: 42000, recharge: 18000, billPay: 24000 },
  { date: "2026-08-26", settlements: 58000, recharge: 22000, billPay: 29000 },
  { date: "2026-08-27", settlements: 82000, recharge: 31000, billPay: 37000 },
  { date: "2026-08-28", settlements: 74000, recharge: 27000, billPay: 35000 },
  { date: "2026-08-29", settlements: 98000, recharge: 39000, billPay: 48000 },
  { date: "2026-08-30", settlements: 124000, recharge: 46000, billPay: 56000 },
  { date: "2026-08-31", settlements: 145000, recharge: 52000, billPay: 64000 },
];

const serviceDistributionData = [
  { service: "DMT & IMPS", volume: 185000, count: 640, fill: "var(--color-dmt)" },
  { service: "Mobile Recharge", volume: 92000, count: 1280, fill: "var(--color-recharge)" },
  { service: "Bill Payments", volume: 114000, count: 430, fill: "var(--color-bbps)" },
  { service: "AEPS Cashout", volume: 142000, count: 520, fill: "var(--color-aeps)" },
  { service: "Gift Cards", volume: 48000, count: 190, fill: "var(--color-gift)" },
];

const chartConfig = {
  settlements: {
    label: "Bank Settlements",
    color: "hsl(var(--primary))",
  },
  recharge: {
    label: "Mobile & DTH",
    color: "hsl(var(--secondary, 217 91% 60%))",
  },
  billPay: {
    label: "BBPS & Utilities",
    color: "hsl(142, 71%, 45%)",
  },
  dmt: {
    label: "DMT & Payouts",
    color: "hsl(var(--primary))",
  },
  bbps: {
    label: "Bill Payments",
    color: "hsl(142, 71%, 45%)",
  },
  aeps: {
    label: "AEPS Cashout",
    color: "hsl(38, 92%, 50%)",
  },
  gift: {
    label: "Gift Vouchers",
    color: "hsl(280, 75%, 60%)",
  },
} satisfies ChartConfig;

const formatVolumeTooltip = (value: React.ReactNode, name: React.ReactNode) => (
  <div className="flex items-center justify-between w-full gap-3">
    <span className="text-muted-foreground">{name}:</span>
    <span className="font-mono font-bold text-foreground">
      ₹{Number(value).toLocaleString("en-IN")}
    </span>
  </div>
);

const formatServiceTooltip = (
  value: React.ReactNode,
  _name: React.ReactNode,
  item: { payload?: unknown }
) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-muted-foreground">Volume:</span>
      <span className="font-mono font-bold text-foreground">
        ₹{Number(value).toLocaleString("en-IN")}
      </span>
    </div>
    <div className="flex items-center justify-between gap-3 text-[11px]">
      <span className="text-muted-foreground">Tx Count:</span>
      <span className="font-mono font-semibold text-primary">
        {(item.payload as { count?: number }).count} Orders
      </span>
    </div>
  </div>
);

export function DashboardCharts() {
  const [timeRange, setTimeRange] = useState("7d");

  const totalVolume = useMemo(() => {
    return volumeData.reduce((acc, curr) => acc + curr.settlements + curr.recharge + curr.billPay, 0);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Transaction Volume Area Chart with Shadcn Tooltip */}
      <Card className="lg:col-span-2 rounded-3xl bg-card border border-border shadow-xs">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="w-4 h-4" />
              </div>
              <CardTitle className="text-base font-bold text-foreground">
                Transaction Volume &amp; Turnaround
              </CardTitle>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 py-0">
                +14.8% vs last week
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Daily gross processing across settlements, recharges, and bill payments
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                7-Day Total
              </span>
              <span className="text-sm font-mono font-black text-foreground">
                ₹{totalVolume.toLocaleString("en-IN")}
              </span>
            </div>

            <Select value={timeRange} onValueChange={(val) => setTimeRange(val || "7d")}>
              <SelectTrigger className="h-8 w-28 rounded-xl text-xs font-semibold">
                <SelectValue placeholder="Range" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="7d" className="text-xs">Last 7 Days</SelectItem>
                <SelectItem value="30d" className="text-xs">Last 30 Days</SelectItem>
                <SelectItem value="90d" className="text-xs">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[290px] w-full">
            <AreaChart
              data={volumeData}
              margin={{ left: 12, right: 12, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillSettlements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-settlements)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-settlements)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="fillBillPay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-billPay)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-billPay)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="fillRecharge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-recharge)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-recharge)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/40" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={formatVolumeTooltip}
                  />
                }
              />
              <Area
                dataKey="billPay"
                type="natural"
                fill="url(#fillBillPay)"
                stroke="var(--color-billPay)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="recharge"
                type="natural"
                fill="url(#fillRecharge)"
                stroke="var(--color-recharge)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="settlements"
                type="natural"
                fill="url(#fillSettlements)"
                stroke="var(--color-settlements)"
                strokeWidth={2.5}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Service-wise Breakdown Bar Chart with Custom Tooltip */}
      <Card className="rounded-3xl bg-card border border-border shadow-xs flex flex-col justify-between">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                Service Breakdown
              </CardTitle>
              <CardDescription className="text-xs">
                Volume processed per product category
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 flex-1 flex flex-col justify-center">
          <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
            <BarChart
              data={serviceDistributionData}
              layout="vertical"
              margin={{ left: 8, right: 12, top: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-muted/40" />
              <YAxis
                dataKey="service"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                width={95}
                className="text-[10px] font-medium"
              />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted)/0.3)" }}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={formatServiceTooltip}
                  />
                }
              />
              <Bar
                dataKey="volume"
                radius={[0, 8, 8, 0]}
                fill="hsl(var(--primary))"
              />
            </BarChart>
          </ChartContainer>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/60 text-xs">
            <div className="p-2 rounded-xl bg-muted/30 border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground block">Top Volume Pipe</span>
              <span className="font-bold text-foreground">DMT (IMPS)</span>
            </div>
            <div className="p-2 rounded-xl bg-muted/30 border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground block">Top Order Count</span>
              <span className="font-bold text-foreground">Mobile Topup</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
