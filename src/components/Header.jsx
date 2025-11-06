import React from 'react';
import { Menu, Filter, MenuIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-black">
      <button aria-label="Menu">
        <MenuIcon className="w-5 h-5 text-white" strokeWidth={2} />
      </button>
      <button aria-label="Filter">
        <Filter className="w-5 h-5 text-white" strokeWidth={2} />
      </button>
    </header>
  );
};

export default Header;