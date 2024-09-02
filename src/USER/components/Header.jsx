import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-white bg-black">
        <div>
          <NavLink to="/">
            DanMartGlobal
          </NavLink>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggleMenu}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`} id="menu">
          <ul className="pt-4 text-base text-white md:flex md:justify-between items-center md:pt-0">
            <li>
              <NavLink className="md:p-4 py-2 block hover:text-[#FFD700]" to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="md:p-4 py-2 block hover:text-[#FFD700]" to="/about" onClick={closeMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="md:p-4 py-2 block hover:text-[#FFD700]" to="/contact" onClick={closeMenu}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
