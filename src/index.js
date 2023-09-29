import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductProvider from './contexts/ProductContext';
// sidebar
import SidebarProvider from './contexts/SidebarContext'
// cart provider
import CartProvider from './contexts/CartContext';
import CategoryProvider from './contexts/CategoryContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CategoryProvider>
    <SidebarProvider>
      <CartProvider>
        <ProductProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ProductProvider>
      </CartProvider>
    </SidebarProvider>
  </CategoryProvider>
);
