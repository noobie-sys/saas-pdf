"use server";
import { getDBconnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getSummaryDeleteAction({
  summaryId,
}: {
  summaryId: string;
}) {
  //   console.log("summaryId", summaryId);
  try {
    const user = await currentUser();
    // console.log("userId", user?.id);
    if (!user) {
      throw new Error("User not found");
    }
    const sql = await getDBconnection();
    const result = await sql`
      DELETE from pdf_summaries where id = ${summaryId} AND user_id = ${user?.id} RETURNING id
    `;
    // console.log("result", result);
    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
      };
    }
    return { success: false };
  } catch (error) {
    console.error("Error while getting summary,", error);
    return { success: false };
  }
}
