import BgGradient from "@/components/common/bg-gradient";
import SummaryCard from "@/components/summaries/summaries-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getSummary } from "@/lib/summaries";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const uploadLimit = 5;
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  const summary = await getSummary(user.id);
  // console.log(summary);
  return (
    <main className="min-h-screen ">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col  gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex justify-between gap-4 mb-8 ">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                Your summaries!
              </h1>
              <p className="text-gray-600">
                {" "}
                Transform your PDFs into concisable, actionble insights
              </p>
            </div>

            <div>
              <Button variant={"link"} className="hover:no-underline">
                <Link
                  href={"/upload"}
                  className="flex text-white items-center gap-2 hover:no-underline"
                >
                  <Plus className="h-6 w-6" />
                  New Summary
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-rose-50 w-full border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm ">
                You've reached the limit of {uploadLimit} uploads on the Basic
                plan!
                <Link
                  href={"/pricing"}
                  className="text-rose-700 underline hover:no-underline ml-1 font-medium underline-offset-4 items-center inline-flex"
                >
                  Upgrade to pro
                  <ArrowRight className="h-4 w-4 inline-block ml-1" />
                </Link>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 lg:grid-cols-3 sm:px-0">
            {summary.map((item, index) => (
              <SummaryCard key={index} summary={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
