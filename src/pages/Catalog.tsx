import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import productsData from "../data/products.json";
import { COLLECTIONS } from "../lib/collections";
import { useCart } from "../context/CartContext";
import LeadBlock from "../components/LeadBlock";

// Type assertion to ensure TS knows the structure if needed, or just let it infer.
const products = productsData as any[];
const categories = [
  { id: "water", name: "Счетчики воды" },
  { id: "heat", name: "Теплосчетчики" },
  { id: "electricity", name: "Электросчетчики" },
  { id: "iot", name: "IoT устройства" },
];

const manufacturers = [
  { id: "kazmeter", name: "KAZMETER", match: "KAZMETER" },
  { id: "yomtey", name: "YomteY", match: "YOMTEY" },
  { id: "expdevice", name: "ExpDevice", match: "EXPDEVICE" },
  { id: "vvt", name: "ВВТ", match: "ВВТ" },
  { id: "mur", name: "МУР", match: "МУР" },
];

/** Марка определяется по названию: поле manufacturer в данных не заполнено. */
const matchesManufacturer = (name: string, id: string) => {
  const m = manufacturers.find((x) => x.id === id);
  return m ? name.toUpperCase().includes(m.match) : false;
};

const protocols = [
  { id: "lorawan", name: "LoRaWAN" },
  { id: "nbiot", name: "NB-IoT" },
  { id: "nbiot_kazmeter", name: "Связь нб казметр" },
  { id: "pulse", name: "Импульсный выход" },
  { id: "rs485", name: "RS-485" },
];

export default function Catalog() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleFilter = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const getCategoryCount = (catId: string) =>
    products.filter((p) => p.category === catId).length;

  const getManufacturerCount = (mId: string) =>
    products.filter((p) => matchesManufacturer(p.name, mId)).length;

  const getProductWeight = (p: any) => {
    const nameLower = p.name.toLowerCase();
    
    // 1. Kazmeter counters and modems (highest priority)
    const isKazmeter = nameLower.includes("kazmeter") || p.manufacturer === "kazmeter";
    if (isKazmeter) {
      return 1;
    }
    
    // 3. Sensors (lowest priority)
    const isSensor = nameLower.includes("датчик") || p.category === "sensor" || nameLower.includes("sensor");
    if (isSensor) {
      return 3;
    }
    
    // 2. Others (middle priority)
    return 2;
  };

  const filteredProducts = products
    .filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category))
        return false;
      if (
        selectedManufacturers.length &&
        !selectedManufacturers.some((m) => matchesManufacturer(p.name, m))
      )
        return false;
      if (selectedProtocols.length && !p.protocols.some((pr: string) => selectedProtocols.includes(pr)))
        return false;
      return true;
    })
    .sort((a, b) => {
      const weightA = getProductWeight(a);
      const weightB = getProductWeight(b);
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return (a.price || 0) - (b.price || 0);
      return 0;
    });



  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="font-semibold text-[#1B4332] mb-4">Категории</h4>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleFilter(setSelectedCategories, cat.id)}
                className="w-4 h-4 border-[#D8E8DE] rounded text-[#1B4332] focus:ring-[#52B788]"
              />
              <span className="text-sm text-[#5C7A6B] group-hover:text-[#1B4332] transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-[#8BA89B] ml-auto">{getCategoryCount(cat.id)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Manufacturers */}
      <div>
        <h4 className="font-semibold text-[#1B4332] mb-4">Производитель</h4>
        <div className="space-y-2.5">
          {manufacturers.map((m) => (
            <label key={m.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedManufacturers.includes(m.id)}
                onChange={() => toggleFilter(setSelectedManufacturers, m.id)}
                className="w-4 h-4 border-[#D8E8DE] rounded text-[#1B4332] focus:ring-[#52B788]"
              />
              <span className="text-sm text-[#5C7A6B] group-hover:text-[#1B4332] transition-colors">
                {m.name}
              </span>
              <span className="text-xs text-[#8BA89B] ml-auto">{getManufacturerCount(m.id)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Protocols */}
      <div>
        <h4 className="font-semibold text-[#1B4332] mb-4">Протокол связи</h4>
        <div className="space-y-2.5">
          {protocols.map((p) => (
            <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedProtocols.includes(p.id)}
                onChange={() => toggleFilter(setSelectedProtocols, p.id)}
                className="w-4 h-4 border-[#D8E8DE] rounded text-[#1B4332] focus:ring-[#52B788]"
              />
              <span className="text-sm text-[#5C7A6B] group-hover:text-[#1B4332] transition-colors">
                {p.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategories([]);
          setSelectedManufacturers([]);
          setSelectedProtocols([]);
        }}
        className="text-sm text-[#52B788] hover:text-[#1B4332] transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F8FBF9] py-12 md:py-16">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B4332] mb-4">
            Каталог оборудования
          </h1>
          <p className="text-lg text-[#5C7A6B]">
            IoT-счетчики электроэнергии, воды, тепла и газа от ведущих производителей
          </p>

          {/* Подборки: постоянные адреса под конкретные запросы. Фильтры ниже
              удобны человеку, но своей страницы не создают — ссылки нужны,
              чтобы поисковик вообще нашёл эти разделы. */}
          <nav className="flex flex-wrap gap-2 mt-7" aria-label="Подборки каталога">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                to={`/catalog/${c.slug}`}
                className="bg-white border border-[#D8E8DE] text-[#1B4332] text-sm font-medium px-4 py-2 rounded-full hover:border-[#52B788] hover:text-[#2D6A4F] transition-colors"
              >
                {c.h1}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-main">
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8BA89B]"
              />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#D8E8DE] rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-[#52B788]"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden btn-secondary gap-2"
              >
                <SlidersHorizontal size={16} />
                Фильтры
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none border border-[#D8E8DE] rounded-lg px-4 py-3 pr-10 bg-white focus:outline-none focus:border-[#52B788] text-sm"
                >
                  <option value="default">По умолчанию</option>
                  <option value="name">По названию</option>
                  <option value="price">По цене</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8BA89B] pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterContent />
            </aside>

            {/* Mobile Filters */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
                <div
                  className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-[#1B4332]">Фильтры</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X size={20} className="text-[#8BA89B]" />
                    </button>
                  </div>
                  <FilterContent />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-[#8BA89B]">
                Найдено: {filteredProducts.length} товаров
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card-base overflow-hidden group">
                    <Link to={`/catalog/${product.id}`}>
                      <div className="bg-[#F8FBF9] p-4 flex items-center justify-center aspect-square relative">
                        <img loading="lazy" decoding="async"
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-[#D8F3DC] text-[#1B4332] text-xs font-medium px-2.5 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="text-xs text-[#8BA89B] mb-1">
                        {product.protocols.map((p: string) => p.toUpperCase()).join(", ")} · {product.diameter}
                      </div>
                      <Link to={`/catalog/${product.id}`}>
                        <h3 className="font-semibold text-[#1B4332] mb-1 group-hover:text-[#2D6A4F] transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      {product.variants && product.variants.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2 mt-1.5">
                          {product.variants.map((v: any) => (
                            <span key={v.diameter} className="bg-[#E8F7ED] text-[#1B4332] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#D8E8DE]">
                              {v.diameter}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-[#52B788] font-bold mb-4">
                        {product.priceText}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          to={`/catalog/${product.id}`}
                          className="flex-1 btn-primary text-sm py-2.5 text-center"
                        >
                          Подробнее
                        </Link>
                        <button
                          onClick={() => addToCart(product, product.diameter || "")}
                          className="flex-1 border border-[#1B4332] text-[#1B4332] rounded-lg text-sm py-2.5 font-medium hover:bg-[#1B4332] hover:text-white transition-colors"
                        >
                          Запросить цену
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-[#8BA89B]">Товары не найдены</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <LeadBlock source="Каталог" />
    </div>
  );
}
