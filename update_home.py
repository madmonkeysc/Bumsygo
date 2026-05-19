import re

with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

# 1. Update Hero Navigation Bars
old_nav = '''          <div className="flex gap-4">
            {heroSlides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsAutoPlaying(false); // Pause on manual interaction
                }}
                className={`h-3 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
          
          {/* Play/Pause Button */}
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
          >'''

new_nav = '''          <div className="flex gap-2 w-full max-w-3xl lg:max-w-4xl">
            {heroSlides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 flex-1 ${idx === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
          
          {/* Play/Pause Button */}
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 min-w-[40px] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
          >'''

c = c.replace(old_nav, new_nav)

# Fix the container for nav bars to be wider
old_nav_container = '<div className="absolute bottom-10 left-0 w-full flex justify-center items-center gap-8 z-20">'
new_nav_container = '<div className="absolute bottom-10 left-0 w-full flex justify-center items-center gap-4 md:gap-8 px-6 md:px-12 z-20">'
c = c.replace(old_nav_container, new_nav_container)

# 2. Add Marquee Section after Characters
old_char_close = '      </section>\n\n      {/* 4. NUESTRO CONTENIDO'
new_marquee = '''      </section>

      {/* MARQUEE NUEVO CONTENIDO */}
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
        <div className="w-full flex justify-center pt-10 pb-20 relative z-20 bg-primary/5">
           <img src="/assets/banners/bumsy_28.png" className="w-[90%] max-w-5xl hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-[40px]" alt="Bumsy Nuevo Contenido" />
        </div>
      </section>

      {/* 4. NUESTRO CONTENIDO'''

c = c.replace(old_char_close, new_marquee)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("✅ done")
