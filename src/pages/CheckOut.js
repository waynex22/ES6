import React, { useContext, useState, useEffect } from "react";
import gsap from 'gsap';
import { ref, push, get } from 'firebase/database';
import { database } from '../firebase';
import { CartContext } from '../contexts/CartContext';
import emptycart from '../img/empty-cart.png'
import vietnam from '../img/vietnam.png'
import ship1 from '../img/ship1.png'
import ship2 from '../img/ship2.png'


const CheckOut = () => {
    const { cart, total, deleteAllCart } = useContext(CartContext);
    const currentDate = new Date();
    const [order, setOrder] = useState({
        user_name: '',
        user_mail: '',
        user_phone: '',
        user_address: '',
        create_date: currentDate.toString(),
        status: 0,
    });
    const [orderDetail, setOrderDetail] = useState({
        order_id: '',
        product_id: '',
        quantity: '',
        price: '',
    });
    // console.log(cart)
    const [orders, setOrders] = useState([]);
    const [lastOrderId, setLastOrderId] = useState(0);

    useEffect(() => {
        const orderRef = ref(database, 'orders/');

        get(orderRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const ordersArray = [];
                    snapshot.forEach((childSnapshot) => {
                        const order = {
                            id: childSnapshot.key,
                            ...childSnapshot.val(),
                        };
                        ordersArray.push(order);
                    });

                    if (ordersArray.length > 0) {
                        setOrders(ordersArray);
                        const lastIndex = ordersArray.length - 1;
                        const lastOrder = ordersArray[lastIndex];
                        setLastOrderId(lastOrder.id);
                    }
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderRef = ref(database, 'orders');
            const orderDetalRef = ref(database, 'order_detail');
            const newOrderId = lastOrderId + 1;
            const newOrder = {
                id: newOrderId,
                ...order,
            };
            setOrders((prevOrders) => [...prevOrders, newOrder]);

            await push(orderRef, newOrder);
            const orderDetailsArray = cart.map((item) => ({
                order_id: newOrder.id,
                product_id: item.id,
                quantity: item.amount,
                price: item.price * item.amount,
            }));
            setTimeout(() => {
                for (const orderDetailItem of orderDetailsArray) {
                    push(orderDetalRef, orderDetailItem);
                }
                setOrderDetail({
                    order_id: '',
                    product_id: '',
                    quantity: '',
                    price: '',
                });
                setOrder({
                    user_name: '',
                    user_mail: '',
                    user_phone: '',
                    user_address: '',
                    create_date: currentDate.toString(),
                });
                deleteAllCart();
            }, 5000);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };
    document.querySelectorAll('.truck-button').forEach(button => {
        button.addEventListener('click', e => {

            e.preventDefault();

            let box = button.querySelector('.box'),
                truck = button.querySelector('.truck');

            if (!button.classList.contains('done')) {

                if (!button.classList.contains('animation')) {

                    button.classList.add('animation');

                    gsap.to(button, {
                        '--box-s': 1,
                        '--box-o': 1,
                        duration: .3,
                        delay: .5
                    });

                    gsap.to(box, {
                        x: 0,
                        duration: .4,
                        delay: .7
                    });

                    gsap.to(button, {
                        '--hx': -5,
                        '--bx': 50,
                        duration: .18,
                        delay: .92
                    });

                    gsap.to(box, {
                        y: 0,
                        duration: .1,
                        delay: 1.15
                    });

                    gsap.set(button, {
                        '--truck-y': 0,
                        '--truck-y-n': -26
                    });

                    gsap.to(button, {
                        '--truck-y': 1,
                        '--truck-y-n': -25,
                        duration: .2,
                        delay: 1.25,
                        onComplete() {
                            gsap.timeline({
                                onComplete() {
                                    button.classList.add('done');
                                }
                            }).to(truck, {
                                x: 0,
                                duration: .4
                            }).to(truck, {
                                x: 40,
                                duration: 1
                            }).to(truck, {
                                x: 20,
                                duration: .6
                            }).to(truck, {
                                x: 96,
                                duration: .4
                            });
                            gsap.to(button, {
                                '--progress': 1,
                                duration: 2.4,
                                ease: "power2.in"
                            });
                        }
                    });

                }

            } else {
                button.classList.remove('animation', 'done');
                gsap.set(truck, {
                    x: 4
                });
                gsap.set(button, {
                    '--progress': 0,
                    '--hx': 0,
                    '--bx': 0,
                    '--box-s': .5,
                    '--box-o': 0,
                    '--truck-y': 0,
                    '--truck-y-n': -26
                });
                gsap.set(box, {
                    x: -24,
                    y: -6
                });
            }

        });
    });

    if (cart.length === 0) {
        return <div className="flex justify-center items-center mx-auto min-h-screen">
            <img src={emptycart} />
        </div>
    } else {
        return (
            <div className="h-full w-full mt-24">
                <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
                                        ></a>
                                    <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Shop</span>
                                </li>
                                <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                                ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
                                    ></a>
                                <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Shipping</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                                    <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Payment</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                    <div className="px-4 pt-8">
                        <p className="text-xl font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Order Summary</p>
                        <p className=" bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Check your items. And select a suitable shipping method.</p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            <div className="flex w-full flex-col px-4 py-4">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                        <img
                                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                            src={item.image}
                                        />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">

                                                {item.title}
                                            </span>
                                            <span className="float-right bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">
                                                Quantity :  {item.amount}
                                            </span>
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-semi-bold text-gray-500">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <p className="text-lg font-semi-bold text-gray-500">
                                                    ${item.price.toFixed(2) * item.amount}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-8 text-lg font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Shipping Methods</p>
                        <form className="mt-5 grid gap-6">
                            <div className="relative">
                                <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label className="peer-checked:border-2 peer-checked:border-mints peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                                    <img className="w-14 object-contain" src={ship1} alt="" />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Fedex Delivery</span>
                                        <p className="bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent text-sm leading-6">Delivery: 2-4 Days</p>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label className="peer-checked:border-2 peer-checked:border-mints peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                                    <img className="w-14 object-contain" src={ship2} alt="" />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Fedex Delivery</span>
                                        <p className="bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent text-sm leading-6">Delivery: 2-4 Days</p>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Payment Details</p>
                        <p className="bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Complete your order by providing your payment details.</p>
                        <div className="">
                            <form onSubmit={handleSubmit} className='mb-8'>
                                <label htmlFor="user_mail" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Email</label>
                                <div className="relative">
                                    <input type='text'
                                        id='user_mail'
                                        name='user_mail'
                                        value={orders.user_mail}
                                        onChange={handleChange} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
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
                                        value={orders.user_name}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="relative w-7/12 flex-shrink-0">

                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        </div>
                                    </div>
                                    <div>
                                        <label for="phone" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Phone Number</label>
                                        <input
                                            type='text'
                                            id='user_phone'
                                            name='user_phone'
                                            value={orders.user_phone}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="+84" />
                                    </div>
                                </div>
                                <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Your Address</label>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="relative flex-shrink-0 sm:w-7/12">
                                        <input
                                            type='text'
                                            id='user_address'
                                            name='user_address'
                                            value={orders.user_address}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder=" Address" />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <img className="h-4 w-4 object-contain" src={vietnam} alt="" />
                                        </div>
                                    </div>
                                    <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                                        <option value="State">State</option>
                                    </select>
                                    <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
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
                                    <p className="text-sm font-medium bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">Total</p>
                                    <p className="text-2xl font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent">$ {parseFloat(total).toFixed(2)}</p>
                                </div>
                                <button onClick={handleSubmit} type="sumit" class="truck-button">
                                    <span class="default">Complete Order</span>
                                    <span class="success">
                                        Order Placed
                                        <svg viewbox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </svg>
                                    </span>
                                    <div class="truck">
                                        <div class="wheel"></div>
                                        <div class="back"></div>
                                        <div class="front"></div>
                                        <div class="box"></div>
                                    </div>
                                </button>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
};



export default CheckOut;