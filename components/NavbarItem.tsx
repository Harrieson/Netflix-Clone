import React from "react"
interface NavbarItemProps {
    label: string
}

const NavarItem: React.FC<NavbarItemProps> = ({label}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    )
}

export default NavarItem