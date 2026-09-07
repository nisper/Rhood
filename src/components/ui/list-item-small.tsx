import { ListItem, type ListItemProps, type ListItemFontWeight, type ListItemState } from "@/components/ui/list-item"

type ListItemSmallProps = ListItemProps
type ListItemSmallFontWeight = ListItemFontWeight
type ListItemSmallState = ListItemState

/** Compatibility alias. Use ListItem with dense for new compositions. */
function ListItemSmall({ dense = true, ...props }: ListItemSmallProps) {
  return <ListItem dense={dense} {...props} />
}

export { ListItemSmall }
export type { ListItemSmallFontWeight, ListItemSmallProps, ListItemSmallState }
