import json
import os
import glob

# Resolve absolute paths
base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
json_path = os.path.join(base_dir, "src", "data", "products.json")
public_dir = os.path.join(base_dir, "public")

print(f"Base Directory: {base_dir}")
print(f"Products JSON: {json_path}")
print(f"Public Directory: {public_dir}")

# Load products
with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

# Find the exact name of the 01_GSM file in public/images/catalog/
catalog_images = glob.glob(os.path.join(public_dir, "images", "catalog", "*"))
gsm_img_name = None
for path in catalog_images:
    basename = os.path.basename(path)
    if basename.startswith("01_GSM"):
        gsm_img_name = f"images/catalog/{basename}"
        print(f"Found GSM image file: {basename}")
        break

# If not found, look for 01_LRW or default
if not gsm_img_name:
    gsm_img_name = "images/catalog/01_LRW Радиомодем  ExpDevice.jpg"

updated_products = []

for p in products:
    name = p.get("name", "")
    p_id = p.get("id", "")
    
    # 1. Rename specific products to make them readable & searchable in Russian/English
    if p_id == "cascad" or name.lower() == "cascad":
        p["name"] = "Счетчик воды Cascad (Каскад)"
        p["category"] = "water"
    elif p_id == "vodomer" or name.lower() == "vodomer":
        p["name"] = "Счетчик воды Vodomer (Водомер)"
        p["category"] = "water"
    elif p_id == "zenner" or name.lower() == "zenner":
        p["name"] = "Счетчик воды Zenner (Ценнер)"
        p["category"] = "water"
    elif p_id == "iot_exponenta" or name.lower() == "iot-exponenta":
        p["name"] = "Счетчик воды IOT-Exponenta (Водомер 1)"
        p["category"] = "water"
    
    # Rename Yomtey categories to "water"
    if p_id in ["yomtey_t90", "yomtey_t50c"]:
        p["category"] = "water"
        
    # Update GSM image for prod_1
    if p_id == "prod_1":
        p["image"] = gsm_img_name
        p["name"] = "Радиомодем LRW 8-канальный ExpDevice (01_GSM)"
        p["category"] = "iot"
        p["protocols"] = ["lorawan"]
    
    # 2. Fix categories and protocols for all other items so filtering works
    # If the product name contains "Счетчик воды" or "расходомер" or "водосчетчик", set category to "water"
    lower_name = name.lower()
    if any(k in lower_name for k in ["вода", "вод", "water", "расходомер", "ввт", "водосчетчик"]):
        p["category"] = "water"
    elif any(k in lower_name for k in ["тепло", "ст-20", "стк", "марс"]):
        p["category"] = "heat"
    elif any(k in lower_name for k in ["радиомодем", "датчик", "модем"]):
        p["category"] = "iot"
        
    # Protocols mapping based on name / tags / protocols
    p_protocols = p.get("protocols", [])
    if not p_protocols:
        p_protocols = []
    if "lorawan" in lower_name or "lrw" in lower_name:
        if "lorawan" not in p_protocols: p_protocols.append("lorawan")
    if "nb-iot" in lower_name or "nbiot" in lower_name:
        if "nbiot" not in p_protocols: p_protocols.append("nbiot")
    if "импульс" in lower_name or "имульс" in lower_name or "pulse" in lower_name:
        if "pulse" not in p_protocols: p_protocols.append("pulse")
    p["protocols"] = p_protocols

    # 3. Check if the image file exists
    image_path = p.get("image", "")
    if image_path:
        # Check in public folder
        full_image_path = os.path.join(public_dir, image_path.replace("/", os.sep))
        # If it doesn't exist, check without leading slash or relative
        if not os.path.exists(full_image_path):
            # Sometimes public/ prefix is missing or there, check directly
            print(f"Image NOT found: {image_path} (Full path: {full_image_path}) - Removing product '{name}'")
            continue
        else:
            print(f"Image found: {image_path}")
    else:
        print(f"Product '{name}' has no image - Removing")
        continue
        
    updated_products.append(p)

# Save back to json
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(updated_products, f, ensure_ascii=False, indent=2)

print(f"Total products kept: {len(updated_products)} (out of {len(products)})")
