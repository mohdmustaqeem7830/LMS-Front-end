import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { Building2, Upload, CreditCard, Bell } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const tenantForm = useForm({
    defaultValues: {
      name: "Central Library",
      address: "123 Main St, City, State",
      timezone: "America/New_York",
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your library configuration and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" data-testid="tab-general">General</TabsTrigger>
          <TabsTrigger value="subscription" data-testid="tab-subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* ----------- GENERAL TAB ----------- */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Library Information</CardTitle>
              <CardDescription>Basic information about your library</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...tenantForm}>
                <form className="space-y-6">
                  <FormField
                    control={tenantForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Library Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input placeholder="Central Library" className="pl-10" {...field} data-testid="input-library-name" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={tenantForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, State" {...field} data-testid="input-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={tenantForm.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Logo</FormLabel>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <Button variant="outline" data-testid="button-upload-logo">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                    <FormDescription className="mt-2">
                      Recommended size: 200x200px. Maximum file size: 2MB
                    </FormDescription>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" data-testid="button-save-general">
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----------- SUBSCRIPTION TAB ----------- */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Professional Plan</h3>
                  <p className="text-sm text-muted-foreground">$99/month</p>
                  <StatusBadge status="GRACE" className="mt-2" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Expires in</p>
                  <p className="text-2xl font-bold text-yellow-600">5 days</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Student Limit</span>
                    <span className="font-medium">456 / 500 (91%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "91%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Buffer capacity: 550 students (10% above limit)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Next Billing Date</p>
                    <p className="font-semibold">June 15, 2024</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Grace Period</p>
                    <p className="font-semibold">7 days</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button data-testid="button-renew">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Renew Subscription
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Renew Subscription</DialogTitle>
                      <DialogDescription>
                        Continue with your Professional plan for another month
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Professional Plan</span>
                          <span className="font-medium">$99.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Remaining days bonus</span>
                          <span className="font-medium text-green-600">-$16.00</span>
                        </div>
                        <div className="pt-2 border-t flex justify-between font-semibold">
                          <span>Total due today</span>
                          <span>$83.00</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button data-testid="button-confirm-renew">Confirm Renewal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" data-testid="button-upgrade">
                      Upgrade Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upgrade Your Plan</DialogTitle>
                      <DialogDescription>
                        Choose a higher tier for more capacity
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover-elevate cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">Enterprise Plan</h4>
                            <p className="text-sm text-muted-foreground">Up to 2000 students</p>
                          </div>
                          <span className="text-2xl font-bold">$199/mo</span>
                        </div>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Multi-branch support</li>
                          <li>• API access</li>
                          <li>• Priority support</li>
                          <li>• 20% buffer capacity</li>
                        </ul>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button data-testid="button-confirm-upgrade">Upgrade Now</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ----------- NOTIFICATIONS TAB ----------- */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Overdue Books",
                  description: "Get notified when books become overdue",
                  enabled: true,
                },
                {
                  title: "Subscription Expiry",
                  description: "Reminder when subscription is about to expire",
                  enabled: true,
                },
                {
                  title: "New Student Registration",
                  description: "Alert when a new student is added",
                  enabled: false,
                },
                {
                  title: "Fine Payments",
                  description: "Notification when fines are paid",
                  enabled: true,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Button
                    variant={item.enabled ? "default" : "outline"}
                    size="sm"
                    data-testid={`button-toggle-${index}`}
                  >
                    {item.enabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              ))}

              <Button data-testid="button-save-notifications">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
