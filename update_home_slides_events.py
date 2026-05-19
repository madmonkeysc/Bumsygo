import re

with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

# 1. Update heroSlides array
old_slides = """  const heroSlides = [
    {
      id: 1,
      bgImg: '/assets/hero/hero-1.webp',
      hideOverlay: true
    },
    {
      id: 2,
      bgImg: '/assets/hero/hero-2.webp',
      hideOverlay: true
    },
    {
      id: 3,
      bgImg: '/assets/hero/hero-3.webp',
      hideOverlay: true
    },
    {
      id: 4,
      bgImg: '/assets/hero/hero-4.webp',
      hideOverlay: true
    },
    {
      id: 5,
      bgImg: '/assets/hero/hero-5.webp',
      hideOverlay: true
    }
  ];"""

new_slides = """  const heroSlides = [
    { id: 1, bgImg: '/assets/hero/slide_1.png', hideOverlay: true, btnText: 'DESCUBRIR MÁS' },
    { id: 2, bgImg: '/assets/hero/slide_2.png', hideOverlay: true, btnText: 'VER CATÁLOGO' },
    { id: 3, bgImg: '/assets/hero/slide_3.png', hideOverlay: true, btnText: 'NUEVOS EPISODIOS' },
    { id: 4, bgImg: '/assets/hero/slide_4.png', hideOverlay: true, btnText: 'VER EN YOUTUBE' },
    { id: 5, bgImg: '/assets/hero/slide_5.png', hideOverlay: true, btnText: 'ESCUCHAR AHORA' }
  ];"""

c = c.replace(old_slides, new_slides)

# 2. Update Events section to use ALL CAPS and multiple event items
old_events_section = """      {/* 2. CONOCE Y JUEGA (Meet & Play) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="bg-accent/10 text-accent px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles size={18} /> Conoce y Juega
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter">Un día especial para disfrutar en familia.</h2>
            <Link to="/meet-and-play" className="text-primary/40 font-black text-xl flex items-center gap-2 hover:text-accent transition-colors group">
              Ver más <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Featured Event Card */}
          <div className="bg-gradient-yellow rounded-[60px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl hover:shadow-2xl transition-all">
             <div className="md:w-1/2">
                <h3 className="text-3xl md:text-5xl font-black text-primary mb-6">Bumsy Live Show 2026</h3>
                <p className="text-xl text-primary/60 font-bold mb-10">La gira mundial llega a tu ciudad. ¡No te pierdas de un show lleno de canciones y magia!</p>
                <button className="bg-primary text-white px-10 py-4 rounded-full font-black text-xl">Reservar Boletos</button>
             </div>
             <div className="md:w-1/2 text-[12rem] float">🎭</div>
          </div>
        </div>
      </section>"""

new_events_section = """      {/* 2. PRÓXIMOS EVENTOS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="bg-accent/10 text-accent px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles size={18} /> PRÓXIMOS EVENTOS
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter uppercase">UN DÍA ESPECIAL PARA DISFRUTAR EN FAMILIA</h2>
            <Link to="/meet-and-play" className="text-primary/40 font-black text-xl flex items-center gap-2 hover:text-accent transition-colors group uppercase">
              Ver más <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-3 gap-8">
             {/* Evento 1 */}
             <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-[40px] p-8 text-white shadow-xl hover:scale-105 transition-transform flex flex-col justify-between" style={{fontFamily: "'Poppins', sans-serif"}}>
                <div>
                   <div className="bg-white/20 px-4 py-1 inline-block rounded-full text-xs font-black mb-4 backdrop-blur-md uppercase tracking-widest">EVENTO FÍSICO</div>
                   <h3 className="text-3xl font-black mb-4 uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>Bumsy Live Show Gira Mundial</h3>
                   <p className="opacity-90 font-bold mb-6 text-lg">Ven a disfrutar de la magia en vivo con todos los personajes en un show único.</p>
                </div>
                <button className="bg-white text-primary w-full py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-primary hover:text-white transition-all uppercase">Reservar Boletos</button>
             </div>
             {/* Evento 2 */}
             <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[40px] p-8 text-white shadow-xl hover:scale-105 transition-transform flex flex-col justify-between" style={{fontFamily: "'Poppins', sans-serif"}}>
                <div>
                   <div className="bg-white/20 px-4 py-1 inline-block rounded-full text-xs font-black mb-4 backdrop-blur-md uppercase tracking-widest">VIRTUAL</div>
                   <h3 className="text-3xl font-black mb-4 uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>Premiere Especial de Verano</h3>
                   <p className="opacity-90 font-bold mb-6 text-lg">Disfruta desde casa el nuevo musical interactivo donde tú tomas las decisiones.</p>
                </div>
                <button className="bg-white text-primary w-full py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-primary hover:text-white transition-all uppercase">Unirse al Evento</button>
             </div>
             {/* Evento 3 */}
             <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[40px] p-8 text-white shadow-xl hover:scale-105 transition-transform flex flex-col justify-between" style={{fontFamily: "'Poppins', sans-serif"}}>
                <div>
                   <div className="bg-white/20 px-4 py-1 inline-block rounded-full text-xs font-black mb-4 backdrop-blur-md uppercase tracking-widest">MEET & GREET</div>
                   <h3 className="text-3xl font-black mb-4 uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>Conoce a Bumsy y Stella</h3>
                   <p className="opacity-90 font-bold mb-6 text-lg">Firma de autógrafos, convivencia y fotos exclusivas con los personajes.</p>
                </div>
                <button className="bg-white text-primary w-full py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-primary hover:text-white transition-all uppercase">Ver Fechas</button>
             </div>
          </div>
        </div>
      </section>"""

c = c.replace(old_events_section, new_events_section)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("done")
