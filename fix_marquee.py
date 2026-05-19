import re

with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

old_marquee = '''      {/* MARQUEE NUEVO CONTENIDO */}
      <section className="bg-white overflow-hidden relative">
        <div className="w-full bg-accent text-white py-5 flex whitespace-nowrap overflow-hidden relative z-10 shadow-lg">
           <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex font-black text-2xl md:text-3xl gap-16 min-w-max"
           >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-16">
                  <span>NUEVO CONTENIDO 💖</span>
                  <span>NEW CONTENT 🌟</span>
                  <span>新しいコンテンツ ✨</span>
                  <span>NOUVEAU CONTENU 🎉</span>
                  <span>NEUER INHALT 🚀</span>
                </div>
              ))}
           </motion.div>
        </div>
        <div className="w-full flex justify-center pt-8 pb-20 relative z-20 bg-primary/5 -mt-10">
           <img src="/assets/banners/bumsy_28.png" className="w-[90%] max-w-5xl hover:scale-105 transition-transform duration-500 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[40px] -mt-16 z-30 relative" alt="Bumsy Nuevo Contenido" />
        </div>
      </section>'''

new_marquee = '''      {/* MARQUEE NUEVO CONTENIDO (Estilo Pinkfong Giant Text) */}
      <section className="bg-white overflow-hidden relative pt-20 pb-32">
        {/* Giant scrolling text background */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center whitespace-nowrap overflow-hidden z-0">
          {/* Fading edges to blend with white background */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
           <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex font-black text-[5rem] md:text-[10rem] lg:text-[12rem] text-primary/10 tracking-tighter uppercase whitespace-nowrap gap-12 md:gap-24"
              style={{ fontFamily: "'Peace Sans', Impact, sans-serif", lineHeight: 1 }}
           >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 md:gap-24 items-center">
                  <span>NUEVO CONTENIDO</span>
                  <span>NEW CONTENT</span>
                  <span>新しいコンテンツ</span>
                  <span>NOUVEAU CONTENU</span>
                  <span>NEUER INHALT</span>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Foreground Image */}
        <div className="w-full flex justify-center relative z-20 px-6">
           <img 
             src="/assets/banners/bumsy_28.png" 
             className="w-full max-w-[1200px] hover:scale-[1.02] transition-transform duration-500 drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative z-30" 
             alt="Nuestro Nuevo Contenido" 
           />
        </div>
      </section>'''

c = c.replace(old_marquee, new_marquee)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("done")
