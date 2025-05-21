import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage: string;
  let statusText: string = "An unexpected error occurred";
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusText = `${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-3xl font-bold">{statusText}</h1>
        <p className="text-muted-foreground">{errorMessage}</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}