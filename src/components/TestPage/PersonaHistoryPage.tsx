import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { personalHistorySchema } from "@/app/schema/personalHistorySchema"

export const PersonalHistory = ({ handleNext, handlePrev,setPersonalData }: {
   handleNext:()=>void;
   handlePrev: ()=>void;
   setPersonalData:(data:any)=>void

  }) => {
  const [pHSteps, setPHSteps] = useState(0)
  const currentSchema = personalHistorySchema[pHSteps] as any


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
      age: 0,
      height: "",
      weight: "",
      isMenstruating: "",
      hasChildren: "",
    },
  });
  // Logic for buttons
  // Next Button
  
  const nextStep = async () => {
    const valid = await trigger();
   
    if (valid) {
      if (pHSteps < personalHistorySchema.length - 1) {
        setPHSteps(pHSteps + 1);
      } else {
        const data = getValues();
        console.log("All Personal History:", data);
        setPersonalData(data)
        handleNext();
      }
    }
  };
  // Previous button
  const prevStep = () => {
    if (pHSteps === 0) {
      handlePrev(); // go to previous page
    } else {
      setPHSteps((prev) => prev - 1); // go back a step
    }
  };

  const question = [
    {
      label: "What is your Age?",
      input: (
        <>
          <input {...register("age")} className="w-2/3 mx-auto mt-2 ring-1 p-2 ring-black focus:ring-project-green focus:ring-2 outline-none" placeholder="Type here" />
          <p className="text-red-500 text-sm text-center">{String(errors.age?.message || "")}</p>
        </>
      ),
    },
    {
      label: "What is your Height?",
      input: (
        <>
          <input {...register("height")} className="w-2/3 mx-auto mt-2 ring-1 p-2 ring-black  focus:ring-project-green focus:ring-2 outline-none" placeholder=" in this format : 5ft 6in" />
          <p className="text-red-500 text-sm text-center">{String(errors.height?.message || "")}</p>
        </>
      ),
    },
    {
      label: "What is your Weight?",
      input: (
        <>
          <input {...register("weight")} className="w-2/3 mx-auto mt-2 ring-1 p-2 ring-black  focus:ring-project-green focus:ring-2 outline-none" placeholder="in kg e.g 60kg" />
          <p className="text-red-500 text-sm text-center">{String(errors.weight?.message || "")}</p>
        </>
      ),
    },
    {
      label: "Are you menstruating?",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("isMenstruating")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("isMenstruating")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.isMenstruating?.message || "")}</p>
          
        </>
      ),
    
    },
    {
      label: "Have you had children?",
      input: (
        <>
          <label><input type="radio" value="Yes" {...register("hasChildren")} /> Yes</label>
          <label className="ml-4"><input type="radio" value="No" {...register("hasChildren")} /> No</label>
          <p className="text-red-500 text-sm text-center">{String(errors.hasChildren?.message || "")}</p>
        </>
      ),
    },
  ]
  const renderStep = () => {
    const step = question[pHSteps];
 
    return (
      <div className="text-center">
        <p>{step.label}</p>
        <div className="mt-4">{step.input}</div>
      
      </div>
    );
  };
  return (
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
            {pHSteps === question.length - 1 ? "Next Set" : "Next"}
          </button>
        </div>
      </div>
    </>
  )
}
