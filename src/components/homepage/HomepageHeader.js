import React, {useState} from "react"
import logo from "../../public/logo.png"
import SearchBar from "./searchbar/SearchBar";

function HomepageHeader() {
    const [show, setShow] = useState(false);
    return (
        <div>
            <div className="relative w-full bg-homepage-background bg-cover bg-no-repeat">
                <nav className="w-full absolute top-2 left-20">
                    <div className="py-2 mx-auto flex items-center justify-between max-w-3/4 md:max-w-5/6 w-full">
                        <img className="h-30 w-auto sm:h-20" src={logo} alt="Logo"/>
                        <div>
                            <div className="sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none" onClick={()=>setShow(!show)}>
                                {show ? (
                                    <svg aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={4} y1={16} x2={20} y2={16} />
                                </svg>
                                ) : (
                                    <svg aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                )}
                                {show &&   <div id="menu" className="block lg:hidden ">
                                    <div onClick={()=>setShow(!show)}className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none z-30 top-0 pt-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <line x1={18} y1={6} x2={6} y2={18} />
                                            <line x1={6} y1={6} x2={18} y2={18} />
                                        </svg>
                                    </div>

                                </div>}
                            </div>
                            {/* Full menu */}

                        </div>
                    </div>
                </nav>
                <SearchBar />
            </div>
        </div>

    );
}

export default HomepageHeader