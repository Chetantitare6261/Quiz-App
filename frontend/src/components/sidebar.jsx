import { useState } from 'react';
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiMail, 
  FiHelpCircle, 
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import Avatar from 'boring-avatars';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const menuItems = [
    { name: 'home', icon: <FiHome size={20} />, label: 'Home' },
    { name: 'profile', icon: <FiUser size={20} />, label: 'Profile' },
    { name: 'messages', icon: <FiMail size={20} />, label: 'Messages', badge: 3 },
    { name: 'settings', icon: <FiSettings size={20} />, label: 'Settings' },
    { name: 'help', icon: <FiHelpCircle size={20} />, label: 'Help' },
    { name: 'logout', icon: <FiLogOut size={20} />, label: 'Logout' },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`fixed top-0 left-0 h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} flex flex-col z-50 shadow-xl`}>
        
        {/* Profile Section */}
        <div className={`p-4 flex items-center ${!isOpen ? 'justify-center' : 'border-b border-gray-300 dark:border-gray-700'}`}>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            CT
          </div>
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="font-medium truncate">Chetan Titare</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">chetantitare58@gmail.com</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
        >
          {isOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
        </button>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeItem === item.name 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="flex-shrink-0 relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isOpen && <span className="ml-3 text-left">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings Section */}
        <div className={`p-4 border-t border-gray-300 dark:border-gray-700 ${!isOpen && 'hidden'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Dark Mode</span>
            <button 
              onClick={toggleDarkMode}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              <span className="absolute inset-y-0 left-0 flex items-center pl-1">
                <FiMoon size={12} className={`${darkMode ? 'text-white' : 'text-gray-500'}`} />
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-1">
                <FiSun size={12} className={`${darkMode ? 'text-blue-200' : 'text-yellow-500'}`} />
              </span>
            </button>
          </div>
          {isOpen && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Chetan Titare © 2025
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;