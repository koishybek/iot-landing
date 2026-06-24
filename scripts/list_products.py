import json
import sys

# Ensure UTF-8 output encoding
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

for p in products:
    print(f"ID: {p['id']}")
    print(f"  Name: {p['name']}")
    print(f"  Category: {p.get('category')}")
    print(f"  Protocols: {p.get('protocols')}")
    print(f"  Manufacturer: {p.get('manufacturer')}")
    print(f"  Image: {p.get('image')}")
    print("-" * 40)
