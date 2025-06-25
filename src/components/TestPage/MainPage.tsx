"use client"
import Image from "next/image"
import { FormPage } from "./FormPage"

export const MainPage=()=>{
    return(
        <>
        <div className="mt-10">
            <div className="grid md:grid-cols-3 gap-8  lg:p-8">
                <div className="hidden md:flex items-center justify-center">
                    <div className="bg-gray-300 w-[300px]  h-[300px] mx-auto rounded-2xl">
                    <Image src={'/webpage.png'} alt="side-image" width={500} height={500} className="rounded-2xl w-full object-cover"/>
                    </div>
                </div>
                <div className=" col-span-2 ">
                <FormPage/>
                </div>
            </div>
        </div>
        </>
    )
}