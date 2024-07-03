import React from 'react'

const Table = () => {
    const titles = ['Date', 'Amount', 'Description']
  return (
    

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right ">
        <thead class="text-xs uppercase bg-gray-50">
            <tr>
            {titles.map((title) => (
                                <th  scope="col" class="px-4 py-3">
                                    {title}
                                </th>
                            ))}
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white">
            <td class="px-4 py-4">
                    Silver
                </td>
                <td class="px-4 py-4">
                    Laptop
                </td>
                <td scope="row" class="px-4  py-4 whitespace-normal ">
                Apple MacBook Pro 17"Apple MacBook Pro 17"Apple MacBook Pro 17"Apple MacBook Pro 17"
                </td>
                
                
            </tr>
           
        </tbody>
    </table>
</div>

  )
}

export default Table