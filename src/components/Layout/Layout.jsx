import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
