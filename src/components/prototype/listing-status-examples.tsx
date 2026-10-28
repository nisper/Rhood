import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { Chip } from "@/components/ui/chip";
import { myObjectStatuses } from "@/data/my-object-statuses";

const baseStatuses = [
  ["Звонок", "Еще не звонили из Rhood", "Пока звонок через Rhood не зафиксирован.", "neutral"],
  ["Звонок", "Последний звонок N часов назад", "Звонок был менее 24 часов назад; N подставляется по времени звонка.", "neutral"],
  ["Звонок", "Последний звонок вчера", "С момента звонка прошло от 24 до 48 часов.", "neutral"],
  ["Звонок", "Последний звонок dd.mm.yyyy", "С момента звонка прошло больше 48 часов.", "neutral"],
  ["Объект", "Не отвечает", "После попытки связаться с собственником.", "warning"],
  ["Объект", "Думает", "После разговора, если решение отложено.", "brand"],
  ["Объект", "Отказ", "После отказа по итогам разговора.", "error"],
  ["Объект", "Другое АН", "Когда собственник сообщает о работе с другим агентством.", "error"],
] as const;

function StatusTable({
  statuses,
}: {
  statuses: typeof myObjectStatuses;
}) {
  return (
    <Table
      className="grid w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr)" }}
    >
      <div className="col-span-full grid grid-cols-subgrid border-b border-[var(--parser-border-light)]" role="row">
        {["Статус", "Когда показывать"].map((title, index) => (
          <TableCell
            helpIcon={false}
            key={title}
            role="head"
            sort={false}
            type="text"
            width={index === 0 ? "content" : "fill"}
          >
            {title}
          </TableCell>
        ))}
      </div>
      {statuses.map(({ label, when, color }) => (
        <div
          className="col-span-full grid grid-cols-subgrid border-b border-[var(--parser-border-light)] last:border-b-0"
          key={label}
          role="row"
        >
          <TableCell custom role="body" type="text" width="content">
            <Chip
              appearance="muted"
              className="self-start"
              color={color}
              icon={false}
              propDelete={false}
              size="sm"
            >
              {label}
            </Chip>
          </TableCell>
          <TableCell role="body" type="text" width="fill">
            {when}
          </TableCell>
        </div>
      ))}
    </Table>
  );
}

function BaseStatusTable() {
  return (
    <Table
      className="grid w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"
      style={{ gridTemplateColumns: "max-content max-content minmax(0, 1fr)" }}
    >
      <div className="col-span-full grid grid-cols-subgrid border-b border-[var(--parser-border-light)]" role="row">
        {["Тип", "Статус", "Когда показывать"].map((title, index) => (
          <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index < 2 ? "content" : "fill"}>
            {title}
          </TableCell>
        ))}
      </div>
      {baseStatuses.map(([type, label, when, color]) => (
        <div className="col-span-full grid grid-cols-subgrid border-b border-[var(--parser-border-light)] last:border-b-0" key={label} role="row">
          <TableCell role="body" type="text" width="content">{type}</TableCell>
          <TableCell custom role="body" type="text" width="content">
            <Chip appearance="muted" className="self-start" color={color} icon={false} propDelete={false} size="sm">
              {label}
            </Chip>
          </TableCell>
          <TableCell role="body" type="text" width="fill">{when}</TableCell>
        </div>
      ))}
    </Table>
  )
}

export function ListingStatusExamples() {
  return (
    <div className="grid min-w-0">
      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Статусы «Набора базы»</h2>
        </div>
        <BaseStatusTable />
      </section>
      <div className="mt-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Статус заявки в «Моих объектах»</h2>
        </div>
        <StatusTable statuses={myObjectStatuses} />
      </div>
    </div>
  );
}
