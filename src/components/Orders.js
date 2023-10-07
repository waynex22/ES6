import { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ref, remove, query, orderByChild, equalTo, get } from 'firebase/database';
import { database } from '../firebase';
import 'firebase/database';
import LoadingSpinner from '../components/PreLoad';
import { AdminContext } from '../contexts/AdminContext';

const Orders = () => {
  const { orders } = useContext(AdminContext)
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
  if (orders.length === 0) {
    return <div className='flex justify-center items-center mx-auto'>
      <LoadingSpinner />
    </div>
  }
  return (
    <div className='container mx-auto py-8'>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Order</span> Mananger</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                id
              </th>
              <th scope="col" class="px-6 py-3">
                UserName
              </th>
              <th scope="col" class="px-2 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Create Time
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.id}
                </th>
                <td class="px-6 py-4">
                  {order.user_name}
                </td>
                <td class="px-6 py-4">
                  {order.user_mail}
                </td>
                <td class="px-6 py-4">
                  {order.create_date}
                </td>
                <td class="px-6 py-4">
                  {order.user_phone}
                </td>
                <td class="px-6 py-4">
                  <td className="px-6 py-4">
                    <div className={`${order.status === 0
                      ? 'bg-yellow-600 text-white'
                      : order.status === 1
                        ? 'bg-green-600 text-white'
                        : order.status === 2
                          ? 'bg-blue-500 text-white'
                          : order.status === 3
                            ? 'bg-gray-200 text-white'
                            : 'bg-red-200 text-white'
                      } px-2 py-1 rounded-md`}>
                      {order.status === 0
                        ? 'Confirm'
                        : order.status === 1
                          ? 'Shipping'
                          : order.status === 2
                            ? 'Shipped'
                            : order.status === 3
                              ? 'Cancelled'
                              : 'Unknown Status'}
                    </div>
                  </td>
                </td>
                <td class="px-6 py-4 flex justify-between items-center mt-4">
                  <Link to={`/orderdetail/${order.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</Link>
                  <button
                    onClick={() => handleDeleteorder(order.key)}
                    className='font-medium text-red-600 dark:text-blue-500 hover:underline'>
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders;