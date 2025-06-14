import React, { useEffect, useState } from 'react';
import '../css/Footer.css';

const Footer = () => {
  const [visible, setVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setVisible(true); // 스크롤 위로
      } else {
        setVisible(false); // 스크롤 아래로
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer-fixed text-center ${visible ? '' : 'hidden'}`}>
      <p>© 2025 Ool-Rrim. All rights reserved.</p>
      <p>Contact: leejaeseong0307@gmail.com</p>
      <p><a href="/terms" className="footer-link">이용약관</a> | <a href="/privacy" className="footer-link">개인정보처리방침</a></p>
    </footer>
  );
};

export default Footer;
