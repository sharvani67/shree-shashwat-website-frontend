import React from 'react';


import Footer from '../Pages/Footer/Footer';
import { useAuth } from '../AuthContext/AuthContext';
import EcommerceCarousel from './Carousel';
import MasalaPastes from './buycards';
import Testimonials from './Testimonials';
import Commitment from './Commitment';
import OrderDetails from './OrderDetails';

function Home() {
  const { currentUser } = useAuth();

 console.log("Current User Details:", currentUser);
  return (
    <>
    
      <Header />
      <div className="home-page">    
         
       <EcommerceCarousel />
       <MasalaPastes />
       <Testimonials />
     
       
       
      </div>
    </>
  );
}

export default Home;