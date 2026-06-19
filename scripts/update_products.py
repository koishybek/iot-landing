import json
import os
import re

json_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json"))

with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

new_products = []

for p in products:
    name = p.get('name', '')
    
    # Remove KAZMETER KM-CW15, Вега GM2, Гранд 10ТК, ГРАНД 25ТК and all Гранд
    if 'KM-CW15' in name or 'Вега GM' in name or 'Гранд' in name or 'ГРАНД' in name:
        continue
    
    # Replace GSM with радиомодем lrw 8 канальный
    if 'GSM' in name:
        p['name'] = name.replace('GSM Радиомодем', 'Радиомодем LRW 8-канальный').replace('GSM', 'Радиомодем LRW 8-канальный')
    
    # Remove prices
    p['price'] = 'Цена по запросу'
    p['priceText'] = 'Цена по запросу'
    
    # In kazmeters, remove "расстояние до 5 км"
    if 'KAZMETER' in name.upper():
        desc = p.get('description', '')
        # "на расстояние до 5 км " -> ""
        desc = desc.replace('на расстояние до 5 км ', '')
        desc = desc.replace('расстояние до 5 км', '')
        p['description'] = desc
        
    new_products.append(p)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(new_products, f, ensure_ascii=False, indent=2)

print(f"Updated products.json: Kept {len(new_products)} out of {len(products)} products.")
