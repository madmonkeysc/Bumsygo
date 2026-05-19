import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Lock, ShieldAlert, Fingerprint, Database, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/branding/legal_bg.png" 
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
                src="/assets/branding/flamy_legal.png" 
                alt="Flamy Legal" 
                className="h-64 md:h-96 object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:w-2/3 text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6 drop-shadow-lg">
                Política de <br/> Privacidad
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
            
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-8 flex flex-col items-center gap-4">
                <ShieldAlert size={60} className="text-accent" /> Estándares de Privacidad de Clase Mundial
              </h2>
              <p className="text-xl leading-relaxed">
                Nuestra arquitectura de datos está diseñada bajo el principio de **"Privacy by Design"**. Cumplimos con los marcos más estrictos del mundo para garantizar la seguridad de su familia.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
              <div className="p-8 bg-sky-50 rounded-[40px] border-b-8 border-sky-200">
                <Fingerprint size={40} className="mx-auto mb-4 text-sky-600" />
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2">GDPR (Europa)</h4>
                <p className="text-sm">Derecho al olvido, portabilidad y consentimiento explícito.</p>
              </div>
              <div className="p-8 bg-pink-50 rounded-[40px] border-b-8 border-pink-200">
                <UserCheck size={40} className="mx-auto mb-4 text-pink-600" />
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2">COPPA (USA)</h4>
                <p className="text-sm">Protección extrema de datos para menores de 13 años.</p>
              </div>
              <div className="p-8 bg-green-50 rounded-[40px] border-b-8 border-green-200">
                <Database size={40} className="mx-auto mb-4 text-green-600" />
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2">LFPDPPP (México)</h4>
                <p className="text-sm">Derechos ARCO y aviso de privacidad robusto.</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8">1. Datos que Recopilamos</h2>
            <p className="mb-8">
              Bumsy Go minimiza la recopilación de datos al máximo estrictamente necesario. No vendemos información personal a terceros bajo ninguna circunstancia.
            </p>
            <div className="bg-slate-50 p-10 rounded-[50px] mb-12">
              <ul className="space-y-4 m-0 list-none">
                <li className="flex gap-4 items-center">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>**Datos de Cuenta**: Correo electrónico del padre/tutor y contraseña encriptada.</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>**Datos de Uso**: Progreso en juegos y preferencias de personajes (anónimo).</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>**Datos Técnicos**: Dirección IP truncada y tipo de dispositivo para optimización.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8">2. Seguridad de la Información</h2>
            <p className="mb-10">
              Utilizamos encriptación **AES-256** para el almacenamiento de datos y protocolos **TLS/SSL** para la transmisión de información. Nuestros servidores están ubicados en centros de datos con certificaciones de seguridad física y lógica de nivel bancario.
            </p>

            <div className="bg-slate-900 text-white p-12 rounded-[60px] mb-20 relative overflow-hidden">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-4">
                <Lock className="text-accent" /> Derechos ARCO
              </h3>
              <p className="opacity-80 mb-6">
                Usted tiene el control total sobre sus datos. Puede ejercer sus derechos de:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Acceso', 'Rectificación', 'Cancelación', 'Oposición'].map((item, i) => (
                  <div key={i} className="bg-white/10 p-4 rounded-2xl text-center font-bold">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-8 opacity-70 text-sm">
                Envíe su solicitud a: **privacy@bumsygo.com** con el asunto "Derechos ARCO".
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8">3. Cookies y Seguimiento</h2>
            <p className="mb-10">
              Solo utilizamos cookies esenciales para el funcionamiento de la sesión y analíticas anónimas. No permitimos cookies de seguimiento publicitario de terceros en las áreas de juego diseñadas para niños.
            </p>

            <h2 className="text-3xl font-black text-slate-900 mb-8">4. Transferencia Internacional de Datos</h2>
            <p className="mb-10">
              Al utilizar nuestros servicios, usted acepta que sus datos puedan ser procesados en servidores ubicados en los Estados Unidos o la Unión Europea, garantizando siempre niveles de protección equivalentes a los exigidos por las leyes locales del usuario.
            </p>

            <p className="italic text-slate-400 mt-20 border-t pt-10">
              © 2026 The Bumsy Company. Esta política es revisada periódicamente para asegurar su cumplimiento con la evolución constante de las leyes de privacidad digital.
            </p>
          </div>
        </div>
      </div>
    </section>
      </div>
    );
  };

export default Privacy;
