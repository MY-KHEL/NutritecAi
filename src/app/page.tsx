import { HeroSection } from "@/components/Homepage/HeroSection";
import { NavBar } from "@/components/Homepage/Navbar";


export default function Home() {
  return (
   <>
   <div className=" p-4 md:px-[120px]">
      <NavBar/>
      <HeroSection/>
   </div>
   </>
  );
}
