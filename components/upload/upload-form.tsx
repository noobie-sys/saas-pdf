"use client";

import React from "react";
import { Button } from "../ui/button";
import UploadInputForm from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { FileText } from "lucide-react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Invalid file type",
    }),
});

const UploadForm = () => {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("Error happening here.......");
      console.log("error occurred while uploading", err);
      toast("Error occured while uploading file", {
        description: err.message,
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
      toast.success("File uploaded successfully", {
        description: file,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validating the fields
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);
    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] || "Invalid File"
      );
      toast.error("Invalid File Type", {
        description: validatedFields.error.flatten().fieldErrors.file?.[0],
      });
      return;
    }

    toast.loading("Uploading Pdf", {
      icon: <FileText className="w-6 h-6" />,
      description: "We are uploading the pdf",
    });

    const response = await startUpload([file]);
    console.log("Am i gettting response or not ", response);
    if (!response) {
      toast.error("Something went wrong");
      return;
    }

    toast.loading("Processing PDF", {
      icon: <FileText className="w-6 h-6" />,
      description: "Please wait while we process your PDF",
    });
  };
  return (
    <div className="flex flex-col gap-8 max-w-2xl w-full">
      <UploadInputForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
