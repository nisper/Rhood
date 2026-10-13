import * as React from "react";
import { Component, LayoutDashboard } from "lucide-react";

import { ComponentDocs } from "@/components/prototype/component-docs";
import {
  ApartmentListingsScreen,
  ArchiveScreen,
  ArchiveNoSubscriptionScreen,
  MyListingsScreen,
} from "@/screens/apartment-listings-screen";

type PrototypeView = {
  category: "scene" | "state";
  id: string;
  title: string;
  homeLabel: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  View: React.ComponentType;
};

const prototypeViews: PrototypeView[] = [
  {
    category: "scene",
    id: "components",
    title: "Витрина компонентов",
    homeLabel: "Витрина компонентов",
    icon: Component,
    View: ComponentDocs,
  },
  {
    category: "scene",
    id: "apartment-listings",
    title: "Набор базы",
    homeLabel: "Набор базы",
    icon: LayoutDashboard,
    View: ApartmentListingsScreen,
  },
  {
    category: "scene",
    id: "my-listings",
    title: "Мои объекты",
    homeLabel: "Мои объекты",
    icon: LayoutDashboard,
    View: MyListingsScreen,
  },
  {
    category: "scene",
    id: "archive",
    title: "Архив",
    homeLabel: "Архив",
    icon: LayoutDashboard,
    View: ArchiveScreen,
  },
  {
    category: "state",
    id: "archive-no-subscription",
    title: "Архив — нет подписки",
    homeLabel: "Архив — нет подписки",
    icon: LayoutDashboard,
    View: ArchiveNoSubscriptionScreen,
  },
];

const showcaseNavigation = [
  { label: "Foundations", componentId: "colors" },
  { label: "Components", componentId: "showcase-section" },
  { label: "Layout", componentId: "main-header" },
  { label: "Features", componentId: "object-filter" },
];

function getActiveViewId() {
  return new URLSearchParams(window.location.search).get("view") ?? "";
}

function PrototypeHome() {
  const scenes = prototypeViews.filter((view) => view.category === "scene" && view.id !== "components");
  const states = prototypeViews.filter((view) => view.category === "state");
  const sections = [
    {
      title: "Витрина компонентов",
      items: showcaseNavigation.map((item) => ({
        href: `/Rhood/?view=components&component=${encodeURIComponent(item.componentId)}`,
        label: item.label,
      })),
    },
    {
      title: "Сцены",
      items: scenes.map((view) => ({
        href: `/Rhood/?view=${encodeURIComponent(view.id)}`,
        label: view.homeLabel,
      })),
    },
    {
      title: "Состояния",
      items: states.map((view) => ({
        href: `/Rhood/?view=${encodeURIComponent(view.id)}`,
        label: view.homeLabel,
      })),
    },
  ];

  return (
    <main className="flex min-h-svh items-center justify-center bg-[var(--rh-theme-surface-neutral-ultra-dark)] text-[var(--rh-theme-text-neutral-primary-contrast)] uppercase">
      <div className="rhood-layout-container">
        <div className="flex flex-col items-center gap-10 text-center">
          <header>
            <h1 className="rh-typography-h3">Parser RHOOD</h1>
          </header>
          <nav aria-label="Разделы прототипа" className="flex w-full flex-col items-center gap-10">
            {sections.map((section) => (
              <section
                className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-4"
                key={section.title}
              >
                <h2 className="rh-typography-b1-med w-full text-right text-[var(--rh-theme-text-neutral-primary-contrast)] opacity-60">
                  {section.title}
                </h2>
                <ul aria-label={section.title} className="flex w-full flex-col items-start gap-2 text-left">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <a
                        className="rh-typography-b1-med cursor-pointer text-[var(--rh-theme-text-neutral-primary-contrast)] hover:underline"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>
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
