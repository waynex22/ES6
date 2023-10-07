import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../contexts/AdminContext";
import {  ref } from 'firebase/database';
import {database} from '../firebase'

const Statistics = () => {
    const [totalSale , setTotalSale] = useState(0);
    const [quantityProduct , setquantityProduct] = useState(0);
    const {getData} = useContext(AdminContext);
    useEffect(() => {
        const refOrderDetail = ref(database, 'order_detail')
        getData(refOrderDetail)
        .then((dataArray) => {
            if(dataArray) {
                const total = dataArray.reduce((acamulator, currenItem) => {
                    return acamulator + currenItem.price;
                  }, 0)
                  setTotalSale(total)
                const totalquantityProduct = dataArray.reduce((acamulator, currenItem) => {
                    return acamulator + currenItem.quantity;
                  }, 0)
                  setquantityProduct(totalquantityProduct)
            }
        })
    })
    return (
        <div className='bg-white p-4 shadow-md rounded-md '>
        <h2 className='text-xl font-semibold bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Sales Data</h2>
        <p className=' mt-2 bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Total Sales: ${totalSale}</p>
        <p className=' mt-2 bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Total products purchased: {quantityProduct}</p>
    </div>
    )
}

export default Statistics;