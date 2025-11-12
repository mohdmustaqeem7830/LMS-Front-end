import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Plus } from "lucide-react";
import { Link } from "wouter";

export default function AdminTenants() {
  const mockTenants = [
    {
      id: "tenant-1",
      name: "Central Library",
      address: "123 Main St, Springfield",
      logo: null,
      timezone: "America/New_York",
      status: "GRACE",
      subscriptionPlanId: "professional",
      subscriptionExpiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      gracePeriodDays: 7,
      createdAt: new Date("2024-01-01"),
      studentCount: 456,
      planName: "Professional",
    },
    {
      id: "tenant-2",
      name: "University Library",
      address: "456 College Ave, Cambridge",
      logo: null,
      timezone: "America/Los_Angeles",
      status: "ACTIVE",
      subscriptionPlanId: "enterprise",
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      gracePeriodDays: 7,
      createdAt: new Date("2024-02-01"),
      studentCount: 1245,
      planName: "Enterprise",
    },
  ];

  const columns = [
    { header: "Library Name", accessor: "name", className: "font-medium" },
    { header: "Address", accessor: "address" },
    { header: "Plan", accessor: "planName" },
    { header: "Students", accessor: "studentCount" },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
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
        <Link href={`/admin/tenants/${row.id}`}>
          <Button size="sm" variant="outline" data-testid={`button-view-${row.id}`}>
            Manage
          </Button>
        </Link>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenant Management</h1>
          <p className="text-muted-foreground">Manage all library tenants</p>
        </div>
        <Link href="/admin/tenants/new">
          <Button data-testid="button-create-tenant">
            <Plus className="w-4 h-4 mr-2" />
            Create Tenant
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockTenants}
            columns={columns}
            emptyMessage="No tenants found"
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: mockTenants.length,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
