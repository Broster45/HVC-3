import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/core-foundations", label: "Core Foundations" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo className="scale-75 sm:scale-100 origin-left" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-200 text-sm lg:text-base ${
                  location === link.href
                    ? 'text-brand-green-light'
                    : 'text-brand-charcoal hover:text-brand-green-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <button className="bg-brand-green hover:bg-brand-green-light font-semibold px-4 lg:px-6 py-2 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-brand-green hover:border-brand-green-light text-[#000000] text-sm lg:text-base">
                Get a Free Quote
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-charcoal hover:text-brand-green-light"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 font-medium rounded-md transition-all duration-200 ${
                    location === link.href
                      ? 'brand-green-light bg-brand-light'
                      : 'brand-charcoal hover:brand-green-light hover:bg-brand-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2 pt-4">
                <Link href="/contact">
                  <button className="w-full bg-brand-green hover:bg-brand-green-light font-semibold py-3 px-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-brand-green hover:border-brand-green-light text-[#000000] touch-manipulation">
                    Get a Free Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
