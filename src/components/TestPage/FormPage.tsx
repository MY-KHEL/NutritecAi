import Link from "next/link"
import { useState } from "react"
import { FamilyHistory } from "./FamilyHistory"
import { NutritionPage } from "./NutritionPage"
import { PersonalHistory } from "./PersonaHistoryPage"
import { ResultPage } from "./ResultPage"
import { NutritionTipPage } from "./NutritionTips"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const FormPage =()=>{
    const [currentStep , setCurrentStep] = useState(0)
    const [familyData,setFamilyData] = useState({})
    const [personalData,setPersonalData] = useState({})
    const [nutritionData,setNutritionData] = useState({})
    const handleNext = ()=>{ 
        setCurrentStep((prev)=>prev+1)
        
    }
    const handlePrev = ()=>{
        setCurrentStep((prev)=>prev-1)
    }

    const steps = [
        {id:'step1', title:'Test Strip Status'},
        {id:'step2', title:'Personal History'},
        {id:'step3', title:'Family History'},
        {id:'step4', title:'Nutritional Data'},
        {id:'step5', title:'Result'},
        {id:'step6', title:'Summary'},
    ]
    const setStep =(index:number)=>{
            setCurrentStep(index)
    }
    return(
        <>
        <div className="">
            <nav className="w-full">
                <div className="flex items-center gap-4 justify-between ">
               {steps.map((step, index) =>
        currentStep >= index ? (

                <div className="w-full cursor-pointer" key={step.id} onClick={()=>setStep(index)}>
      <div className="bg-project-green p-0.5   h-[3px] mx-auto w-[1/2] rounded-full"></div>
      <div className="hidden md:flex text-[10px] text-project-green font-semibold w-fit mx-auto text-center mt-1">
        {step.title} 
      </div>
    </div>
  ) :  (
                <div className="w-full  cursor-not-allowed" key={step.id}  >
      <div className="bg-gray-300 p-0.5  h-[3px] mx-auto w-[1/2] rounded-full"></div>
      <div className="hidden md:flex text-[10px] text-gray-300 font-semibold w-fit mx-auto text-center mt-1">
        {step.title}
      </div>
    </div>
  )
)}
                </div>
            </nav>

            

            {currentStep === 0 && 
            <div className=" mt-10 md:mt-20 text-center">
                <div className="">
                    <p className="text-center">What does your Mammaglobin Test looks like</p>

                    <div className=" mt-4 flex items-center justify-around">
                        <label><Image src={"/test2.png"} alt="text-image" width={100} height={100} className=""/><input type="radio" value="Yes" name="test"/>  </label>
          <label className="ml-4">
            <Image src={"/test.png"} alt="text-image" width={100} height={100} className=""/> <input type="radio" value="No" name="test" /> </label>

                    </div>

                    <button className="bg-project-green w-[200px] mx-auto cursor-pointer p-2 mt-10 rounded-md text-white" onClick ={()=>setCurrentStep(1)}>Proceed to Questionaire</button>
                    
                    <div className="w-fit mx-auto">
                    <Dialog>
  <DialogTrigger className="underline block mt-4 text-center underline-offset-4"> i have no test strip</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-red-600 uppercase text-2xl text-center font-semibold">Get a test strip</DialogTitle>
      <DialogDescription className="mt-6 text-md">
        Proceed to the nearest pharmacy to get a <b>Nutritec Ai Self kit</b>
        <Link href="/">
<button className="bg-project-green w-full mx-auto cursor-pointer p-3 mt-10 rounded-md text-white">Connect to an oncology center</button>
        </Link>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
                </div>
            </div>
            }
            {currentStep === 1 && 
            <PersonalHistory handleNext={handleNext} handlePrev={handlePrev} setPersonalData={setPersonalData} />
            }
            {currentStep === 2 && 
           <FamilyHistory handleNext={handleNext} handlePrev={handlePrev} setFamilyData={setFamilyData}/>
            }
            {
            currentStep ===3 && 
            <NutritionPage setNutritionData={setNutritionData} handleNext={handleNext} handlePrev={handlePrev}/>
            }
            {currentStep === 4 && 
            <div className="">
                <ResultPage nutritionData={nutritionData} familyData={familyData} personalData={personalData} handleNext={handleNext}/>
               
                </div>
            }
            
            {currentStep === 5 && 
            <div className="">
               <NutritionTipPage nutritionData={nutritionData} familyData={familyData} personalData={personalData}/>
               
                </div>
            }
            
           
        </div>
        </>
    )
}