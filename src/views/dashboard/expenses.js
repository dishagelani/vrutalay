import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/expenseTable'
import Navbar from '../../components/navbar'
import moment from 'moment'
import { ExpenseContext } from '../../context/expenseContext'

const Expenses = () => {
  const navigate = useNavigate()

  const [fetchData, setFetchData] = useState(true)
  const [expenses, setExpenses] = useState(null)

  const { getAllExpensesFromFirestore, totalAmount } = useContext(ExpenseContext)

  const setFlag = (data) => {
    setFetchData(data)
  }

  useEffect(() => {
    async function getAllExpenses() {
      const expensesArray = await getAllExpensesFromFirestore()
      setExpenses(expensesArray)
    }
    getAllExpenses()

  }, [fetchData])

  return (
    <>
      <Navbar />
      <div className='w-full h-full px-4'>

        {/* MONTH NAME AND AMOUNT */}

        <div className="rounded-t mb-0 py-4 border-0">
          <div className="relative flex justify-between max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
            <p className="month">{moment().format('MMMM YYYY')}</p>
            <p>${totalAmount}</p>
          </div>
          <div className="relative w-full max-w-full flex-grow flex-1 text-right">
            <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient text-xs font-bold cursor-pointer" onClick={() => navigate("/breakdown")} >View breakdown</p>
          </div>
        </div>

        {/* EXPENSE LISTING */}
        {expenses && expenses.length ?

          <Table expenses={expenses} setFlag={setFlag} fetchData />
          :
          <div className="relative h-50vh flex items-center justify-center">
            <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold text-center" >Looks like your spending hasn’t started ! </p> <span>🤭</span>
          </div>

        }

        {/* BUTTON TO ADD EXPENSE */}

        <div className="group fixed bottom-0 right-0 p-4 flex items-end justify-end w-24 h-24 ">
          <div className="text-white cursor-pointer shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  " onClick={() => navigate('/add-expense')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default Expenses