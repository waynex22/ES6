import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PropTypes from 'prop-types';
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
import ThanksOrder from './components/ThanksOrder';

const App = () => {
  const Layout = ({ children }) => {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const LayoutAdmin = ({ children }) => {
    return (
      <>
        <div className='flex flex-row justify-between'>
          <MenuDashBoard />
          {children}
        </div>
      </>
    )
  }
  LayoutAdmin.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout><Home /></Layout>}
        />
        <Route
          path="/shop"
          element={<Layout><Shop /></Layout>}
        />
        <Route
          path="/product/:id"
          element={<Layout><ProductDetails /></Layout>}
        />

        <Route
          path="/shop/:name"
          element={<Layout><CategoryProduct /></Layout>}
        />
        <Route
          path="/shop/filterPrice/:minMaxValues"
          element={<Layout><PriceProducts /></Layout>}
        />
        <Route
          path="/checkout"
          element={<Layout><CheckOut /></Layout>}
        />
        <Route
          path="/checkout/ThanksOrder"
          element={<Layout><ThanksOrder /></Layout>}
        />
        <Route
          path="/news"
          element={<Layout><News /></Layout>}
        />
        <Route
          path="/contact"
          element={<Layout><Contact /></Layout>}
        />
        {/* Admin */}
        <Route
          path='/Admin/DashBoard'
          element={<LayoutAdmin><DashBoard /></LayoutAdmin>}
        /><Route
          path='/Admin/Product'
          element={<LayoutAdmin><ProductAdmin /></LayoutAdmin>}
        />
        <Route
          path='/Admin/AddProduct'
          element={<LayoutAdmin><AddProduct /></LayoutAdmin>}
        />
        <Route
          path='/Admin/editProduct/:id'
          element={<LayoutAdmin><UpdateProduct /></LayoutAdmin>}
        />
        <Route
          path='/Admin/Categories'
          element={<LayoutAdmin><CategoryAdmin /></LayoutAdmin>}
        />
        <Route
          path='/Admin/AddCategory'
          element={<LayoutAdmin><AddCategory /></LayoutAdmin>}
        />
        <Route
          path='/Admin/Orders'
          element={<LayoutAdmin><Orders /></LayoutAdmin>}
        />
        <Route
          path='/Admin/OrderDetail/:orderId'
          element={<LayoutAdmin><OrderDetail /></LayoutAdmin>}
        />
      </Routes>
      <Sidebar />
    </Router>
  );
}

export default App;
