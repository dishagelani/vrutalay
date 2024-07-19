import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/breakdownTable'
import { ExpenseContext } from '../../context/expenseContext'

export const Breakdown = () => {

  const navigate = useNavigate()

  const { totalAmount, getAllExpensesFromFirestore } = useContext(ExpenseContext)
  const [activeTab, setActiveTab] = useState('1')
  const [expenses, setExpenses] = useState([])
  const [monthlyBreakdownData, setMonthlyBreakdownData] = useState(null)
  const [weeklyBreakdownData, setWeeklyBreakdownData] = useState(null)

  const tabs = [
    { id: '1', label: 'Monthly' },
    { id: '2', label: 'Weekly' }
  ];

  const getWeeks = () => {
    const startOfMonth = moment().startOf('month')
    const endOfMonth = moment()
    // const endOfMonth = moment().endOf('month')

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


  const groupByWeeksAndCategories = (data) => {
    const weeks = getWeeks();
    const weeklyData = data.length ? weeks.map(week => ({
      start: week.start,
      end: week.end,
      weeklyData: {}
    })) : [];

    data.forEach(item => {
      const date = moment.unix(item.date.seconds);
      const week = weeklyData.find(week => date.isBetween(week.start, week.end, 'day', '[]'));

      if (week) {
        if (!week.weeklyData[item.category]) {
          week.weeklyData[item.category] = {
            category: item.category,
            subcategories: [],
            totalCategoryAmount: 0
          };
        }

        week.weeklyData[item.category].subcategories.push({
          description: item.description,
          date: item.date,
          amount: parseFloat(item.amount)
        });

        week.weeklyData[item.category].totalCategoryAmount += parseFloat(item.amount);
      }
    });

    return weeklyData.map(week => ({
      start: week.start,
      end: week.end,
      weeklyData: Object.values(week.weeklyData),
      weeklyAmount: Object.values(week.weeklyData).reduce((accumulator, current) => {
        return accumulator + parseFloat(current.totalCategoryAmount);
      }, 0)
    }));
  };

  const groupByCategories = (expenses) => {
    const breakdownByMonth = expenses?.reduce((acc, item) => {
      // Find if the category already exists in the accumulator
      const categoryIndex = acc.findIndex((obj) => obj.category === item.category);

      if (categoryIndex > -1) {
        // Category exists, add the subcategory item and update the total amount
        acc[categoryIndex].subcategories.push({
          description: item.description,
          amount: item.amount,
          date: item.date,
        });
        acc[categoryIndex].totalCategoryAmount += parseFloat(item.amount);
      } else {
        // Category does not exist, create a new category entry
        acc.push({
          category: item.category,
          subcategories: [
            {
              description: item.description,
              amount: item.amount,
              date: item.date,
            },
          ],
          totalCategoryAmount: parseFloat(item.amount),
        });
      }

      return acc;
    }, []);

    return breakdownByMonth

  }

  useEffect(() => {

    setMonthlyBreakdownData(groupByCategories(expenses))
    setWeeklyBreakdownData(groupByWeeksAndCategories(expenses))

  }, [expenses])

  useEffect(() => {
    async function getAllExpenses() {
      const expensesArray = await getAllExpensesFromFirestore()
      setExpenses(expensesArray)
    }
    getAllExpenses()

  }, [])


  return (
    <div>
      <Navbar />

      {/* Container */}
      <div className="w-full h-full px-5 mt-4">

        {/* Back button with amount */}

        <div className="relative flex justify-between max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate('/')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p className='bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold'>${totalAmount}</p>
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
            monthlyBreakdownData?.length ?
              <>
              <p className="font-semibold">{moment().format('MMMM YYYY')}</p>
              <Table breakdownData={monthlyBreakdownData} />
          </>
              :
              <div className="relative h-50vh flex items-center justify-center">
                <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold text-center" > Your expenses are still on vacation. No entries this month ! </p><span>😋</span>
              </div>
        


          :
          weeklyBreakdownData.length ? weeklyBreakdownData.map(weeks =>
            <>
              <div className='flex justify-between font-semibold'>

                <p>{weeks.start.format('DD MMM')} - {weeks.end.format('DD MMM')}</p>
                <p>${weeks.weeklyAmount}</p>
              </div>
              {weeks.weeklyData.length ?
                <Table breakdownData={weeks.weeklyData} />
                :
                <div className='flex  my-2'>
                  <p className='mb-2'>Looks like your wallet had a chill week !</p><span>🥱</span>
                </div>

              }

            </>)

            : <div className="relative h-50vh flex items-center justify-center">
              <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold text-center" > Your expenses are still on vacation. No entries this month ! </p><span>😋</span>
            </div>
        }

      </div>
    </div>
  )
}
