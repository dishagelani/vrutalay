import React from 'react'
import Navbar from "../../components/navbar"
import { useNavigate } from 'react-router-dom'
const ToDoList = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <Navbar />

            {/* Back button with amount */}

            <div className="max-w-full font-semibold text-blueGray-700 my-4 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate('/')}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>

            {/* List of uncompleted Tasks */}

            <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                Here’s what we need to complete!
            </p>


            <div className="mx-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-sm text-left border-grey-500">
                    <tbody>
                        <tr key={1} className="even:bg-white  odd:bg-gray-50">
                            <td className="p-3 w-full">
                                hey
                            </td>

                            <td className='flex py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer mx-1 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer mx-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>


                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* List of completed Tasks */}

            <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                Tasks we've nailed so far!
            </p>


            <div className="mx-4 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-sm text-left border-grey-500">
                    <tbody>
                        <tr key={1} className="even:bg-white  odd:bg-gray-50">
                            <td className="p-3 w-full">
                                hey
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Add a new Tasks */}

            <div className="fixed bottom-0 right-0 w-full">
                <form onSubmit={handleSubmit} >
                    <div className='flex justify-between p-4'>
                        <input
                            type="text"
                            required
                            placeholder='Let’s include another to-do!'
                            // value={data?.description}
                            className="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // onChange={(e) => setData({ ...data, description: e.target.value })}
                        />

                        <div className="text-white cursor-pointer shadow-xl p-3 ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50  " >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" type='submit'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ToDoList