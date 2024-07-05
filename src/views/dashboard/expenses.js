import React from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/expenseTable'
import Navbar from '../../components/navbar'
import moment from 'moment'

const ViewExpenses = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />

      {/* MONTH NAME AND AMOUNT */}

      <div className="rounded-t mb-0 py-4 border-0">
        <div className="relative flex justify-between px-4 max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
          <p className="month">{moment().format('MMMM YYYY')}</p>
          <p>$1000</p>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient text-xs font-bold cursor-pointer" onClick={() => navigate("/breakdown")} >View breakdown</p>
        </div>
      </div>

      {/* TABLE OF CONTENT */}
      
      <Table />
      
      {/* BUTTON TO ADD EXPENSE */}

      <div class="group fixed bottom-0 right-0 p-2  flex items-end justify-end w-24 h-24 ">
        <div class="text-white cursor-pointer shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  " onClick={() => navigate('/add-expense')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default ViewExpenses