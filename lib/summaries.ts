import { getDBconnection } from "./db";

export async function getSummary(userId: string) {
  try {
    const sql = await getDBconnection();
    const result = await sql`
      SELECT * from pdf_summaries where user_id = ${userId} ORDER BY created_at DESC
    `;

    return result;
  } catch (error) {
    console.error("Error while getting summary,", error);
    throw error;
  }
}
