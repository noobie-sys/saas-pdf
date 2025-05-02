import { getDBconnection } from "./db";
const sql = await getDBconnection();

export async function getSummary(userId: string) {
  try {
    const result = await sql`
      SELECT * from pdf_summaries where user_id = ${userId} ORDER BY created_at DESC
    `;
    return result;
  } catch (error) {
    console.error("Error while getting summary,", error);
    throw error;
  }
}

export async function getSummaryById(summaryId: string) {
  try {
    const [result] = await sql`
      SELECT * from pdf_summaries where id = ${summaryId}
    `;

    // console.log("result", result);
    // TODO: check if result is empty
    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error while getting summary,", error);
    throw error;
  }
}
