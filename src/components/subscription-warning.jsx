import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function SubscriptionWarning({ status, daysRemaining, onRenew }) {
  if (status === "ACTIVE") return null;

  const isGrace = status === "GRACE";
  const isInactive = status === "INACTIVE";

  return (
    <Alert
      className={`mb-6 ${
        isGrace
          ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/50"
          : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/50"
      }`}
      data-testid="subscription-warning"
    >
      <AlertCircle
        className={`h-5 w-5 ${
          isGrace
            ? "text-yellow-600 dark:text-yellow-400"
            : "text-red-600 dark:text-red-400"
        }`}
      />
      <AlertDescription className="flex items-center justify-between">
        <span
          className={`${
            isGrace
              ? "text-yellow-800 dark:text-yellow-200"
              : "text-red-800 dark:text-red-200"
          }`}
        >
          {isGrace ? (
            <>
              Your subscription expires in <strong>{daysRemaining} days</strong>.
              Renew now to avoid service interruption.
            </>
          ) : (
            <>Your subscription has expired. Service is currently inactive. Please renew to restore access.</>
          )}
        </span>
        {onRenew && (
          <Button
            onClick={onRenew}
            size="sm"
            className="ml-4"
            variant={isGrace ? "default" : "destructive"}
            data-testid="button-renew-subscription"
          >
            Renew Now
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
