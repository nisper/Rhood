import * as React from "react";
import { Component, LayoutDashboard } from "lucide-react";

import { ComponentDocs } from "@/components/prototype/component-docs";
import {
  ApartmentListingsScreen,
  ArchiveScreen,
  MyListingsScreen,
} from "@/screens/apartment-listings-screen";
import { SimpleTableScreen } from "@/screens/simple-table-screen";

type PrototypeView = {
  id: string;
  title: string;
  homeLabel: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  View: React.ComponentType;
};

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
    title: "Набор базы",
    homeLabel: "Набор базы",
    icon: LayoutDashboard,
    View: ApartmentListingsScreen,
  },
  {
    id: "my-listings",
    title: "Мои объекты",
    homeLabel: "Мои объекты",
    icon: LayoutDashboard,
    View: MyListingsScreen,
  },
  {
    id: "archive",
    title: "Архив",
    homeLabel: "Архив",
    icon: LayoutDashboard,
    View: ArchiveScreen,
  },
  {
    id: "simple-table",
    title: "Sandbox",
    homeLabel: "Sandbox",
    icon: LayoutDashboard,
    View: SimpleTableScreen,
  },
];

const showcaseNavigation = [
  { label: "Foundations", componentId: "colors" },
  { label: "Components", componentId: "showcase-surface" },
  { label: "Layout", componentId: "main-header" },
  { label: "Features", componentId: "toolbar-filter" },
];

function getActiveViewId() {
  return new URLSearchParams(window.location.search).get("view") ?? "";
}

function setActiveViewId(id: string) {
  const nextUrl = id
    ? `?view=${encodeURIComponent(id)}`
    : window.location.pathname;

  window.history.pushState(null, "", nextUrl);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function setActiveComponentId(id: string) {
  const params = new URLSearchParams();
  params.set("view", "components");
  params.set("component", id);

  window.history.pushState(null, "", `?${params.toString()}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function PrototypeHome() {
  const scenes = prototypeViews.filter((view) => view.id !== "components");

  return (
    <main className="flex min-h-svh items-center justify-center bg-white p-5 text-[var(--parser-text-neutral-primary)]">
      <div className="flex flex-col items-start gap-[60px]">
        <img
          alt="RHOOD"
          className="h-8 w-auto"
          height="32"
          src="/Rhood/assets/rhood-logo.svg"
          width="134"
        />

        <nav aria-label="Разделы прототипа" className="grid grid-cols-2 gap-x-16">
          <section className="grid content-start gap-4">
            <h2 className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">
              Витрина компонентов
            </h2>
            <ul className="grid gap-1.5">
              {showcaseNavigation.map((item) => (
                <li key={item.componentId}>
                  <button
                    className="rh-typography-b1 cursor-pointer border-0 bg-transparent p-0 text-left text-[var(--parser-text-neutral-primary)] transition-colors hover:text-[var(--parser-text-brand)] focus-visible:text-[var(--parser-text-brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
                    onClick={() => setActiveComponentId(item.componentId)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid content-start gap-4">
            <h2 className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">
              Сцены
            </h2>
            <ul className="grid gap-1.5">
              {scenes.map((view) => (
                <li key={view.id}>
                  <button
                    className="rh-typography-b1 cursor-pointer border-0 bg-transparent p-0 text-left text-[var(--parser-text-neutral-primary)] transition-colors hover:text-[var(--parser-text-brand)] focus-visible:text-[var(--parser-text-brand)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]"
                    onClick={() => setActiveViewId(view.id)}
                    type="button"
                  >
                    {view.homeLabel}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      </div>
    </main>
  );
}

export function PrototypeRouter() {
  const [activeViewId, setActiveViewIdState] = React.useState(getActiveViewId);
  const activeView = prototypeViews.find((view) => view.id === activeViewId);

  React.useEffect(() => {
    const handlePopState = () => setActiveViewIdState(getActiveViewId());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    if (!activeView) {
      document.title = "RHOOD";
      return;
    }

    if (activeView.id !== "components") {
      document.title = activeView.title;
    }
  }, [activeView]);

  if (!activeView) {
    return <PrototypeHome />;
  }

  const View = activeView.View;

  if (activeView.id === "components") {
    return <ComponentDocs />;
  }

  // The listings screen is a product surface, not a component-preview page.
  // Keep its viewport free of the prototype frame so it can be checked as-is.
  return <View />;
}
