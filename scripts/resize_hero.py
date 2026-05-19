import os
from PIL import Image

output_dir = "public/assets/hero"
downloads_dir = "/home/masterking/Downloads"

images = [
    ("BUMSY.png", "hero-0.webp"),
    ("BUMSY(1).png", "hero-1.webp"),
    ("BUMSY(2).png", "hero-2.webp"),
    ("BUMSY(3).png", "hero-3.webp"),
    ("BUMSY(4).png", "hero-4.webp"),
    ("BUMSY(5).png", "hero-5.webp")
]

max_width = 2560

for src, dest in images:
    src_path = os.path.join(downloads_dir, src)
    if not os.path.exists(src_path):
        continue
        
    dest_path = os.path.join(output_dir, dest)
    
    with Image.open(src_path) as img:
        print(f"Procesando {src} (Original: {img.size})")
        
        # Convert to RGB to be safe with WebP
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
            
        # Resize if too large, using LANCZOS for high quality
        if img.width > max_width:
            wpercent = (max_width / float(img.width))
            hsize = int((float(img.height) * float(wpercent)))
            img = img.resize((max_width, hsize), Image.Resampling.LANCZOS)
            print(f"  -> Redimensionada a {img.size}")
            
        # Save as high quality WebP
        img.save(dest_path, "WEBP", quality=90, method=6)
        print(f"  -> Guardado en {dest_path}")
