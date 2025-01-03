import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../components/navbar';
import Loader from '../../../components/loader';
import Modal from '../../../components/modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExpenseContext } from '../../../context/expenseContext';
import moment from 'moment';
import { AgCharts } from "ag-charts-react";

const Comparision = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { year } = location.state || '';
    const { getAllExpensesByYearFromFirestore } = useContext(ExpenseContext);

    const [chartData, setChartData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
         const getReport = async () => {
            const report = await getAllExpensesByYearFromFirestore(year);

            const categorizeAndGroupData = (data) => {
                const categorizedData = {};

                data.forEach(item => {
                    const { amount, category, date, description } = item;
                    const monthName = moment.unix(date.seconds).format('MMM');

                    if (!categorizedData[category]) {
                        categorizedData[category] = {};
                    }

                    if (!categorizedData[category][monthName]) {
                        categorizedData[category][monthName] = {
                            amount: 0,
                            breakdown: []
                        };
                    }

                    categorizedData[category][monthName].amount += parseFloat(amount);
                    categorizedData[category][monthName].breakdown.push({ amount: parseFloat(amount), description });
                });

                const categoryOrder = ['Grocery', 'Milk', 'Transportation', 'Other'];

                const result = categoryOrder.map(category => {
                    if (categorizedData[category]) {
                        const monthData = Object.keys(categorizedData[category]).map(monthName => ({
                            name: monthName,
                            amount: categorizedData[category][monthName].amount,
                            breakdown: categorizedData[category][monthName].breakdown
                        }));
                      
                        return {
                            category,
                            average : Math.round(monthData.reduce((acc,val)  => acc + val.amount,0) / monthData.length), 
                            monthData
                        };
                    }
                }).filter(Boolean); // Remove undefined entries

                return result;
            }

            const result = categorizeAndGroupData(report);
            setChartData(result);
        }

        getReport();
    }, [year]);

    const handleBarClick = (datum) => {
        setSelectedData(datum);
        setOpenModal(true);
    };

    return (
        <>
            <Navbar />
            {chartData ? (
                <div className='w-full h-full p-4 overflow-x-hidden'>
                    <div className="relative flex justify-between items-center max-w-full flex-grow flex-1 font-semibold text-blueGray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={() => navigate(-1)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <div className='font-bold'>Your spending scorecard for {year}</div>
                    </div>

                    <div className='py-4'>
                        {chartData.map(({ category, average, monthData }) =>
                            <AgCharts key={category} shadow={true} fill={'red'}
                                options={{
                                    title: {
                                        text:`${category} ($${average})`,
                                    },
                                    data: monthData,
                                    series: [
                                        {
                                            type: "bar",
                                            direction: "horizontal",
                                            xKey: "name",
                                            yKey: "amount",
                                            listeners: {
                                                nodeClick: (event) => {
                                                    const { datum } = event;
                                                    handleBarClick(datum);
                                                },
                                            },
                                        }
                                    ]
                                }} />
                        )}
                    </div>

                    {/* Modal to show the breakdown */}
                    <Modal
                        isOpen={openModal}
                        onClose={() => setOpenModal(false)}
                        title={`Breakdown for ${selectedData?.name} (${selectedData?.amount})`}
                        footerButtons={[
                            {
                                label: 'Close',
                                className: 'py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
                                onClick: () => setOpenModal(false),
                            },
                        ]}
                    >
                        <ul>
                            {selectedData?.breakdown?.map((item, index) => (
                                <li key={index}>
                                    ${item.amount} - {item.description}
                                </li>
                            ))}
                        </ul>
                    </Modal>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Comparision;
