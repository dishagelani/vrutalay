import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../components/navbar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ExpenseContext } from '../../../context/expenseContext';
import Loader from '../../../components/loader';

const AnnualReport = () => {
  const navigate = useNavigate()

  const year = moment().format('YYYY')

  const [currentYear, setCurrentYear] = useState(year)
  const [monthList, setMonthList] = useState(null)


  const { getAllExpensesByYearFromFirestore, totalAmount } = useContext(ExpenseContext)

  // useEffect(() => {
  //   const months = [];
  //   const startMonth = moment().year(year).month(currentYear === '2024' ? 'June' : 'January');
  //   const endMonth = moment().year(year).month(currentYear === year ? moment().month() : 11);

  //   let currentMonth = startMonth.clone(); 


  //   while (currentMonth.isSameOrBefore(endMonth, 'month')) {
  //     months.push(currentMonth.format('MMMM'));
  //     currentMonth.add(1, 'month'); // Move to the next month
  //   }

  //   setMonthList(months);
  // }, [currentYear]);

  useEffect(() => {

    async function getReport() {

      const report = await getAllExpensesByYearFromFirestore(currentYear)

      const monthlyTotals = {};

      report.forEach(expense => {
        const date = moment(expense.date.seconds * 1000 + expense.date.nanoseconds / 1000000);
        const month = date.format('MMMM');
        const amount = parseFloat(expense.amount);

        if (!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += amount;
      });

      const result = Object.keys(monthlyTotals).map(month => ({
        month,
        amount: monthlyTotals[month]
      }));

      setMonthList(result)
    }
    getReport()

  }, [currentYear])

  return (
    <>
      <Navbar />
      {monthList ?
        <div className='w-full h-full p-4 overflow-x-hidden'>

          <div className="relative flex justify-between items-center max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate('/')}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <select
              required
              value={currentYear}
              className="block  rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 cursor-pointer"
              onChange={(e) => setCurrentYear(e.target.value)}
            >
              {Array.from({ length: Number(moment().year()) - 2021 + 1 }, (_, i) => 2021 + i).reverse().map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>

          <p className="my-4 text-sm text-center leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
            Unveiling the {currentYear} saga of your wallet
          </p>
          <div>

            {monthList.length > 0 ?
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
                {monthList.map(({ month, amount }) =>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer" key={month} onClick={() => navigate('/breakdown', { state: { year: currentYear, month: month } })}>
                    <div className='flex justify-between'>
                      <h5 className="font-bold tracking-tight text-gray-900">{month}</h5>
                      <p className="font-semibold text-gray-700">${amount.toString().split('.')[1]?.length > 2 ? parseFloat(amount).toFixed(2) : amount}</p>
                    </div>
                    <span>{amount >= 2800 ? 'Busted 🥶' : amount > 2500 ? 'Almost-there 😥' : 'On-track 😃'}</span>
                  </div>)}
              </div>
              : <div className="relative h-50vh flex items-center justify-center">
                <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold text-center" > Ghostly quiet on the spending front</p><span>😋</span>
              </div>
            }
          </div>
          <div className="fixed bottom-0 right-0 p-4">

            <div className="text-white cursor-pointer shadow-xl p-3 ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 cursor-pointer" onClick={() => navigate('/view-comparision', { state: { year: currentYear } })}>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>

            </div>
          </div>
        </div> : <Loader />}

    </>
  )
}

export default AnnualReport;
