with open("src/index.css", "r") as f:
    c = f.read()

font_css = """@font-face {
  font-family: 'Peace Sans';
  src: url('/fonts/Peace Sans Webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

"""

if "Peace Sans Webfont.ttf" not in c:
    # Add after the first @import
    c = c.replace("@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');", 
                  "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');\n\n" + font_css)
    
    # Update headings
    old_h = """h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
}"""
    new_h = """h1, h2, h3, h4, h5, h6 {
  font-family: 'Peace Sans', sans-serif;
  font-weight: normal;
  line-height: 1.2;
  letter-spacing: 0.05em;
}"""
    c = c.replace(old_h, new_h)

with open("src/index.css", "w") as f:
    f.write(c)

print("done")
