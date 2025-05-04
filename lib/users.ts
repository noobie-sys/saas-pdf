"use server";
import { pricingPlans } from "@/utils/constants";
import { getDBconnection } from "./db";
import { getUserUploadCount } from "./summaries";

export const getPriceId = async (email: string) => {
  const sql = await getDBconnection();
  const query =
    await sql`SELECT * FROM users WHERE email = ${email} AND status = 'active'`;

  console.log("This is query", query);

  return query?.[0]?.price_id || null;
};

export async function hasReachedUploadLimit(userId: string, email: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceId(email);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  console.log("isPro:- ", isPro, "PriceId :-", priceId);
  const uploadLimit: number = isPro ? 10000 : 5;
  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}
