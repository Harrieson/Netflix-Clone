import NavarItem from "./NavbarItem"
import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs'
import MobileMenu from "./MobileMenu"
import { useCallback, useState } from "react"

const Navbar= () => {
    const [showMobileMenu, setSHowMobileMenu] = useState(false)

    const toogleMobileMenu = useCallback(() => {
        setSHowMobileMenu((current) => !current)
    },[])
    return (
        <nav className="w-full fixed z-40">
            <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-500 bg-opacity-90">
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
                <div className="flex-grow ml-8 gap-7 hidden lg:flex">
                    <NavarItem label="Home" />
                    <NavarItem label="Series" />
                    <NavarItem label="Films" />
                    <NavarItem label="New and Popular" />
                    <NavarItem label="My List" />
                    <NavarItem label="Browse by languages" />
                </div>
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-flow-items-center gap-2 ml-8 cursor-pointer">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className="text-white w-4 transition" />
                    <MobileMenu  visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="avatar" />
                        </div>
                        <BsChevronDown className="text-white w-4 transition" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar