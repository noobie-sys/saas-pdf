"use client";
import { useUser } from "@clerk/nextjs";
import { getPriceId } from "@/lib/users";
import { pricingPlans } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProBadge() {
  const { user } = useUser();
  const [planName, setPlanName] = useState("Buy a Plan");

  useEffect(() => {
    async function fetchPriceId() {
      if (!user?.id) return;

      const email = user?.emailAddresses?.[0]?.emailAddress;
      console.log("email", email);
      if (email) {
        const priceId = await getPriceId(email);
        const plan = pricingPlans.find((plan) => plan.priceId === priceId);
        if (plan) {
          setPlanName(plan.name);
        }
      }
    }
    fetchPriceId();
  }, [user]);

  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-bold uppercase md:flex items-center bg-linear-to-r from-amber-200 to-amber-300 hidden ml-2",
        planName === "Buy a plan" && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-4 h-4 mr-1 text-amber-600",
          planName === "Buy a plan" && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}

export default ProBadge;
