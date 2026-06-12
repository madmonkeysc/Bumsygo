import os
import base64
from PIL import Image
from io import BytesIO

def process_maripos():
    input_path = "/home/masterking/Desktop/Maripos.png"
    if not os.path.exists(input_path):
        print(f"Error: Input image not found at {input_path}")
        return

    img = Image.open(input_path)
    print(f"Original image size: {img.size}, Mode: {img.mode}")

    # Ensure RGBA mode to handle transparency
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    # Get the tight bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img_tight = img.crop(bbox)
        print(f"Tight bounding box size: {img_tight.size}")

        # Create a perfect square canvas (512x512)
        size = 512
        square_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))

        # Scale the tight image to fit the square canvas (100% fill, 0px padding)
        bt_w, bt_h = img_tight.size
        scale = min(size / bt_w, size / bt_h)
        new_w = int(bt_w * scale)
        new_h = int(bt_h * scale)

        img_resized = img_tight.resize((new_w, new_h), Image.Resampling.LANCZOS)

        # Center the resized image in the 512x512 canvas
        offset_x = (size - new_w) // 2
        offset_y = (size - new_h) // 2
        square_img.paste(img_resized, (offset_x, offset_y), img_resized)

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

        # Write a clean SVG wrapper without any clipping or translation
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
        
        # Clean up temporary file - disabled to preserve source
        print("Done processing")
    else:
        print("Error: Could not determine bounding box of non-transparent pixels.")

if __name__ == "__main__":
    process_maripos()
