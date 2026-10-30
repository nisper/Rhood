import { Avatar, type AvatarSize, type AvatarType } from "@/components/ui/avatar"
import { ShowcaseSection } from "@/components/ui/showcase-section"

const sizes: AvatarSize[] = ["20px", "24px", "32px", "40px"]
const types: AvatarType[] = ["image", "text", "icon", "skeleton"]

export function AvatarExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Визуальных стилей и отдельных состояний нет. Размер задаёт диаметр аватара."
        panels={sizes.map((size) => (
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4" key={size}>
            <div className="grid w-full justify-items-center gap-3">
              <span className="rh-typography-b2-med text-[var(--rh-theme-text-neutral-secondary)]">{size}</span>
              <Avatar size={size} type="text">ЕВ</Avatar>
            </div>
          </div>
        ))}
        settings={["size: 20px · 24px · 32px · 40px"]}
        title="Размер"
      />
      <ShowcaseSection
        description="Аватар показывает изображение, инициалы, иконку пользователя или скелетон. badge добавляет индикатор статуса."
        panels={types.map((type) => (
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4" key={type}>
            <div className="grid justify-items-center gap-2">
              <Avatar badge={type === "image"} type={type}>ЕВ</Avatar>
              <span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{type}</span>
            </div>
          </div>
        ))}
        settings={["type: image · text · icon · skeleton", "badge: boolean"]}
        title="Состав"
      />
    </div>
  )
}
