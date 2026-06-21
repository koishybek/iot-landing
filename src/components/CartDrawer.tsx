import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, Trash2, ShoppingCart, MessageSquare } from "lucide-react";
import { submitToWhatsApp } from "../utils/whatsapp";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  if (!cartOpen) {
    if (totalItems === 0) return null;
    return (
      <div className="fixed bottom-24 right-6 z-[90]">
        <button
          onClick={() => setCartOpen(true)}
          className="w-16 h-16 bg-[#52B788] hover:bg-[#40916C] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 relative border-2 border-white"
          title="Открыть корзину"
        >
          <ShoppingCart size={26} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
            {totalItems}
          </span>
        </button>
      </div>
    );
  }

  // Calculate total price in Tenge if possible
  let hasPrices = false;
  let hasInquiry = false;
  const totalPrice = cart.reduce((sum, item) => {
    const priceStr = item.price.replace(/\s+/g, "").replace("тг", "");
    const priceNum = parseInt(priceStr, 10);
    if (!isNaN(priceNum)) {
      hasPrices = true;
      return sum + priceNum * item.count;
    } else {
      hasInquiry = true;
      return sum;
    }
  }, 0);

  const formatPrice = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " тг";
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !city) {
      alert("Пожалуйста, заполните обязательные поля: Имя, Телефон и Город.");
      return;
    }

    // Format WhatsApp message
    let text = "🛒 *Новый заказ с сайта IoT-Exponenta*\n\n";
    text += `👤 *Имя:* ${name}\n`;
    text += `📞 *Телефон:* ${phone}\n`;
    text += `📍 *Город:* ${city}\n`;
    if (message) {
      text += `💬 *Сообщение:* ${message}\n`;
    }
    text += "\n📦 *Выбранные товары:*\n";

    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   📐 Диаметр: ${item.diameter}\n`;
      text += `   🔢 Кол-во: ${item.count} шт.\n`;
      text += `   💵 Цена: ${item.price}\n\n`;
    });

    if (hasPrices) {
      text += `💰 *Итого:* ${formatPrice(totalPrice)}`;
      if (hasInquiry) {
        text += " (+ позиции по запросу)";
      }
    } else {
      text += "💰 *Итого:* Цена по запросу";
    }

    // Create a mock event to pass to submitToWhatsApp with our fields
    const form = document.createElement("form");
    
    const nameInput = document.createElement("input");
    nameInput.name = "Имя";
    nameInput.value = name;
    form.appendChild(nameInput);

    const phoneInput = document.createElement("input");
    phoneInput.name = "Телефон";
    phoneInput.value = phone;
    form.appendChild(phoneInput);

    const cityInput = document.createElement("input");
    cityInput.name = "Город";
    cityInput.value = city;
    form.appendChild(cityInput);

    const textInput = document.createElement("input");
    textInput.name = "Заказ";
    textInput.value = text;
    form.appendChild(textInput);

    // Append to body temporarily
    document.body.appendChild(form);

    // Call submitToWhatsApp
    const mockEvent = {
      preventDefault: () => {},
      currentTarget: form
    };

    // Override routing text since we formatted it beautifully
    // We modify submitToWhatsApp to handle custom formatted texts if present
    submitToWhatsApp(mockEvent as any);

    // Clean up
    document.body.removeChild(form);
    clearCart();
    setCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={() => setCartOpen(false)} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-[#D8E8DE] flex items-center justify-between bg-[#1B4332] text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingCart size={22} className="text-[#52B788]" />
            <h3 className="text-lg font-bold">Корзина ({totalItems})</h3>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 bg-[#F8FBF9] rounded-2xl flex items-center justify-center mb-4 border border-[#D8E8DE]">
                <ShoppingCart size={28} className="text-[#8BA89B]" />
              </div>
              <h4 className="text-base font-bold text-[#1B4332] mb-1">Ваша корзина пуста</h4>
              <p className="text-sm text-[#5C7A6B] max-w-xs mb-6">
                Выберите интеллектуальный прибор учета в нашем каталоге и добавьте его сюда.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="btn-primary text-sm px-6 py-2.5"
              >
                Вернуться в каталог
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.diameter}`}
                    className="flex gap-4 bg-[#F8FBF9] p-4 rounded-xl border border-[#D8E8DE] relative group hover:border-[#52B788] transition-colors"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 bg-white rounded-lg p-2 border border-[#D8E8DE] flex items-center justify-center flex-shrink-0">
                      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="text-sm font-semibold text-[#1B4332] leading-tight truncate mb-1" title={item.name}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#8BA89B] mb-1">
                        Диаметр: <span className="text-[#1B4332] font-medium">{item.diameter}</span>
                      </p>
                      <p className="text-xs text-[#8BA89B]">
                        Кол-во: <span className="text-[#1B4332] font-medium">{item.count} шт.</span>
                      </p>
                      <p className="text-sm font-bold text-[#52B788] mt-1.5">{item.price}</p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.diameter)}
                      className="absolute top-4 right-4 text-[#8BA89B] hover:text-red-500 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="mt-8 border-t border-[#D8E8DE] pt-6">
                <h4 className="text-sm font-bold text-[#1B4332] mb-4 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#52B788]" />
                  Данные покупателя для WhatsApp
                </h4>
                <form id="cart-checkout-form" className="space-y-4" onSubmit={handleCheckout}>
                  <div>
                    <label className="text-xs text-[#5C7A6B] mb-1 block font-semibold">Имя *</label>
                    <input
                      type="text"
                      required
                      placeholder="Как к вам обращаться?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#52B788] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#5C7A6B] mb-1 block font-semibold">Телефон *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ваш телефон"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#52B788] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#5C7A6B] mb-1 block font-semibold">Город доставки *</label>
                    <select
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#52B788] bg-white text-sm text-[#1B4332]"
                    >
                      <option value="">Выберите город *</option>
                      <option value="Астана">Астана</option>
                      <option value="Алматы">Алматы</option>
                      <option value="Шымкент">Шымкент</option>
                      <option value="Туркестан">Туркестан</option>
                      <option value="Другой">Другой</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#5C7A6B] mb-1 block font-semibold">Комментарий к заказу</label>
                    <textarea
                      placeholder="Дополнительные детали, адрес или вопросы..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="w-full bg-[#F8FBF9] border border-[#D8E8DE] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#52B788] text-sm resize-none"
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Footer (Total and checkout button) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#D8E8DE] bg-[#F8FBF9]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-[#5C7A6B]">
                <span>Товары ({totalItems}):</span>
                <span className="font-semibold text-[#1B4332]">
                  {hasPrices ? formatPrice(totalPrice) : "Цена по запросу"}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span className="text-[#1B4332]">Итого к заказу:</span>
                <span className="text-[#52B788]">
                  {hasPrices ? formatPrice(totalPrice) : "По запросу"}
                </span>
              </div>
              {hasInquiry && hasPrices && (
                <p className="text-[10px] text-amber-600 text-right">
                  * Итоговая сумма не включает позиции с ценой по запросу
                </p>
              )}
            </div>

            <button
              type="submit"
              form="cart-checkout-form"
              className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Отправить заказ в WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
