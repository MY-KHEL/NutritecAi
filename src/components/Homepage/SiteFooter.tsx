import Image from "next/image"

export const SiteFooter =()=>{
    return(
        <>
        <div className=" mt-6">
            <div className="w-[250px] mx-auto">
        <p className=" font-semibold text-md text-center">By Team PHARMACODE</p>
        <div className="">
            <Image src="/afretec.png" alt="afretecimage" height={100} width={200} className=" mx-auto"/>
        </div>
<p className=" text-sm text-center">Please note: Nutritec AI is a predictive analysis tool and does not replace medical diagnosis. Please consult a healthcare professional for a definitive diagnosis and clinical advice.</p>
            </div>
        </div>
        </>
    )
}