import * as React from "react"

const TableVerticalBordersContext = React.createContext(false)

function useTableVerticalBorders() {
  return React.useContext(TableVerticalBordersContext)
}

export { TableVerticalBordersContext, useTableVerticalBorders }
