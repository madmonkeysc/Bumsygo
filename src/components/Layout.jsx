import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isTransparentHeader = location.pathname === '/' || location.pathname === '/business' || location.pathname === '/watch' || location.pathname === '/shop' || location.pathname === '/pro' || location.pathname === '/meet-and-play' || location.pathname === '/characters' || location.pathname === '/idara' || location.pathname === '/news';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${isTransparentHeader ? 'pt-0' : 'pt-24'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
