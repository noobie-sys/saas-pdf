"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import UploadInputForm from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePDFSummary,
  storePdfSummaries,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";

import UploadFormSkeleton from "./upload-form-loading-skeleton";

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
  const inputRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
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

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // validating the fields
      const validatedFields = schema.safeParse({ file });
      // console.log(validatedFields);
      if (!validatedFields.success) {
        // console.log(
        //   validatedFields.error.flatten().fieldErrors.file?.[0] || "Invalid File"
        // );
        toast.error("Invalid File Type", {
          description: validatedFields.error.flatten().fieldErrors.file?.[0],
        });
        setIsLoading(false);
        return;
      }

      toast("Uploading Pdf", {
        description: "We are uploading the pdf",
      });

      // uploading the pdf on uploadthing
      const response = await startUpload([file]);
      // console.log("Am i gettting response or not ", response);
      if (!response) {
        toast.error("Something went wrong");
        setIsLoading(false);
        return;
      }

      toast("Processing PDF", {
        description: "Please wait while we process your PDF",
      });

      // parsing the pdf using langchain
      const summary = await generatePDFSummary([
        {
          serverData: {
            userId: response[0].key,
            file: {
              url: response[0].ufsUrl,
              name: response[0].name,
              key: response[0].key,
            },
          },
        },
      ]);
      // console.log("summary is exist", { summary });
      const { data = null, message = undefined } = summary || {};

      if (data) {
        toast("Saving PDF", {
          description: "wait a little longer while we are saving your pdf!",
        });
        inputRef.current?.reset();
        console.log("data is here", data.fileKey);
        let storeResults: any;
        // save the summary to the database
        if (data.pdfSummary) {
          // save the summary
          storeResults = await storePdfSummaries({
            file_name: data.fileName,
            original_file_url: response[0].ufsUrl,
            summary_text: data.pdfSummary,
            title: response[0].name,
            file_key_url: data.fileKey,
          });

          toast.success("Summary generated!", {
            description: "Your pdf summary file has been generated and saved!",
          });

          inputRef.current?.reset();

          // redirect the user
          console.log("storeResults", storeResults?.data.id);
          router.push(`/summaries/${storeResults?.data.id}`);
        }
      }
    } catch (error) {
      setIsLoading(false);
      inputRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 max-w-2xl w-full">
      <UploadInputForm
        isLoading={isLoading}
        ref={inputRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <UploadFormSkeleton />
        </>
      )}
    </div>
  );
};

export default UploadForm;
