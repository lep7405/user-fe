import React, { useState } from "react"
import logo from "../../public/logo.png"
import SearchBar from "./searchbar/SearchBar";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction, selectIsLogin, selectUserData } from "../../redux/authSlice";
import Menu from "../../helpers/Menu";
function HomepageHeader() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false)
    const isLogin = useSelector(selectIsLogin)
    console.log(isLogin)
    const userData = useSelector(selectUserData)
    console.log(userData)
    console.log(open)
    console.log(localStorage.getItem('AccessToken'))
    return (
        <div>
            <div className="relative w-full bg-homepage-background bg-cover bg-no-repeat">
                <nav className="w-full absolute top-2 left-20">
                    <div className="py-2 mx-auto flex items-center justify-between max-w-3/4 md:max-w-5/6 w-ful relative">
                        <img className="h-30 w-auto sm:h-20" src={logo} alt="Logo" />
                        <div className="flex ml-32">
                            {
                                isLogin ? (
                                    <div className="flex flex-col items-center">
                                        <img class="w-14 h-14 rounded-full cursor-pointer ml-48" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" onClick={() => setOpen(!open)}></img>
                                        <p className="ml-48">{userData.name}</p>
                                    </div>)
                                    :
                                    (<div>
                                        <Link to='/login'>
                                            <button className="bg-red-600 px-4 py-2 mr-2 rounded-lg ml-48">Login</button>
                                        </Link>
                                        <Link to='/register'>
                                            <button className="bg-red-600 px-4 py-2 mr-2 rounded-lg ml-5">Register</button>
                                        </Link>
                                    </div>)
                            }
                        </div>
                        {
                            open && <Menu id={userData.userId} setOpenProps={[open, setOpen]} />
                        }
                        <div>
                            <div className="sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none" onClick={() => setShow(!show)}>
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
                                {show && <div id="menu" className="block lg:hidden ">
                                    <div onClick={() => setShow(!show)} className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none z-30 top-0 pt-6">
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