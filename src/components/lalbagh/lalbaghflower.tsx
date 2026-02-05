// import React from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import EventOverview from './components/EventOverview';
// import ProductShowcase from './components/ProductShowcase';
// import Benefits from './components/Benefits';
// import Testimonials from './components/Testimonials';
// import SpecialOffer from './components/SpecialOffer';
// import About from './components/About';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <div className="min-h-screen">
//       <Header />
//       <Hero />
//       <EventOverview />
//       <ProductShowcase />
//       <Benefits />
//       <Testimonials />
//       <SpecialOffer />
//       <About />
//       <Footer />
//     </div>
//   );
// }

// export default App;



import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header.tsx';
import Hero from './Hero.tsx';
import EventOverview from './EventOverview.tsx';
import ProductShowcase from './ProductShowcase.tsx';
import Benefits from './Benefits.tsx';
import Testimonials from './Testimonials.tsx';
import SpecialOffer from './SpecialOffer.tsx';
import About from './About.tsx';
import Footer from './Footer.tsx';

function Lalbaghflower() {
  return (
      <div className="min-h-screen">
        <Header />
        <Hero />
        <EventOverview />
        <ProductShowcase />
        <Benefits />
        <Testimonials />
        <SpecialOffer />
        <About />
        <Footer />
      </div>
  );
}

export default Lalbaghflower;