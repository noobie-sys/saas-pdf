// import genAI from '@google/generative-ai'
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const gemeniAi = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export const generatePdfSummaryGemini = async (pdfText: string) => {
  try {
    // const model = genAI.getGenertiveModel({ model: "" });

    const prompt = {
      content: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    // const results = await model.generateContent(prompt);

    const results = await gemeniAi.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt.content,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    if (!results.text) {
      throw new Error("Empty response from gemini AI");
    }
    console.log("Results are outed: ", results.text);

    return results.text;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("Rate limit Exceeded!");
    }
    console.log("Gemini API Error, ", error);
    throw error;
  }
};
