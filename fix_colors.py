with open("src/index.css", "r") as f:
    c = f.read()

# Replace Quicksand with Poppins
c = c.replace(
    "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');"
)
c = c.replace(
    "font-family: 'Quicksand', sans-serif;",
    "font-family: 'Poppins', sans-serif;"
)

# Replace Purple colors with Pink
c = c.replace("--primary: #6A1B9A;", "--primary: #EC4899;")
c = c.replace("--primary-light: #9C4DCC;", "--primary-light: #F472B6;")

with open("src/index.css", "w") as f:
    f.write(c)

print("done")
