import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePdfSummaryOpenAI(pdfText: string) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `'Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${pdfText}*`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    console.log(response.choices[0].message);

    return response.choices[0].message.content;
  } catch (error: any) {
    console.log(error);
    if (error?.status === 429) {
      throw new Error("Rate limit exceeed!");
    }
    throw error;
  }
}
