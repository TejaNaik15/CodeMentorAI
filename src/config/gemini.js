
import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => localStorage.getItem("gemini_api_key");

const MODELS = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
  "gemini-pro",
];

export const initializeModel = (modelIndex = 0) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API key not found.");
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: MODELS[modelIndex] });
};

export const generateWithFallback = async (prompt) => {
  for (let i = 0; i < MODELS.length; i++) {
    try {
      const m = initializeModel(i);
      if (!m) throw new Error("API key not found. Please set it.");
      const result = await m.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      const is429 = err.message?.includes("429") || err.message?.includes("quota");
      const isLast = i === MODELS.length - 1;
      if (is429 && !isLast) {
        console.warn(`Model ${MODELS[i]} quota exceeded, trying ${MODELS[i + 1]}...`);
        continue;
      }
      if (is429 && isLast) {
        throw new Error(
          "All models have exceeded their quota. Please get a new API key at https://aistudio.google.com/app/apikey or wait 24 hours for the quota to reset."
        );
      }
      throw err;
    }
  }
};

export const model = null;
