import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-fixed text-center">
      <p>© 2025 Oolrim. All rights reserved.</p>
      <p>Contact: leejaeseong0307@gmail.com</p>
      <p><a href="/terms" className="footer-link">이용약관</a> | <a href="/privacy" className="footer-link">개인정보처리방침</a></p>
    </footer>
  );
};

export default Footer;
