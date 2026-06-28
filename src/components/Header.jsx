import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlayCircle, Users, Sparkles, Newspaper, ShoppingBag, LogIn, Briefcase, Gamepad2 } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isTransparentHeader = location.pathname === '/' || location.pathname === '/business' || location.pathname === '/watch' || location.pathname === '/shop' || location.pathname === '/pro' || location.pathname === '/meet-and-play' || location.pathname === '/characters' || location.pathname === '/idara' || location.pathname === '/news';
  const isIdaraPage = location.pathname === '/idara';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Aventuras', path: '/watch', icon: <PlayCircle size={18} /> },
    { name: 'Juegos', path: '/play', icon: <Gamepad2 size={18} /> },
    { name: 'Padres', path: '/meet-and-play', icon: <Users size={18} /> },
    { name: 'Negocios', path: '/business', icon: <Briefcase size={18} /> },
    { name: 'Bumsy Pro', path: '/pro', icon: <Sparkles size={18} className="text-pink-400" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isOpen
        ? 'bg-white py-4 shadow-md'
        : isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(8,112,184,0.08)] py-3 border-b border-white/40' 
          : isTransparentHeader 
            ? 'bg-transparent py-6' 
            : 'bg-white/90 backdrop-blur-md py-4 shadow-sm'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={isIdaraPage ? "/assets/idara/logo_idara.png" : "/assets/branding/logo.webp?v=20260611_logo8"} 
            alt={isIdaraPage ? "Idara y el loco Dael Logo" : "Bumsy Go Logo"} 
            className={`transition-all duration-300 ${
              isIdaraPage
                ? (isScrolled || isOpen) ? 'h-16 md:h-20' : 'h-24 md:h-28'
                : (isScrolled || isOpen) ? 'h-10' : 'h-14'
            } object-contain drop-shadow-md group-hover:scale-110 active:scale-95`}
          />
        </Link>

        {/* Central Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold text-[15px] uppercase tracking-wider hover:text-accent transition-all relative group flex items-center gap-2 ${
                location.pathname === link.path 
                  ? 'text-accent' 
                  : (isScrolled || !isTransparentHeader) ? 'text-primary' : 'text-white'
              }`}
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">{link.icon}</span>
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-full h-1.5 bg-accent rounded-full transform transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/shop" className="bg-[#FCF200] hover:bg-[#EDE400] text-black px-6 py-2.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95">
            <ShoppingBag size={18} /> Tienda
          </Link>
          <Link to="/crm" className={`font-bold hover:text-accent flex items-center gap-1 transition-colors ${
            (isScrolled || !isTransparentHeader) ? 'text-primary' : 'text-white'
          }`}>
            <LogIn size={18} /> Acceso
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors z-50 ${
            (isScrolled || !isTransparentHeader || isOpen) ? 'text-primary' : 'text-white'
          }`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white fixed inset-0 top-[72px] z-50 p-8 flex flex-col gap-6 animate-in slide-in-from-right overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 font-bold text-xl p-4 rounded-3xl ${location.pathname === link.path ? 'bg-accent/10 text-accent' : 'text-primary hover:bg-primary/5'}`}
            >
              <div className={location.pathname === link.path ? 'text-accent' : 'text-primary/40'}>{link.icon}</div>
              {link.name}
            </Link>
          ))}
          <hr className="border-primary/10" />
          <Link to="/shop" onClick={() => setIsOpen(false)} className="flex items-center gap-4 font-bold text-xl text-primary p-4 rounded-3xl hover:bg-primary/5">
            <ShoppingBag size={24} className="text-primary/40" /> Tienda
          </Link>
          <Link to="/crm" onClick={() => setIsOpen(false)} className="flex items-center gap-4 font-bold text-xl text-primary p-4 rounded-3xl hover:bg-primary/5 text-left">
            <LogIn size={24} className="text-primary/40" /> Acceso
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
