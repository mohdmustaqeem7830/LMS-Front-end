import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, User, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function StudentDetail() {
  const params = useParams();
  const studentId = params.id;

  const mockStudent = {
    id: studentId || "1",
    studentId: "STU001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    isActive: true,
    createdAt: new Date("2024-01-10"),
  };

  const mockIssues = [
    {
      id: "1",
      bookTitle: "To Kill a Mockingbird",
      issuedAt: new Date("2024-06-01"),
      dueDate: new Date("2024-06-15"),
      returnedAt: null,
      fineAmount: "0",
    },
    {
      id: "2",
      bookTitle: "The Great Gatsby",
      issuedAt: new Date("2024-05-20"),
      dueDate: new Date("2024-06-03"),
      returnedAt: new Date("2024-06-02"),
      fineAmount: "0",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/students">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {mockStudent.firstName} {mockStudent.lastName}
          </h1>
          <p className="text-muted-foreground">Student Details</p>
        </div>
        <Link href={`/students/${studentId}/edit`}>
          <Button data-testid="button-edit">Edit Student</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Student ID</p>
                <p className="font-mono font-medium">{mockStudent.studentId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{mockStudent.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{mockStudent.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">{format(mockStudent.createdAt, "MMM dd, yyyy")}</p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <Badge
                className={
                  mockStudent.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                }
              >
                {mockStudent.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Borrowing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIssues.map((issue) => (
                <div key={issue.id} className="flex items-start justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{issue.bookTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      Issued: {format(issue.issuedAt, "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {format(issue.dueDate, "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    {issue.returnedAt ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Returned
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Active
                      </Badge>
                    )}
                    {parseFloat(issue.fineAmount) > 0 && (
                      <p className="text-sm text-red-600 font-semibold mt-1">
                        Fine: ${issue.fineAmount}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
