import React , {createContext, useState, useEffect} from 'react';
// create context
 export const OrderContext = createContext();


const OrderProvider = ({children}) => {
  const [orders, setOrders] = useState([]);
  // fecth order
  useEffect(() => {
    const fecthOrders = async ()=> {
      const reponse = await fetch('https://asges6-default-rtdb.firebaseio.com/orders.json');
      const data = await reponse.json();
      const orders = Object.values(data);
      setOrders(orders);
    };
    if(data.length === 0){
      return <div className='flex justify-center items-center mx-auto'>
        <LoadingSpinner />
      </div>
    }
    fecthOrders();
  }, [])

  
  return <OrderContext.Provider value={{orders}}>{children}</OrderContext.Provider>;
};

export default OrderProvider;
