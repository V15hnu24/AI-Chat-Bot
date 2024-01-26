import React from 'react';
import midasLogo from '../public/logo.jpeg';
import Image from "next/image";

function Header() {
  return (
    <header className="bg-gray-200 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <Image
            src={midasLogo}
            alt="Logo"
            width="100"
            height="880"
            className="d-inline-block align-text-top"
        />
        
        {/* Company name on the right */}
        <div className="font-serif text-black text-lg font-semibold">AI-Chat BOT</div>

      </div>
    </header>
  );
}

export default Header;
