import { LifeStyleSchema } from "@/app/schema/lifeStyleSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
export const NutritionPage = ({ handleNext, handlePrev ,setNutritionData}:
    {
        handleNext: () => void;
        handlePrev: () => void;
        setNutritionData: (data:any)=>void
    }) => {

    const currentSchema = LifeStyleSchema
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        getValues,
        watch,
    } = useForm<any>({
        resolver: yupResolver(currentSchema),
        mode: "onTouched",
        defaultValues: {
            hasFoodAllergies: "",
            foodAllergyDetails: "",//done
            isUnderTreatmentOrRemission: "",//
            doesConsumeDairy: "",
            dairyConsumptionDetails: "",
            doesConsumeAlcohol: "",
            alcoholConsumptionDetails: "",//
            physicalActivitiesLevels: "",
            doesTakeSupplement: "",
            supplementConsumptionDetails: "",
            dailyServingsOfFruitAndVeg: "",
            weeklyIntakeOfProcessedMeat: "",
            consumptionOfWholeGrainAndLegumes: "",
            chronicConditions: "",
            doesFollowSpecificDiet: "",
            specificDietDetails:"",
            nutritionGoals: "",
            averageMonthlyFoodBudget: "",
            amountYouCanInvestInSupplement: "",
        },
    });

const nextStep = async () => {
        const valid = await trigger();
       
        if (valid) {
        
            const data = getValues();
            console.log("All Family History:", data);
            setNutritionData(data)
            handleNext();
        }
      };

       const prevStep = () => {
          handlePrev(); // go to previous page
      };







    const questions = [
        // sample for multistep form
        {
            label: "Do you have any allergies or intolerances?",
            question: <>

                <label><input type="radio" value="Yes" {...register("hasFoodAllergies")} /> Yes</label>
                <label className="ml-4"><input type="radio" value="No" {...register("hasFoodAllergies")} /> No</label>
                <p className="text-red-500 text-sm text-center">{String(errors.hasFoodAllergies?.message || "")}</p>
                {(watch("hasFoodAllergies") === "Yes") &&
                    <div>
                        <label htmlFor="" className="block mt-8"> Specify</label>
                        <textarea {...register("foodAllergyDetails")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                        <p className="text-red-500 text-sm text-center"> {String(errors.foodAllergyDetails?.message || "")}</p>
                    </div>
                }
            </>
        },
        // sample for single form
        {
            label: "Are you currently undergoing treatment or in remission? ",
            question: (
                <>
                    <label><input type="radio" value="Yes" {...register("isUnderTreatmentOrRemission")} /> Yes</label>
                    <label className="ml-4"><input type="radio" value="No" {...register("isUnderTreatmentOrRemission")} /> No</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.isUnderTreatmentOrRemission?.message || "")}</p>


                </>
            ),
        },

        {
            label: "Do you consume dairy?",
            question: <>

                <label><input type="radio" value="Yes" {...register("doesConsumeDairy")} /> Yes</label>
                <label className="ml-4"><input type="radio" value="No" {...register("doesConsumeDairy")} /> No</label>
                <p className="text-red-500 text-sm text-center">{String(errors.doesConsumeDairy?.message || "")}</p>
                {(watch("doesConsumeDairy") === "Yes") &&
                    <div>
                        <label htmlFor="" className="block mt-8"> What Type and How Often</label>
                        <textarea {...register("dairyConsumptionDetails")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                        <p className="text-red-500 text-sm text-center"> {String(errors.dairyConsumptionDetails?.message || "")}</p>
                    </div>
                }
            </>
        },

        {
            label: "Do you consume alcohol?",
            question: <>

                <label><input type="radio" value="Yes" {...register("doesConsumeAlcohol")} /> Yes</label>
                <label className="ml-4"><input type="radio" value="No" {...register("doesConsumeAlcohol")} /> No</label>
                <p className="text-red-500 text-sm text-center">{String(errors.doesConsumeAlcohol?.message || "")}</p>
                {(watch("doesConsumeAlcohol") === "Yes") &&
                    <div>
                        <label htmlFor="" className="block mt-8">How often</label>
                        <textarea {...register("alcoholConsumptionDetails")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                        <p className="text-red-500 text-sm text-center"> {String(errors.alcoholConsumptionDetails?.message || "")}</p>
                    </div>
                }
            </>
        },
        {
            label: "What are your physical activities levels? ",
            question: (
                <>
                    <label><input type="radio" value="Very Low" {...register("physicalActivitiesLevels")} /> Very Low</label>
                    <label className="block"><input type="radio" value="Low" {...register("physicalActivitiesLevels")} /> Low</label>
                    <label><input type="radio" value="Moderate" {...register("physicalActivitiesLevels")} /> Moderate</label>
                    <label className="block"><input type="radio" value="High" {...register("physicalActivitiesLevels")} /> High</label>
                    <label className="block"><input type="radio" value="Very high" {...register("physicalActivitiesLevels")} /> Very high</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.physicalActivitiesLevels?.message || "")}</p>


                </>
            ),
        },

        {
            label: "Do you take any Supplement (e.g, Vitamin D , omega-3,anti-oxidants)?",
            question: <>

                <label><input type="radio" value="Yes" {...register("doesTakeSupplement")} /> Yes</label>
                <label className="ml-4"><input type="radio" value="No" {...register("doesTakeSupplement")} /> No</label>
                <p className="text-red-500 text-sm text-center">{String(errors.doesTakeSupplement?.message || "")}</p>
                {(watch("doesTakeSupplement") === "Yes") &&
                    <div>
                        <label htmlFor="" className="block mt-8"> Specify</label>
                        <textarea {...register("supplementConsumptionDetails")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                        <p className="text-red-500 text-sm text-center"> {String(errors.supplementConsumptionDetails?.message || "")}</p>
                    </div>
                }
            </>
        },
        {
            label: "how many Servings of fruits and Vegetables do you eat daily? ",
            question: (
                <>
                    <label><input type="radio" value="1" {...register("dailyServingsOfFruitAndVeg")} /> 1</label>
                    <label className="block"><input type="radio" value="2-4" {...register("dailyServingsOfFruitAndVeg")} /> 2-4</label>
                    <label className="block"><input type="radio" value="5 above" {...register("dailyServingsOfFruitAndVeg")} /> 5 above</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.dailyServingsOfFruitAndVeg?.message || "")}</p>


                </>
            ),
        },
        {
            label: "What is your typical weekly intake of red or processed meat? ",
            question: (
                <>
                    <label><input type="radio" value="1" {...register("weeklyIntakeOfProcessedMeat")} /> 1</label>
                    <label className="block"><input type="radio" value="2-4" {...register("weeklyIntakeOfProcessedMeat")} /> 2-4</label>
                    <label className="block"><input type="radio" value="5 above" {...register("weeklyIntakeOfProcessedMeat")} /> 5 above</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.weeklyIntakeOfProcessedMeat?.message || "")}</p>


                </>
            ),
        },

        {
            label: "How often do you consume whole grains and legumes ",
            question: (
                <>
                    <label><input type="radio" value="Daily" {...register("consumptionOfWholeGrainAndLegumes")} /> Daily</label>
                    <label className="block"><input type="radio" value="4-6 times per week" {...register("consumptionOfWholeGrainAndLegumes")} /> 4-6 times per week</label>
                    <label><input type="radio" value="1-3 ties per week" {...register("consumptionOfWholeGrainAndLegumes")} /> 1-3 times per week</label>
                    <label className="block"><input type="radio" value="Rarely" {...register("consumptionOfWholeGrainAndLegumes")} /> Rarely</label>
                    <label className="block"><input type="radio" value="Never" {...register("consumptionOfWholeGrainAndLegumes")} /> Never</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.consumptionOfWholeGrainAndLegumes?.message || "")}</p>


                </>
            ),
        },

        {
            label: "Any Chronic conditions (e.g diabetes,hypertension)",
            question:

                <>
                    <label htmlFor="" className="block mt-8">Specify </label>
                    <textarea {...register("chronicConditions")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                    <p className="text-red-500 text-sm text-center"> {String(errors.chronicConditions?.message || "")}</p>

                </>
        },
          {
            label: "Do you follow any specific diet (e.g vegetarian , vegan, keto )?",
            question: <>

                <label><input type="radio" value="Yes" {...register("doesFollowSpecificDiet")} /> Yes</label>
                <label className="ml-4"><input type="radio" value="No" {...register("doesFollowSpecificDiet")} /> No</label>
                <p className="text-red-500 text-sm text-center">{String(errors.doesFollowSpecificDiet?.message || "")}</p>
                {(watch("doesFollowSpecificDiet") === "Yes") &&
                    <div>
                        <label htmlFor="" className="block mt-8"> Specify</label>
                        <textarea {...register("specificDietDetails")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                        <p className="text-red-500 text-sm text-center"> {String(errors.specificDietDetails?.message || "")}</p>
                    </div>
                }
            </>
        },
        {
            label: "What are your main nutrition goals (e.g weight loss, energy , immune support)",
            question:

                <>
                    <label htmlFor="" className="block mt-8">Specify </label>
                    <textarea {...register("nutritionGoals")} className="w-full mx-auto mt-4 ring-1 py-2 px-4 rounded-2xl ring-black/50" placeholder="Type here" ></textarea>
                    <p className="text-red-500 text-sm text-center"> {String(errors.nutritionGoals?.message || "")}</p>

                </>
        },
         {
            label: "What is your average monthly budget? ",
            question: (
                <>
                    <label><input type="radio" value="Below 50,000 naira" {...register("averageMonthlyFoodBudget")} /> Below 50,000</label>
                    <label className="block"><input type="radio" value="50,000 - 100,000 naira" {...register("averageMonthlyFoodBudget")} /> 50,000 - 100,000</label>
                    <label className="block"><input type="radio" value="100,000 - 200,000 naira" {...register("averageMonthlyFoodBudget")} /> 100,000 - 200,000</label>
                    <label className="block"><input type="radio" value="200,000 naira above" {...register("averageMonthlyFoodBudget")} /> 200,000 above</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.averageMonthlyFoodBudget?.message || "")}</p>


                </>
            ),
        },
         {
            label: "How much can you invest in supplements monthly? ",
            question: (
                <>
                    <label><input type="radio" value="Below 50,000 naira" {...register("amountYouCanInvestInSupplement")} /> Below 50,000</label>
                    <label className="block"><input type="radio" value="50,000 - 100,000 naira" {...register("amountYouCanInvestInSupplement")} /> 50,000 - 100,000</label>
                    <label className="block"><input type="radio" value="100,000 - 200,000 naira" {...register("amountYouCanInvestInSupplement")} /> 100,000 - 200,000</label>
                    <label className="block"><input type="radio" value="200,000 naira above" {...register("amountYouCanInvestInSupplement")} /> 200,000 above</label>
                    <p className="text-red-500 text-sm text-center">{String(errors.amountYouCanInvestInSupplement?.message || "")}</p>


                </>
            ),
        },
    ]






    return (
        <>
            <div className="mx-auto w-full md:w-[400px] h-[50vh] overflow-y-scroll  p-2 mt-8">
                {questions.map((item, index) => (
                    <div className="" key={index}>
                        <p>{index + 1}.  {item.label}</p>
                        <div className="my-4">{item.question}</div>
                    </div>
                ))}

            </div>





            <div className="flex justify-between items-center w-3/4 mx-auto mt-8">
                <button
                    type="button"
                    className="px-6 py-2 cursor-pointer rounded-md bg-project-green text-white"
                    onClick={prevStep}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="px-6 py-2 cursor-pointer rounded-md bg-project-green text-white"
                    onClick={nextStep}
                >
                    Next
                </button>
            </div>
        </>
    )
}