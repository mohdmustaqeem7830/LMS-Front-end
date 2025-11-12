import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataTable({
  data,
  columns,
  emptyMessage = "No data available",
  pagination,
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id} data-testid={`row-${row.id}`}>
                  {columns.map((column, index) => (
                    <TableCell key={index} className={column.className}>
                      {typeof column.accessor === "function"
                        ? column.accessor(row)
                        : String(row[column.accessor])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            {pagination.totalItems && `Showing ${data.length} of ${pagination.totalItems} items`}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              data-testid="button-prev-page"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              data-testid="button-next-page"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
