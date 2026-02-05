import React from 'react';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import EcommerceCarousel from '../../Customer/Home/Carousel';
import MasalaPastes from '../Home/buycards';
import TestimonialsSlider from '../../Customer/Home/Testimonials';
import Commitment from '../../Customer/Home/Commitment';




function Home() {
  return (
    <>
      <Header />
      <div className="home-page">     
       <EcommerceCarousel />
       <MasalaPastes />
       <TestimonialsSlider />
       <Commitment />
      </div>
      <Footer />
    </>
  );
}

export default Home;