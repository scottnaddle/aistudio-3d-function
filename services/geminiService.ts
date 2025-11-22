import { GoogleGenAI } from "@google/genai";
import { FunctionParams } from "../types";

// Ideally, this should be handled via a backend proxy to keep the key secure,
// but for this demo architecture we assume the environment variable is available.
const apiKey = process.env.API_KEY || '';

export const analyzeFunction = async (params: FunctionParams): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please check your environment settings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Analyze the 3D surface function z = ${params.A} * sin(${params.B}x) * cos(${params.C}y).
      Explain briefly how the current coefficients (A=${params.A}, B=${params.B}, C=${params.C}) affect the shape, frequency, and amplitude of the graph in simple geometric terms.
      Keep the explanation under 80 words. 
      Do not use markdown formatting like bold or italics excessively.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to analyze the function at this moment. Please try again later.";
  }
};