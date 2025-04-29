import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      try {
        console.log("📦 Middleware is running...");

        const user = await currentUser(); // 👈 This is the likely failure

        if (!user) {
          console.log("❌ No user found in middleware");
          throw new UploadThingError("Unauthorized");
        }

        console.log("✅ User found:", user.id);

        return { userId: user.id};
      } catch (err) {
        console.log("🔥 Middleware error:", err);
        throw new UploadThingError("Middleware failed");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("completed for user id", metadata.userId);;
      return { userId: metadata.userId, file : file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
