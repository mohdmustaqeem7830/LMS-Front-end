import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Search, Plus, Upload, Edit, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockBooks = [
    {
      id: "1",
      tenantId: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0061120084",
      category: "Fiction",
      totalCopies: 5,
      availableCopies: 3,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      tenantId: "1",
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      category: "Fiction",
      totalCopies: 4,
      availableCopies: 0,
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      tenantId: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      category: "Fiction",
      totalCopies: 6,
      availableCopies: 5,
      createdAt: new Date("2024-02-01"),
    },
  ];

  const columns = [
    { header: "Title", accessor: "title", className: "font-medium" },
    { header: "Author", accessor: "author" },
    {
      header: "ISBN",
      accessor: (row) => <span className="font-mono text-sm">{row.isbn}</span>,
    },
    { header: "Category", accessor: "category" },
    {
      header: "Availability",
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {row.availableCopies}/{row.totalCopies}
          </span>
          <StatusBadge
            status={row.availableCopies > 0 ? "AVAILABLE" : "ISSUED"}
          />
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <Link href={`/books/${row.id}/edit`}>
            <Button
              size="sm"
              variant="ghost"
              data-testid={`button-edit-${row.id}`}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            data-testid={`button-delete-${row.id}`}
          >
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
          <h1 className="text-3xl font-bold">Books</h1>
          <p className="text-muted-foreground">
            Manage your library's book inventory
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/books/import">
            <Button variant="outline" data-testid="button-import-csv">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
          </Link>
          <Link href="/books/new">
            <Button data-testid="button-add-book">
              <Plus className="w-4 h-4 mr-2" />
              Add Book
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
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-books"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockBooks}
            columns={columns}
            emptyMessage="No books found. Add your first book to get started."
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: mockBooks.length,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
