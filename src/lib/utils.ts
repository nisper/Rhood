import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Matches every whitespace-separated search term, regardless of its order. */
export function matchesSearchTerms(searchableText: string, query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const normalizedText = searchableText.toLowerCase()

  return terms.every((term) => normalizedText.includes(term))
}
