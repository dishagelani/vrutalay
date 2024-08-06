import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Loader from '../../components/loader'
import { useLocation, useNavigate } from 'react-router-dom'
import { ExpenseContext } from '../../context/expenseContext'
import moment from 'moment'

const Comparision = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { year } = location.state || ''

    const { getAllExpensesByYearFromFirestore } = useContext(ExpenseContext)

    const [chartData, setChartData] = useState()

    useEffect(() => {

        async function getReport() {

            const report = await getAllExpensesByYearFromFirestore(year)
            function categorizeAndGroupData(data) {
                const categorizedData = {};
            
                // Iterate through the data
                data.forEach(item => {
                    const { amount, category, date } = item;
                    const monthName = moment.unix(date.seconds).format('MMM');
            
                    // Initialize category if not exists
                    if (!categorizedData[category]) {
                        categorizedData[category] = {};
                    }
            
                    // Initialize month if not exists
                    if (!categorizedData[category][monthName]) {
                        categorizedData[category][monthName] = 0;
                    }
            
                    // Sum the amount for the month
                    categorizedData[category][monthName] += parseFloat(amount);
                });
            
                // Define the desired category order
                const categoryOrder = ['Grocery', 'Milk', 'Transportation', 'Laundry', 'Other'];
            
                // Filter and transform the result according to the desired categories and format
                const result = categoryOrder.map(category => {
                    if (categorizedData[category]) {
                        const monthData = Object.keys(categorizedData[category]).map(monthName => ({
                            name: monthName,
                            amount: categorizedData[category][monthName]
                        }));
                        return {
                            category,
                            monthData
                        };
                    }
                }).filter(Boolean); // Remove undefined entries
            
                return result;
            }
            
            // Get the categorized and grouped data
            const result = categorizeAndGroupData(report);
            console.log("result", result);

            setChartData(result)
        }
        getReport()

    }, [year])
    return (
        <>
            <Navbar />
            {/* {monthList ? */}
            <div className='w-full h-full p-4 overflow-x-hidden'>
                <div className="relative flex justify-between items-center max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate(-1)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <div className='font-bold'>{year}</div>
                </div>



            </div>
            {/* : <Loader /> */}
            {/* } */}

        </>
    )
}

export default Comparision