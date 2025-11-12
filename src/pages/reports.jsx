import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BookOpen, Users, AlertCircle, DollarSign } from "lucide-react";
import { format } from "date-fns";

export default function Reports() {
  const monthlyCirculation = [
    { month: "Jan", issued: 145, returned: 138 },
    { month: "Feb", issued: 162, returned: 155 },
    { month: "Mar", issued: 158, returned: 161 },
    { month: "Apr", issued: 171, returned: 165 },
    { month: "May", issued: 185, returned: 178 },
    { month: "Jun", issued: 197, returned: 189 },
  ];

  const categoryData = [
    { name: "Fiction", value: 450 },
    { name: "Non-Fiction", value: 320 },
    { name: "Science", value: 180 },
    { name: "History", value: 150 },
    { name: "Biography", value: 120 },
  ];

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const overdueBooks = [
    {
      id: "1",
      bookTitle: "Lord of the Flies",
      studentName: "Alex Turner",
      dueDate: new Date("2024-06-05"),
      daysOverdue: 5,
      fine: "5.00",
    },
    {
      id: "2",
      bookTitle: "Animal Farm",
      studentName: "Grace Kim",
      dueDate: new Date("2024-06-07"),
      daysOverdue: 3,
      fine: "3.00",
    },
    {
      id: "3",
      bookTitle: "Fahrenheit 451",
      studentName: "Tom Harris",
      dueDate: new Date("2024-06-08"),
      daysOverdue: 2,
      fine: "2.00",
    },
  ];

  const overdueColumns = [
    { header: "Book Title", accessor: "bookTitle", className: "font-medium" },
    { header: "Student", accessor: "studentName" },
    {
      header: "Due Date",
      accessor: (row) => format(row.dueDate, "MMM dd, yyyy"),
    },
    {
      header: "Days Overdue",
      accessor: (row) => <span className="text-red-600 font-semibold">{row.daysOverdue}</span>,
    },
    {
      header: "Fine",
      accessor: (row) => <span className="text-red-600 font-semibold">${parseFloat(row.fine).toFixed(2)}</span>,
    },
  ];

  const activeUsers = [
    { id: "1", name: "John Smith", booksIssued: 12, booksReturned: 10, status: "Active" },
    { id: "2", name: "Sarah Johnson", booksIssued: 15, booksReturned: 15, status: "Active" },
    { id: "3", name: "Mike Wilson", booksIssued: 8, booksReturned: 7, status: "Active" },
  ];

  const userColumns = [
    { header: "Student Name", accessor: "name", className: "font-medium" },
    { header: "Books Issued", accessor: "booksIssued" },
    { header: "Books Returned", accessor: "booksReturned" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">Insights into your library operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Books Circulated", value: "1,234", icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
          { title: "Active Users", value: "456", icon: Users, color: "text-green-600", bgColor: "bg-green-50 dark:bg-green-900/20" },
          { title: "Overdue Books", value: "12", icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-900/20" },
          { title: "Fines Collected", value: "$1,245", icon: DollarSign, color: "text-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-900/20" },
        ].map((stat, index) => (
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

      <Tabs defaultValue="circulation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="circulation" data-testid="tab-circulation">Circulation</TabsTrigger>
          <TabsTrigger value="overdue" data-testid="tab-overdue">Overdue</TabsTrigger>
          <TabsTrigger value="users" data-testid="tab-users">User Activity</TabsTrigger>
          <TabsTrigger value="categories" data-testid="tab-categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="circulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Circulation</CardTitle>
              <CardDescription>Books issued vs returned over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyCirculation}>
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
                    <Line type="monotone" dataKey="issued" stroke="hsl(var(--primary))" strokeWidth={2} name="Issued" />
                    <Line type="monotone" dataKey="returned" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Returned" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Books</CardTitle>
              <CardDescription>Books that are past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={overdueBooks}
                columns={overdueColumns}
                emptyMessage="No overdue books"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Most active library users this month</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={activeUsers}
                columns={userColumns}
                emptyMessage="No user activity data"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Distribution by Category</CardTitle>
              <CardDescription>Total books per category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
