import * as React from "react"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContainer } from "@/components/ui/drawer"
import { Modal, ModalContainer } from "@/components/ui/modal"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const rows = [
  { id: "1", name: "Строка 1", value: "Значение 1" },
  { id: "2", name: "Строка 2", value: "Значение 2" },
  { id: "3", name: "Строка 3", value: "Значение 3" },
  { id: "4", name: "Строка 4", value: "Значение 4" },
  { id: "5", name: "Строка 5", value: "Значение 5" },
  { id: "6", name: "Строка 6", value: "Значение 6" },
  { id: "7", name: "Строка 7", value: "Значение 7" },
  { id: "8", name: "Строка 8", value: "Значение 8" },
  { id: "9", name: "Строка 9", value: "Значение 9" },
  { id: "10", name: "Строка 10", value: "Значение 10" },
]

export function SimpleTableScreen() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  return (
    <div className="min-h-svh bg-white text-[var(--parser-text-neutral-primary)]">
      <header className="flex h-14 items-center border-b border-[var(--parser-border-light)] px-5 sm:px-8">
        <a aria-label="На разводящую" href="/Rhood/">
          <img alt="RHOOD" className="h-6 w-auto" height="24" src="/Rhood/assets/rhood-logo.svg" width="101" />
        </a>
      </header>

      <main className="p-5 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Button endIcon={false} onClick={() => setIsModalOpen(true)} startIcon={false}>
            Открыть modal
          </Button>
          <Button appearance="default" endIcon={false} onClick={() => setIsDrawerOpen(true)} startIcon={false}>
            Открыть Drawer
          </Button>
        </div>

        <Table
          className="mt-5 w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"
          selection={{ onSelectedIdsChange: setSelectedIds, rowIds: rows.map((row) => row.id), selectedIds }}
        >
          <div className="flex border-b border-[var(--parser-border-light)]" role="row">
            <TableCell role="head" sort={false} type="checkbox" width={40} />
            <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Название</TableCell>
            <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Значение</TableCell>
          </div>
          {rows.map((row) => (
            <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row.id} role="row">
              <TableCell role="body" rowId={row.id} type="checkbox" width={40} />
              <TableCell role="body" type="text" width="fill">{row.name}</TableCell>
              <TableCell role="body" type="text" width="fill">{row.value}</TableCell>
            </div>
          ))}
        </Table>
      </main>

      {isModalOpen && (
        <ModalContainer className="min-h-0">
          <Modal
            description="Это тестовое содержимое модального окна."
            footer={
              <Button
                appearance="default"
                endIcon={false}
                onClick={() => setIsModalOpen(false)}
                startIcon={false}
              >
                Закрыть
              </Button>
            }
            onOpenChange={setIsModalOpen}
            open={isModalOpen}
            title="Тестовая modal"
          />
        </ModalContainer>
      )}

      {isDrawerOpen && (
        <DrawerContainer>
          <Drawer
            description="Это тестовое содержимое drawer."
            footer={
              <Button appearance="default" endIcon={false} onClick={() => setIsDrawerOpen(false)} startIcon={false}>
                Закрыть
              </Button>
            }
            onOpenChange={setIsDrawerOpen}
            open={isDrawerOpen}
            title="Тестовый Drawer"
          >
            <p className="rh-typography-b1">Drawer открывается справа на десктопе и снизу на мобильном устройстве.</p>
          </Drawer>
        </DrawerContainer>
      )}
    </div>
  )
}
