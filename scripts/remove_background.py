import os
import sys

# Force Numba JIT disable and CPU execution to avoid threading locks in this sandbox
os.environ["NUMBA_DISABLE_JIT"] = "1"
os.environ["NUMBA_NUM_THREADS"] = "1"
os.environ["ORT_PROVIDERS"] = "CPUExecutionProvider"
os.environ["ONNXRUNTIME_PROVIDER_PATH"] = ""

def flush_print(msg):
    print(msg)
    sys.stdout.flush()

flush_print("Starting background removal script...")

input_path = "public/images/catalog/Goldcard.png"
output_path = "public/images/catalog/Goldcard.png"

from PIL import Image

if not os.path.exists(input_path):
    flush_print("Goldcard.png not found!")
    sys.exit(1)

flush_print("Image found. Attempting import of rembg...")
try:
    from rembg import remove
    flush_print("rembg imported successfully!")
    
    # Load image
    img = Image.open(input_path)
    flush_print(f"Loaded image: size={img.size}, mode={img.mode}")
    
    # Remove background
    flush_print("Calling rembg.remove...")
    no_bg = remove(img)
    flush_print("Background removed successfully!")
    
    # Create white background
    flush_print("Compositing on white background...")
    white_bg = Image.new("RGBA", no_bg.size, (255, 255, 255, 255))
    final_img = Image.alpha_composite(white_bg, no_bg)
    
    # Convert to RGB and save
    flush_print("Saving processed image...")
    final_img.convert("RGB").save(output_path, "PNG")
    flush_print("Successfully processed Goldcard.png!")
    
except Exception as e:
    flush_print(f"Error occurred during rembg processing: {e}")
    flush_print("Applying fallback PIL processing (creating clean border / white background crop)...")
    
    try:
        img = Image.open(input_path)
        w, h = img.size
        canvas = Image.new("RGB", (w + 40, h + 40), (255, 255, 255))
        canvas.paste(img, (20, 20))
        canvas.save(output_path, "PNG")
        flush_print("Fallback PIL frame created successfully!")
    except Exception as fallback_err:
        flush_print(f"Fallback also failed: {fallback_err}")
        sys.exit(1)
