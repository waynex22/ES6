import React ,{ useContext, useEffect, useState } from 'react';
import { ref, update } from 'firebase/database';
import { database } from '../firebase'
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import LoadingSpinner from '../components/PreLoad'
import { AdminContext } from '../contexts/AdminContext';

const OrderDetail = () => {
  const { products } = useContext(ProductContext)
  const { getData } = useContext(AdminContext)
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusOrder, setstatusOrder] = useState(0);
  const [orderKey , setOrderKey] = useState('')

  useEffect(() => {
    const total = orderDetails.reduce((acamulator, currenItem) => {
      return acamulator + currenItem.price;
    }, 0)
    setTotal(total);
  })
  // console.log(total)
  useEffect(() => {
    const orderDetailRef = ref(database, `order_detail/`);
    getData(orderDetailRef)
      .then((dataArray) => {
        if (dataArray) {
          const orderDetail = dataArray.filter((item => {
            return item.order_id === parseInt(orderId);
          }))
          setOrderDetails(orderDetail)
        } else {
          console.log("No data found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);
  useEffect(() => {
    const orderRef = ref(database, `orders/`);
    getData(orderRef)
      .then((dataArray) => {
        if (dataArray) {
          const order = dataArray.filter((item) => {
            return item.id === parseInt(orderId)
          })
          const status = order.map((item) => {
            return (item.status);
          })
          const key = order.map((item) => {
            return (item.key);
          })
         
          const keyOrder = key[0];
          // console.log(keyOrder)
          setOrderKey(keyOrder)
          const firstStatus = status[0];
          setstatusOrder(firstStatus)
          // console.log(firstStatus)
          setOrder(order)
        }
        else {
          console.log("no data found")
        }
      })
      .catch((error) => {
        console.log("Error :", error)
      })
  }, []);
  const productIdByOrder = orderDetails.map((id) => {
    return id.product_id;
  })
  const productByIdOrder = productIdByOrder.map((productId) => {
    return products.find((product) => parseInt(product.id) === productId);
  });
  //  console.log(order)
  const handleButtonClick = async () => {
    try {
      const ship = statusOrder + 1;
      setstatusOrder(ship);
      const refOrder = ref(database, 'orders/' + orderKey);
      if(statusOrder < 2) {
      await update(refOrder, { status: ship });
      console.log('Status updated successfully.');
    }else {
      console.log("!!!")
    }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  if (orderDetails.length === 0) {
    return <div className='flex justify-center items-center mx-auto'>
      <LoadingSpinner />
    </div>
  }
  return (
    <div className="h-full w-full mt-24">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Order</span> Detail</h1>
      <div className="flex flex-col  items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        {/* Status order */}
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <h2 className='font-semibold text-2xl bg-gradient-to-r from-mint to-blue-700 bg-clip-text text-transparent mb-4'>Status Action</h2>
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className={`flex items-center space-x-3 text-left sm:space-x-4 ${statusOrder >= 0 ? 'text-emerald-700' : 'text-gray-400'}`}>
                <a className={`flex h-6 w-6 items-center justify-center rounded-full ${statusOrder >= 0 ? 'bg-emerald-200' : 'bg-gray-400'} text-xs font-semibold ${statusOrder >= 0 ? 'text-emerald-700' : 'text-gray-700'}`} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </a>
                <span className={`font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent ${statusOrder >= 1 ? 'text-transparent' : 'text-gray-400'}`}>confirm</span>
              </li>
              <a className={`flex h-6 w-6 items-center justify-center rounded-full ${statusOrder >= 1 ? 'bg-emerald-200' : 'bg-gray-400'} text-xs font-semibold ${statusOrder >= 1 ? 'text-emerald-700' : 'text-gray-700'}`} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </a>
              <button onClick={handleButtonClick} id="shipping-status" className={`font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent ${statusOrder >= 2 ? 'text-transparent' : 'text-gray-400'}`}>Shipping</button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <a className={`flex h-6 w-6 items-center justify-center rounded-full ${statusOrder >= 2 ? 'bg-emerald-200' : 'bg-gray-400'} text-xs font-semibold ${statusOrder >= 2 ? 'text-emerald-700' : 'text-gray-700'}`} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </a>
              <button onClick={handleButtonClick} id="shipped-status" className={`font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent ${statusOrder >= 2 ? 'text-transparent' : 'text-gray-400'}`}>Shipped</button>
            </ul>
          </div>
        </div>

      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
            Order Summary
          </p>
          <p className="bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
            Check your items and select a suitable shipping method.
          </p>
          <div className="mt-5">
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex w-full flex-row px-4 py-4">
                <div className="flex w-full flex-col items-center justify-center py-10">
                  {productByIdOrder.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center rounded-lg bg-white sm:flex-row"
                    >
                      <img
                        className="m-2  h-24 w-28 rounded-md border object-cover object-center"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
                          {item.title}
                        </span>
                        <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full flex-col items-center justify-center px-4 py-4">
                  {orderDetails.map((detail, index) => (
                    <div key={index} className="flex w-full flex-col px-4 py-4">
                      <div className="flex w-full flex-row justify-between items-start px-4 py-4">
                        <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
                          Quantity: {detail.quantity}
                        </span>
                        <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
                          ${detail.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10  px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Customer information</p>
          <p className="bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Delivery address</p>
          <div className="">
            {order.map((orders, index) => (
              <form key={index} className='mb-8'>
                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Email</label>
                <div className="relative">
                  <input type='text'
                    id='user_mail'
                    name='user_mail'
                    value={orders.user_mail} disabled
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">User Name</label>
                <div className="relative">
                  <input
                    type='text'
                    id='user_name'
                    name='user_name'
                    value={orders.user_name} disabled

                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Phone Number</label>
                <div className="relative">
                  <input
                    type='text'
                    id='user_phone'
                    name='user_phone'
                    value={orders.user_phone} disabled

                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Your Address</label>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 w-full">
                    <input
                      type='text'
                      id='user_address'
                      name='user_address'
                      value={orders.user_address} disabled

                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder=" Address" />
                  </div>
                </div>
                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Time Order</label>
                <div className="relative">
                  <input
                    type='text'
                    id='user_phone'
                    name='user_phone'
                    value={orders.create_date} disabled

                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Subtotal</p>
                    <p className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">$ {parseFloat(total).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Shipping</p>
                    <p className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">$ Free</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Total: </p>
                  <p className="text-2xl font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">$ {parseFloat(total).toFixed(2)}</p>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
