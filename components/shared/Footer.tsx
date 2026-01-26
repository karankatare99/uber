"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tight font-sans">
              UBER<span className="text-yellow-400 font-condensed">CLONE</span>
            </h3>
            <p className="text-neutral-400 text-sm font-medium leading-relaxed font-sans">
              Moving people, and the things they love.
            </p>
          </div>

          {/* Links Sections - Using Condensed for a clean list look */}
          <div>
            <h4 className="font-bold mb-6 text-lg font-sans">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-condensed font-medium tracking-wide">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">About us</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Our offerings</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Newsroom</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Investors</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg font-sans">Products</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-condensed font-medium tracking-wide">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Ride</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Drive</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Deliver</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Eat</Link></li>
            </ul>
          </div>

           <div>
            <h4 className="font-bold mb-6 text-lg font-sans">Global Citizenship</h4>
            <ul className="space-y-4 text-sm text-neutral-400 font-condensed font-medium tracking-wide">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Safety</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Diversity and Inclusion</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Sustainability</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800">
          <div className="flex space-x-6 mb-4 md:mb-0">
             {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <div key={i} className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 cursor-pointer transition-colors text-white">
                    <Icon size={18} />
                </div>
             ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-xs text-neutral-500 font-condensed font-bold uppercase tracking-wide">
             <div className="flex items-center space-x-2 cursor-pointer hover:text-white">
                <Globe size={14} />
                <span>English</span>
             </div>
             <Link href="#" className="hover:text-white">Privacy</Link>
             <Link href="#" className="hover:text-white">Accessibility</Link>
             <Link href="#" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;