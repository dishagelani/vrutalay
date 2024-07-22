import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Disclosure,
     Menu, MenuButton, MenuItem, MenuItems
} from '@headlessui/react'
import { AuthContext } from '../context/authContext'


export default function Navbar() {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = async () => {
        await logOut().then(() => navigate("/auth"))
    }
    const menuItems = [
        {title : 'Annual Report', action : () => navigate('/annual-report')},
        {title : 'Things to do', action : () => navigate('/to-do-list')},
        {title : 'Things to buy', action : () => navigate('/things-to-buy')},
        {title : 'Sign Out', action : handleLogOut}, 
    ]
    return (
        <Disclosure as="nav" className='shadow'>
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between ">
                            <div className='flex flex-row items-center'>
                                {user?.photoURL &&
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user?.photoURL}
                                        alt='Profile photo'
                                    />
                                }
                                <h3 className="px-2 font-semibold text-base text-blueGray-700">{user?.displayName}</h3>
                            </div>
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full text-sm text-black-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {menuItems.map(menu => 
                                    <MenuItem key={menu.title}>
                                        <a onClick={menu.action} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            {menu.title}
                                        </a>
                                    </MenuItem>
                                    )}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>        
        </Disclosure>
    )
}
