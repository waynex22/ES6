
import React ,{createContext , useState, useEffect} from 'react';
//  create context
import PropTypes from 'prop-types';
import { get , push , ref, onValue } from 'firebase/database';
import { database } from '../firebase';
export const AdminContext = createContext(); 

const AdminProvider = ({children}) => {
  // getData from firebase

  const getData = (ref) => {
    return get(ref) // Assuming `get` is a Firebase function
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dataArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          return dataArray;
        } else {
          return null; // Return null if the data doesn't exist
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error; // You can choose to handle errors differently if needed
      });
  };
  // get products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = ref(database, 'products');
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productArray = Object.entries(data).map(([key, product]) => ({
          key,
          ...product,
        }));
        setProducts(productArray);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // get categories
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    const categoryRef = ref(database, 'categorys');
    const categories = onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productArray = Object.entries(data).map(([key, category]) => ({
          key,
          ...category,
        }));
        setCategorys(productArray);
      }
    });
    return () => {
      categories();
    };
  }, []);
  // get orders
  const [orders, setorders] = useState([]);
  useEffect(() => {
    const orderRef = ref(database, 'orders');
    const orderData = onValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orderArray = Object.entries(data).map(([key, order]) => ({
          key,
          ...order,
        }));
        setorders(orderArray);
      }
    });
    return () => {
      orderData();
    };
  }, []);
  // get orderDetail
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    const orderRef = ref(database, 'order_detail');
    const orderData = onValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orderArray = Object.entries(data).map(([key, orderDetail]) => ({
          key,
          ...orderDetail,
        }));
        setOrderDetail(orderArray);
      }
    });
    return () => {
      orderData();
    };
  }, []);
  const addProduct = async (productData) => {
    try {
      const productRef = ref(database, 'products');
      const newProductRef = await push(productRef, productData);
      console.log('Product added successfully with key:', newProductRef.key);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

return <AdminContext.Provider value={{ getData , addProduct,  products, categorys ,orders, orderDetail}}>{children}</AdminContext.Provider>;
};
AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminProvider;
