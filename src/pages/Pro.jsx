import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, ArrowRight, Lock, ShieldCheck, 
  X, Gift, Tag, Play, Gamepad2, Music, Calendar, 
  MessageSquare, BookOpen, EyeOff, CreditCard, ChevronRight 
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Pro = () => {
  useSEO({
    title: 'Bumsy Pro - Membresía Premium',
    description: 'Únete a Bumsy Pro y obtén regalos mensuales, descuentos de tienda, acceso anticipado y mucho más por solo $3 USD o $99 MXN/mes.',
    image: '/assets/branding/shop_bg_next.webp'
  });

  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // 'promo', 'mxn', 'usd'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Notification State
  const [notification, setNotification] = useState(null);

  const triggerNotification = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check login on mount
  useEffect(() => {
    const saved = localStorage.getItem('bumsy_crm_logged_user');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    if (!currentUser) {
      setShowRegisterModal(true);
    } else {
      executeCheckout(plan, currentUser);
    }
  };

  const executeCheckout = async (plan, user) => {
    setIsSubmitting(true);
    setErrorMsg('');
    
    let endpoint = '';
    let bodyData = {
      buyerEmail: user.email,
      buyerName: user.name
    };

    if (plan === 'promo') {
      endpoint = '/mercadopago_promo.php';
    } else {
      endpoint = '/mercadopago_subscription.php';
      bodyData.currency = plan === 'mxn' ? 'MXN' : 'USD';
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      if (data.init_point) {
        triggerNotification('Redirigiendo a Mercado Pago...', 'success');
        window.location.href = data.init_point;
      } else {
        setErrorMsg('Error de configuración de Mercado Pago. Intenta de nuevo.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al conectar con el servidor de pagos.');
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regPhone) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    // Load existing clients
    const savedClients = localStorage.getItem('bumsy_crm_clients');
    let clients = [];
    if (savedClients) {
      try {
        clients = JSON.parse(savedClients);
      } catch (err) {
        clients = [];
      }
    }

    const emailExists = clients.some(c => c.email.toLowerCase() === regEmail.toLowerCase());
    if (emailExists) {
      setErrorMsg('Este correo electrónico ya está registrado.');
      return;
    }

    // Create client
    const newClient = {
      id: Date.now(),
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      interest: 'Bumsy Pro',
      registeredAt: new Date().toISOString(),
      notes: 'Registrado desde la página de Bumsy Pro.',
      address: '',
      birthday: ''
    };

    const updatedClients = [...clients, newClient];
    localStorage.setItem('bumsy_crm_clients', JSON.stringify(updatedClients));
    localStorage.setItem('bumsy_crm_logged_user', JSON.stringify(newClient));
    
    setCurrentUser(newClient);
    setShowRegisterModal(false);
    
    // Continue checkout
    executeCheckout(selectedPlan, newClient);
  };

  return (
    <div className="min-h-screen bg-[#0d091a] text-slate-100 pb-24 pt-28 md:pt-44 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 rounded-full px-6 py-2 mb-6 shadow-lg backdrop-blur-md"
          >
            <Sparkles className="text-pink-400" size={16} />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-pink-300">Club Mágico Premium</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-pink-300 bg-clip-text text-transparent"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            BUMSY PRO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-2xl text-slate-300 font-semibold leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Únete hoy y obtén contenido digital exclusivo, descuentos únicos y acceso premium ilimitado a todo el universo de Bumsy Go.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-28">
          
          {/* Plan 1: Promo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative bg-gradient-to-b from-emerald-950/40 to-slate-950/80 border-2 border-emerald-500 rounded-[32px] p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(16,185,129,0.1)] overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              🔥 Oferta Limitada
            </div>
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">PROMO BIENVENIDA</h3>
              <p className="text-slate-400 text-xs font-semibold mb-6">El pase perfecto para probar la experiencia premium completa.</p>
              
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-emerald-400">$3</span>
                <span className="text-slate-300 font-extrabold text-lg mb-1">USD</span>
                <span className="text-slate-400 text-sm font-semibold ml-2">/ 3 meses</span>
              </div>

              <ul className="flex flex-col gap-4 text-xs font-semibold text-slate-300 border-t border-slate-800/80 pt-6">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400 shrink-0" size={16} /> Acceso completo por 3 meses</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400 shrink-0" size={16} /> Descuentos del 20% en tienda</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400 shrink-0" size={16} /> Auto-renovación a $99 MXN/mes</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-400 shrink-0" size={16} /> Cancelación simple en 1 clic</li>
              </ul>
            </div>
            
            <button
              onClick={() => handlePlanClick('promo')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase py-4 rounded-2xl tracking-wider transition-colors shadow-lg shadow-emerald-500/20 mt-8"
            >
              Obtener Promo
            </button>
          </motion.div>

          {/* Plan 2: MXN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative bg-gradient-to-b from-purple-950/20 to-slate-950/80 border border-purple-500/30 rounded-[32px] p-8 flex flex-col justify-between hover:border-purple-500/60 shadow-xl group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              🇲🇽 México
            </div>
            <div>
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">PRO PLAN MXN</h3>
              <p className="text-slate-400 text-xs font-semibold mb-6">Membresía mensual recurrente para usuarios en México.</p>
              
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-purple-400">$99</span>
                <span className="text-slate-300 font-extrabold text-lg mb-1">MXN</span>
                <span className="text-slate-400 text-sm font-semibold ml-2">/ mes</span>
              </div>

              <ul className="flex flex-col gap-4 text-xs font-semibold text-slate-300 border-t border-slate-800/80 pt-6">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400 shrink-0" size={16} /> Cobro mensual recurrente</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400 shrink-0" size={16} /> Recursos educativos y cuentos</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400 shrink-0" size={16} /> Juegos y niveles desbloqueados</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-purple-400 shrink-0" size={16} /> Regalos exclusivos cada mes</li>
              </ul>
            </div>
            
            <button
              onClick={() => handlePlanClick('mxn')}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black text-sm uppercase py-4 rounded-2xl tracking-wider transition-colors shadow-lg shadow-purple-500/20 mt-8"
            >
              Suscribirse Pro
            </button>
          </motion.div>

          {/* Plan 3: USD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative bg-gradient-to-b from-amber-950/20 to-slate-950/80 border border-amber-500/30 rounded-[32px] p-8 flex flex-col justify-between hover:border-amber-500/60 shadow-xl group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              🌎 Global
            </div>
            <div>
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">PRO PLAN USD</h3>
              <p className="text-slate-400 text-xs font-semibold mb-6">Membresía mensual recurrente para el resto del mundo.</p>
              
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-amber-400">$9</span>
                <span className="text-slate-300 font-extrabold text-lg mb-1">USD</span>
                <span className="text-slate-400 text-sm font-semibold ml-2">/ mes</span>
              </div>

              <ul className="flex flex-col gap-4 text-xs font-semibold text-slate-300 border-t border-slate-800/80 pt-6">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-400 shrink-0" size={16} /> Cobro internacional mensual</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-400 shrink-0" size={16} /> Descuentos del 20% en tienda</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-400 shrink-0" size={16} /> Acceso anticipado exclusivo</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-400 shrink-0" size={16} /> Atención al cliente prioritaria</li>
              </ul>
            </div>
            
            <button
              onClick={() => handlePlanClick('usd')}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase py-4 rounded-2xl tracking-wider transition-colors shadow-lg shadow-amber-500/20 mt-8"
            >
              Suscribirse Pro
            </button>
          </motion.div>

        </div>

        {/* Benefits Detail Section */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-white">Beneficios Exclusivos</h2>
            <p className="text-slate-400 font-semibold text-sm">Todo lo que desbloqueas al unirte a la experiencia premium de Bumsy Go.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Gift className="text-pink-400" size={28} />, title: 'Regalos Digitales Mensuales', desc: 'Recibe recursos educativos, hojas para colorear exclusivas, imprimibles y wallpapers listos para descargar.' },
              { icon: <Tag className="text-violet-400" size={28} />, title: '20% Descuento Permanente', desc: 'Descuento garantizado en todos los productos físicos de nuestra tienda oficial (peluches, ropa, accesorios).' },
              { icon: <Play className="text-purple-400" size={28} />, title: 'Acceso Anticipado', desc: 'Mira los nuevos episodios, canciones y lanzamientos de videos antes que nadie en el portal de Aventuras.' },
              { icon: <Gamepad2 className="text-emerald-400" size={28} />, title: 'Minijuegos Premium', desc: 'Desbloquea tableros especiales de memorama, paletas de colores exclusivas y niveles extra en nuestros juegos.' },
              { icon: <Music className="text-yellow-400" size={28} />, title: 'Canciones Inéditas', desc: 'Acceso al catálogo completo de música y pistas de audio exclusivas listas para cantar.' },
              { icon: <Calendar className="text-blue-400" size={28} />, title: 'Eventos y Giras', desc: 'Prioridad máxima de compra y meet & greets exclusivos con los personajes de Bumsy Go en sus giras.' },
              { icon: <MessageSquare className="text-indigo-400" size={28} />, title: 'Atención al Cliente Prioritaria', desc: 'Canal de soporte exclusivo con resolución garantizada en menos de 24 horas laborables.' },
              { icon: <BookOpen className="text-teal-400" size={28} />, title: 'Biblioteca de Cuentos', desc: 'Acceso a la colección completa de audiocuentos y libros interactivos oficiales de Bumsy.' },
              { icon: <EyeOff className="text-orange-400" size={28} />, title: 'Sin Publicidad', desc: 'Una navegación infantil 100% segura, libre de comerciales o interrupciones publicitarias.' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-slate-950/40 border border-slate-800/80 hover:border-violet-500/40 rounded-3xl p-6 flex flex-col gap-4 backdrop-blur-md hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-white font-black text-lg group-hover:text-pink-400 transition-colors">{benefit.title}</h3>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-4xl mx-auto mb-20 bg-slate-950/40 border border-slate-800/80 rounded-[32px] p-8 backdrop-blur-md">
          <h3 className="text-2xl font-black text-center uppercase mb-8 text-white tracking-wider">Comparativa de Experiencias</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-semibold text-left">
              <thead>
                <tr className="border-b border-slate-800 pb-4">
                  <th className="py-4 text-slate-500 uppercase tracking-wider">Beneficio</th>
                  <th className="py-4 text-center text-slate-500 uppercase tracking-wider">Gratis</th>
                  <th className="py-4 text-center text-pink-400 uppercase tracking-wider font-black">💎 Bumsy Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Catálogo de productos', '✓', '✓'],
                  ['Mini-Juegos básicos', '✓', '✓'],
                  ['Vídeos y Canciones', 'Estándar', 'Premium e Inéditos'],
                  ['Regalos Digitales Imprimibles', '✗', '✓ Cada Mes'],
                  ['Descuento en Tienda Oficial', '✗', '20% Permanente'],
                  ['Niveles Extra en Juegos', '✗', '✓ Desbloqueados'],
                  ['Acceso Anticipado a Contenido', '✗', '✓'],
                  ['Biblioteca Digital de Cuentos', '✗', '✓ Completa'],
                  ['Soporte 24 horas', '✗', '✓ Prioritario'],
                  ['Plataforma Sin Anuncios', '✗', '✓ 100% Limpia'],
                ].map(([feat, free, pro], i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/20 transition-colors">
                    <td className="py-4 text-slate-300 font-bold">{feat}</td>
                    <td className="py-4 text-center text-slate-500">{free}</td>
                    <td className="py-4 text-center text-pink-300 font-black">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-[10px] text-center mt-6 font-semibold uppercase tracking-wider">
            🔒 Pagos encriptados procesados de forma segura mediante Mercado Pago
          </p>
        </div>

      </div>

      {/* Floating Auto-dismiss Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm ${
              notification.type === 'error' ? 'bg-red-950 border border-red-500/40 text-red-300' : 'bg-green-950 border border-green-500/40 text-green-300'
            }`}
          >
            <span className="text-lg">{notification.type === 'error' ? '❌' : '✨'}</span>
            {notification.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register/Login Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowRegisterModal(false);
                setErrorMsg('');
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#120d24] border border-slate-800 rounded-[32px] p-8 w-full max-w-md shadow-2xl text-left overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setErrorMsg('');
                }}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="text-3xl">🔑</span>
                <h3 className="text-2xl font-black text-white uppercase mt-3 mb-1">Crea tu Cuenta Pro</h3>
                <p className="text-slate-400 text-xs font-semibold">Regístrate para vincular tu membresía y poder acceder a tus beneficios.</p>
              </div>

              {errorMsg && (
                <div className="bg-red-950/50 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
                  <span>⚠️</span> {errorMsg}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 text-white font-black text-sm uppercase py-4 rounded-xl tracking-wider transition-all mt-4 shadow-lg shadow-violet-500/20"
                >
                  {isSubmitting ? 'Procesando...' : 'Comenzar Registro y Pago'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Pro;
