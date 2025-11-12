import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminReports() {
  const tenantActivityData = [
    { tenant: "Central Library", issues: 145 },
    { tenant: "University Library", issues: 223 },
    { tenant: "City Library", issues: 98 },
    { tenant: "School Library", issues: 167 },
  ];

  const revenueData = [
    { tenant: "Central Library", revenue: "$99.00", students: 456, plan: "Professional" },
    { tenant: "University Library", revenue: "$199.00", students: 1245, plan: "Enterprise" },
  ];

  const revenueColumns = [
    { header: "Tenant", accessor: "tenant", className: "font-medium" },
    { header: "Plan", accessor: "plan" },
    { header: "Students", accessor: "students" },
    { header: "Monthly Revenue", accessor: "revenue", className: "text-right font-semibold" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Reports</h1>
        <p className="text-muted-foreground">Cross-tenant analytics and insights</p>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity" data-testid="tab-activity">Activity</TabsTrigger>
          <TabsTrigger value="revenue" data-testid="tab-revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Activity</CardTitle>
              <CardDescription>Book issues across all tenants this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tenantActivityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="tenant" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="issues" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly recurring revenue by tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={revenueData}
                columns={revenueColumns}
                emptyMessage="No revenue data"
              />
              <div className="mt-6 p-4 rounded-lg bg-muted">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Monthly Revenue</span>
                  <span className="text-2xl font-bold text-primary">$298.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
