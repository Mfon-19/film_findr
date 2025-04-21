import Link from 'next/link';
import React from 'react'; 
import Logo from './logo';
import SearchBar from './search-bar';
import MobileNav from './mobile-nav';

const Header = () => {
  return (
    <header className='relative flex items-center justify-between bg-[#0B304F] h-[64px] text-white p-5'>
      {/* Logo */}
      <div className='flex items-center'>
         <Logo />
      </div>

      {/* Desktop Navigation & Search & Auth */}
      <div className='hidden md:flex items-center gap-8'>
        {/* Main Nav */}
        <nav className='flex items-center gap-8'>
          <Link href={"#"} className="hover:opacity-80">Movies</Link>
          <Link href={"#"} className="hover:opacity-80">TV Shows</Link>
          <Link href={"#"} className="hover:opacity-80">More</Link>
        </nav>
        {/* Search */}
        <SearchBar />
        {/* Auth */}
        <div className='flex items-center gap-6 ml-4'> 
          <button className='hover:opacity-80'>Join FilmFindr</button>
          <button className='hover:opacity-80'>Login</button> 
        </div>
      </div>

      {/* Mobile Navigation Controls */}
      <MobileNav /> 
      
    </header>
  );
};

export default Header;