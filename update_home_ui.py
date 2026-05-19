import re

with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

# 1. Add auto-play for character carousel
old_char_effect = """  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Rotate every 5 seconds
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroSlides.length]);"""

new_char_effect = """  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Rotate every 5 seconds
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroSlides.length]);

  // Character Carousel Auto-play (every 10 seconds)
  useEffect(() => {
    const charTimer = setInterval(() => {
      setActiveCharIndex((prev) => (prev + 1) % characters.length);
    }, 10000);
    return () => clearInterval(charTimer);
  }, [characters.length]);"""

c = c.replace(old_char_effect, new_char_effect)

# 2. Change font and spacing for Hero slide 1 title
old_h1 = """                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tighter drop-shadow-2xl text-white uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>"""
new_h1 = """                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-[0.1em] drop-shadow-2xl text-white uppercase" style={{fontFamily: "'Poppins', sans-serif"}}>"""
c = c.replace(old_h1, new_h1)

# 3. Add News Section and modify Business Banner
old_business_banner = """      {/* 6. BUSINESS BANNER (Full Width) */}
      <section className="w-full relative group overflow-hidden bg-black">
         <Link to="/business" className="block w-full cursor-pointer relative h-[450px] md:h-auto min-h-[400px]">
            {/* Desktop uncropped, mobile cropped to fit */}
            <img src="/assets/banners/bumsy_29.png" alt="Hacer Negocios con Bumsy" className="w-full h-full object-cover absolute inset-0 md:relative md:object-contain md:h-auto md:max-h-none" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 z-10"></div>
         </Link>
      </section>"""

new_business_banner = """      {/* 6. NOTICIAS BUMSY */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter uppercase">NOTICIAS DE BUMSY</h2>
            <p className="text-xl md:text-2xl font-bold opacity-80 max-w-3xl">Entérate de las últimas novedades, lanzamientos y sorpresas en el universo Bumsy.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[40px] p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="text-6xl mb-6">{item.image}</div>
                <div className="text-sm font-bold text-primary/60 mb-2 uppercase tracking-widest">{item.date}</div>
                <h3 className="text-2xl font-black text-primary mb-4">{item.title}</h3>
                <button className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors">
                  Leer completa <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BUSINESS BANNER (Full Width con Texto Superior) */}
      <section className="w-full relative overflow-hidden bg-[#FFEB3B]">
         <div className="w-full relative h-[500px] md:h-auto min-h-[500px] flex flex-col justify-between">
            
            {/* Imagen de fondo / Flamy */}
            <img src="/assets/banners/bumsy_29.png" alt="Hacer Negocios con Bumsy" className="w-full h-full object-cover absolute inset-0 md:relative md:object-contain md:h-auto md:max-h-none" />
            
            {/* Textos montados arriba para no tapar al Flamingo */}
            <div className="absolute top-10 md:top-16 left-0 right-0 z-20 flex flex-col items-center text-center px-6 pointer-events-none">
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] text-[#E91E63] uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>
                 CONEXIONES
               </h2>
               <p className="text-2xl md:text-4xl font-bold text-gray-800 tracking-wide max-w-3xl" style={{fontFamily: "'Poppins', sans-serif"}}>
                 Bumsy siempre busca conectar con nuevos socios.
               </p>
            </div>

            {/* Botón de acción montado hasta abajo */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center w-full px-6">
               <Link to="/business" className="bg-[#E91E63] text-white px-12 py-5 border-4 border-white rounded-full font-black text-2xl shadow-[0_10px_30px_rgba(233,30,99,0.5)] hover:scale-110 active:scale-95 transition-all text-center">
                 IR A LICENCIAS Y NEGOCIOS
               </Link>
            </div>
         </div>
      </section>"""

c = c.replace(old_business_banner, new_business_banner)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("done")
