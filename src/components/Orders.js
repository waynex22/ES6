import {  useContext, useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ref, remove, get } from 'firebase/database';
import { database } from '../firebase';
import 'firebase/database';
import LoadingSpinner from '../components/PreLoad';
import { AdminContext } from '../contexts/AdminContext';

const Orders = () => {
 const {orders} = useContext(AdminContext)
  const handleDeleteorder = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?  ' + id);
    if (confirmDelete) {
      const orderRef = ref(database, `orders/` + id);
      remove(orderRef)
        .then(() => {
          console.log('order deleted successfully', orderRef);
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
        });
    } else {
      console.error('order not found');
    }
  };
  if(orders.length === 0){
    return <div className='flex justify-center items-center mx-auto'>
      <LoadingSpinner />
    </div>
  }
  return (
    <div className='container mx-auto py-8'>
<h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Order</span> Mananger</h1>
      <table className='min-w-full bg-white rounded-lg shadow-md overflow-hidden text-center'>
        <thead className='bg-mint text-white'>
          <tr>
            <th className='px-5 py-2'>Id</th>
            <th className='px-6 py-4'>User Name</th>
            <th className='px-6 py-4'>Email</th>
            <th className='px-6 py-4'>Create Time</th>
            <th className='px-6 py-4'>Phone</th>
            <th className='px-6 py-4'>Status</th>
            <th className='px-6 py-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className='hover:cursor-auto'>
              <td className='border px-2 py-4'>{order.id}</td>
              <td className='border px-6 py-4'>{order.user_name}</td>
              <td className='border px-6 py-4'>{order.user_mail}</td>

              <td className='border px-6 py-4'>{order.create_date}</td>

              <td className='border px-6 py-4'>{order.user_phone}</td>
              <td className="border px-6 py-4">
                <div className={`${order.status === 0
                    ? 'bg-red-600 text-white'
                    : order.status === 1
                      ? 'bg-green-600 text-white'
                      : order.status === 2
                        ? 'bg-blue-500 text-white'
                        : order.status === 3
                          ? 'bg-gray-200 text-white'
                          : 'bg-red-200 text-white'
                  } px-2 py-1 rounded-md`}>
                  {order.status === 0
                    ? 'unconfimred'
                    : order.status === 1
                      ? 'Shipping'
                      : order.status === 2
                        ? 'Shipped'
                        : order.status === 3
                          ? 'Cancelled'
                          : 'Unknown Status'}
                </div>
              </td>
              <td className='border px-6 py-4 flex'>
                <Link to={`/orderdetail/${order.id}`} className='bg-mint hover:bg-yellow-700 text-white font-semibold py-2 px-2 rounded-full mr-2 shadow-md'>
                  View Details
                </Link>
                <button
                  onClick={() => handleDeleteorder(order.key)}
                  className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders;