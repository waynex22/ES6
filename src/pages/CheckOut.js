import React from 'react';
const CheckOut = () =>{
return (
    <div className='bg-white rounded-lg shadow-md p-8 mx-auto mb-60 mt-60 max-w-lg'>
        <h1 className='text-2xl font-semibold mb-6'>Checkout</h1>

        <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-4'>Product Information</h2>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <p className='text-gray-700'>Product Name 1</p>
                </div>
                <div>
                    <p className='text-right'>$10.00</p>
                </div>
                <div className='col-span-2'>
                    <p className='text-gray-700'>Product Name 2</p>
                </div>
                <div>
                    <p className='text-right'>$15.00</p>
                </div>
            </div>
        </div>

        <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-4'>Payment Information</h2>
            <div>
                <label for='card_number' className='block text-gray-600'>Card Number</label>
                <input type='text' id='card_number' name='card_number' className='w-full px-4 py-2 rounded-md border focus:ring focus:ring-blue-300' placeholder='1234 5678 9012 3456' />
            </div>
            <div className='mt-4'>
                <label for='expiry_date' className='block text-gray-600'>Expiry Date</label>
                <input type='text' id='expiry_date' name='expiry_date' className='w-full px-4 py-2 rounded-md border focus:ring focus:ring-blue-300' placeholder='MM/YY'/>
            </div>
            <div className='mt-4'>
                <label for='cvv' className='block text-gray-600'>CVV</label>
                <input type='text' id='cvv' name='cvv' className='w-full px-4 py-2 rounded-md border focus:ring focus:ring-blue-300' placeholder='123'/>
            </div>
        </div>
        <div className='mt-6'>
            <p className='text-lg font-semibold text-right'>Total Amount: $25.00</p>
        </div>
        <div className='mt-6'>
            <button className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300' type='submit'>Complete Purchase</button>
        </div>
    </div>
)
}

export default CheckOut;