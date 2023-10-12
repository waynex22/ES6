import React , {createContext, useState, useEffect} from 'react';
// create context
import PropTypes from 'prop-types'; // Import PropTypes
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
    fecthOrders();
  }, [])

  
  return <OrderContext.Provider value={{orders}}>{children}</OrderContext.Provider>;
};
OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderProvider;
