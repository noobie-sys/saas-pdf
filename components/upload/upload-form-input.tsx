"use client";
import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadInputFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}
const UploadInputForm = forwardRef<HTMLFormElement, UploadInputFormProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form ref={ref} onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-2 ">
          <Input
            id="file"
            name="file"
            accept="application/pdf"
            type="file"
            disabled={isLoading}
            className={cn(isLoading && "opacity-50 cursor-not-allowed")}
          />
          <Button disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> uploading...
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadInputForm.displayName = "UploadInputForm";

export default UploadInputForm;
