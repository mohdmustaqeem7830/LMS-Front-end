import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SubscriptionWarning } from "@/components/subscription-warning";
import { CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

export default function Dashboard() {
  const monthlyData = [
    { month: "Jan", issued: 45, returned: 42 },
    { month: "Feb", issued: 52, returned: 48 },
    { month: "Mar", issued: 48, returned: 50 },
    { month: "Apr", issued: 61, returned: 55 },
    { month: "May", issued: 55, returned: 58 },
    { month: "Jun", issued: 67, returned: 62 },
  ];

  const stats = [
    {
      title: "Total Books",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Active Students",
      value: "456",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Books Issued",
      value: "89",
      change: "-3%",
      trend: "down",
      icon: BookOpen,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Overdue Books",
      value: "12",
      change: "+2",
      trend: "up",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <SubscriptionWarning status="GRACE" daysRemaining={5} onRenew={() => {}} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your library operations</p>
        </div>
        <div className="flex gap-3">
          <Link href="/books/new">
            <Button data-testid="button-add-book">Add Book</Button>
          </Link>
          <Link href="/students/new">
            <Button variant="outline" data-testid="button-add-student">
              Add Student
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} data-testid={`stat-card-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-2">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span
                  className={`text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Books issued vs returned over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
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
                  <Line type="monotone" dataKey="issued" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="returned" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions in your library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { student: "John Smith", book: "To Kill a Mockingbird", action: "Issued", time: "2 hours ago" },
                { student: "Sarah Johnson", book: "1984", action: "Returned", time: "4 hours ago" },
                { student: "Mike Wilson", book: "The Great Gatsby", action: "Issued", time: "5 hours ago" },
                { student: "Emily Brown", book: "Pride and Prejudice", action: "Returned", time: "1 day ago" },
                { student: "David Lee", book: "Brave New World", action: "Issued", time: "1 day ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.student}</p>
                    <p className="text-sm text-muted-foreground">{activity.book}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        activity.action === "Issued"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {activity.action}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/issues/new">
              <Button variant="outline" className="w-full justify-start" data-testid="button-quick-issue">
                <BookOpen className="w-4 h-4 mr-2" />
                Issue Book
              </Button>
            </Link>
            <Link href="/issues">
              <Button variant="outline" className="w-full justify-start" data-testid="button-quick-return">
                <BookOpen className="w-4 h-4 mr-2" />
                Return Book
              </Button>
            </Link>
            <Link href="/books/import">
              <Button variant="outline" className="w-full justify-start" data-testid="button-quick-import">
                <BookOpen className="w-4 h-4 mr-2" />
                Import Books (CSV)
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Books</CardTitle>
            <CardDescription>Requires attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { student: "Alex Turner", book: "Lord of the Flies", days: 5 },
                { student: "Grace Kim", book: "Animal Farm", days: 3 },
                { student: "Tom Harris", book: "Fahrenheit 451", days: 2 },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-start p-2 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{item.book}</p>
                    <p className="text-xs text-muted-foreground">{item.student}</p>
                  </div>
                  <span className="text-xs font-semibold text-red-600">{item.days} days</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">Professional</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Students</span>
                <span className="font-medium">456 / 500</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "91%" }} />
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-muted-foreground">Expires</span>
                <span className="font-medium text-yellow-600">In 5 days</span>
              </div>
            </div>
            <Link href="/settings">
              <Button variant="outline" className="w-full" data-testid="button-manage-subscription">
                Manage Subscription
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
