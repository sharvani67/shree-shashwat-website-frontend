import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/logo.png';
import './Header.css'; // 👈 Import the CSS

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#products">Products</a>
          <a href="#benefits">Benefits</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X width={20} height={20} color="#be123c" />
          ) : (
            <Menu width={20} height={20} color="#be123c" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <a href="#products">Products</a>
          <a href="#benefits">Benefits</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
        </div>
      )}
    </header>
  );
};

export default Header;
