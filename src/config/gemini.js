
import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => localStorage.getItem("gemini_api_key");

export const initializeModel = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API key not found.");
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
};

export const model = null;
