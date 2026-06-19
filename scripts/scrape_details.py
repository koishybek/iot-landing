import os
import requests
from bs4 import BeautifulSoup
import json
import time

BASE_URL = "https://iot-exp.kz/index.php?route=product/category&path=58"
JSON_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json"))

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

def main():
    # load existing products
    try:
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            existing_products = json.load(f)
    except Exception as e:
        print("Failed to load products.json")
        return

    page = 1
    idx = 0
    
    while True:
        url = f"{BASE_URL}&page={page}"
        print(f"Fetching category page {page}...")
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            break
            
        soup = BeautifulSoup(response.text, 'html.parser')
        product_divs = soup.select('.product-layout')
        if not product_divs:
            break
            
        for div in product_divs:
            if idx >= len(existing_products):
                break
                
            name_tag = div.select_one('.caption h4 a') or div.select_one('.name a')
            if not name_tag:
                continue
                
            product_url = name_tag.get('href')
            print(f"Fetching details for {name_tag.text.strip()}...")
            
            if product_url:
                try:
                    p_resp = requests.get(product_url, headers=headers)
                    p_soup = BeautifulSoup(p_resp.text, 'html.parser')
                    
                    # Description
                    desc_tab = p_soup.select_one('#tab-description')
                    desc_text = desc_tab.get_text(separator='\n', strip=True) if desc_tab else ""
                    
                    # Specs
                    specs = []
                    attr_table = p_soup.select('table.table-bordered')
                    if attr_table:
                        for row in attr_table[0].select('tbody tr'):
                            cols = row.select('td')
                            if len(cols) >= 2:
                                specs.append({
                                    "label": cols[0].get_text(strip=True),
                                    "value": cols[1].get_text(strip=True)
                                })
                    
                    existing_products[idx]["description"] = desc_text
                    existing_products[idx]["specs"] = specs
                    existing_products[idx]["docs"] = []
                    existing_products[idx]["compatibility"] = []
                    existing_products[idx]["tags"] = []
                    
                except Exception as e:
                    print(f"Failed to fetch {product_url}: {e}")
            
            idx += 1
            # Add a small delay so we don't spam the server
            time.sleep(0.3)
            
        page += 1

    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(existing_products, f, ensure_ascii=False, indent=2)
        
    print(f"Saved full data to {JSON_PATH}")

if __name__ == "__main__":
    main()
