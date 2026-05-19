with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

# Update heroSlides for slide 1
old_slides = """  const heroSlides = [
    { id: 1, bgImg: '/assets/hero/slide_1.png', hideOverlay: true, btnText: 'DESCUBRIR MÁS' },
    { id: 2, bgImg: '/assets/hero/slide_2.png', hideOverlay: true, btnText: 'VER CATÁLOGO' },
    { id: 3, bgImg: '/assets/hero/slide_3.png', hideOverlay: true, btnText: 'NUEVOS EPISODIOS' },
    { id: 4, bgImg: '/assets/hero/slide_4.png', hideOverlay: true, btnText: 'VER EN YOUTUBE' },
    { id: 5, bgImg: '/assets/hero/slide_5.png', hideOverlay: true, btnText: 'ESCUCHAR AHORA' }
  ];"""

new_slides = """  const heroSlides = [
    { 
      id: 1, 
      bgImg: '/assets/hero/slide_1.png', 
      hideOverlay: false, 
      title: 'ESCRIBAMOS UNA GRAN HISTORIA JUNTOS', 
      subtitle: 'Contenidos, educación y shows en vivo alegría cada día.',
      btnText: 'YO QUIERO',
      textPosition: 'bottom'
    },
    { id: 2, bgImg: '/assets/hero/slide_2.png', hideOverlay: true, btnText: 'VER CATÁLOGO' },
    { id: 3, bgImg: '/assets/hero/slide_3.png', hideOverlay: true, btnText: 'NUEVOS EPISODIOS' },
    { id: 4, bgImg: '/assets/hero/slide_4.png', hideOverlay: true, btnText: 'VER EN YOUTUBE' },
    { id: 5, bgImg: '/assets/hero/slide_5.png', hideOverlay: true, btnText: 'ESCUCHAR AHORA' }
  ];"""

c = c.replace(old_slides, new_slides)

# Update render logic to handle textPosition: 'bottom' and conditional overlay
old_render = """            {/* Gradiente oscuro para que el texto siempre sea legible sin arruinar la foto original */}
            {!heroSlides[currentSlide].hideOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            )}
            
            <div className="container mx-auto px-6 h-full relative z-10 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${heroSlides[currentSlide].textColor} flex flex-col items-center w-full`}
              >
                {!heroSlides[currentSlide].hideOverlay && (
                  <>
                    {heroSlides[currentSlide].icon && <div className="text-8xl mb-6 float filter drop-shadow-lg">{heroSlides[currentSlide].icon}</div>}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter drop-shadow-xl text-white">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-xl md:text-3xl font-bold opacity-90 mb-12 max-w-4xl mx-auto drop-shadow-lg text-white">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                  </>
                )}
                <button className={`bg-white text-primary px-10 py-4 md:px-12 md:py-5 rounded-full font-black text-xl md:text-2xl shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,255,255,0.5)] active:scale-95 transition-all ${heroSlides[currentSlide].hideOverlay ? 'mt-[50vh] md:mt-[65vh]' : ''}`}>
                  {heroSlides[currentSlide].btnText}
                </button>
              </motion.div>
            </div>"""

new_render = """            {/* Gradiente oscuro opcional adaptado según el estilo */}
            {!heroSlides[currentSlide].hideOverlay && (
              <div className={`absolute inset-0 ${heroSlides[currentSlide].textPosition === 'bottom' ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent' : 'bg-gradient-to-t from-black/90 via-black/40 to-black/10'}`}></div>
            )}
            
            <div className={`container mx-auto px-6 h-full relative z-10 flex flex-col items-center text-center pb-24 ${heroSlides[currentSlide].textPosition === 'bottom' ? 'justify-end' : 'justify-center'}`}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`flex flex-col items-center w-full`}
              >
                {!heroSlides[currentSlide].hideOverlay && heroSlides[currentSlide].title && (
                  <div className="mb-8">
                    {heroSlides[currentSlide].icon && <div className="text-8xl mb-6 float filter drop-shadow-lg">{heroSlides[currentSlide].icon}</div>}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight tracking-tighter drop-shadow-2xl text-white uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold opacity-100 max-w-4xl mx-auto drop-shadow-2xl text-white" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {heroSlides[currentSlide].subtitle}
                    </p>
                  </div>
                )}
                <button className={`bg-primary text-white border-4 border-white px-10 py-4 md:px-12 md:py-4 rounded-full font-black text-xl md:text-2xl shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(236,72,153,0.6)] active:scale-95 transition-all ${heroSlides[currentSlide].hideOverlay ? 'mt-[50vh] md:mt-[65vh]' : ''}`}>
                  {heroSlides[currentSlide].btnText}
                </button>
              </motion.div>
            </div>"""

c = c.replace(old_render, new_render)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("done")
