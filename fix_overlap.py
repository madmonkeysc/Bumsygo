with open("src/pages/Home.jsx", "r") as f:
    c = f.read()

# Make the image overlap the marquee text slightly
old_div = '<div className="w-full flex justify-center pt-10 pb-20 relative z-20 bg-primary/5">'
new_div = '<div className="w-full flex justify-center pt-8 pb-20 relative z-20 bg-primary/5 -mt-10">'
c = c.replace(old_div, new_div)

# Actually, if the bg of the banner section is primary/5, the overlapping margin will pull the primary/5 background up over the text!
# It's better to just move the image itself up, not the background div.

c = c.replace(
    '<img src="/assets/banners/bumsy_28.png" className="w-[90%] max-w-5xl hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-[40px]" alt="Bumsy Nuevo Contenido" />',
    '<img src="/assets/banners/bumsy_28.png" className="w-[90%] max-w-5xl hover:scale-105 transition-transform duration-500 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[40px] -mt-16 z-30 relative" alt="Bumsy Nuevo Contenido" />'
)

with open("src/pages/Home.jsx", "w") as f:
    f.write(c)

print("done")
