import { Button } from "@/components/ui/button"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"

function Section({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return <section className="grid gap-3"><div className="grid gap-1"><h2 className="text-xl font-semibold leading-7">{title}</h2><p className="text-base leading-6 tracking-[0.15px]">{description}</p></div>{children}</section>
}

export function ShowcaseExamples() {
  return <div className="grid min-w-0 gap-10">
    <Section description="ShowcaseSurface объединяет примеры на общей поверхности. Панели добавляются через children — их может быть столько, сколько нужно." title="Горизонтальная композиция">
      <ShowcaseSurface><ShowcasePanel><Button>Primary</Button></ShowcasePanel><ShowcasePanel tone="transparent"><Button appearance="contrast">Contrast</Button></ShowcasePanel></ShowcaseSurface>
    </Section>

    <Section description="direction=vertical размещает панели друг под другом. Прозрачная панель показывает фон родительской поверхности." title="Вертикальная композиция">
      <ShowcaseSurface direction="vertical"><ShowcasePanel><Button appearance="default">Default</Button></ShowcasePanel><ShowcasePanel tone="transparent"><Button appearance="contrast">Contrast</Button></ShowcasePanel></ShowcaseSurface>
    </Section>
  </div>
}
