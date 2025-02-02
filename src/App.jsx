import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import ScrollToTopButton from './components/ScrollToTopButton';
import Snackbar from './components/Snackbar';
import Menu from './components/Menu';
import ScrollToTop from './utils/ScrollToTop';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
const App = () => {
  
  return <div>
    <Router className='relative'>
      <ScrollToTopButton/>
      <ScrollToTop/>
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/products' element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Sidebar />
      <Menu />
      <Footer />
      <Snackbar/>
    </Router>
  </div>;
};

export default App;
