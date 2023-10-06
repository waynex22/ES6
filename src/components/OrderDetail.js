import { useContext, useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { Link } from 'react-router-dom'
import { database } from '../firebase'
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import LoadingSpinner from '../components/PreLoad'
 
const OrderDetail = () => {
  const { products } = useContext(ProductContext)
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = orderDetails.reduce((acamulator, currenItem) => {
      return acamulator + currenItem.price;
    }, 0)
    setTotal(total);
  })
  console.log(total)
  useEffect(() => {
    const orderDetailRef = ref(database, `order_detail/`);
    get(orderDetailRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          const detailsArray = Object.entries(data).map(([key, order]) => ({
            key,
            ...order,
          }));
          const orderDetail = detailsArray.filter((item => {
            return item.order_id === parseInt(orderId);
          }))
          setOrderDetails(orderDetail)
        } else {
          console.log('No order details found for this order ID.');
        }
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      });
  }, []);
  useEffect(() => {
    const orderRef = ref(database, `orders/`);
    get(orderRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          const orderArray = Object.entries(data).map(([key, order]) => ({
            key,
            ...order,
          }));
          const order = orderArray.filter((item => {
            return item.id === parseInt(orderId);
          }))
          setOrder(order)
          // console.log(order)
        } else {
          console.log('No order details found for this order ID.');
        }
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      });
  }, []);
  const productIdByOrder = orderDetails.map((id) => {
    return id.product_id;
  })
  const productByIdOrder = productIdByOrder.map((productId) => {
    return products.find((product) => parseInt(product.id) === productId);
  });
  //  console.log(order)
  if(orderDetails.length === 0){
    return <div className='flex justify-center items-center mx-auto'>
      <LoadingSpinner />
    </div>
  }
  return (
    <div className="h-full w-full mt-24">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Order</span> Detail</h1>

      <div className="flex flex-col  items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <h2>Status</h2>
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></a>
                <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">confirm</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Shipping</span>
              </li>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Shipped</span>
              </li>
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
                <label for="email" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Email</label>
                <div className="relative">
                  <input type='text'
                    id='user_mail'
                    name='user_mail'
                    value={orders.user_mail} disabled
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">User Name</label>
                <div className="relative">
                  <input
                    type='text'
                    id='user_name'
                    name='user_name'
                    value={orders.user_name} disabled

                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Phone Number</label>
                <div className="relative">
                  <input
                    type='text'
                    id='user_phone'
                    name='user_phone'
                    value={orders.user_phone} disabled

                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                  </div>
                </div>
                <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Your Address</label>
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
                <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Time Order</label>
                <div className="relative">
                  <input
                    type='text'
                    id='user_phone'
                    name='user_phone'
                    value={orders.create_date} disabled

                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
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
