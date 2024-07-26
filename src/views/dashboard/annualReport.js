import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const AnnualReport = () => {
  const navigate = useNavigate()

  const year = moment().format('YYYY')

  const [currentYear, setCurrentYear] = useState(year)

  const [monthList, setMonthList] = useState([])
  
  useEffect(() => {
    const months = [];
    const startMonth = moment().year(year).month(currentYear == 2024 ? 'June' : 'January');
    const endMonth = moment().year(year).month(currentYear == year ? moment().month() : 11);
    
    let currentMonth = startMonth.clone(); 


    while (currentMonth.isSameOrBefore(endMonth, 'month')) {
      months.push(currentMonth.format('MMMM'));
      currentMonth.add(1, 'month'); // Move to the next month
    }

    setMonthList(months);
  }, [currentYear]);

  return (
    <>
      <Navbar />
      <div className='w-full h-full p-4 overflow-x-hidden'>

        <div className="relative flex justify-between items-center max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate('/')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <select
            required
            value={currentYear}
            className="block  rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={(e) => setCurrentYear(e.target.value)}
          >
            {Array.from({ length: Number(moment().year()) - 2021 + 1}, (_, i) => 2021 + i).reverse().map(year => <option key={year} value={year}>{year}</option>)}
          </select>        </div>

        <p className="my-4 text-sm text-center leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
          Unveiling the {currentYear} saga of your wallet
        </p>        <div>

        
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
          {monthList.map(month => 
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100" key={month}>
            <h5 className="font-bold tracking-tight text-gray-900">{month} {currentYear}</h5>
            <p className="font-semibold text-gray-700">$2500</p>
          </div>)}

        </div>
        </div>
      </div>
    </>
  )
}

export default AnnualReport;
