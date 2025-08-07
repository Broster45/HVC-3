import { Link } from "wouter";

import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo variant="white" />
          </div>
          
          {/* Contact info and social media */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Contact details */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-300">
              <a href="tel:(760) 522-9797" className="hover:text-white transition-colors duration-200 font-medium text-white">
                (760) 522-9797
              </a>
              <a href="mailto:hvc.phil@gmail.com" className="hover:text-white transition-colors duration-200 font-medium text-white">
                hvc.phil@gmail.com
              </a>
            </div>
            
            
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p className="text-sm text-white">© 2025 Highland Valley Construction. All rights reserved. | Licensed & Insured (CSLB License #855529)</p>
        </div>
      </div>
    </footer>
  );
}
