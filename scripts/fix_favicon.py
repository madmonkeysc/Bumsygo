import re
import base64
import os
from PIL import Image
from io import BytesIO

def fix_favicon():
    svg_path = "/home/masterking/Bumsy 2.0/public/assets/branding/favicon.svg"
    if not os.path.exists(svg_path):
        print(f"Error: SVG not found at {svg_path}")
        return
        
    with open(svg_path, "r") as f:
        svg_content = f.read()

    # Extract base64 PNG images from SVG
    matches = re.findall(r'href="data:image/png;base64,([^"]+)"', svg_content)
    if not matches:
        matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', svg_content)

    if len(matches) >= 2:
        mask_bytes = base64.b64decode(matches[0])
        rgb_bytes = base64.b64decode(matches[1])
        
        mask_img = Image.open(BytesIO(mask_bytes))
        rgb_img = Image.open(BytesIO(rgb_bytes))
        
        rgba_img = Image.new("RGBA", rgb_img.size)
        rgba_img.paste(rgb_img, (0, 0))
        rgba_img.putalpha(mask_img)
        
        # The butterfly is on the right side of the wide logo (X=900 to 1600)
        butterfly = rgba_img.crop((900, 0, 1600, 444))
        
        # Get tight bounding box of the butterfly to discard empty space
        bbox = butterfly.getbbox()
        if bbox:
            butterfly_tight = butterfly.crop(bbox)
            
            # Create a perfect square canvas (512x512)
            size = 512
            square_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
            
            # Scale butterfly to fit in the square canvas, keeping aspect ratio
            bt_w, bt_h = butterfly_tight.size
            # Leave a 24px padding on each side so the icon fills the space but is not clipped
            scale = min((size - 48) / bt_w, (size - 48) / bt_h)
            new_w = int(bt_w * scale)
            new_h = int(bt_h * scale)
            
            butterfly_resized = butterfly_tight.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            # Center the resized butterfly in the 512x512 canvas
            offset_x = (size - new_w) // 2
            offset_y = (size - new_h) // 2
            square_img.paste(butterfly_resized, (offset_x, offset_y), butterfly_resized)
            
            # Save as PNG to both locations
            png_paths = [
                "/home/masterking/Bumsy 2.0/public/favicon.png",
                "/home/masterking/Bumsy 2.0/public/assets/branding/favicon.png"
            ]
            for png_path in png_paths:
                square_img.save(png_path)
                print(f"Saved optimized PNG favicon to {png_path}")
            
            # Convert the final square PNG to base64
            buffered = BytesIO()
            square_img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode()
            
            # Write a clean SVG without any clipPaths or translations
            new_svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image width="512" height="512" href="data:image/png;base64,{img_str}"/>
</svg>'''
            
            svg_paths = [
                "/home/masterking/Bumsy 2.0/public/favicon.svg",
                "/home/masterking/Bumsy 2.0/public/assets/branding/favicon.svg"
            ]
            for svg_path in svg_paths:
                with open(svg_path, "w") as f_out:
                    f_out.write(new_svg_content)
                print(f"Overwrote SVG favicon at {svg_path} with optimized, centered vector wrap")
        else:
            print("Error: Could not identify butterfly bounds.")
    else:
        print(f"Error: Expected at least 2 images inside SVG, found {len(matches)}.")

if __name__ == "__main__":
    fix_favicon()
