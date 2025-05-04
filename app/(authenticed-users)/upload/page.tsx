import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const UploadPdf = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(user);
  if (hasReachedLimit) {
    redirect("/dashboard");
  }
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
