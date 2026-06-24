import json
import os

json_path = "src/data/products.json"

# Load existing products
if os.path.exists(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        products = json.load(f)
else:
    products = []

# 1. Filter out prod_29 (Радиомодем ExpDevice на базе LoRaWAN\NB-IoT)
original_len = len(products)
products = [p for p in products if p.get("id") != "prod_29"]
print(f"Removed prod_29. Product count went from {original_len} to {len(products)}")

# 2. Add KAZMETER 15C-NB if not exists
if not any(p.get("id") == "kazmeter_15c_nb" for p in products):
    kazmeter_15c_nb = {
        "id": "kazmeter_15c_nb",
        "name": "KAZMETER 15C-NB",
        "price": "Запросить цену",
        "image": "images/kazmeter-c.png",
        "priceText": "Запросить цену",
        "category": "water",
        "manufacturer": "other",
        "protocols": ["nbiot", "nbiot_kazmeter"],
        "diameter": "",
        "badge": "Новинка",
        "docs": [
            {
                "name": "Руководство по эксплуатации",
                "size": "2.9 MB"
            },
            {
                "name": "Паспорт прибора",
                "size": "1.1 MB"
            }
        ],
        "compatibility": [
            "Smart Metrix",
            "Actility",
            "ChirpStack"
        ],
        "tags": [
            "NB-IoT",
            "DN15",
            "IP68"
        ],
        "description": "Умный счетчик воды KAZMETER 15C-NB со встроенным NB-IoT модулем. Автоматическая передача показаний через сотовую сеть. Отличная проникающая способность сигнала в подвальных помещениях и колодцах.",
        "specs": [
            {
                "label": "Диаметр условного прохода",
                "value": "DN15"
            },
            {
                "label": "Температура воды",
                "value": "+5...+50 °C"
            },
            {
                "label": "Давление",
                "value": "до 1,6 МПа"
            },
            {
                "label": "Протокол связи",
                "value": "NB-IoT (Narrowband IoT)"
            },
            {
                "label": "Защита корпуса",
                "value": "IP68"
            },
            {
                "label": "Батарея",
                "value": "Li-SOCl2, до 10 лет работы"
            },
            {
                "label": "Межповерочный интервал",
                "value": "6 лет"
            }
        ]
    }
    products.append(kazmeter_15c_nb)
    print("Added KAZMETER 15C-NB")

# 3. Add KAZMETER 15H-NB if not exists
if not any(p.get("id") == "kazmeter_15h_nb" for p in products):
    kazmeter_15h_nb = {
        "id": "kazmeter_15h_nb",
        "name": "KAZMETER 15H-NB",
        "price": "Запросить цену",
        "image": "images/kazmeter-h.png",
        "priceText": "Запросить цену",
        "category": "water",
        "manufacturer": "other",
        "protocols": ["nbiot", "nbiot_kazmeter"],
        "diameter": "",
        "badge": "Новинка",
        "docs": [
            {
                "name": "Руководство по эксплуатации",
                "size": "2.9 MB"
            },
            {
                "name": "Паспорт прибора",
                "size": "1.1 MB"
            }
        ],
        "compatibility": [
            "Smart Metrix",
            "Actility",
            "ChirpStack"
        ],
        "tags": [
            "NB-IoT",
            "DN15",
            "IP68",
            "Горячая вода"
        ],
        "description": "Умный счетчик горячей воды KAZMETER 15Н-NB со встроенным NB-IoT модулем. Предназначен для точного учета расхода горячей воды до 90°C и автоматической передачи показаний.",
        "specs": [
            {
                "label": "Диаметр условного прохода",
                "value": "DN15"
            },
            {
                "label": "Температура воды",
                "value": "+5...+90 °C"
            },
            {
                "label": "Давление",
                "value": "до 1,6 МПа"
            },
            {
                "label": "Протокол связи",
                "value": "NB-IoT (Narrowband IoT)"
            },
            {
                "label": "Защита корпуса",
                "value": "IP68"
            },
            {
                "label": "Батарея",
                "value": "Li-SOCl2, до 10 лет работы"
            },
            {
                "label": "Межповерочный интервал",
                "value": "6 лет"
            }
        ]
    }
    products.append(kazmeter_15h_nb)
    print("Added KAZMETER 15H-NB")

# 4. Add Goldcard counter if not exists
if not any(p.get("id") == "goldcard" for p in products):
    goldcard_product = {
        "id": "goldcard",
        "name": "Счетчик воды Goldcard",
        "price": "Запросить цену",
        "image": "images/catalog/Goldcard.png",
        "priceText": "Запросить цену",
        "category": "water",
        "manufacturer": "other",
        "protocols": ["pulse", "lorawan", "nbiot"],
        "diameter": "",
        "badge": "",
        "docs": [],
        "compatibility": [
            "Smart Metrix",
            "ChirpStack",
            "Actility"
        ],
        "tags": [
            "Goldcard",
            "DN15",
            "DN20",
            "IP68",
            "NB-IoT",
            "LoRaWAN"
        ],
        "description": "Интеллектуальный счетчик воды Goldcard со встроенным модемом. Предназначен для высокоточного автоматического измерения и учета расхода холодной и горячей воды с дистанционной передачей данных в систему Smart Metrix.",
        "specs": [
            {
                "label": "Диаметр условного прохода",
                "value": "DN15 / DN20"
            },
            {
                "label": "Интерфейсы связи",
                "value": "NB-IoT, LoRaWAN, Импульсный выход"
            },
            {
                "label": "Класс защиты корпуса",
                "value": "IP68"
            },
            {
                "label": "Температура рабочей среды",
                "value": "+0.1...+50 °C (ХВС) / до +90 °C (ГВС)"
            },
            {
                "label": "Срок службы батареи",
                "value": "до 8-10 лет"
            },
            {
                "label": "Межповерочный интервал",
                "value": "6 лет"
            }
        ]
    }
    products.append(goldcard_product)
    print("Added Goldcard water meter product")

# Write changes back
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Successfully updated products.json!")
