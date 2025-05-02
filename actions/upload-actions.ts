"use server";

import { getDBconnection } from "@/lib/db";
import { generatePdfSummaryGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePdfSummaryOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-file-name";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type savedPdfSummaryProps = {
  user_id?: string;
  original_file_url: string;
  summary_text: string;
  title: string;
  file_name: string;
  file_key_url?: string;
};

export const generatePDFSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
          key: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: pdfName, key: fileKey },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "No PDF file found!",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    // console.log(pdfText);

    let pdfSummary;
    try {
      // pdfSummary = await generatePdfSummaryOpenAI(pdfText);
      pdfSummary = await generatePdfSummaryGemini(pdfText);
      console.log("✅ PDF SUMMARY OF YOUR DATA: ", pdfSummary);
      // call geminie if openai failed
    } catch (error: any) {
      console.log(error?.message);
      // if (error?.status === 429) {
      //   try {
      //     pdfSummary = await generatePdfSummaryGemini(pdfText);
      //   } catch (gemeniError) {
      //     console.error(
      //       "Gemini API failed after the openai exceeded",
      //       gemeniError
      //     );
      //     throw new Error(
      //       "Failed to generate the summary with available AI providers!"
      //     );
      //   }
      // }
    }

    const fileName = formatFileNameAsTitle(pdfName);

    if (!pdfSummary) {
      return {
        success: false,
        message: "We won't able to generate pdfSummaries",
        data: null,
      };
    }
    return {
      success: true,
      message: "Summary generated summary",
      data: {
        pdfSummary,
        fileName,
        fileKey,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong!",
      data: null,
    };
  }
};

async function savedPdfSummary({
  user_id,
  original_file_url,
  summary_text,
  title,
  file_name,
  file_key_url,
}: savedPdfSummaryProps) {
  // run sql function
  try {
    const sql = await getDBconnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name,
        file_key
      ) VALUES (
        ${user_id},
        ${original_file_url},
        ${summary_text},
        ${file_name},
        ${title},
        ${file_key_url}
      ) RETURNING id, summary_text;
    `;

    return savedSummary;
  } catch (error) {
    console.error("Error while saving pdf,", error);
    throw error;
  }
}

export async function storePdfSummaries({
  original_file_url,
  summary_text,
  title,
  file_name,
  file_key_url,
}: savedPdfSummaryProps) {
  // user is logged in or not
  // save pdfSummaries, save pdfsummaries function
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "User not found!" };
    }
    savedSummary = await savedPdfSummary({
      user_id: userId,
      original_file_url: original_file_url,
      summary_text: summary_text,
      title: title,
      file_name: file_name,
      file_key_url: file_key_url,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to saved PDF summary",
      };
    }
    // revalidate the cache
    revalidatePath(`/summaries/${savedSummary?.id}`);
    return {
      success: true,
      message: "saved pdf successfully",
      data: {
        id: savedSummary?.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error while saving the pdf summaries",
    };
  }
}
