import * as React from "react"
import { Search as SearchIcon } from "lucide-react"

import { Textfield } from "@/components/ui/text-field"

type SearchSize = NonNullable<React.ComponentProps<typeof Textfield>["size"]>
type SearchState = NonNullable<React.ComponentProps<typeof Textfield>["state"]>
type SearchAppearance = NonNullable<React.ComponentProps<typeof Textfield>["appearance"]>

type SearchProps = Omit<
  React.ComponentProps<typeof Textfield>,
  "appearance" | "clearButton" | "startAdornment" | "type"
>
  & { appearance?: SearchAppearance }

/** A Textfield with a fixed, non-interactive search icon. */
function Search({ appearance = "neutral", size = "md", ...props }: SearchProps) {
  return (
    <Textfield
      appearance={appearance}
      size={size}
      startAdornment={
        <SearchIcon
          className={size === "md" ? "size-6" : "size-5"}
          strokeWidth={2}
        />
      }
      type="search"
      {...props}
    />
  )
}

export { Search }
export type { SearchAppearance, SearchProps, SearchSize, SearchState }
