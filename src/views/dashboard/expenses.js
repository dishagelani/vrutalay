
import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/expenseTable'
import Navbar from '../../components/navbar'
import moment from 'moment'
import { ExpenseContext } from '../../context/expenseContext'
import Loader from '../../components/loader'

const Expenses = () => {
  const navigate = useNavigate()

  const [fetchData, setFetchData] = useState(true)
  const [expenses, setExpenses] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'))

  const { getAllExpensesByMonthFromFirestore, totalAmount } = useContext(ExpenseContext)

  const setFlag = (data) => {
    setFetchData(data)
  }

  useEffect(() => {
    async function getAllExpenses() {
      const expensesArray = await getAllExpensesByMonthFromFirestore(currentMonth, moment().year())
      setExpenses(expensesArray)
    }
    getAllExpenses()

  }, [fetchData, currentMonth])

  return (
    <>
      <Navbar />
      {expenses ? (
        <div className='w-full h-full px-4'>

          {/* MONTH NAME AND AMOUNT */}

          <div className="rounded-t mb-0 py-4 border-0">
            <div className="relative flex justify-between max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
              <p className="month">{currentMonth} {moment().year()}</p>
              <p>${totalAmount} <span>{totalAmount >= 2500 ? '🥶' : totalAmount > 2200 ? '😥' : '😃'}</span></p>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1 text-right">
              <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient text-xs font-bold cursor-pointer" onClick={() => navigate("/breakdown", { state: { month: currentMonth, year: moment().year() } })} >View breakdown</p>
            </div>
          </div>

          {/* EXPENSE LISTING */}
          <div className="relative max-h-[calc(100vh-200px)] overflow-auto">
            {expenses.length > 0 ? (
              <Table expenses={expenses} setFlag={setFlag} fetchData={fetchData} />
            ) : (
              <div className="relative h-50vh flex items-center justify-center">
                <div className="text-center">
                  <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold">Looks like your spending hasn’t started ! </p> <span>🤭</span>
                </div>
              </div>
            )}
          </div>

          {/* BUTTON TO ADD EXPENSE */}

          <div className="fixed bottom-0 right-0 w-full p-4">
            <div className="flex justify-between">
              <select
                required
                value={currentMonth}
                className="block p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setCurrentMonth(e.target.value)}
              >
                {Array.from({ length: 11 - (moment().year() == 2024 ? 5 : 0) + 1 }, (_, i) =>
                  moment().month((moment().year() == 2024 ? 4 : 0) + i).format('MMMM')
                ).reverse().map(month => <option key={month} value={month}>{month}</option>)}
              </select>
              <div className="text-white cursor-pointer shadow-xl p-3 ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50" onClick={() => navigate('/add-expense')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Expenses

