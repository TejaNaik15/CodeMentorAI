import Groq from "groq-sdk";

const getApiKey = () => localStorage.getItem("groq_api_key");

const MODELS = [
  "llama3-8b-8192",
  "llama3-70b-8192",
  "mixtral-8x7b-32768",
  "gemma2-9b-it",
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
      if (isRateLimit && i < MODELS.length - 1) {
        console.warn(`Model ${MODELS[i]} rate limited, trying ${MODELS[i + 1]}...`);
        continue;
      }
      if (isRateLimit) {
        throw new Error(
          "⚠️ Rate limit reached. Please wait a moment or get a new API key at https://console.groq.com/keys"
        );
      }
      throw err;
    }
  }
};

export const initializeModel = () => null;
export const model = null;
