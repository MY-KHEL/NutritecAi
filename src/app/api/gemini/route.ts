import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { personalData, familyData ,nutritionData} = await req.json();

    const prompt = `
You are a highly accurate medical AI model trained in statistical cancer risk assessments. Based on the following structured patient data, give the following

1. A single-line risk percentage estimate
2. A concise one paragraph reasoning (max 3 sentences)

Be brief and assume missing information based on population averages. Do not explain what is missing - just give your best estimate and reasoning in plain language.
Give your best evidence-based estimate and use similar logic as the Gail or Tyrer-Cuzick model, even if simplified.

Output Format:
---
Breast Cancer Risk Estimate: [XX]%  
Reasoning: [Short and clear explanation]
---

Patient Personal Data:
${JSON.stringify(personalData, null, 2)}

Family Medical History:
${JSON.stringify(familyData, null, 2)}

Lifestyle and Nutrition Data:
${JSON.stringify(nutritionData, null, 2)}


You are required to provide a numeric risk estimation, even if based on partial data. Do not say you cannot provide a precise number
`;

    console.log("📤 Sending Prompt:", prompt);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const rawText = await res.text();
    console.log("🧾 Raw Gemini Response:", rawText);
    console.log("📦 Response Status:", res.status);

    let result;
    try {
      result = JSON.parse(rawText);
      if (!rawText) {
  console.warn("⚠️ Empty response from Gemini — possibly quota exhaustion or bad endpoint.");
}
    } catch (err) {
      console.error("JSON Parse Error:", err);
      return NextResponse.json(
        {
          error: "Invalid response from Gemini",
          raw: rawText
          
        },
        { status: 500 }
        
      );
    }

    if (!res.ok || result.error) {
      console.error(" Gemini API Error:", result.error || result);
      return NextResponse.json(
        {
          error: result.error?.message || "Gemini API returned an error",
          status: result.error?.code || res.status,
          details: result
        },
        { status: res.status }
      );
    }

    const message =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ??
      result?.candidates?.[0]?.content?.text ??
      "No AI response.";

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("❌ Server error in Gemini route:", error.message || error);
    return NextResponse.json(
      {
        error: "Server exception",
        message: error.message || String(error)
      },
      { status: 500 }
    );
  }
}
