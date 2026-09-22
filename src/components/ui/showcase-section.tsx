import * as React from "react"

import { cn } from "@/lib/utils"

type ShowcaseSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  description: React.ReactNode
  showcase: React.ReactNode
  title: React.ReactNode
}

function ShowcaseSection({
  className,
  description,
  showcase,
  title,
  ...props
}: ShowcaseSectionProps) {
  return (
    <section className={cn("mb-10 grid gap-3", className)} {...props}>
      <div className="grid gap-1">
        <h2 className="rh-typography-headline-4">{title}</h2>
        <p className="rh-typography-body-1">{description}</p>
      </div>
      {showcase}
    </section>
  )
}

export { ShowcaseSection }
export type { ShowcaseSectionProps }
