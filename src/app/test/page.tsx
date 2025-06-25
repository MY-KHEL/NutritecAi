import { NavBar } from "@/components/Homepage/Navbar";
import { MainPage } from "@/components/TestPage/MainPage";

const TestPage = () => {
    return ( 
            <>
            <div className="p-4 md:px-[120px]">
                    <NavBar/>
                    <MainPage/>
            </div>
            </>

     );
}
 
export default TestPage;