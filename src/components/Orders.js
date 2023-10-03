import React from 'react';
const Orders = () => {
    return (
        <div className='container mx-auto py-8'>
        <div className='mb-8'>
            <h2 className='text-2xl font-semibold bg-gradient-to-r  from-mints to-blue-400  bg-clip-text text-transparent mb-4'>Order Management</h2>
            <table className='min-w-full bg-white shadow-lg rounded-lg'>
                <thead className='bg-mint text-white '>
                    <tr>
                        <th className='px-6 py-4'>Order ID</th>
                        <th className='px-6 py-4'>Customer Name</th>
                        <th className='px-6 py-4'>Order Date</th>
                        <th className='px-6 py-4'>Total Amount</th>
                        <th className='px-6 py-4'>Status</th>
                        <th className='px-6 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='hover:cursor-auto'>
                        <td className='border px-6 py-4'>#12345</td>
                        <td className='border px-6 py-4'>John Doe</td>
                        <td className='border px-6 py-4'>2023-09-23</td>
                        <td className='border px-6 py-4'>$250.00</td>
                        <td className='border px-6 py-4'>
                            <span className='bg-green-500 text-white px-2 py-1 rounded-full'>Shipped</span>
                        </td>
                        <td className='border px-6 py-4'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-full mr-2'>
                                View
                            </button>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-full'>
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Orders;