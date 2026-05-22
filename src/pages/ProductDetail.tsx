import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  Heart,
  ArrowRightLeft,
  CheckCircle,
  ChevronRight,
  Download,
  FileText,
  Shield,
  Clock,
  Truck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allProducts = [
  {
    id: "kazmeter-15c",
    name: "KAZMETER 15C",
    price: 40000,
    priceText: "40 000 ₸",
    category: "water",
    manufacturer: "kazmeter",
    protocols: ["pulse"],
    diameter: "DN15",
    image: "/images/product-kazmeter-15c.jpg",
    badge: "В наличии",
    description: "Ультразвуковой счетчик холодной воды KAZMETER 15C с импульсным выходом. Предназначен для точного учета расхода холодной воды в квартирах, офисах и промышленных объектах. Корпус из латуни, счетный механизм защищен от магнитных воздействий.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15" },
      { label: "Диапазон расхода", value: "Qmin=0,06 м³/ч, Qmax=3 м³/ч" },
      { label: "Температура воды", value: "+5...+50 °C" },
      { label: "Давление", value: "до 1,6 МПа" },
      { label: "Импульсный выход", value: "10 имп/литр" },
      { label: "Межповерочный интервал", value: "6 лет" },
      { label: "Срок службы", value: "12 лет" },
      { label: "Присоединительная резьба", value: "G 3/4\"" },
      { label: "Габариты", value: "110×78×72 мм" },
      { label: "Вес", value: "0,35 кг" },
    ],
    compatibility: ["Smart Metrix", "ЛЭРС УЧЕТ", "Инкотекс", "Пульсар-Телематика"],
    docs: [
      { name: "Руководство по эксплуатации", size: "2.4 MB" },
      { name: "Паспорт прибора", size: "1.1 MB" },
      { name: "Сертификат соответствия", size: "0.8 MB" },
      { name: "Методика поверки", size: "1.5 MB" },
    ],
    tags: ["DN15", "IP68", "Импульсный"],
  },
  {
    id: "kazmeter-15c-lrw",
    name: "KAZMETER 15C-LRW",
    price: null,
    priceText: "Цена по запросу",
    category: "water",
    manufacturer: "kazmeter",
    protocols: ["lorawan"],
    diameter: "DN15",
    image: "/images/product-kazmeter-lrw.jpg",
    badge: "LoRaWAN",
    description: "Умный счетчик воды KAZMETER 15C-LRW с встроенным LoRaWAN модулем. Автоматическая передача показаний на расстояние до 5 км в городской среде. Низкое энергопотребление, автономная работа до 10 лет.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15" },
      { label: "Диапазон расхода", value: "Qmin=0,06 м³/ч, Qmax=3 м³/ч" },
      { label: "Температура воды", value: "+5...+50 °C" },
      { label: "Давление", value: "до 1,6 МПа" },
      { label: "Протокол связи", value: "LoRaWAN 1.0.3" },
      { label: "Частота", value: "868 МГц" },
      { label: "Защита корпуса", value: "IP68" },
      { label: "Батарея", value: "Li-SOCl2, 10 лет" },
      { label: "Межповерочный интервал", value: "6 лет" },
      { label: "Присоединительная резьба", value: "G 3/4\"" },
    ],
    compatibility: ["Smart Metrix", "Actility", "The Things Network", "ChirpStack"],
    docs: [
      { name: "Руководство по эксплуатации", size: "3.1 MB" },
      { name: "Паспорт прибора", size: "1.2 MB" },
      { name: "Сертификат соответствия", size: "0.9 MB" },
      { name: "LoRaWAN Payload Description", size: "0.5 MB" },
    ],
    tags: ["LoRaWAN", "DN15", "IP68"],
  },
  // Fallback for other products
  {
    id: "kazmeter-15n-lrw",
    name: "KAZMETER 15Н-LRW",
    price: null,
    priceText: "Цена по запросу",
    category: "water",
    manufacturer: "kazmeter",
    protocols: ["lorawan"],
    diameter: "DN15",
    image: "/images/product-kazmeter-lrw.jpg",
    badge: "LoRaWAN",
    description: "Умный счетчик горячей воды KAZMETER 15Н-LRW с встроенным LoRaWAN модулем. Предназначен для учета горячей воды температурой до 90°C.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15" },
      { label: "Диапазон расхода", value: "Qmin=0,06 м³/ч, Qmax=3 м³/ч" },
      { label: "Температура воды", value: "+5...+90 °C" },
      { label: "Давление", value: "до 1,6 МПа" },
      { label: "Протокол связи", value: "LoRaWAN 1.0.3" },
      { label: "Защита корпуса", value: "IP68" },
    ],
    compatibility: ["Smart Metrix", "Actility", "The Things Network"],
    docs: [
      { name: "Руководство по эксплуатации", size: "2.8 MB" },
      { name: "Паспорт прибора", size: "1.1 MB" },
    ],
    tags: ["LoRaWAN", "DN15", "IP68", "Горячая вода"],
  },
  {
    id: "pulsar-iot-cw15",
    name: "PULSAR IoT-CW15",
    price: null,
    priceText: "Цена по запросу",
    category: "iot",
    manufacturer: "pulsar",
    protocols: ["nbiot", "lorawan"],
    diameter: "DN15",
    image: "/images/product-pulsar-cw15.jpg",
    badge: "NB-IoT",
    description: "Компактный IoT счетчик холодной воды PULSAR IoT-CW15 с поддержкой NB-IoT и LoRaWAN. Современный дизайн, высокая точность измерений.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15" },
      { label: "Диапазон расхода", value: "Qmin=0,03 м³/ч, Qmax=3 м³/ч" },
      { label: "Температура воды", value: "+5...+50 °C" },
      { label: "Протокол связи", value: "NB-IoT, LoRaWAN" },
      { label: "Защита корпуса", value: "IP68" },
    ],
    compatibility: ["Smart Metrix", "Пульсар-Телематика"],
    docs: [
      { name: "Руководство по эксплуатации", size: "2.2 MB" },
      { name: "Паспорт прибора", size: "1.0 MB" },
    ],
    tags: ["NB-IoT", "LoRaWAN", "DN15"],
  },
  {
    id: "pulsar-iot-uw15",
    name: "PULSAR IoT-UW15",
    price: null,
    priceText: "Цена по запросу",
    category: "iot",
    manufacturer: "pulsar",
    protocols: ["nbiot", "lorawan"],
    diameter: "DN15",
    image: "/images/product-pulsar-uw15.jpg",
    badge: "NB-IoT",
    description: "IoT счетчик горячей воды PULSAR IoT-UW15 с поддержкой NB-IoT и LoRaWAN. Красные акценты корпуса для визуального отличия от счетчика холодной воды.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15" },
      { label: "Диапазон расхода", value: "Qmin=0,03 м³/ч, Qmax=3 м³/ч" },
      { label: "Температура воды", value: "+5...+90 °C" },
      { label: "Протокол связи", value: "NB-IoT, LoRaWAN" },
      { label: "Защита корпуса", value: "IP68" },
    ],
    compatibility: ["Smart Metrix", "Пульсар-Телематика"],
    docs: [
      { name: "Руководство по эксплуатации", size: "2.3 MB" },
      { name: "Паспорт прибора", size: "1.0 MB" },
    ],
    tags: ["NB-IoT", "LoRaWAN", "DN15", "Горячая вода"],
  },
  {
    id: "st17u-dn15",
    name: "СТ-17У DN15-20",
    price: null,
    priceText: "Цена по запросу",
    category: "heat",
    manufacturer: "stv",
    protocols: ["mbus", "pulse"],
    diameter: "DN15-20",
    image: "/images/product-st17u.jpg",
    badge: "Тепло",
    description: "Ультразвуковой теплосчетчик СТ-17У для измерения количества теплоты в системах отопления и горячего водоснабжения. Поддержка M-Bus и импульсного выхода.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15-20" },
      { label: "Расход", value: "0,6...5 м³/ч" },
      { label: "Температура", value: "+5...+150 °C" },
      { label: "Давление", value: "до 2,5 МПа" },
      { label: "Протокол", value: "M-Bus, Импульсный" },
    ],
    compatibility: ["Smart Metrix", "ЛЭРС УЧЕТ"],
    docs: [
      { name: "Руководство по эксплуатации", size: "3.5 MB" },
      { name: "Паспорт прибора", size: "1.3 MB" },
    ],
    tags: ["M-Bus", "DN15-20", "Тепло"],
  },
  {
    id: "st20",
    name: "СТ-20",
    price: null,
    priceText: "Цена по запросу",
    category: "water",
    manufacturer: "stv",
    protocols: ["pulse"],
    diameter: "DN20",
    image: "/images/product-st20.jpg",
    badge: "В наличии",
    description: "Компактный турбинный счетчик воды СТ-20 для бытового и коммерческого учета. Механический счетный механизм с импульсным выходом.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN20" },
      { label: "Расход", value: "0,15...5 м³/ч" },
      { label: "Температура", value: "+5...+50 °C" },
      { label: "Давление", value: "до 1,6 МПа" },
      { label: "Импульсный выход", value: "10 имп/литр" },
    ],
    compatibility: ["Smart Metrix"],
    docs: [
      { name: "Руководство по эксплуатации", size: "1.8 MB" },
      { name: "Паспорт прибора", size: "0.9 MB" },
    ],
    tags: ["DN20", "Импульсный"],
  },
  {
    id: "vvt-ip68",
    name: "ВВТ IP68 Ду40–Ду200",
    price: null,
    priceText: "Цена по запросу",
    category: "water",
    manufacturer: "vvt",
    protocols: ["pulse", "rs485"],
    diameter: "DN40–200",
    image: "/images/product-bvt.jpg",
    badge: "Промышленный",
    description: "Промышленный электромагнитный расходомер ВВТ IP68 для больших диаметров трубопроводов. Защита корпуса IP68 позволяет установку в затопляемых камерах.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN40–DN200" },
      { label: "Расход", value: "от 6 до 1200 м³/ч" },
      { label: "Температура", value: "-10...+70 °C" },
      { label: "Давление", value: "до 1,6 МПа" },
      { label: "Протокол", value: "RS-485, Импульсный" },
      { label: "Защита", value: "IP68" },
    ],
    compatibility: ["Smart Metrix", "SCADA"],
    docs: [
      { name: "Руководство по эксплуатации", size: "4.2 MB" },
      { name: "Паспорт прибора", size: "1.5 MB" },
    ],
    tags: ["RS-485", "DN40–200", "IP68", "Промышленный"],
  },
  {
    id: "mur-1001",
    name: "МУР 1001.5 SmartOn EE1",
    price: null,
    priceText: "Цена по запросу",
    category: "iot",
    manufacturer: "mur",
    protocols: ["lorawan", "nbiot"],
    diameter: "DN15",
    image: "/images/product-mur.jpg",
    badge: "Smart",
    description: "Умный расходомер МУР 1001.5 SmartOn EE1 с встроенными модулями LoRaWAN и NB-IoT. Ethernet порт для прямого подключения к локальной сети. Промышленное исполнение.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15" },
      { label: "Расход", value: "0,06...3 м³/ч" },
      { label: "Температура", value: "+5...+90 °C" },
      { label: "Давление", value: "до 1,6 МПа" },
      { label: "Протокол", value: "LoRaWAN, NB-IoT, Ethernet" },
    ],
    compatibility: ["Smart Metrix", "ChirpStack", "Actility"],
    docs: [
      { name: "Руководство по эксплуатации", size: "3.8 MB" },
      { name: "Паспорт прибора", size: "1.4 MB" },
    ],
    tags: ["LoRaWAN", "NB-IoT", "Ethernet", "DN15"],
  },
  {
    id: "stvu",
    name: "СТВУ",
    price: null,
    priceText: "Цена по запросу",
    category: "heat",
    manufacturer: "stv",
    protocols: ["mbus"],
    diameter: "DN15-25",
    image: "/images/product-st17u.jpg",
    badge: "Ультразвуковой",
    description: "Ультразвуковой теплосчетчик СТВУ для учета тепловой энергии в системах отопления и ГВС. Современная ультразвуковая технология измерения расхода.",
    specs: [
      { label: "Диаметр условного прохода", value: "DN15-25" },
      { label: "Расход", value: "0,06...7 м³/ч" },
      { label: "Температура", value: "+5...+150 °C" },
      { label: "Давление", value: "до 2,5 МПа" },
      { label: "Протокол", value: "M-Bus" },
    ],
    compatibility: ["Smart Metrix", "ЛЭРС УЧЕТ"],
    docs: [
      { name: "Руководство по эксплуатации", size: "3.0 MB" },
      { name: "Паспорт прибора", size: "1.2 MB" },
    ],
    tags: ["M-Bus", "DN15-25", "Тепло", "Ультразвуковой"],
  },
];

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [favorite, setFavorite] = useState(false);
  const [compare, setCompare] = useState(false);

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-4">Товар не найден</h1>
        <Link to="/catalog" className="btn-primary">Вернуться в каталог</Link>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="bg-[#F8FBF9] py-8">
        <div className="container-main">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#8BA89B] hover:text-[#1B4332]">Главная</Link>
            <ChevronRight size={14} className="text-[#8BA89B]" />
            <Link to="/catalog" className="text-[#8BA89B] hover:text-[#1B4332]">Каталог</Link>
            <ChevronRight size={14} className="text-[#8BA89B]" />
            <span className="text-[#1B4332] font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Info */}
      <section className="bg-white py-8 md:py-12">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div>
              <div className="bg-[#F8FBF9] rounded-2xl p-8 flex items-center justify-center aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-[#D8F3DC] text-[#1B4332] text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-[#1B4332] mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-[#52B788] mb-6">{product.priceText}</p>
              <p className="text-[#5C7A6B] mb-8 leading-relaxed">{product.description}</p>

              {/* Delivery info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-[#F8FBF9] rounded-xl">
                  <Truck size={20} className="text-[#52B788] mx-auto mb-2" />
                  <div className="text-xs text-[#5C7A6B]">Доставка</div>
                  <div className="text-sm font-medium text-[#1B4332]">По Казахстану</div>
                </div>
                <div className="text-center p-4 bg-[#F8FBF9] rounded-xl">
                  <Shield size={20} className="text-[#52B788] mx-auto mb-2" />
                  <div className="text-xs text-[#5C7A6B]">Гарантия</div>
                  <div className="text-sm font-medium text-[#1B4332]">До 3 лет</div>
                </div>
                <div className="text-center p-4 bg-[#F8FBF9] rounded-xl">
                  <Clock size={20} className="text-[#52B788] mx-auto mb-2" />
                  <div className="text-xs text-[#5C7A6B]">Срок поставки</div>
                  <div className="text-sm font-medium text-[#1B4332]">1-3 дня</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link to="/contacts" className="flex-1 btn-primary text-center py-3.5">
                  Запросить цену
                </Link>
                <button
                  onClick={() => setCompare(!compare)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-colors ${
                    compare
                      ? "border-[#1B4332] bg-[#1B4332] text-white"
                      : "border-[#D8E8DE] text-[#8BA89B] hover:border-[#1B4332]"
                  }`}
                >
                  <ArrowRightLeft size={18} />
                </button>
                <button
                  onClick={() => setFavorite(!favorite)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-colors ${
                    favorite
                      ? "border-red-400 bg-red-50 text-red-500"
                      : "border-[#D8E8DE] text-[#8BA89B] hover:border-red-400"
                  }`}
                >
                  <Heart size={18} fill={favorite ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-[#F8FBF9] section-padding">
        <div className="container-main">
          <Tabs defaultValue="specs" className="max-w-4xl">
            <TabsList className="bg-white border border-[#D8E8DE] p-1 rounded-xl mb-8">
              <TabsTrigger
                value="description"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1B4332] data-[state=active]:text-white"
              >
                Описание
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1B4332] data-[state=active]:text-white"
              >
                Характеристики
              </TabsTrigger>
              <TabsTrigger
                value="compatibility"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1B4332] data-[state=active]:text-white"
              >
                Совместимость
              </TabsTrigger>
              <TabsTrigger
                value="docs"
                className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#1B4332] data-[state=active]:text-white"
              >
                Документы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="bg-white rounded-2xl p-8 border border-[#D8E8DE]">
              <p className="text-[#5C7A6B] leading-relaxed">{product.description}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-[#F8FBF9] rounded-xl">
                  <CheckCircle size={20} className="text-[#52B788]" />
                  <span className="text-sm text-[#5C7A6B]">Сертифицирован в РК</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F8FBF9] rounded-xl">
                  <CheckCircle size={20} className="text-[#52B788]" />
                  <span className="text-sm text-[#5C7A6B]">Госреестр РК</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F8FBF9] rounded-xl">
                  <CheckCircle size={20} className="text-[#52B788]" />
                  <span className="text-sm text-[#5C7A6B]">Техническая поддержка</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F8FBF9] rounded-xl">
                  <CheckCircle size={20} className="text-[#52B788]" />
                  <span className="text-sm text-[#5C7A6B]">Гарантия производителя</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="bg-white rounded-2xl border border-[#D8E8DE] overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specs.map((spec, idx) => (
                    <tr
                      key={spec.label}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FBF9]"}
                    >
                      <td className="px-6 py-3.5 text-sm text-[#5C7A6B] w-1/2">{spec.label}</td>
                      <td className="px-6 py-3.5 text-sm text-[#1B4332] font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="compatibility" className="bg-white rounded-2xl p-8 border border-[#D8E8DE]">
              <p className="text-[#5C7A6B] mb-6">Прибор совместим со следующими системами диспетчеризации и учета:</p>
              <div className="flex flex-wrap gap-3">
                {product.compatibility.map((sys) => (
                  <span key={sys} className="bg-[#D8F3DC] text-[#1B4332] px-4 py-2 rounded-lg text-sm font-medium">
                    {sys}
                  </span>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="docs" className="bg-white rounded-2xl border border-[#D8E8DE] overflow-hidden">
              <div className="divide-y divide-[#D8E8DE]">
                {product.docs.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between px-6 py-4 hover:bg-[#F8FBF9] transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-[#8BA89B]" />
                      <span className="text-sm text-[#1B4332]">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#8BA89B]">{doc.size}</span>
                      <button className="text-[#52B788] hover:text-[#1B4332] transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white section-padding">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-[#1B4332] mb-8">Похожие товары</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} to={`/catalog/${rp.id}`} className="card-base overflow-hidden group">
                  <div className="bg-[#F8FBF9] p-4 flex items-center justify-center aspect-square">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1B4332] text-sm mb-1 group-hover:text-[#2D6A4F] transition-colors">{rp.name}</h3>
                    <p className="text-[#52B788] font-bold text-sm">{rp.priceText}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
