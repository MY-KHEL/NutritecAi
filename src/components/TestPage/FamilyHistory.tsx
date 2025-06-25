import { familyHistorySchema } from "@/app/schema/familyHIstorySchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState,useEffect } from "react"
import { useForm } from "react-hook-form"

export const FamilyHistory =({handleNext,handlePrev,setFamilyData}:
  {handleNext:()=> void;
  handlePrev:()=> void;
  setFamilyData :(data:any) =>void
})=>{
    const [fHSteps , setFHSteps] = useState(0)
   
    const currentSchema = familyHistorySchema[fHSteps] as any

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
         hasBrcaTest:"",
         hasReplacementTest:"",
         replacementDuration:"",
         hasBreastBiopsyTest:"",
         breastBiopsyDuration:"",
         hasHyperplasia:"",
         hasCloseCancerTest:"",
         closeCancerCount:"",
         closeCancerDetails:"",
         hasDistantCancerTest:"",
         distantCancerCount:"",
         distantCancerDetails: "",
         hasCancerRelatedSyndrome:"",
         cancerRelatedCount:"",
         cancerRelatedDetails:"",
        },
      });
      

      // Logic for buttons
      // Next Button
      
      const nextStep = async () => {
        const valid = await trigger();
        
       
        if (valid) {
          if (fHSteps < familyHistorySchema.length - 1) {
            setFHSteps(fHSteps + 1);
          } else {
            const data = getValues();
            console.log("All Family History:", data);
            
            setFamilyData(data)
            
            handleNext();
          } 
          
        }
      };
      // Previous button
      const prevStep = () => {
        if (fHSteps === 0) {
          handlePrev(); // go to previous page
        } else {
          setFHSteps((prev) => prev - 1); // go back a step
        }
      };



    const question =[
        {
      label: "Have you done BRCA test",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasBrcaTest")}/> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasBrcaTest")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasBrcaTest?.message || "")}</p>
          
         
        </>
      ),
    },
        {
      label: "Have you done Replacement test",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasReplacementTest")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasReplacementTest")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasReplacementTest?.message || "")}</p>
           {(watch("hasReplacementTest") === "Yes") && 
           <div>
        <label htmlFor="" className="mt-8"> For How long? (in years)</label>
                  <input {...register("replacementDuration")} className="block w-2/3 mx-auto mt-2 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.replacementDuration?.message || "")}</p>
      </div> 
           } 
        </>
      ),
    },
        {
      label: "Have you done Breast Biopsy test",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasBreastBiopsyTest")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasBreastBiopsyTest")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasBreastBiopsyTest?.message || "")}</p>
          {(fHSteps===2 && watch("hasBreastBiopsyTest") === "Yes") && 
           <div className="mt-4">
        <label htmlFor=""> How many biopsies have you had?</label>
                  <input {...register("breastBiopsyDuration")} className="block w-2/3 mx-auto mt-2 mb-4 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.breastBiopsyDuration?.message || "")}</p>
        <label htmlFor="" className="mt-8"> Were any atypical hyperplasia findings present ?</label>
                  <input {...register("hasHyperplasia")} className="block w-2/3 mx-auto mt-2 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.hasHyperplasia?.message || "")}</p>
      </div> 
           } 
        </>
      ),
    },
        {
      label: "Do you have a close relative with cancer",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasCloseCancerTest")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasCloseCancerTest")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasCloseCancerTest?.message || "")}</p>
          
             {(fHSteps===3 && watch("hasCloseCancerTest") === "Yes") && 
           <div className="mt-4">
        <label htmlFor=""> How many of them</label>
                  <input {...register("closeCancerCount")} className="block w-2/3 mx-auto mt-2  mb-4 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.closeCancerCount?.message || "")}</p>
        <label htmlFor="" className=""> Fill in the details for each of them</label>
                  <input {...register("closeCancerDetails")} className="block w-2/3 mx-auto mt-2 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="e.g Sister, Mother e.t.c" />
          <p className="text-red-500 text-sm text-center">{String(errors.closeCancerDetails?.message || "")}</p>
      </div> 
           } 
        </>
      ),
    },
        {
      label: "Do you have a distant relative with cancer",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasDistantCancerTest")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasDistantCancerTest")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasDistantCancerTest?.message || "")}</p>
          
                {(fHSteps===4 && watch("hasDistantCancerTest") === "Yes") && 
           <div className="mt-4">
        <label htmlFor=""> How many of them</label>
                  <input {...register("distantCancerCount")} className="block w-2/3 mx-auto mt-2 mb-4 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.distantCancerCount?.message || "")}</p>
        <label htmlFor="" className="mt-8"> Fill in the details for each of them</label>
                  <input {...register("distantCancerDetails")} className="block w-2/3 mx-auto mt-2  ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="e.g Grandmother" />
          <p className="text-red-500 text-sm text-center">{String(errors.distantCancerDetails?.message || "")}</p>
      </div> 
           } 
        </>
      ),
    },
        {
      label: "Do you have a genetic syndrome related with cancer",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasCancerRelatedSyndrome")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasCancerRelatedSyndrome")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasCancerRelatedSyndrome?.message || "")}</p>
             {(fHSteps===5 && watch("hasCancerRelatedSyndrome") === "Yes") && 
           <div className="mt-4">
        <label htmlFor=""> How many of them</label>
                  <input {...register("cancerRelatedCount")} className="block w-2/3 mx-auto mt-2 mb-4 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.cancerRelatedCount?.message || "")}</p>
        <label htmlFor="" className="mt-8"> Fill in the details for each of them</label>
                  <input {...register("cancerRelatedDetails")} className="block w-2/3 mx-auto mt-2 ring-1 py-2 px-4 rounded-2xl  ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.cancerRelatedDetails?.message || "")}</p>
      </div> 
           } 
        </>
      ),
    },
    ]

const renderStep = () => {
    const step = question[fHSteps];
    
 
    return (
      <div className="text-center">
        <p>{step.label}</p>
        <div className="mt-4">{step.input}</div>
      
      </div>
    );
  };
    return(
        <>
        <div className="mt-20">
         {renderStep()}
       

           <div className="flex justify-between items-center w-2/3 mx-auto mt-8">
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
            {fHSteps === question.length - 1 ? "Next Set" : "Next"}
          </button>
        </div>
        </div>

        </>
    )
}