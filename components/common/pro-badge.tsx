"use client";
import { useUser } from "@clerk/nextjs";
import { getPriceId } from "@/lib/users";
import { pricingPlans } from "@/utils/constants";
import { useEffect, useState } from "react";

export function ProBadge() {
  const { user } = useUser();
  const [planName, setPlanName] = useState("Buy a plan");

  useEffect(() => {
    async function fetchPriceId() {
      if (!user?.id) return;
      const email = user?.emailAddresses?.[0]?.emailAddress;
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

  return <div>{planName}</div>;
}

export default ProBadge;
