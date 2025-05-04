import UpgradeRequired from "@/components/common/upgrade-required";
import {
  getSubscrioptionStatus,
  hasActiveSubscription,
  hasReachedUploadLimit,
} from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const hasActiveSubscriptions = await hasActiveSubscription(
    user?.emailAddresses[0].emailAddress
  );
  if (!hasActiveSubscriptions) {
    return <UpgradeRequired />;
  }
  return <div>{children}</div>;
};

export default AuthLayout;
