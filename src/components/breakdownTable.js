import React from 'react'

const Table = () => {
    return (
        <div className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

                <tbody>
                    <tr className="even:bg-white  odd:bg-gray-50 border-b  divide-x divide-gray-200">
                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap text-center">
                            <p>Apple MacBook Pro 17"</p>
                            <p>500</p>
                        </th>

                        <td >
                            <table className="min-w-full">

                                <tbody className='divide-y divide-gray-200 '>
                                    <tr className='divide-x divide-gray-200  whitespace-nowrap text-sm text-gray-800 '>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                    </tr>
                                    <tr className='divide-x divide-gray-200  whitespace-nowrap text-sm text-gray-800 '>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                    </tr>
                    <tr className="even:bg-white  odd:bg-gray-50  border-b  divide-x divide-gray-200">
                        <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                            Apple MacBook Pro 17"
                        </th>
                        <td >
                            <table className="min-w-full">
                                <tbody className='divide-y divide-gray-200 '>
                                    <tr className='divide-x divide-gray-200  whitespace-nowrap text-sm text-gray-800 '>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                    </tr>
                                    <tr className='divide-x divide-gray-200  whitespace-nowrap text-sm text-gray-800 '>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                        <td className='p-1'>John Brown</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table