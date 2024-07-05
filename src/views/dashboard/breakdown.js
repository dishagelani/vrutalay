import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/breakdownTable'

export const Breakdown = () => {

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('1')

  const tabs = [
    { id: '1', label: 'Monthly' },
    { id: '2', label: 'Weekly' }
  ];

  const getWeeks = () => {
    const startOfMonth = moment().startOf('month')
    const endOfMonth = moment().endOf('month')

    let startOfWeek = startOfMonth.clone().startOf("week");
    let endOfWeek = startOfWeek.clone().endOf("week");

    const weeks = [];

    while (startOfWeek.isBefore(endOfMonth)) {
      if (endOfWeek.isAfter(startOfMonth) && startOfWeek.isBefore(endOfMonth)) {
        weeks.push({
          start: startOfWeek.isBefore(startOfMonth)
            ? startOfMonth.clone()
            : startOfWeek.clone(),
          end: endOfWeek.isAfter(endOfMonth)
            ? endOfMonth.clone()
            : endOfWeek.clone(),
        });
      }
      startOfWeek = startOfWeek.add(1, "week");
      endOfWeek = startOfWeek.clone().endOf("week");
    }
    return weeks;
  };

  const weeksInMonth = getWeeks();

  return (
    <div>
      <Navbar />

      {/* Container */}
      <div className="container px-5 mt-5">

        {/* Back button with amount */}

        <div className="relative flex justify-between max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate('/')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p className=' font-bold'>$1000</p>
        </div>

        {/* Tabs */}

        <ul className="my-3 flex list-none flex-row flex-wrap border-b-0 ps-0">
          {tabs.map(tab => (
            <li key={tab.id} className="flex-auto text-center cursor-pointer">
              <p
                className={`my-2 block border-2 p-3 text-xs font-medium uppercase leading-tight hover:isolate hover:border-gradient ${activeTab === tab.id ? 'border-gradient' : 'border-primary'
                  }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </p>
            </li>
          ))}
        </ul>

        {/* table */}

        {activeTab == '1' ?
          <>
            <p className="font-semibold">{moment().format('MMMM YYYY')}</p>
            <Table />
          </>
          : <div>
            {weeksInMonth && weeksInMonth.map(weeks =>
              <> <p className="font-semibold">{weeks.start.format('DD/MM/YYYY')} - {weeks.end.format('DD/MM/YYYY')}</p>
                <Table />
              </>)}
          </div>}
      </div>
    </div>
  )
}
