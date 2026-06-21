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
  ShoppingCart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { submitToWhatsApp } from "../utils/whatsapp";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";

const allProducts = productsData as any[];

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [favorite, setFavorite] = useState(false);
  const [compare, setCompare] = useState(false);
  const [selectedDiameter, setSelectedDiameter] = useState("");
  const [consultOpen, setConsultOpen] = useState(false);

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

  const variants = product.variants as any[] | undefined;
  const displayPrice = selectedDiameter && variants
    ? variants.find((v) => v.diameter === selectedDiameter)?.price || "Запросить цену"
    : "Запросить цену";

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
                {product.tags?.map((tag: string) => (
                  <span key={tag} className="bg-[#D8F3DC] text-[#1B4332] text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-[#1B4332] mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-[#52B788] mb-6">{displayPrice}</p>
              
              {/* Diameter selection */}
              {variants && variants.length > 0 && (
                <div className="mb-6 bg-[#F8FBF9] p-4 rounded-xl border border-[#D8E8DE]">
                  <label className="text-sm font-semibold text-[#1B4332] block mb-2">Выберите диаметр:</label>
                  <select
                    value={selectedDiameter}
                    onChange={(e) => setSelectedDiameter(e.target.value)}
                    className="w-full max-w-xs border border-[#D8E8DE] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#52B788] bg-white text-sm text-[#1B4332]"
                  >
                    <option value="">Выберите диаметр</option>
                    {variants.map((v) => (
                      <option key={v.diameter} value={v.diameter}>
                        {v.diameter}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <p className="text-[#5C7A6B] mb-8 leading-relaxed whitespace-pre-wrap">{product.description}</p>

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
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      if (variants && variants.length > 0 && !selectedDiameter) {
                        alert("Пожалуйста, выберите диаметр прибора перед добавлением в корзину!");
                        return;
                      }
                      addToCart(product, selectedDiameter);
                    }}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 text-center py-3.5"
                  >
                    <ShoppingCart size={18} />
                    Добавить в корзину
                  </button>
                  <button
                    onClick={() => setConsultOpen(true)}
                    className="flex-1 border border-[#D8E8DE] text-[#1B4332] hover:border-[#1B4332] font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors py-3.5"
                  >
                    Получить консультацию
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/77711731722?text=${encodeURIComponent(`Здравствуйте! Меня интересует прибор: ${product.name}${selectedDiameter ? ` (Диаметр: ${selectedDiameter})` : ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA56] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors py-3.5 shadow-sm text-center"
                  >
                    Связаться через WhatsApp
                  </a>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCompare(!compare)}
                    className={`flex-1 h-12 rounded-lg border flex items-center justify-center gap-2 transition-colors text-sm font-medium ${
                      compare
                        ? "border-[#1B4332] bg-[#1B4332] text-white"
                        : "border-[#D8E8DE] text-[#8BA89B] hover:border-[#1B4332]"
                    }`}
                  >
                    <ArrowRightLeft size={16} /> Сравнить
                  </button>
                  <button
                    onClick={() => setFavorite(!favorite)}
                    className={`flex-1 h-12 rounded-lg border flex items-center justify-center gap-2 transition-colors text-sm font-medium ${
                      favorite
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-[#D8E8DE] text-[#8BA89B] hover:border-red-400"
                    }`}
                  >
                    <Heart size={16} fill={favorite ? "currentColor" : "none"} /> В избранное
                  </button>
                </div>
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
              <p className="text-[#5C7A6B] leading-relaxed whitespace-pre-wrap">{product.description}</p>
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
                  {product.specs?.map((spec: any, idx: number) => (
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
                {product.compatibility?.map((sys: string) => (
                  <span key={sys} className="bg-[#D8F3DC] text-[#1B4332] px-4 py-2 rounded-lg text-sm font-medium">
                    {sys}
                  </span>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="docs" className="bg-white rounded-2xl border border-[#D8E8DE] overflow-hidden">
              <div className="divide-y divide-[#D8E8DE]">
                {product.docs?.map((doc: any) => (
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

      {/* Consultation Dialog */}
      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0 border-none">
          <div className="bg-[#1B4332] p-6 text-center">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Получить консультацию</DialogTitle>
            </DialogHeader>
            <p className="text-white/80 text-sm mt-2">Заполните форму и мы свяжемся с вами в ближайшее время.</p>
          </div>
          <div className="p-8 bg-white">
            <form className="space-y-5" onSubmit={(e) => { setConsultOpen(false); submitToWhatsApp(e); }}>
              <input type="hidden" name="Товар" value={product.name + (selectedDiameter ? ` (Диаметр: ${selectedDiameter})` : '')} />
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Имя *</label>
                <input type="text" name="Имя" required placeholder="Как к вам обращаться?" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              </div>
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Телефон *</label>
                <input type="tel" name="Телефон" required placeholder="Ваш номер телефона" className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all" />
              </div>
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Город *</label>
                <select name="Город" required className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all">
                  <option value="Астана">Астана</option>
                  <option value="Алматы">Алматы</option>
                  <option value="Шымкент">Шымкент</option>
                  <option value="Туркестан">Туркестан</option>
                  <option value="Другой">Другой</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#5C7A6B] mb-1 block">Сообщение</label>
                <textarea name="Ваш вопрос" placeholder="Задайте ваш вопрос по прибору..." rows={3} className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-xl px-5 py-4 focus:outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#52B788] hover:bg-[#40916C] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#52B788]/30 transition-transform hover:-translate-y-1 active:translate-y-0">
                Отправить заявку
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

