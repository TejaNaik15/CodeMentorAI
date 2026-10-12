import Groq from "groq-sdk";

const getApiKey = () => localStorage.getItem("groq_api_key");

const MODELS = [
  "llama-3.1-8b-instant",
  "llama-3.2-11b-vision-preview",
  "gemma2-9b-it",
  "compound-beta-mini",
];

export const generateWithFallback = async (prompt) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API key not found. Please enter your Groq API key.");

  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  for (let i = 0; i < MODELS.length; i++) {
    try {
      const completion = await groq.chat.completions.create({
        model: MODELS[i],
        messages: [{ role: "user", content: prompt }],
      });
      return completion.choices[0]?.message?.content ?? "";
    } catch (err) {
      const isRateLimit =
        err.status === 429 ||
        err.message?.includes("429") ||
        err.message?.includes("rate limit");
      const isUnavailable =
        err.status === 404 ||
        err.status === 400 ||
        err.message?.includes("model_not_found") ||
        err.message?.includes("decommissioned") ||
        err.message?.includes("does not exist");
      console.error(`Model ${MODELS[i]} failed:`, err.status, err.message);
      if ((isRateLimit || isUnavailable) && i < MODELS.length - 1) {
        console.warn(`Trying next model: ${MODELS[i + 1]}`);
        continue;
      }
      if (isRateLimit || isUnavailable) {
        throw new Error(
          "⚠️ All models unavailable. Please wait or get a new API key at https://console.groq.com/keys"
        );
      }
      throw err;
    }
  }
};

export const initializeModel = () => null;
export const model = null;
