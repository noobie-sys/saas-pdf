"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

interface UploadInputFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadInputForm = ({ onSubmit }: UploadInputFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-2 ">
        <Input id="file" name="file" accept="application/pdf" type="file" />
        <Button>Upload your PDF</Button>
      </div>
    </form>
  );
};

export default UploadInputForm;
