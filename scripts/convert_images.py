import os
import sys
import subprocess

# Ensure pillow is installed
try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Installing it now...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "Pillow"], check=True)
        from PIL import Image
    except Exception as e:
        print(f"Could not install Pillow: {e}")
        sys.exit(1)

assets_dir = "public/assets"
print("Scanning for large PNG images to convert to optimized WebP...")

converted_count = 0
total_saved = 0

for root, dirs, files in os.walk(assets_dir):
    for file in files:
        if file.lower().endswith(".png"):
            png_path = os.path.join(root, file)
            size_kb = os.path.getsize(png_path) / 1024
            
            # Convert all PNG files to WebP (skipping already converted ones)
            webp_path = os.path.splitext(png_path)[0] + ".webp"
            
            # Check if webp already exists
            if os.path.exists(webp_path):
                continue
            
            print(f"Converting {png_path} ({size_kb:.1f} KB)...")
            try:
                im = Image.open(png_path)
                im.save(webp_path, "WEBP", quality=80)
                webp_size_kb = os.path.getsize(webp_path) / 1024
                saved = size_kb - webp_size_kb
                print(f"✅ Converted to {webp_path} ({webp_size_kb:.1f} KB). Saved: {saved:.1f} KB ({saved/size_kb*100:.1f}%)")
                converted_count += 1
                total_saved += saved
            except Exception as e:
                print(f"❌ Failed to convert {png_path}: {e}")

print(f"\n🎉 Done! Converted {converted_count} images. Total space saved: {total_saved/1024:.2f} MB!")
