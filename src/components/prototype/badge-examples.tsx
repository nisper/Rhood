import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function BadgeSnippet() {
  return (
    <pre className="overflow-x-auto rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-neutral)] p-4">
      <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
        <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
        <span className="text-[var(--rh-palette-purple-700)]">Badge</span>
        {" "}
        <span className="text-[var(--rh-theme-text-info)]">shape</span>
        <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
        <span className="text-[var(--rh-theme-text-success)]">"circle"</span>
        <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
        3
        <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`</`}</span>
        <span className="text-[var(--rh-palette-purple-700)]">Badge</span>
        <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`>`}</span>
      </code>
    </pre>
  );
}

export function BadgeExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={<BadgeSnippet />}
        description="Маленький красный solid-бейдж отмечает состояние или новизну. Для короткого счётчика используй круглую форму."
        panels={[<div className="flex min-h-[136px] items-center justify-center gap-4 rounded-xl bg-white px-6 py-5" key="solid"><Badge>НОВОЕ</Badge><Badge shape="circle">3</Badge><Badge shape="circle">12</Badge><Badge shape="circle">123</Badge></div>]}
        title="Стиль"
      />

    </div>
  );
}
