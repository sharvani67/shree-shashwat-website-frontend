import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhatApp from  '../../Customer/WhatsApp/WhatApp';
import ScrollUp from '../../Customer/ScrollUp/ScrollUp';
import { useAuth } from '../../AuthContext/AuthContext';
import EcommerceCarousel from './Carousel';
import MasalaPastes from './buycards';
import Testimonials from './Testimonials';
import Commitment from './Commitment';
import FeaturedProducts from './AnimatedBanner';
import JoinWhatsApp from './JoinWhatsApp';
import BulkOrderSection from '../AboutUs/BulkOrderSection';
import EventOrderSection from '../AboutUs/EventOrderSection';

import FoodOfferPopup from '../OfferPopup';


function Home() {
  const { currentUser } = useAuth();
  console.log("Current User Details:", currentUser);
  return (
    <>
      <Header />
      {/* <WhatApp /> */}
      <ScrollUp />
      <div className="home-page">
        {/* <EcommerceCarousel /> */}
        <MasalaPastes />
        {/* <FoodOfferPopup /> */}
        
        {/* <FeaturedProducts /> */}
        {/* <EventOrderSection /> */}
        {/* <BulkOrderSection /> */}
        
        <Testimonials />
      
      </div>
      <Footer />
    </>
  );
}

export default Home;