import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { ExpenseContext } from '../context/expenseContext'
import Alert from './alert'

const Table = ({ expenses,  setFlag, fetchData }) => {

    const titles = ['Date', 'Amount', 'Description', '']
    const { error, setError, deleteExpenseInFirestore } = useContext(ExpenseContext)
    
    const handleDelete =  (id) => {
        try {
            deleteExpenseInFirestore(id).then(() => setFlag(!fetchData))
        } catch (e) { setError('Yikes! 😕 Something broke. Try again shortly!') }
    }

    useEffect(() => {
        setTimeout(() => { setError(null) }, 3000)
    }, [error])
    return (
        <>
        {
        error && <div className="flex justify-center my-2">
            <Alert message={error} />
        </div>
    }

    <div className="sm:rounded-lg">
        <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
                <tr>
                    {titles.map((title) => (
                        <th scope="col" className="p-2 " key={title}>
                            {title} 
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => <tr key={expense.id} className="bg-white">
                    <td className="p-2">
                        {moment(expense.date.seconds * 1000 + Math.floor(expense.date.nanoseconds / 1000000)).format('DD MMM')}
                    </td>
                    <td className="p-2">
                        ${expense.amount}
                    </td>
                    <td className="p-2 whitespace-normal ">
                        {expense.description}
                    </td>
                    <td className='px-2'>
                        <div className='flex justify-center items-center'>

                    <Link to="/edit-expense" state={{...expense}}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30 " strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg></Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30 " strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer" onClick={() => handleDelete(expense.id)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        </div>

                    </td>
                </tr>)}


            </tbody>
        </table>
    </div>
    </>
    )
}

export default Table