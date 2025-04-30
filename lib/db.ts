"use server";
import { neon } from "@neondatabase/serverless";

export async function getDBconnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Neon Database URl is not defined!");
  }

  const sql = neon(process.env.DATABASE_URL);
  return sql;
}
