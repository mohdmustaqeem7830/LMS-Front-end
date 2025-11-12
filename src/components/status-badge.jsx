import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status, className }) {
  const variants = {
    ACTIVE: { label: "Active", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    GRACE: { label: "Grace Period", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    INACTIVE: { label: "Inactive", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
    AVAILABLE: { label: "Available", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    ISSUED: { label: "Issued", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    OVERDUE: { label: "Overdue", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  };

  const config = variants[status];

  return (
    <Badge className={`${config.className} ${className}`} data-testid={`badge-status-${status.toLowerCase()}`}>
      {config.label}
    </Badge>
  );
}
