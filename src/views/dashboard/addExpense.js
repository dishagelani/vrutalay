import moment from "moment";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
    const navigate = useNavigate()
    const [data,setData] = useState({date : moment()._d, amount : null,  description : null, category : null})

    const quotes = ['Money, like emotions, is something you must control to keep your life on the right track !', 'Making money is a happiness. Making other people happy is also a happiness. So why don’t we do both and maximize our happiness?', 'Don’t get so busy making a living that you forget to make a life !', 'Wealth is not his that has it, but his that enjoys it !', 'Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver. It will give you the means for the satisfaction of your desires, but it will not provide you with desires !', 'You must gain control over your money or the lack of it will forever control you !', 'Happiness is not in the mere possession of money; it lies in the joy of achievement, in the thrill of creative effort !']

    const categories = [null,'Grocery', 'Milk', 'Transportation', 'Laundry', 'Disha', 'Other']

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted data : ", data)
    }

    return (
        <>

            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className="space-y-12 mx-5">
                    <div className="py-4">
                        <p className="mt-1 text-sm leading-6 text-gray-600 font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                            {quotes[moment().day()]}           </p>

                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">

                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date
                                </label>

                                <div className="p-0 mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">

                                    <DatePicker className="ml-1" showIcon toggleCalendarOnIconClick selected={data?.date} onChange={(date) => {  setData({...data, date}) }} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute right-0  ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    } />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Amount
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        id="amount"
                                        type="number"
                                        value={data?.amount}
                                        className="block w-full rounded-md py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setData({ ...data, amount: e.target.value })}/>
                                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center ">
                                        $
                                    </span>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        value={data?.description}
                                        autoComplete="given-name"
                                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setData({ ...data, description: e.target.value })}

                                    />
                                </div>
                            </div>



                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-1">
                                    <select
                                        value={data?.category}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => setData({...data, category : e.target.value})}
                                    >
                                        {categories.map(category => <option key={category} value={category}>{category}</option>)}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="m-4 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate("/")}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}
