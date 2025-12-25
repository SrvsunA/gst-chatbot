import axios from "axios";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

const systemPrompt = `You are an expert GST (Goods and Services Tax) compliance assistant for India, with special expertise in Odisha state regulations.

Your responsibilities:
1. Answer questions about GST rates, filing procedures, and compliance requirements
2. Provide Odisha-specific rules and local requirements
3. Explain in simple, clear language (avoid jargon when possible)
4. Always mention relevant GST slabs (5%, 12%, 18%, 28%)
5. Keep responses to 3-4 sentences maximum
6. If unsure about specific rules, recommend consulting a Chartered Accountant (CA)
7. Cite current 2025 rules only

Key GST Information:
- 5% slab: Basic goods, jaggery, agricultural products
- 12% slab: Coffee, tea, spices, some food items
- 18% slab: Most services, packaged food, electronics
- 28% slab: Luxury goods, automobiles, cigarettes
- Restaurant food: 5% for unbranded, 5% + 5% SGST/CGST for branded
- Odisha specific: SGST rate varies, always check current rates
- GSTR-3B due: 20th of following month
- Annual return (GSTR-9): By December 31st

Tone: Professional, helpful, empathetic to small business owners.`;

export async function POST(req: Request) {
  try {
    // Parse incoming request
    const { question } = await req.json();

    // Validate input
    if (!question || question.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Question is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Call Perplexity API
    const response = await axios.post(
      PERPLEXITY_API_URL,
      {
        model: "sonar",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: question,
          },
        ],
        max_tokens: 512,
        temperature: 0.1,
      },
      {
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0]?.message?.content || "No response received";

    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({
        error: error.response?.data?.error?.message || error.message || "Failed to process question",
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
