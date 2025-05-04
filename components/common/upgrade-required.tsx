import React from "react";
import BgGradient from "./bg-gradient";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const UpgradeRequired = () => {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient className="from-rose-400 via-rose-300 to-emerald-400" />
      <div className="container px-8 py-16">
        <div className="flex flex-col justify-center items-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-rose-500">
            <Sparkles className="w-6 h-6 animate-pulse mr-1" />
            <span className="text-sm uppercase font-medium tracking-wider">
              Premium Features
            </span>
          </div>
          <h1>Subscription Required</h1>
          <p>
            You need to upgrade to the Basic Plan or the Pro Plan to access this
            feature 💞
          </p>
          <Button>
            <Link href={"/#pricing"}>View Pricing Plan!</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeRequired;
