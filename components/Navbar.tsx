import NavarItem from "./NavbarItem"
import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs'
import MobileMenu from "./MobileMenu"
import { useCallback, useEffect, useState } from "react"
import AccountMenu from "./AccountMenu"

const TOP_OFFSET = 66;

const Navbar= () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET){
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    const toogleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    },[])
    const toogleshowAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    },[])
    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground? 'bg-zinc-500 bg-opacity-90': '' } `}>
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
                    <BsChevronDown className={`text-white w-4 transition ${showMobileMenu? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu  visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toogleshowAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="avatar" />
                        </div>
                        <BsChevronDown className={`text-white w-4 transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar