"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ResultPage = ({
  familyData,
  personalData,nutritionData,handleNext
}: {
  familyData: any;
  personalData: any;
  nutritionData:any;
  handleNext:()=>void
}) => {
  const [aiResponse, setAIResponse] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personalData, familyData,nutritionData })
        });

        const data = await res.json();
        console.log(process.env.GEMINI_API_KEY);
        if (!res.ok) {
          throw new Error(data?.error || "Something went wrong");
        }

        setAIResponse(data.message || "No valid response.");
      } catch (err: any) {
        setError(err.message || "Failed to fetch AI response");
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [personalData, familyData]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Medical Summary</h1>

      {loading ? (
        <p className="text-gray-600">Fetching AI-generated insight...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">Error: {error}</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-sm">
          {aiResponse}
        </pre>
      )}

      <div className="">
        
<button onClick={()=>handleNext()} className="bg-project-green w-full p-2 mt-4  mx-3 rounded-md text-white">Get a Food Supplement Schedule</button>

</div>
    </div>
  );
};
