import Image from "next/image"
import Link from "next/link"

export const HeroSection = () => {
    return (
        <>
            <div className="mt-6 md:mt-14">
                <div className="text-center">
                    <p className="text-project-pink border-project-pink border w-fit mx-auto rounded-full p-1">Backed by Science</p>
                    <h1 className="text-center text-3xl mt-4 text-project-green font-semibold">Prevention is FREE, Cure is not</h1>
                    <p className="text-center mx-auto w-full md:w-[500px] mt-2"> Assess your risk of breast cancer and get personalized nutrition tips to prevent it in less than 10 minutes.</p>
                    <Link href={"/test"}> 
                    <button className="bg-project-green w-[200px] mx-auto p-2 mt-4 rounded-md cursor-pointer text-white">Start Here</button></Link>
                </div>

                <div className=" mt-12">

                        <div className="w-[80%] mx-auto relative">
                            <div className=" w-full relative h-[200px] md:h-[400px] rounded-2xl ">
                           <Image src="/homepage.png" alt="hero-image" width={1440} height={400} className="w-full h-full object-cover rounded-2xl "/>
                            </div>
                            <div className="absolute w-[200px]  top-20 md:top-1/2 scale-50 md:scale-100 -left-20 md:-left-25 bg-project-pink rounded-lg p-2 ">
                                    <div className="flex items-center">
                                        <h1 className="text-3xl font-semibold">70%</h1>
                                        <p className="text-[10px]">Of women in African countries are diagnosed at a late stage.</p>
                                    </div>
                            </div>
                        </div>

                </div>
            </div>
        </>
    )
}