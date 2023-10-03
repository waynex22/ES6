
import React ,{createContext, useState} from 'react';
//  create context
import { get , push , ref } from 'firebase/database';
import { database } from '../firebase';
export const AdminContext = createContext(); 

const AdminProvider = ({children}) => {
  const addProduct = async (productData) => {
    try {
      const productRef = ref(database, 'products');
      const newProductRef = await push(productRef, productData);
      console.log('Product added successfully with key:', newProductRef.key);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
return <AdminContext.Provider value={{ addProduct}}>{children}</AdminContext.Provider>;
};

export default AdminProvider;
