import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Copyright as CopyrightIcon, Globe, Lock } from 'lucide-react';

const Copyright = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/branding/legal_bg.webp" 
            alt="Legal Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-1/3 flex justify-center"
            >
              <img 
                src="/assets/branding/flamy_legal.webp" 
                alt="Flamy Legal" 
                className="h-64 md:h-96 object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:w-2/3 text-center md:text-left"
            >
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-lg">
                Copyright
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section - Organic Overlap */}
      <section className="relative z-20 -mt-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-t-[80px] md:rounded-t-[120px] shadow-[0_-30px_60px_rgba(0,0,0,0.05)] p-12 md:p-24 border-t border-slate-50">
            <div className="prose prose-xl prose-slate max-w-none font-medium text-slate-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
            
            <div className="mb-20">
              <h2 className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-accent pb-4 flex items-center gap-4">
                <CopyrightIcon size={40} className="text-accent" /> Aviso de Propiedad Intelectual Global
              </h2>
              <p className="text-xl leading-relaxed mb-8">
                The Bumsy Company, en lo sucesivo "La Empresa", es la única y exclusiva titular de todos los derechos de propiedad intelectual e industrial sobre el portal bumsygo.com y todo su ecosistema digital. Nuestra protección se extiende bajo los marcos legales de la **OMPI (Organización Mundial de la Propiedad Intelectual)** y tratados internacionales como el **Convenio de Berna** y el **Tratado de la OMPI sobre Derecho de Autor (WCT)**.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Activos Protegidos</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex gap-3"><span className="text-accent">✔</span> **Personajes y Narrativa**: Bubu, Flamy, Sergi, Lola, Idara, Pipa y sus historias.</li>
                  <li className="flex gap-3"><span className="text-accent">✔</span> **Contenido Audiovisual**: Música original, arreglos, videos y animaciones.</li>
                  <li className="flex gap-3"><span className="text-accent">✔</span> **Software y Código**: Algoritmos de juegos, arquitectura y diseño UX/UI.</li>
                  <li className="flex gap-3"><span className="text-accent">✔</span> **Identidad Visual**: Logotipos, paletas de colores y tipografías registradas.</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Jurisdicciones Clave</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex gap-3"><Globe className="text-accent" /> **México**: Ley Federal del Derecho de Autor y Ley de la Propiedad Industrial (IMPI).</li>
                  <li className="flex gap-3"><Globe className="text-accent" /> **USA**: DMCA (Digital Millennium Copyright Act) y US Copyright Office.</li>
                  <li className="flex gap-3"><Globe className="text-accent" /> **Europa**: Directiva (UE) 2019/790 sobre Derechos de Autor en el Mercado Único Digital.</li>
                  <li className="flex gap-3"><Globe className="text-accent" /> **Sudamérica**: Decisión 351 de la Comunidad Andina y leyes nacionales.</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8">Aplicación de la Ley (Enforcement)</h2>
            <p className="mb-8">
              Cualquier reproducción, distribución, comunicación pública, transformación o cualquier otra actividad que se pueda realizar con los contenidos de nuestras páginas web, ni aun citando las fuentes, está estrictamente prohibida, salvo consentimiento por escrito de La Empresa. El incumplimiento de estas condiciones dará lugar al ejercicio de las acciones legales pertinentes, tanto civiles como penales.
            </p>

            <div className="bg-red-50 p-12 rounded-[50px] border-4 border-red-100 mb-20">
              <h3 className="text-2xl font-black text-red-900 mb-6 flex items-center gap-4">
                <Lock /> Política Anti-Piratería
              </h3>
              <p className="text-red-900/80 mb-6 font-bold">
                Monitoreamos activamente plataformas de terceros (YouTube, TikTok, Roblox, App Stores) para identificar el uso no autorizado de nuestros activos.
              </p>
              <p className="text-red-900/70 text-lg">
                Utilizamos sistemas de huella digital y marcas de agua digitales para rastrear y reclamar contenidos protegidos globalmente.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8">Reporte de Infracciones (DMCA Takedown)</h2>
            <p className="mb-10">
              Si usted cree que su trabajo ha sido copiado de una manera que constituye una infracción de derechos de autor, o si detecta que un tercero está utilizando activos de Bumsy Go de forma ilegal, por favor envíe una notificación detallada a nuestro agente de derechos de autor a: **legal@bumsygo.com**.
            </p>

            <p className="italic text-slate-400 mt-20 border-t pt-10">
              © 2026 The Bumsy Company. Todos los derechos reservados a nivel mundial. Esta página constituye una notificación legal formal bajo los tratados internacionales de propiedad intelectual.
            </p>
          </div>
        </div>
      </div>
    </section>
      </div>
    );
  };

export default Copyright;
