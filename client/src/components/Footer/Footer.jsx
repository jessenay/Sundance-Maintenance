// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Sundance Lift Maintenance. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
