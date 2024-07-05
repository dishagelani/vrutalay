import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Disclosure,
    
} from '@headlessui/react'
import { AuthContext } from '../context/authContext'


export default function Navbar() {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = async () => {
        await logOut().then(() => navigate("/auth"))
    }
    return (
        <Disclosure as="nav" className='shadow'>
            {({ open }) => (
                <>
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
                            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full  p-1 text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={handleLogOut}
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>


                   
                </>
            )}
        </Disclosure>
    )
}
