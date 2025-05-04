"use server";
import { getDBconnection } from "./db";

export const getPriceId = async (email: string) => {
  const sql = await getDBconnection();
  const query =
    await sql`SELECT * FROM users WHERE email = ${email} AND status = 'active'`;

  console.log("This is query", query);

  return query?.[0]?.price_id || null;
};
