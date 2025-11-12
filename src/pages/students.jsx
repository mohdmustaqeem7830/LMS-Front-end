import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Upload, Edit, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockStudents = [
    {
      id: "1",
      tenantId: "1",
      email: "john.smith@email.com",
      firstName: "John",
      lastName: "Smith",
      studentId: "STU001",
      phone: "(555) 123-4567",
      isActive: true,
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "2",
      tenantId: "1",
      email: "sarah.johnson@email.com",
      firstName: "Sarah",
      lastName: "Johnson",
      studentId: "STU002",
      phone: "(555) 234-5678",
      isActive: true,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "3",
      tenantId: "1",
      email: "mike.wilson@email.com",
      firstName: "Mike",
      lastName: "Wilson",
      studentId: "STU003",
      phone: "(555) 345-6789",
      isActive: false,
      createdAt: new Date("2024-02-01"),
    },
  ];

  const columns = [
    {
      header: "Student ID",
      accessor: (row) => <span className="font-mono text-sm">{row.studentId}</span>,
    },
    {
      header: "Name",
      accessor: (row) => (
        <span className="font-medium">
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    { header: "Email", accessor: "email", className: "text-muted-foreground" },
    { header: "Phone", accessor: (row) => row.phone || "N/A" },
    {
      header: "Status",
      accessor: (row) => (
        <Badge
          className={
            row.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
          }
        >
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <Link href={`/students/${row.id}`}>
            <Button size="sm" variant="ghost" data-testid={`button-view-${row.id}`}>
              View
            </Button>
          </Link>
          <Link href={`/students/${row.id}/edit`}>
            <Button size="sm" variant="ghost" data-testid={`button-edit-${row.id}`}>
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="sm" variant="ghost" data-testid={`button-delete-${row.id}`}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student accounts and profiles</p>
        </div>
        <div className="flex gap-3">
          <Link href="/students/import">
            <Button variant="outline" data-testid="button-import-csv">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
          </Link>
          <Link href="/students/new">
            <Button data-testid="button-add-student">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-students"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockStudents}
            columns={columns}
            emptyMessage="No students found. Add your first student to get started."
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: mockStudents.length,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
