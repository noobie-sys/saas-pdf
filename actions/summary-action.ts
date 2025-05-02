"use server";
import { getDBconnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

export async function getSummaryDeleteAction({
  summaryId,
  file_key,
}: {
  file_key: string;
  summaryId: string;
}) {
  const utapi = new UTApi();
  const sql = await getDBconnection();
  //   console.log("summaryId", summaryId);
  try {
    const user = await currentUser();
    // console.log("userId", user?.id);
    if (!user) {
      throw new Error("User not found");
    }

    const deletedFile = await utapi.deleteFiles(file_key);
    console.log("delete your file successfully!,\n", deletedFile);

    if (deletedFile.success === true) {
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
    } else {
      console.log("File is not deleted from uploadthing");
      return { success: false };
    }
  } catch (error) {
    console.error("Error while getting summary,", error);
    return { success: false };
  }
}
