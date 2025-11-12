import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, DollarSign, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 4500 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6100 },
    { month: "May", revenue: 5500 },
    { month: "Jun", revenue: 6700 },
  ];

  const mockTenants = [
    {
      id: "1",
      name: "Central Library",
      address: "123 Main St",
      logo: null,
      timezone: "UTC",
      status: "ACTIVE",
      subscriptionPlanId: "professional",
      subscriptionExpiresAt: new Date("2024-12-31"),
      gracePeriodDays: 7,
      createdAt: new Date("2024-01-01"),
      studentCount: 456,
    },
  ];

  const columns = [
    { header: "Library Name", accessor: "name" },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
    { header: "Students", accessor: "studentCount" },
    {
      header: "Expires",
      accessor: (row) =>
        row.subscriptionExpiresAt
          ? new Date(row.subscriptionExpiresAt).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <Link href={`/admin/tenants/${row.id}`}>
            <Button size="sm" variant="ghost" data-testid={`button-view-${row.id}`}>
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const stats = [
    {
      title: "Total Tenants",
      value: "24",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Monthly Revenue",
      value: "$6,700",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Students",
      value: "10,245",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Growth Rate",
      value: "+12.5%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all tenants and monitor platform health</p>
        </div>
        <Link href="/admin/tenants/new">
          <Button data-testid="button-create-tenant">Create Tenant</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly recurring revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Active plans across tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { plan: "Starter", count: 8, percentage: 33 },
                { plan: "Professional", count: 12, percentage: 50 },
                { plan: "Enterprise", count: 4, percentage: 17 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{item.plan}</span>
                    <span className="text-muted-foreground">{item.count} tenants</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>Manage and monitor all library tenants</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={mockTenants} columns={columns} emptyMessage="No tenants found" />
        </CardContent>
      </Card>
    </div>
  );
}
