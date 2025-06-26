import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"

export const NavBar=()=>{
    return(
        <>
        <div className="bg-project-green text-white rounded-2xl p-3 flex justify-between items-center">
            <div className="text-xl font-semibold">
                <Link href="/">
                <Image src="/nutriteclogo.png" alt="logo" width={150} height={150}/>
                </Link>
            </div>
            
        </div>
        </>
    )
}
