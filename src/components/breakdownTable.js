import React from 'react'
import moment
    from 'moment'
const Table = ({ breakdownData }) => {

    return (
        <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg ">
            {breakdownData?.length && <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

                <tbody>
                    {breakdownData.map(({ category, subcategories, totalCategoryAmount }) =>
                        <tr className="even:bg-white  odd:bg-gray-50 border-b  divide-x divide-gray-200">
                            <th scope="row" className="py-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                <p>{category}</p>
                                <p>${
                                    totalCategoryAmount.toString().split('.')[1]?.length > 2 ? parseFloat(totalCategoryAmount).toFixed(2) : totalCategoryAmount}</p>
                            </th>

                            <td >
                                <table className="min-w-full ">

                                    <tbody className='divide-y divide-gray-200 '>
                                        {subcategories.map(({ description, date, amount }) =>
                                            <tr className='divide-x divide-gray-200  whitespace-nowrap text-sm text-gray-800 '>
                                                <td className='w-12 p-1 text-center'> {moment(date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000)).format('DD MMM')}</td>
                                                <td className='w-8 p-1 text-center'>${amount.toString().split('.')[1]?.length > 2 ? parseFloat(amount).toFixed(2) : amount}</td>
                                                <td className='p-1'>{description}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>}

        </div>
    )
}

export default Table