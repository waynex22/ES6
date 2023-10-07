import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import DashBoard from './pages/Admin/DashBoard';
import ProductDetails from './pages/ProductDetails';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductAdmin from './components/ProductAdmin';
import Orders from './components/Orders';
import AddProduct from './components/AddProduct';
import CategoryAdmin from './components/CategoryAdmin';
import AddCategory from './components/AddCategory';
import UpdateProduct from './components/UpdateProducts';
import CheckOut from './pages/CheckOut';
import News from './pages/News';
import MenuDashBoard from './components/MenuDashBoard';
import Contact from './pages/Contact';
import OrderDetail from './components/OrderDetail';
import CategoryProduct from './pages/CategoryProduct';
import PriceProducts from './pages/PriceProducts';

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
          <Route
            path='/shop/:name'
            element={
              <>
              <div className='flex flex-col min-h-screen'>
                <Header />
                <CategoryProduct />
                <Footer />
                </div>
              </>
            }
          />
          <Route
           path='/shop/filterPrice/:minMaxValues'
            element={
              <>
              <div className='flex flex-col min-h-screen'>
                <Header />
                <PriceProducts />
                <Footer />
                </div>
              </>
            }
          />
          <Route
            path='/checkout'
            element={
              <>
                <Header />
                <CheckOut />
                <Footer />
              </>
            }
          />
          <Route
            path='/news'
            element={
              <>
                <Header />
                <News />
                <Footer />
              </>
            }
          />
          <Route
            path='/contact'
            element={
              <>
              <div className='flex flex-col min-h-screen'>
                <Header />
                <Contact />
                <Footer />
                </div>
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
          <Route path='/ProductAdmin' element={
            <>
            <div className='flex flex-row justify-between'>
          <MenuDashBoard />
          <ProductAdmin />
          </div>
          </>
          }
           />
           <Route path='/Addproduct' element={
            <>
            <div className='flex flex-row justify-between'>
          <MenuDashBoard />
          <AddProduct />
          </div>
          </>
          }
           />
          <Route path='/Orders' element={
            <>
            <div className='flex flex-row justify-between'>
          <MenuDashBoard />
          <Orders />
          </div>
          </>
          }
           />
          <Route path='/CategoryAdmin' element={
            <>
            <div className='flex flex-row justify-between'>
          <MenuDashBoard />
          <CategoryAdmin />
          </div>
          </>
          }
           />
          <Route path='/AddCategory' element={
            <>
            <div className='flex flex-row justify-between'>
          <MenuDashBoard />
          <AddCategory />
          </div>
          </>
          }
           />
           <Route path='/updateproduct/:id' 
          element={
            <>
            <div className='flex flex-row justify-between'>
            <MenuDashBoard />
          <UpdateProduct />
          </div>
          </>
          }
          />
           <Route path='/OrderDetail/:orderId'
          element={
            <>
            <div className='flex flex-row justify-between'>
            <MenuDashBoard />
          <OrderDetail />
          </div>
          </>
          }
          />
           <Route path='/DashBoard' 
          element={
            <>
            <div className='flex'>
            <MenuDashBoard />
            <DashBoard />
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
