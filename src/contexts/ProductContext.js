import React , {createContext, useState, useEffect} from 'react';
// create context
 export const ProductContext = createContext();


const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  // fecth product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://asges6-default-rtdb.firebaseio.com/products.json');
        const data = await response.json();
        const products = Object.values(data);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchProducts();
  }, []);
  return <ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
