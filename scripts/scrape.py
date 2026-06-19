import os
import time
import requests
from bs4 import BeautifulSoup
from io import BytesIO
from PIL import Image
from rembg import remove
import json
import re

BASE_URL = "https://iot-exp.kz/index.php?route=product/category&path=58"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images", "catalog"))
JSON_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json"))

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

def sanitize_filename(name):
    # remove invalid characters for windows filenames
    return re.sub(r'[\\/*?:"<>|]', "", name).strip()

def process_image(img_url, name, idx):
    try:
        # Download image
        print(f"Downloading image for {name} ({img_url})")
        if img_url.startswith('//'):
            img_url = 'https:' + img_url
        response = requests.get(img_url, headers=headers)
        response.raise_for_status()
        
        # Remove background
        input_image = Image.open(BytesIO(response.content)).convert("RGBA")
        print(f"Removing background for {name}...")
        output_image = remove(input_image)
        
        # Create a white background image
        white_bg = Image.new("RGBA", output_image.size, "WHITE")
        # Paste the output_image onto the white background
        white_bg.paste(output_image, (0, 0), output_image)
        
        # Convert to RGB to save as JPG
        final_image = white_bg.convert("RGB")
        
        # Save image
        safe_name = sanitize_filename(name)
        filename = f"{idx:02d}_{safe_name}.jpg"
        filepath = os.path.join(OUTPUT_DIR, filename)
        final_image.save(filepath, "JPEG", quality=90)
        
        # Return the relative path for the frontend
        return f"/images/catalog/{filename}"
    except Exception as e:
        print(f"Error processing image for {name}: {e}")
        return None

def main():
    products = []
    page = 1
    idx = 1
    
    while True:
        url = f"{BASE_URL}&page={page}"
        print(f"Fetching page {page}...")
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Failed to fetch page {page}. Status: {response.status_code}")
            break
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Determine the product containers
        # Most opencart themes use .product-layout
        product_divs = soup.select('.product-layout')
        if not product_divs:
            print(f"No products found on page {page}. Finishing.")
            break
            
        for div in product_divs:
            # Name
            name_tag = div.select_one('.caption h4 a') or div.select_one('.name a')
            if not name_tag:
                continue
            name = name_tag.text.strip()
            
            # Price
            price_tag = div.select_one('.price')
            price = ""
            if price_tag:
                new_price = price_tag.select_one('.price-new')
                if new_price:
                    price = new_price.text.strip()
                else:
                    # just the text
                    # filter out tax text if exists
                    price_text = price_tag.get_text(strip=True)
                    price = price_text.split('Ex Tax:')[0].strip()
                    price = price.split('Без НДС:')[0].strip() # Check russian translation
            
            # Image
            img_tag = div.select_one('.image img')
            img_url = ""
            if img_tag:
                img_url = img_tag.get('src', '')
                
            print(f"Found product: {name}")
            
            local_img_path = ""
            if img_url:
                local_img_path = process_image(img_url, name, idx)
            
            products.append({
                "id": idx,
                "name": name,
                "price": price,
                "image": local_img_path or img_url
            })
            idx += 1
            
        # Check if there's a next page
        pagination = soup.select_one('.pagination')
        if pagination:
            active_page = pagination.select_one('.active')
            if active_page:
                next_page = active_page.find_next_sibling('li')
                if not next_page or next_page.text.strip() in ['>', '>|']:
                    # some pagination logic depends on 'next' button
                    pass
        # Alternative: just try next page until .product-layout is empty (handled above)
        page += 1

    print(f"Total products processed: {len(products)}")
    
    # Save to JSON
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print(f"Saved JSON to {JSON_PATH}")

if __name__ == "__main__":
    main()
