import React from 'react'

const Table = () => {
    const titles = ['Date', 'Amount', 'Description']
  return (
    

<div className="relative m-4 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs uppercase bg-gray-50">
            <tr>
            {titles.map((title) => (
                                <th  scope="col" className="px-4 py-3">
                                    {title}
                                </th>
                            ))}
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white">
            <td className="px-4 py-4">
                    Silver
                </td>
                <td className="px-4 py-4">
                    Laptop
                </td>
                <td scope="row" className="px-4  py-4 whitespace-normal ">
                Apple MacBook Pro 17"Apple MacBook Pro 17"Apple MacBook Pro 17"Apple MacBook Pro 17"
                </td>
                
                
            </tr>
           
        </tbody>
    </table>
</div>

  )
}

export default Table