import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ObjectCard } from "@/components/ui/object-card";

const usedComponents = [
  { href: "/Rhood/?view=components&component=button-favorite", title: "ButtonFavorite" },
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
  { href: "/Rhood/?view=components&component=price-with-trend", title: "PriceWithTrend" },
];

export function ObjectCardExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection description="Изображение, статусы, станция метро и нижние действия можно скрыть или заменить. Кнопка избранного переключается по нажатию." panels={[<div className="flex items-start justify-center rounded-xl bg-white px-4 py-3"><div className="flex flex-wrap items-start justify-center gap-4"><ObjectCard notForClient={false} /></div></div>]} title="Состав" usedComponents={usedComponents} />
  </div>;
}
