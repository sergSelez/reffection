'use client';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BtnTop from '@/components/utilities/BtnTop/BtnTop';
import ScrollToHash from '@/components/utilities/ScrollToHash/ScrollToHash';

export default function App({ children }) {
  const [useAnimate, setUseAnimate] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [overflowActiveMenu, setOverflowActiveMenu] = useState(false);

  return (
    <div className={`App ${activeMenu ? 'active' : ''} ${overflowActiveMenu || activeMenu ? 'overflow' : ''}`}>
      <Header activeMenu={setActiveMenu} overflowActiveMenu={setOverflowActiveMenu} />
      <main>{children}</main>
      <Footer />
      <BtnTop />
      <ScrollToHash />
    </div>
  );
}
