import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle, Scale, Gavel } from 'lucide-react';

const Terms = () => {
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
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6 drop-shadow-lg">
                Términos y <br/> Condiciones
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
            
            <div className="bg-slate-900 text-white p-12 rounded-[60px] mb-20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Gavel size={150} />
              </div>
              <h2 className="text-3xl font-black mb-8 relative z-10">Acuerdo de Carácter Vinculante</h2>
              <p className="text-xl mb-0 relative z-10 opacity-90 leading-relaxed">
                Este contrato rige el uso de los servicios de Bumsy Go. Al utilizar nuestra plataforma, usted declara ser mayor de edad o contar con la supervisión de un adulto y acepta someterse a la jurisdicción legal establecida en este documento, la cual cumple con las normativas de protección al consumidor de la **PROFECO (México)**, la **FTC (USA)** y la **Directiva de Servicios Digitales (UE)**.
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <Scale className="text-accent" /> 1. Alcance de los Servicios y Licencia de Uso
            </h2>
            <p className="mb-10">
              The Bumsy Company otorga al usuario una licencia personal, limitada, no transferible y revocable para el uso de la plataforma. Esta licencia se otorga con el único propósito de permitirle utilizar y disfrutar de los beneficios de los Servicios de la manera permitida por estos Términos. Queda estrictamente prohibido el "reverse engineering", la extracción de datos ("scraping") o cualquier uso que comprometa la integridad de nuestro software.
            </p>

            <h2 className="text-3xl font-black text-slate-900 mb-8">2. Responsabilidad de Padres y Tutores</h2>
            <p className="mb-8">
              Bumsy Go es una zona segura para niños, pero la responsabilidad final del acceso a internet recae en los adultos responsables. 
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                'Verificación de edad para compras in-app.',
                'Supervisión del tiempo de pantalla sugerido.',
                'Mantenimiento de la confidencialidad de credenciales.',
                'Cumplimiento de las leyes locales de protección infantil.'
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-slate-50 p-6 rounded-3xl">
                  <CheckCircle2 className="text-accent flex-shrink-0" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <AlertTriangle className="text-orange-500" /> 3. Limitación de Responsabilidad Internacional
            </h2>
            <p className="mb-8">
              En la medida máxima permitida por la ley aplicable (incluyendo la Sección 230 de la Communications Decency Act en EE. UU. y el Reglamento General de Protección de Datos en Europa), The Bumsy Company no será responsable de:
            </p>
            <ul className="space-y-4 mb-12">
              <li>Pérdidas indirectas, incidentales o consecuentes.</li>
              <li>Interrupciones del servicio fuera del control razonable de La Empresa.</li>
              <li>Contenido de terceros enlazado desde nuestro sitio.</li>
            </ul>

            <div className="bg-orange-50 p-12 rounded-[50px] border-4 border-orange-100 mb-20">
              <h3 className="text-2xl font-black text-orange-900 mb-6 uppercase tracking-tight">Cláusula de Arbitraje y Jurisdicción</h3>
              <p className="text-orange-900/80 mb-6">
                Cualquier controversia se resolverá preferentemente mediante mediación. En caso de litigio:
              </p>
              <ul className="space-y-2 text-orange-900/70">
                <li>• **México y Latinoamérica**: Tribunales de la Ciudad de México.</li>
                <li>• **USA y Canadá**: Tribunales del Estado de Delaware / Arbitraje bajo las reglas de la AAA.</li>
                <li>• **Europa**: Jurisdicción del país de residencia del consumidor según normativa EU.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-8">4. Compras y Suscripciones</h2>
            <p className="mb-10">
              Todas las transacciones se procesan de forma segura. Cumplimos con el estándar **PCI DSS** para la seguridad de datos de tarjetas de pago. Las cancelaciones y reembolsos se rigen por nuestra política de satisfacción al cliente y las leyes de protección al consumidor de cada región.
            </p>

            <p className="italic text-slate-400 mt-20 border-t pt-10">
              The Bumsy Company se reserva el derecho de modificar estos términos para reflejar cambios legales o de servicio. El uso continuado de la plataforma implica la aceptación de la versión más reciente.
            </p>
          </div>
        </div>
      </div>
    </section>
      </div>
    );
  };

export default Terms;
