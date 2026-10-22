import * as React from "react"

import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Switch } from "@/components/ui/switch"

function Snippet({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">Switch</span>{" "}{children}<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>Label<span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span><span className="text-[var(--rh-palette-purple-700)]">Switch</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span></code>
}

function Prop({ name, value }: { name: string; value?: string }) {
  return <><span className="text-[var(--rh-theme-text-info)]">{name}</span>{value && <><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{value}</span></>}</>
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4">{children}</div>
}

export function SwitchExamples() {
  const [enabled, setEnabled] = React.useState(true)

  return <div className="grid min-w-0">
    <ShowcaseSection codeSnippet={<Snippet><Prop name="defaultChecked" value="{false}" /></Snippet>} description="Switch включает и выключает настройку одним действием." panels={[<Panel key="style"><div className="flex flex-wrap items-center justify-center gap-8"><Switch defaultChecked={false}>Notifications</Switch><Switch>Notifications</Switch></div></Panel>]} title="Стиль" />
    <ShowcaseSection codeSnippet={<Snippet><Prop name="size" value={'"sm"'} /></Snippet>} description="md — основной размер, sm — компактный вариант для плотных интерфейсов." panels={[<Panel key="sizes"><div className="grid gap-4"><Switch defaultChecked={false} size="md">Medium</Switch><Switch defaultChecked={false} size="sm">Small</Switch></div></Panel>]} title="Размер" />
    <ShowcaseSection codeSnippet={<Snippet><Prop name="disabled" /></Snippet>} description="Переключатель реагирует на hover и блокирует ввод в disabled-состоянии." panels={[<Panel key="states"><div className="grid gap-3"><Switch defaultChecked={false}>Off</Switch><Switch>On</Switch><Switch defaultChecked={false} disabled>Disabled off</Switch><Switch disabled>Disabled on</Switch></div></Panel>]} title="Состояния" />
    <ShowcaseSection codeSnippet={<Snippet><Prop name="switchPosition" value={'"left"'} /></Snippet>} description="Переключатель можно расположить по обе стороны подписи. Иконка в компоненте не используется." panels={[<Panel key="composition"><div className="flex flex-wrap items-center justify-center gap-8"><Switch checked={enabled} onChange={(event) => setEnabled(event.target.checked)} switchPosition="left">Email-уведомления</Switch><Switch defaultChecked={false}>SMS-уведомления</Switch><Switch aria-label="Автоматическое обновление" label={false} /></div></Panel>]} title="Состав" />
  </div>
}
