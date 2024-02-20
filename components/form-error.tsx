import { ShieldAlert } from "lucide-react";
import React from "react";

interface FormErrorProps {
  message?: string;
}

function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ShieldAlert className="h-5 w-5 mr-3 max-ms:hidden" />
      <p>{message}</p>
    </div>
  );
}

export default FormError;
