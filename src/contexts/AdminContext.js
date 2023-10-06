
import React ,{createContext , useState, useEffect} from 'react';
//  create context
import { get , push , ref } from 'firebase/database';
import { database } from '../firebase';
export const AdminContext = createContext(); 

const AdminProvider = ({children}) => {
  // get products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productRef = ref(database, 'products');
    get(productRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productArray = Object.entries(data).map(([key, product]) => ({
            key,
            ...product,
          }));
          setProducts(productArray);
          // console.log(productArray)
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  // get categories
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    const categoryRef = ref(database, 'categorys');
    get(categoryRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const categoryArray = Object.entries(data).map(([key, category]) => ({
            key,
            ...category,
          }));
          setCategorys(categoryArray);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  // get orders
  const [orders, setorders] = useState([]);
  useEffect(() => {
    const orderRef = ref(database, 'orders');
    get(orderRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const orderArray = Object.entries(data).map(([key, order]) => ({
            key,
            ...order,
          }));
          setorders(orderArray);
        }
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
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

return <AdminContext.Provider value={{ addProduct,  products, categorys ,orders}}>{children}</AdminContext.Provider>;
};

export default AdminProvider;
