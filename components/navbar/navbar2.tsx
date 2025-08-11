"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/compat/router";
import ThemeSwitch from "../toggle/toggleSwitch";

const Navbar2: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLinksHovered, setIsLinksHovered] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Add scroll handler function
  const handleScroll = (e: React.MouseEvent<HTMLDivElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      
      // Special handling for home button
      if (href === '/#home') {
        // Check if we're on a different page
        if (window.location.pathname !== '/') {
          // Navigate to home page
          window.location.href = '/';
        } else {
          // If on same page, just scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      } else {
        // Original behavior for other sections
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "Leaderboard", href: "https://leaderboard-linpack.vercel.app/" },
    // { name: "Expense", href: "https://linpack-expense-tracker.vercel.app/" },
    // { name: "About Us", href: "/#aboutus" },
    { name: "Certificate", href: "/certificate" },
    { name: "Ticket", href: "/ticket" },
  ];

  const getItemStyle = (itemName: string) => {
    // Remove background color and shadow, use only text and hover effect
    return "hover:text-yellow-500 hover:underline underline-offset-8 transition-colors duration-200 bg-transparent shadow-none";
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
        bg-white/80 dark:bg-gray-900/80 shadow-2xl rounded-full px-4 py-2
        flex items-center justify-between
        w-[95vw] max-w-5xl
        md:w-[80vw] md:max-w-4xl
        border border-gray-200 dark:border-gray-700/50 backdrop-blur-lg
      `}
      style={{ transition: 'all 0.3s cubic-bezier(.4,2,.6,1)' }}
      onMouseEnter={() => setIsLinksHovered(true)}
      onMouseLeave={() => setIsLinksHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link href="/#home">
          <div className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Club Logo"
              width={36}
              height={36}
              className="rounded-full shadow-md"
            />
            <span className="whitespace-nowrap font-bold text-lg md:text-xl tracking-tight">MATLAB & LaTeX Club</span>
          </div>
        </Link>
      </div>
      {/* Spacer to prevent hover glitch */}
      <div className="hidden md:block" style={{ minWidth: 32, marginLeft: 16, marginRight: 16 }} />
      {/* Desktop Menu */}
      <div
        className={`hidden md:flex items-center space-x-2 md:space-x-6 lg:space-x-10 transition-all duration-300 ease-in-out`}
        style={{
          minWidth: 350,
          maxWidth: 700,
          width: '100%',
          justifyContent: 'center',
          background: 'transparent',
          borderRadius: 9999,
          boxShadow: isLinksHovered ? '0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 1.5px 6px 0 rgba(0,0,0,0.10)' : undefined,
        }}
      >
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              onClick={(e) => handleScroll(e, item.href)}
              className={`px-2 py-1 rounded-full text-lg font-semibold tracking-wide text-gray-700 dark:text-gray-200 ${getItemStyle(item.name)}
                ${router?.asPath === item.href ? 'text-yellow-500 underline' : ''}
              `}
              aria-label={item.name}
              style={{ cursor: 'pointer' }}
            >
              {item.name}
            </div>
          </Link>
        ))}
        <span className="ml-4 flex items-center"><ThemeSwitch /></span>
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <ThemeSwitch />
        <button
          onClick={toggleMenu}
          className="ml-2 text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/95 dark:bg-gray-900/95 rounded-b-2xl shadow-xl border-t border-gray-200 dark:border-gray-700/50 backdrop-blur-lg animate-fadeIn z-40">
          <div className="flex flex-col items-center space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <div
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`w-full text-center px-4 py-2 rounded-full text-base font-medium text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-all duration-200
                    ${getItemStyle(item.name)}
                    ${router?.asPath === item.href ? 'text-yellow-500 font-semibold' : ''}
                    shadow-sm hover:shadow-lg
                  `}
                  aria-label={item.name}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
