with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

# 1. Increase the minimum height of the hero section
c = c.replace(
    '<section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black shadow-2xl">',
    '<section className="relative h-screen min-h-[850px] md:min-h-[1000px] flex items-center justify-center overflow-hidden bg-black shadow-2xl">'
)

# 2. Increase bottom padding for the text container when textPosition is 'bottom'
# Previously: pb-24
c = c.replace(
    '<div className={`container mx-auto px-6 h-full relative z-10 flex flex-col items-center text-center pb-24 ${heroSlides[currentSlide].textPosition === \'bottom\' ? \'justify-end\' : \'justify-center\'}`}>',
    '<div className={`container mx-auto px-6 h-full relative z-10 flex flex-col items-center text-center ${heroSlides[currentSlide].textPosition === \'bottom\' ? \'justify-end pb-40\' : \'justify-center\'}`}>'
)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("done")
