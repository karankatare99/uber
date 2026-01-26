"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, Settings } from "lucide-react";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isLoggedIn = false; 

  const navLinks = [
    { name: "Ride", href: "/ride" },
    { name: "Drive", href: "/drive" },
    { name: "Business", href: "/business" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Montserrat (font-sans) for geometric boldness */}
          <Link href="/" className="flex items-center gap-1 group z-50">
            <span className="text-2xl font-black font-sans tracking-tight">UBER</span>
            {/* 'CLONE' in Condensed for contrast */}
            <span className="text-2xl font-black font-condensed text-yellow-400 tracking-tighter">CLONE</span>
          </Link>

          {/* Desktop Nav - Roboto Condensed for clean, dense links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-bold font-condensed uppercase tracking-wider hover:text-yellow-400 transition-colors ${pathname === link.href ? 'text-yellow-400' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-neutral-800 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-700 border border-yellow-400 flex items-center justify-center text-xs font-bold font-sans">
                    JD
                  </div>
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white text-black rounded-xl shadow-2xl overflow-hidden py-1 border border-neutral-100"
                    >
                      <div className="px-4 py-3 border-b border-neutral-100">
                        <p className="text-sm font-bold font-sans">John Doe</p>
                        <p className="text-xs text-neutral-500 font-condensed font-bold uppercase">Gold Member</p>
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2 text-sm font-medium hover:bg-neutral-100 font-sans">
                        <Settings size={16} className="mr-2" /> Settings
                      </Link>
                      <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 font-sans">
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-sm font-bold font-condensed uppercase tracking-wide hover:text-yellow-400">Log in</Link>
                <Link href="/auth/register">
                    <Button variant="primary" className="!py-2 !px-5 !text-sm rounded-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-yellow-400 transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-16 bg-black z-40 md:hidden flex flex-col p-6"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="block text-3xl font-black font-sans tracking-tight text-white hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-neutral-800 w-full my-6" />
              {!isLoggedIn && (
                <div className="space-y-4">
                  <Link href="/auth/login" className="block text-xl font-bold font-condensed uppercase text-white" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                  <Link href="/auth/register" className="block w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button fullWidth variant="primary">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;