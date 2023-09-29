import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/Admin/NavLeft';
import Products from './components/Admin/Products';
import DashBoard from './components/Admin/DashBoard';
import Orders from './components/Admin/Orders';
import AddProduct from './components/Admin/AddProduct';
import Category from './components/Admin/Category';
import AddCategory from './components/Admin/AddCategory';
import UpdateProduct from './components/Admin/UpdateProducts';
const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path='/shop'
            element={
              <>
                <Header />
                <Shop />
                <Footer />
              </>
            }
          />
          <Route path='/product/:id' 
          element={
            <>
            <Header />
          <ProductDetails />
          <Footer />
          </>
          }
          />
          <Route path='/admin' element={<DashBoard />} />
          <Route path='/admin/Products' element={
            <>
            <div className='flex flex-row justify-between'>
          <NavLeft />
          <Products />
          </div>
          </>
          }
           />
           <Route path='/admin/Addproduct' element={
            <>
            <div className='flex flex-row justify-between'>
          <NavLeft />
          <AddProduct />
          </div>
          </>
          }
           />
          <Route path='/admin/Orders' element={
            <>
            <div className='flex flex-row justify-between'>
          <NavLeft />
          <Orders />
          </div>
          </>
          }
           />
          <Route path='/admin/category' element={
            <>
            <div className='flex flex-row justify-between'>
          <NavLeft />
          <Category />
          </div>
          </>
          }
           />
          <Route path='/admin/addcategory' element={
            <>
            <div className='flex flex-row justify-between'>
          <NavLeft />
          <AddCategory />
          </div>
          </>
          }
           />
           <Route path='/updateproduct/:id' 
          element={
            <>
            <div className='flex flex-row justify-between'>
            <NavLeft />
          <UpdateProduct />
          </div>
          </>
          }
          />
        </Routes>
        <Sidebar />
      </Router>
    </div>
  );
};

export default App;
