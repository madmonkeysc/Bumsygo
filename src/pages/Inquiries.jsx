import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, HelpCircle, Check, Send, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Inquiries = () => {
  useSEO({
    title: 'Consultas y Soporte - Contacto Bumsy Go',
    description: '¿Tienes dudas sobre Bumsy Go, el control parental o alianzas comerciales? Contáctanos a través de nuestro portal de soporte.',
    image: '/assets/hero/bg_bumsy_go.webp'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'soporte',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const faqItems = [
    {
      q: "¿Cómo configuro el control parental?",
      a: "Puedes acceder al Portal de Padres (CRM) iniciando sesión en la esquina superior derecha. En la sección 'Control Parental' podrás ajustar límites diarios de 15, 30 o 45 minutos."
    },
    {
      q: "¿Tienen costo las descargas de actividades?",
      a: "No, en la Tienda tenemos una sección exclusiva llamada 'Regalos' con coloreables de Bubu, Flamy, Lola y sopas de letras listos para descargar de forma 100% gratuita."
    },
    {
      q: "¿Cómo contacto por licenciamiento comercial?",
      a: "Si representas a una marca y deseas alianzas o productos físicos de Bumsy Go, puedes agendar una cita directa por TidyCal en la sección de Negocios de nuestra plataforma."
    }
  ];

  return (
    <div className="pb-24 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/hero/bumsy_wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="bg-white/20 backdrop-blur-md text-white font-black text-xs md:text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg border border-white/30 inline-flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-yellow-300 animate-pulse" /> SOPORTE Y CONTACTO
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Consultas
            </h1>
            <p className="text-lg md:text-2xl font-bold opacity-90 max-w-2xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ¿Tienes alguna duda o propuesta? Nuestro equipo está listo para ayudarte.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Main Grid: Form + Help info */}
      <section className="py-20 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Block: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="inquiry-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Envíanos un mensaje
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Nombre completo</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-400"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Correo electrónico</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-400"
                          placeholder="tu@correo.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Tipo de consulta</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-400"
                      >
                        <option value="soporte">Soporte Técnico / CRM</option>
                        <option value="pedagogico">Dudas Pedagógicas</option>
                        <option value="negocio">Alianzas y Negocios</option>
                        <option value="otro">Otras Consultas</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Mensaje</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-400 resize-none"
                        placeholder="Escribe tu consulta aquí..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black py-5 rounded-2xl uppercase tracking-wider transition-all transform hover:scale-[1.01] shadow-lg shadow-emerald-500/20"
                    >
                      <Send size={18} /> Enviar Mensaje
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center text-emerald-500 shadow-xl mb-4">
                      <Check size={40} strokeWidth={3} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      ¡Consulta Recibida!
                    </h3>
                    <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-md mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Gracias <span className="font-bold text-slate-900">{formData.name}</span>, hemos recibido tu mensaje correctamente. Nuestro equipo pedagógico o de soporte te responderá a <span className="font-bold text-slate-900">{formData.email}</span> en menos de 24 horas hábiles.
                    </p>
                    <button
                      onClick={() => {
                        setFormData({ name: '', email: '', type: 'soporte', message: '' });
                        setSubmitted(false);
                      }}
                      className="mt-6 text-sm font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest"
                    >
                      Enviar otra consulta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Block: Help Info & FAQ */}
            <div className="lg:col-span-5 space-y-12">
              {/* Support channels card */}
              <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MessageCircle size={100} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Canales Oficiales
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">Correo Principal</h4>
                      <a href="mailto:soporte@bumsygo.com" className="text-xs text-slate-400 font-semibold hover:text-white transition-colors">soporte@bumsygo.com</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 shrink-0">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">Soporte Escolar</h4>
                      <a href="mailto:alianzas@bumsygo.com" className="text-xs text-slate-400 font-semibold hover:text-white transition-colors">alianzas@bumsygo.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <HelpCircle className="text-emerald-500" size={22} /> Respuestas Rápidas
                </h3>
                
                <div className="space-y-4">
                  {faqItems.map((faq, i) => (
                    <div key={i} className="border border-slate-100 rounded-3xl p-6 bg-slate-50/50">
                      <h4 className="font-bold text-slate-900 text-sm uppercase mb-2">{faq.q}</h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Inquiries;
