import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import React from "react";

const UploadPdf = () => {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className=" mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex justify-center items-center flex-col gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default UploadPdf;
