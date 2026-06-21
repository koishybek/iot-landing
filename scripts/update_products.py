import json
import os

json_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json"))

with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

to_remove = [
    'СТ-17У',
    'Кран шаровый',
    'МУР',
    'KM-UW15',
    'Turbo Flow',
    'КМ 5',
    'СТВУ',
    'Lotte',
    'PULSAR IoT-CW15',
    'PULSAR IoT-UW15'
]

def should_remove(name):
    for sub in to_remove:
        if sub.lower() in name.lower():
            return True
    return False

def replace_gsm(text):
    if not isinstance(text, str):
        return text
    return text.replace('GSM', 'LRW').replace('gsm', 'lrw')

new_products = []

for p in products:
    name = p.get('name', '')
    if should_remove(name):
        print(f"Removing product: {name}")
        continue
    
    # Apply GSM to LRW replacement to all fields
    p_new = {}
    for key, val in p.items():
        if isinstance(val, str):
            p_new[key] = replace_gsm(val)
        elif isinstance(val, list):
            new_list = []
            for item in val:
                if isinstance(item, str):
                    new_list.append(replace_gsm(item))
                elif isinstance(item, dict):
                    new_dict = {}
                    for k, v in item.items():
                        if isinstance(v, str):
                            new_dict[k] = replace_gsm(v)
                        else:
                            new_dict[k] = v
                    new_list.append(new_dict)
                else:
                    new_list.append(item)
            p_new[key] = new_list
        else:
            p_new[key] = val
            
    new_products.append(p_new)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(new_products, f, ensure_ascii=False, indent=2)

print(f"Updated products.json: Kept {len(new_products)} out of {len(products)} products.")
