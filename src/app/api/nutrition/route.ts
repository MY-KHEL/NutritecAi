import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const { personalData, familyData, nutritionData } = await req.json();

    const prompt = `
You are a certified medical nutritionist AI. Based on the patient data, generate:

1. A personalized healthy food plan (breakfast, lunch, dinner, snacks).
2. Lifestyle improvement tips.
3. A short daily routine.

Return it in this exact format (strictly, no asterisks, each number should be on its own line):
Do not use asterisks. Use numeric bullets only (e.g., 1., 2., 3.), each on its own line. Do not group multiple tips or steps together. Each should appear clearly and separately
Give a Nigerian Based Meal
Meal Plan:
1. ...
2. ...
3. ...

Lifestyle Tips:
1. ...
2. ...
3. ...

Daily Routine:
1. ...
2. ...
3. ...

Patient Data:
${JSON.stringify(personalData, null, 2)}

Family History:
${JSON.stringify(familyData, null, 2)}

Nutrition and LifeStyle:
${JSON.stringify(nutritionData, null, 2)}
Strictly put each number on a new line
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const rawText = await res.text();
    const result = JSON.parse(rawText);

    const fullText =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response from Gemini";

    // Split sections from Gemini response
    const [mealSection = "", tipsSection = "", routineSection = ""] = fullText
      .split(/Lifestyle Tips:|Daily Routine:/)
      .map((s:any) => s.trim());

    // Generate PDF for Meal Plan
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    let y = 800;

    const mealLines = mealSection
      .replace("Meal Plan:", "")
      .split("\n")
      .map((line:any) => line.trim());

    for (const line of mealLines) {
      if (y < 40) {
        y = 800;
        pdfDoc.addPage();
      }
      page.drawText(line, { x: 40, y, size: fontSize, font, color: rgb(0, 0, 0) });
      y -= 18;
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    return NextResponse.json({
      lifestyleTips: tipsSection.replace("Lifestyle Tips:", "").trim(),
      dailyRoutine: routineSection.replace("Daily Routine:", "").trim(),
      pdfBase64,
    });
  } catch (err: any) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate nutrition plan", message: err.message },
      { status: 500 }
    );
  }
}
