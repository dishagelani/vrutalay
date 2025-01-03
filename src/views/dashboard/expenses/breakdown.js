import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../../components/navbar'
import moment from 'moment'
import { useNavigate, useLocation } from 'react-router-dom'
import Table from '../../../components/breakdownTable'
import { ExpenseContext } from '../../../context/expenseContext'
import Loader from '../../../components/loader'

const Breakdown = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const { year, month } = location.state || {}

  const { totalAmount, getAllExpensesByMonthFromFirestore } = useContext(ExpenseContext)
  const [activeTab, setActiveTab] = useState('1')
  const [monthlyBreakdownData, setMonthlyBreakdownData] = useState(null)
  const [weeklyBreakdownData, setWeeklyBreakdownData] = useState(null)

  const tabs = [
    { id: '1', label: 'Monthly' },
    { id: '2', label: 'Weekly' }
  ];

  const groupByWeeksAndCategories = (data) => {

    const weeks = {};

    data.forEach(expense => {
      const date = moment.unix(expense.date.seconds).add(expense.date.nanoseconds / 1000000000, 'seconds');
      const startOfMonth = moment(date).startOf('month');
      const endOfMonth = moment(date).endOf('month');

      // Calculate the week start and end dates within the current month
      let weekStart = moment(date).startOf('week');
      if (weekStart.isBefore(startOfMonth)) {
        weekStart = startOfMonth.clone();
      }

      let weekEnd = moment(date).endOf('week');
      if (weekEnd.isAfter(endOfMonth)) {
        weekEnd = endOfMonth.clone();
      }

      const weekKey = weekStart.format('YYYY-MM-DD');
      const weekOfMonth = Math.ceil(moment(date).date() / 7);

      if (!weeks[weekKey]) {
        weeks[weekKey] = {
          start: weekStart,
          end: weekEnd,
          weekOfMonth: weekOfMonth,
          weeklyData: {},
        };
      }

      const week = weeks[weekKey];
      const category = expense.category;

      if (!week.weeklyData[category]) {
        week.weeklyData[category] = {
          category,
          totalCategoryAmount: 0,
          subcategories: []
        };
      }

      week.weeklyData[category].subcategories.push({
        description: expense.description,
        date: expense.date,
        amount: parseFloat(expense.amount)
      });

      week.weeklyData[category].totalCategoryAmount += parseFloat(expense.amount);
    });

    const formattedWeeks = Object.values(weeks).map(week => ({
      start: week.start,
      end: week.end,
      weekOfMonth: week.weekOfMonth,
      weeklyData: Object.values(week.weeklyData),
      weeklyAmount: Object.values(week.weeklyData).reduce((accumulator, current) => {
        return accumulator + parseFloat(current.totalCategoryAmount);
      }, 0),
    }));

    return formattedWeeks

  };

  const groupByCategories = (expenses) => {
    const breakdownByMonth = expenses?.reduce((acc, item) => {
      const categoryIndex = acc.findIndex((obj) => obj.category === item.category);

      if (categoryIndex > -1) {
        acc[categoryIndex].subcategories.push({
          description: item.description,
          amount: item.amount,
          date: item.date,
        });
        acc[categoryIndex].totalCategoryAmount += parseFloat(item.amount);
      } else {
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
    async function getAllExpenses() {
      const expenses = await getAllExpensesByMonthFromFirestore(month, year)

      setMonthlyBreakdownData(groupByCategories(expenses))
      setWeeklyBreakdownData(groupByWeeksAndCategories(expenses))
    }
    getAllExpenses()

  }, [])


  return (
    <div>
      <Navbar />

      {weeklyBreakdownData ?
        <div className="w-full h-full px-4 mt-4">

          {/* Back button with amount */}

          <div className="relative flex justify-between max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate(-1)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <p className='bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold'>${totalAmount.toString().split('.')[1]?.length > 2 ? parseFloat(totalAmount).toFixed(2) : totalAmount}</p>
          </div>

          {/* Tabs */}

          <ul className="my-4 flex list-none flex-row flex-wrap border-b-0 ps-0">
            {tabs.map(tab => (
              <li key={tab.id} className="flex-auto text-center cursor-pointer">
                <p
                  className={`my-2 block border-2 p-2 text-xs font-medium uppercase leading-tight hover:isolate hover:border-gradient ${activeTab === tab.id ? 'border-gradient' : 'border-primary'
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </p>
              </li>
            ))}
          </ul>

          {/* table */}
          {(monthlyBreakdownData.length > 0 && weeklyBreakdownData.length > 0) ?
            activeTab == '1' ?
              <>
                <p className="font-semibold">{month} {year}</p>
                <Table breakdownData={monthlyBreakdownData} />
              </>
              :
              weeklyBreakdownData.reverse().map(weeks =>
                <>
                  <div className='flex justify-between font-semibold'>
                    <p>Week {weeks.weekOfMonth} : {weeks.start.format('DD MMM')} - {weeks.end.format('DD MMM')}</p>
                    <p>${weeks.weeklyAmount}</p>
                  </div>
                  <Table breakdownData={weeks.weeklyData} />

                </>)

            : <div className="relative h-50vh flex items-center justify-center">
              <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold text-center" > Your expenses are still on vacation. No entries this month ! </p><span>😋</span>
            </div>
          }

        </div> : <Loader />}

    </div>
  )
}
export default Breakdown;