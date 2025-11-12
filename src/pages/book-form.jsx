import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookSchema } from "@/shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function BookForm() {
  const form = useForm({
    resolver: zodResolver(insertBookSchema),
    defaultValues: {
      tenantId: "1",
      title: "",
      author: "",
      isbn: "",
      category: "",
      totalCopies: 1,
      availableCopies: 1,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Reference",
    "Children",
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/books">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Book</h1>
          <p className="text-muted-foreground">
            Add a book to your library inventory
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
          <CardDescription>
            Enter the information for the new book
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="To Kill a Mockingbird"
                        {...field}
                        data-testid="input-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Harper Lee"
                        {...field}
                        data-testid="input-author"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="978-0061120084"
                        {...field}
                        value={field.value || ""}
                        data-testid="input-isbn"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalCopies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Copies</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          data-testid="input-total-copies"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableCopies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Copies</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          data-testid="input-available-copies"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="/books">
                  <Button
                    type="button"
                    variant="outline"
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" data-testid="button-save">
                  Save Book
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
