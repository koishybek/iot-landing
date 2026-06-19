import json
import os

JSON_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "data", "products.json"))

def main():
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        products = json.load(f)
        
    for p in products:
        if p["id"] == "prod_2":
            p["image"] = "/images/kazmeter-c.png"
            p["badge"] = "Популярно"
            p["name"] = "KAZMETER 15C-LRW" # Make name cleaner? The user said "под названием Kazmeter 15C - lrw"
            p["description"] = "Умный счетчик воды KAZMETER 15C-LRW с встроенным LoRaWAN модулем. Автоматическая передача показаний на расстояние до 5 км в городской среде. Низкое энергопотребление, автономная работа до 10 лет."
            p["specs"] = [
                { "label": "Диаметр условного прохода", "value": "DN15" },
                { "label": "Диапазон расхода", "value": "Qmin=0,06 м³/ч, Qmax=3 м³/ч" },
                { "label": "Температура воды", "value": "+5...+50 °C" },
                { "label": "Давление", "value": "до 1,6 МПа" },
                { "label": "Протокол связи", "value": "LoRaWAN 1.0.3" },
                { "label": "Частота", "value": "868 МГц" },
                { "label": "Защита корпуса", "value": "IP68" },
                { "label": "Батарея", "value": "Li-SOCl2, 10 лет" },
                { "label": "Межповерочный интервал", "value": "6 лет" },
                { "label": "Присоединительная резьба", "value": "G 3/4\"" }
            ]
            p["compatibility"] = ["Smart Metrix", "Actility", "The Things Network", "ChirpStack"]
            p["docs"] = [
                { "name": "Руководство по эксплуатации", "size": "3.1 MB" },
                { "name": "Паспорт прибора", "size": "1.2 MB" },
                { "name": "Сертификат соответствия", "size": "0.9 MB" },
                { "name": "LoRaWAN Payload Description", "size": "0.5 MB" }
            ]
            p["tags"] = ["LoRaWAN", "DN15", "IP68"]

        elif p["id"] == "prod_3":
            p["image"] = "/images/kazmeter-h.png"
            p["badge"] = "Популярно"
            p["name"] = "KAZMETER 15H-LRW"
            p["description"] = "Умный счетчик горячей воды KAZMETER 15Н-LRW с встроенным LoRaWAN модулем. Предназначен для учета горячей воды температурой до 90°C."
            p["specs"] = [
                { "label": "Диаметр условного прохода", "value": "DN15" },
                { "label": "Диапазон расхода", "value": "Qmin=0,06 м³/ч, Qmax=3 м³/ч" },
                { "label": "Температура воды", "value": "+5...+90 °C" },
                { "label": "Давление", "value": "до 1,6 МПа" },
                { "label": "Протокол связи", "value": "LoRaWAN 1.0.3" },
                { "label": "Защита корпуса", "value": "IP68" }
            ]
            p["compatibility"] = ["Smart Metrix", "Actility", "The Things Network"]
            p["docs"] = [
                { "name": "Руководство по эксплуатации", "size": "2.8 MB" },
                { "name": "Паспорт прибора", "size": "1.1 MB" }
            ]
            p["tags"] = ["LoRaWAN", "DN15", "IP68", "Горячая вода"]

    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print("Patched prod_2 and prod_3")

if __name__ == "__main__":
    main()
