import os
import glob
import json

src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('"/images/', '"images/')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    # Fix TSX files
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                replace_in_file(os.path.join(root, file))
                
    # Fix products.json
    json_path = os.path.join(src_dir, "data", "products.json")
    replace_in_file(json_path)
    
    print("All image paths updated to relative.")

if __name__ == "__main__":
    main()
