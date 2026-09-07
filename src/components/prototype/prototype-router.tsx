import * as React from "react"
import { ArrowLeft, Component, LayoutDashboard } from "lucide-react"

import { ComponentDocs } from "@/components/prototype/component-docs"
import { ApartmentListingsScreen } from "@/screens/apartment-listings-screen"

type PrototypeView = {
  id: string
  title: string
  homeLabel: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  View: React.ComponentType
}

const prototypeViews: PrototypeView[] = [
  {
    id: "components",
    title: "Витрина компонентов",
    homeLabel: "Витрина компонентов",
    icon: Component,
    View: ComponentDocs,
  },
  {
    id: "apartment-listings",
    title: "Набор базы: список объявлений",
    homeLabel: "Набор базы",
    icon: LayoutDashboard,
    View: ApartmentListingsScreen,
  },
]

function getActiveViewId() {
  return new URLSearchParams(window.location.search).get("view") ?? ""
}

function setActiveViewId(id: string) {
  const nextUrl = id ? `?view=${encodeURIComponent(id)}` : window.location.pathname

  window.history.pushState(null, "", nextUrl)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

function PrototypeHome() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-white p-5 text-[var(--parser-text-neutral-primary)]">
      <div className="flex flex-col items-start gap-[60px]">
        <img
          alt="RHOOD"
          className="h-8 w-auto"
          height="32"
          src="/assets/rhood-logo-primary.svg"
          width="134"
        />

        <nav className="flex flex-col items-start gap-2.5 whitespace-nowrap text-base font-normal leading-6 tracking-[0.15px]">
          {prototypeViews.map((view) => (
            <button
              className="cursor-pointer border-0 bg-transparent p-0 text-left text-[var(--parser-text-neutral-primary)] transition-colors hover:text-[var(--parser-text-brand)] focus-visible:text-[var(--parser-text-brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              {view.homeLabel}
            </button>
          ))}
        </nav>
      </div>
    </main>
  )
}

function PrototypeViewFrame({ view }: { view: PrototypeView }) {
  const View = view.View

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-50 flex min-h-14 items-center justify-between gap-4 border-b border-[var(--parser-border-light)] bg-white px-4">
        <button
          className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold leading-5 text-[var(--parser-text-neutral-primary)] transition-colors hover:bg-[var(--parser-fill-neutral)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
          onClick={() => setActiveViewId("")}
          type="button"
        >
          <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={2} />
          Все разделы
        </button>
        <p className="min-w-0 truncate text-sm font-semibold leading-5 text-[var(--parser-text-neutral-secondary)]">
          {view.title}
        </p>
      </header>
      <View />
    </div>
  )
}

export function PrototypeRouter() {
  const [activeViewId, setActiveViewIdState] = React.useState(getActiveViewId)

  React.useEffect(() => {
    const handlePopState = () => setActiveViewIdState(getActiveViewId())

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const activeView = prototypeViews.find((view) => view.id === activeViewId)

  if (!activeView) {
    return <PrototypeHome />
  }

  if (activeView.id === "components") {
    return <ComponentDocs />
  }

  return <PrototypeViewFrame view={activeView} />
}
