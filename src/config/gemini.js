import Groq from "groq-sdk";

const getApiKey = () => localStorage.getItem("groq_api_key");

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama3-70b-8192",
];

export const generateWithFallback = async (prompt) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API key not found. Please set it.");

  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  for (let i = 0; i < MODELS.length; i++) {
    try {
      const completion = await groq.chat.completions.create({
        model: MODELS[i],
        messages: [{ role: "user", content: prompt }],
      });
      return completion.choices[0]?.message?.content ?? "";
    } catch (err) {
      const isRateLimit = err.status === 429 || err.message?.includes("429") || err.message?.includes("rate limit");
      const isLast = i === MODELS.length - 1;
      if (isRateLimit && !isLast) {
        console.warn(`Model ${MODELS[i]} rate limited, trying ${MODELS[i + 1]}...`);
        continue;
      }
      if (isRateLimit && isLast) {
        throw new Error(
          "All models are rate limited. Please wait a moment or get a new API key at https://console.groq.com/keys"
        );
      }
      throw err;
    }
  }
};
