// app/components/Navbar.tsx
import React from 'react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">Your App Name</h1>
        <button
          className="text-white p-2 cursor-pointer"
          onClick={onToggleSidebar}
        >
          Toggle Sidebar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
