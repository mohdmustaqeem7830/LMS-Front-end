import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ icon, title, description, action }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-4"
      data-testid="empty-state"
    >
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
        {icon || <FileQuestion className="w-6 h-6 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} data-testid="button-empty-action">
          {action.label}
        </Button>
      )}
    </div>
  );
}
