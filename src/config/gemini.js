
import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  return localStorage.getItem("gemini_api_key");
};

export const initializeModel = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API key not found in localStorage. Please provide it via the API Key Prompt.");
    return null;
  }

  
  const modelName = import.meta.env.VITE_GEMINI_MODEL_NAME || "gemini-1.5-flash"; 

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelName });
};

export const model = initializeModel();
