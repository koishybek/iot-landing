import json

filepath = 'src/data/products.json'

# Load products
with open(filepath, 'r', encoding='utf-8') as f:
    products = json.load(f)

# Filter out Zenner and Exponenta
original_len = len(products)
products = [p for p in products if p['id'] not in ('zenner', 'iot_exponenta')]
print(f"Removed {original_len - len(products)} products.")

# Modify prod_1
for p in products:
    if p['id'] == 'prod_1':
        p['name'] = "Радиомодем LRW 2,4,8 и 10 канальный ExpDevice (01_GSM)"
        p['variants'] = [
            { "diameter": "2-канальный", "price": "Запросить цену" },
            { "diameter": "4-канальный", "price": "Запросить цену" },
            { "diameter": "8-канальный", "price": "Запросить цену" },
            { "diameter": "10-канальный", "price": "Запросить цену" }
        ]
        print("Successfully updated prod_1 details and variants.")
        break

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Saved updated products.json")
