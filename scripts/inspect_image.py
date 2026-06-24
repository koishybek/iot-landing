from PIL import Image
import os

img_path = "public/images/catalog/Goldcard.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    print(f"Image format: {img.format}")
    print(f"Image size: {img.size}")
    print(f"Image mode: {img.mode}")
else:
    print("File not found")
