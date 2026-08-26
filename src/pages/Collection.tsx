import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { COLLECTIONS, getCollection, getCollectionProducts } from "../lib/collections";
import LeadBlock from "../components/LeadBlock";

interface CollectionProps {
  slug: string;
}

/**
 * Посадочная страница подборки каталога.
 *
 * Заголовок, вступительный текст и список товаров под конкретный поисковый
 * запрос — то, чего не даёт фильтр каталога, живущий в состоянии React.
 */
export default function Collection({ slug }: CollectionProps) {
  const collection = getCollection(slug);

  if (!collection) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1B4332] mb-4">Подборка не найдена</h1>
        <Link to="/catalog" className="btn-primary inline-block">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const products = getCollectionProducts(collection);
  const others = COLLECTIONS.filter((c) => c.slug !== collection.slug);

  return (
    <div>
      <section className="bg-[#F8FBF9] border-b border-[#D8E8DE]">
        <div className="container-main py-4">
          <nav className="flex items-center gap-2 text-sm text-[#5C7A6B]">
            <Link to="/" className="hover:text-[#1B4332]">
              Главная
            </Link>
            <ChevronRight size={14} className="text-[#8BA89B]" />
            <Link to="/catalog" className="hover:text-[#1B4332]">
              Каталог
            </Link>
            <ChevronRight size={14} className="text-[#8BA89B]" />
            <span className="text-[#1B4332] font-medium">{collection.h1}</span>
          </nav>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-5">{collection.h1}</h1>
          <p className="text-base md:text-lg text-[#5C7A6B] leading-relaxed max-w-3xl mb-8">
            {collection.intro}
          </p>

          <div className="text-sm text-[#8BA89B] mb-5">В подборке: {products.length} товаров</div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
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
                    {(product.protocols || []).map((p) => p.toUpperCase()).join(", ")}
                    {product.diameter ? ` · ${product.diameter}` : ""}
                  </div>
                  <Link to={`/catalog/${product.id}`}>
                    <h2 className="font-semibold text-[#1B4332] mb-1 group-hover:text-[#2D6A4F] transition-colors leading-tight">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="text-[#52B788] font-bold mb-4">{product.priceText}</p>
                  <Link
                    to={`/catalog/${product.id}`}
                    className="btn-primary text-sm py-2.5 text-center block"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadBlock source={collection.h1} />

      {/* Перелинковка: поисковик обходит подборки друг через друга, а не только с каталога */}
      <section className="bg-[#F8FBF9] border-t border-[#D8E8DE] py-10 md:py-14">
        <div className="container-main">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B4332] mb-6">Другие подборки</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/catalog/${c.slug}`}
                className="bg-white border border-[#D8E8DE] rounded-xl p-4 hover:border-[#52B788] transition-colors"
              >
                <div className="font-semibold text-[#1B4332] mb-1">{c.h1}</div>
                <div className="text-sm text-[#5C7A6B]">{c.teaser}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
