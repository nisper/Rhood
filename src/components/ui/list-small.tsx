import { List, type ListProps } from "@/components/ui/list"
import { ListItemSmall } from "@/components/ui/list-item-small"

type ListSmallProps = ListProps

/** Compatibility example. Use List with ListItem dense in new compositions. */
function ListSmall({ children, ...props }: ListSmallProps) {
  return <List {...props}>{children ?? <>
    <ListItemSmall selected />
    <ListItemSmall state="hovered" />
    <ListItemSmall />
    <ListItemSmall />
  </>}</List>
}

export { ListSmall }
export type { ListSmallProps }
