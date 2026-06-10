import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Camera, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-20 mb-20">
          {/* Brand Column */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <img src="/assets/branding/logo.webp?v=20260610_logo6" alt="Bumsy Go Logo" className="h-14 object-contain group-hover:scale-105 transition-transform" />
            </Link>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
              Contenidos, educación y diversión para los primeros momentos de los niños. Alegría en cada día.
            </p>
            <div className="flex gap-5">
              {[<Play size={20} />, <Camera size={20} />, <MessageCircle size={20} />, <Heart size={20} />].map((icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all transform hover:-translate-y-2 shadow-sm border border-slate-100">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 flex-1 md:max-w-3xl">
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-8 uppercase tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>Explora</h4>
              <ul className="space-y-4 font-medium text-slate-500 text-lg">
                <li><Link to="/characters" className="hover:text-slate-900 transition-colors">Personajes</Link></li>
                <li><Link to="/watch" className="hover:text-slate-900 transition-colors">Videos</Link></li>
                <li><Link to="/meet-and-play" className="hover:text-slate-900 transition-colors">Conoce y Juega</Link></li>
                <li><Link to="/news" className="hover:text-slate-900 transition-colors">Noticias</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-8 uppercase tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>Compañía</h4>
              <ul className="space-y-4 font-medium text-slate-500 text-lg">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Nuestra Historia</a></li>
                <li><a href="#" className="hover:text-accent transition-colors font-bold text-slate-800">Negocios</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Prensa</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Carreras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-8 uppercase tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>Soporte</h4>
              <ul className="space-y-4 font-medium text-slate-500 text-lg">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Consultas</a></li>
                <li><Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacidad</Link></li>
                <li><Link to="/terms" className="hover:text-slate-900 transition-colors">Términos</Link></li>
                <li><Link to="/copyright" className="hover:text-slate-900 transition-colors">Copyright</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global Network Section - Corporate Style */}
        <div className="relative rounded-[40px] p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden bg-white border border-slate-200 shadow-sm group">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl group-hover:bg-sky-50 transition-colors duration-700"></div>
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="bg-slate-900 p-5 rounded-3xl shadow-xl transform group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl filter invert brightness-200">🌍</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-2xl mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Red Global de Bumsy</p>
              <p className="text-slate-500 font-medium text-xl">Llevando aprendizaje y diversión a más de 150 países.</p>
            </div>
          </div>
          <button className="relative z-10 bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all whitespace-nowrap" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Explorar Red Global
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-medium">© 2026 The Bumsy Company. Todos los derechos reservados.</p>
          <div className="flex gap-10 font-bold text-sm uppercase tracking-[0.2em] text-slate-400">
             <Link to="/terms" className="hover:text-slate-900 transition-colors">Términos de Uso</Link>
             <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
