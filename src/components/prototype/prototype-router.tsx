import * as React from "react"
import { Component, LayoutDashboard } from "lucide-react"

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

  const View = activeView.View

  if (activeView.id === "components") {
    return <ComponentDocs />
  }

  // The listings screen is a product surface, not a component-preview page.
  // Keep its viewport free of the prototype frame so it can be checked as-is.
  return <View />
}
