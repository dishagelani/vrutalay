import React from 'react'
import moment from 'moment'
const Table = ({expenses}) => {
    const titles = ['Date', 'Amount', 'Description']
    console.log(expenses)

  return (
    

<div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs uppercase bg-gray-50">
            <tr>
            {titles.map((title) => (
                                <th  scope="col" className="px-4 py-3" key={title}>
                                    {title}
                                </th>
                            ))}
            </tr>
        </thead>
        <tbody>
            {expenses.map(expense =>  <tr key={expense.id} className="bg-white">
            <td className="px-4 py-4">
           {moment(expense.date.seconds * 1000 + Math.floor(expense.date.nanoseconds / 1000000)).format('DD MMM')}
                
                </td>
                <td className="px-4 py-4">
                   $ {expense.amount}
                </td>
                <td scope="row" className="px-4  py-4 whitespace-normal ">
                {expense.description}
                </td>                
            </tr> ) }
           
           
        </tbody>
    </table>
</div>

  )
}

export default Table