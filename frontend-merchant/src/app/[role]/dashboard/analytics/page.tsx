"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, IndianRupee, Users, TrendingUp } from "lucide-react";

const revenueData = [
  { name: 'Jan', value: 40000 },
  { name: 'Feb', value: 30000 },
  { name: 'Mar', value: 20000 },
  { name: 'Apr', value: 27800 },
  { name: 'May', value: 18900 },
  { name: 'Jun', value: 23900 },
  { name: 'Jul', value: 34900 },
  { name: 'Aug', value: 45000 },
];

const userGrowthData = [
  { name: '2023-01', value: 400 },
  { name: '2023-02', value: 500 },
  { name: '2023-03', value: 450 },
  { name: '2023-04', value: 600 },
  { name: '2023-05', value: 750 },
  { name: '2023-06', value: 680 },
  { name: '2023-07', value: 900 },
  { name: '2023-08', value: 1100 },
];

const churnData = [
  { name: 'Jan', churn: 15 },
  { name: 'Feb', churn: 12 },
  { name: 'Mar', churn: 10 },
  { name: 'Apr', churn: 8 },
  { name: 'May', churn: 14 },
  { name: 'Jun', churn: 11 },
  { name: 'Jul', churn: 9 },
  { name: 'Aug', churn: 6 },
];

const countryData = [
  { name: 'India', value: 850, fill: '#1E4D8C' },
  { name: 'UAE', value: 300, fill: '#F7941D' },
  { name: 'USA', value: 200, fill: '#3b82f6' },
  { name: 'Singapore', value: 150, fill: '#a855f7' },
  { name: 'Others', value: 100, fill: '#64748b' },
];

// const COLORS = ['#4f46e5', '#f59e0b', '#6366f1', '#a855f7', '#3b82f6'];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Here&apos;s an overview of your platform&apos;s performance.</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-border text-foreground">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Aug 2026
            </Badge>
            <button
              type="button"
              onClick={() => alert('Export clicked')}
              className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border text-foreground px-4 py-2 rounded-lg hover:bg-accent hover:border-primary/40 transition-all text-sm font-medium shadow-sm"
            >
              Export <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className="bg-card/90 backdrop-blur-xl border-border hover:border-primary/40 transition-all cursor-pointer shadow-sm"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 flex items-center justify-center`}>
                    {item === 1 && <IndianRupee className="w-6 h-6 text-indigo-500" />}
                    {item === 2 && <Users className="w-6 h-6 text-purple-500" />}
                    {item === 3 && <TrendingUp className="w-6 h-6 text-emerald-500" />}
                    {item === 4 && <Users className="w-6 h-6 text-pink-500" />}
                  </div>
                  <span className="text-emerald-500 text-sm font-medium flex items-center">
                    {item === 1 && "+12.5%"}
                    {item === 2 && "+8.3%"}
                    {item === 3 && "+15.2%"}
                    {item === 4 && "+5.7%"}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    {item === 1 && "Total Revenue"}
                    {item === 2 && "Active Users"}
                    {item === 3 && "Avg Transaction"}
                    {item === 4 && "Subscribers"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {item === 1 && "₹12,43,450.00"}
                    {item === 2 && "2,345 Users"}
                    {item === 3 && "₹4,523.00"}
                    {item === 4 && "12,345 Active"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trends */}
          <Card className="bg-card/90 backdrop-blur-xl border-border overflow-hidden shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-semibold text-foreground">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" stroke="currentColor" />
                    <XAxis dataKey="name" className="text-muted-foreground" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis className="text-muted-foreground" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--popover-foreground))',
                      }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card className="bg-card/90 backdrop-blur-xl border-border overflow-hidden shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-semibold text-foreground">User Growth</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" stroke="currentColor" />
                    <XAxis dataKey="name" className="text-muted-foreground" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis className="text-muted-foreground" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--popover-foreground))',
                      }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}
                    />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Churn Rate */}
          <Card className="bg-card/90 backdrop-blur-xl border-border overflow-hidden shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-semibold text-foreground">Churn Rate</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={churnData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" stroke="currentColor" />
                    <XAxis dataKey="name" className="text-muted-foreground" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis className="text-muted-foreground" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--popover-foreground))',
                      }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}
                    />
                    <Line type="monotone" dataKey="churn" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Country */}
          <Card className="bg-card/90 backdrop-blur-xl border-border overflow-hidden shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-semibold text-foreground">Revenue by Country</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--popover-foreground))',
                      }}
                      itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}