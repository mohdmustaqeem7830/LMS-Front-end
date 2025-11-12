import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, BookCopy, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function Issues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [returnIssueId, setReturnIssueId] = useState("");

  const mockIssues = [
    {
      id: "1",
      tenantId: "1",
      studentId: "1",
      bookId: "1",
      issuedAt: new Date("2024-06-01"),
      dueDate: new Date("2024-06-15"),
      returnedAt: null,
      fineAmount: "0",
      finePaid: false,
      studentName: "John Smith",
      bookTitle: "To Kill a Mockingbird",
    },
    {
      id: "2",
      tenantId: "1",
      studentId: "2",
      bookId: "2",
      issuedAt: new Date("2024-05-25"),
      dueDate: new Date("2024-06-08"),
      returnedAt: null,
      fineAmount: "5.00",
      finePaid: false,
      studentName: "Sarah Johnson",
      bookTitle: "1984",
    },
    {
      id: "3",
      tenantId: "1",
      studentId: "3",
      bookId: "3",
      issuedAt: new Date("2024-06-05"),
      dueDate: new Date("2024-06-19"),
      returnedAt: new Date("2024-06-17"),
      fineAmount: "0",
      finePaid: true,
      studentName: "Mike Wilson",
      bookTitle: "The Great Gatsby",
    },
  ];

  const columns = [
    { header: "Student", accessor: "studentName", className: "font-medium" },
    { header: "Book", accessor: "bookTitle" },
    {
      header: "Issued Date",
      accessor: (row) => format(new Date(row.issuedAt), "MMM dd, yyyy"),
    },
    {
      header: "Due Date",
      accessor: (row) => format(new Date(row.dueDate), "MMM dd, yyyy"),
    },
    {
      header: "Status",
      accessor: (row) => {
        if (row.returnedAt) {
          return (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Returned
            </Badge>
          );
        }
        const isOverdue = new Date() > new Date(row.dueDate);
        return isOverdue ? (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Overdue
          </Badge>
        ) : (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Active
          </Badge>
        );
      },
    },
    {
      header: "Fine",
      accessor: (row) => (
        <span
          className={
            parseFloat(row.fineAmount) > 0 ? "text-red-600 font-semibold" : ""
          }
        >
          ${parseFloat(row.fineAmount).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row) =>
        !row.returnedAt ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setReturnIssueId(row.id)}
                data-testid={`button-return-${row.id}`}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Return
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Return Book</DialogTitle>
                <DialogDescription>
                  Confirm book return and fine payment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Student: {row.studentName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Book: {row.bookTitle}
                  </p>
                </div>
                {parseFloat(row.fineAmount) > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50">
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                      Fine Amount: ${parseFloat(row.fineAmount).toFixed(2)}
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      This book is overdue. Fine has been calculated.
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button data-testid="button-confirm-return">
                  Confirm Return
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <span className="text-sm text-muted-foreground">Completed</span>
        ),
      className: "text-right",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Issue & Return</h1>
          <p className="text-muted-foreground">Manage book issues and returns</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button data-testid="button-issue-book">
              <BookCopy className="w-4 h-4 mr-2" />
              Issue Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Issue Book</DialogTitle>
              <DialogDescription>
                Select student and book to issue
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="student">Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="student" data-testid="select-student">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Smith (STU001)</SelectItem>
                    <SelectItem value="2">Sarah Johnson (STU002)</SelectItem>
                    <SelectItem value="3">Mike Wilson (STU003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="book">Book</Label>
                <Select value={selectedBook} onValueChange={setSelectedBook}>
                  <SelectTrigger id="book" data-testid="select-book">
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      To Kill a Mockingbird (3 available)
                    </SelectItem>
                    <SelectItem value="2" disabled>
                      1984 (0 available)
                    </SelectItem>
                    <SelectItem value="3">
                      The Great Gatsby (5 available)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  data-testid="input-due-date"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button data-testid="button-confirm-issue">Issue Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <BookCopy className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fines</CardTitle>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$145</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by student or book name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-issues"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockIssues}
            columns={columns}
            emptyMessage="No active issues found."
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: mockIssues.length,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
