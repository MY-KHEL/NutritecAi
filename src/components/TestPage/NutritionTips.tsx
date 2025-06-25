"use client";
import { useEffect, useState } from "react";

export const NutritionTipPage = ({
  familyData,
  personalData,
  nutritionData,
}: {
  familyData: any;
  personalData: any;
  nutritionData: any;
}) => {
  const [aiResponse, setAIResponse] = useState({
    lifestyleTips: "",
    dailyRoutine: "",
    pdfBase64: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const res = await fetch("/api/nutrition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personalData, familyData, nutritionData }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Something went wrong");
        }

        setAIResponse(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch AI response");
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [personalData, familyData, nutritionData]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${aiResponse.pdfBase64}`;
    link.download = "Nutritec-AI-MealPlan.pdf";
    link.click();
  };

  return (
    <div className="p-6 max-w-2xl mt-10 mx-auto h-[80vh] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Nutritec AI Nutrition Summary</h1>

      {loading ? (
        <p className="text-gray-600">Fetching AI-generated insight...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">Error: {error}</p>
      ) : (
        <>
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Lifestyle Tips</h2>
            <pre className="bg-gray-100 p-3 rounded">{aiResponse.lifestyleTips}</pre>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">Daily Routine</h2>
            <pre className="bg-gray-100 p-3 rounded">{aiResponse.dailyRoutine}</pre>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold">Meal Plan (PDF Preview)</h2>
            <iframe
              src={`data:application/pdf;base64,${aiResponse.pdfBase64}`}
              width="100%"
              height="500px"
              title="Meal Plan PDF Preview"
              className="border rounded"
            />
            <button
              onClick={handleDownload}
              className="mt-4 px-4 py-2 bg-project-green text-white rounded "
            >
              Download Meal Plan PDF
            </button>
          </section>
        </>
      )}
    </div>
  );
};
