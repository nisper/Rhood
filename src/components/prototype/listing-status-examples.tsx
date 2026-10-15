import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { Chip } from "@/components/ui/chip";

const callStatuses = [
  [
    "Еще не звонили из Rhood",
    "По объекту еще нет звонка, совершенного через Rhood.",
    "Пока звонок через Rhood не зафиксирован.",
  ],
  [
    "Последний звонок N часов назад",
    "Показывает, сколько времени прошло с последнего звонка.",
    "Звонок был менее 24 часов назад; N подставляется по времени звонка.",
  ],
  [
    "Последний звонок вчера",
    "Последний звонок был вчера.",
    "С момента звонка прошло от 24 до 48 часов.",
  ],
  [
    "Последний звонок dd.mm.yyyy",
    "Показывает дату последнего звонка.",
    "С момента звонка прошло больше 48 часов.",
  ],
] as const;

const objectStatuses = [
  [
    "Не отвечает",
    "Результат контакта: дозвониться до собственника не удалось.",
    "После попытки связаться с собственником.",
  ],
  [
    "Думает",
    "Собственник пока не принял решение или попросил связаться позже.",
    "После разговора, если решение отложено.",
  ],
  [
    "Отказ",
    "Собственник отказался работать с «Этажами».",
    "После отказа по итогам разговора.",
  ],
  [
    "Другое АН",
    "Собственник уже работает с другим агентством недвижимости.",
    "Когда собственник сообщает о работе с другим агентством.",
  ],
  [
    "В работе",
    "В интерфейсе показывается, когда у объекта userStatus=true. Отдельное бизнес-значение этого состояния пока не описано.",
    "Текущая логика прототипа.",
  ],
] as const;

function StatusTable({
  statuses,
}: {
  statuses: readonly (readonly [string, string, string])[];
}) {
  return (
    <Table
      className="grid w-full !min-w-0 border border-[var(--parser-border-light)] bg-white"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) minmax(0, 1fr)" }}
    >
      <div className="col-span-full grid grid-cols-subgrid border-b border-[var(--parser-border-light)]" role="row">
        {["Подпись", "Что означает", "Когда показывать"].map((title, index) => (
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
      {statuses.map(([label, meaning, when]) => (
        <div
          className="col-span-full grid grid-cols-subgrid border-b border-[var(--parser-border-light)] last:border-b-0"
          key={label}
          role="row"
        >
          <TableCell custom role="body" type="text" width="content">
            <Chip
              appearance="muted"
              className="self-start"
              color="neutral"
              icon={false}
              propDelete={false}
              size="sm"
            >
              {label}
            </Chip>
          </TableCell>
          <TableCell role="body" type="text" width="fill">
            {meaning}
          </TableCell>
          <TableCell role="body" type="text" width="fill">
            {when}
          </TableCell>
        </div>
      ))}
    </Table>
  );
}

export function ListingStatusExamples() {
  return (
    <div className="grid min-w-0">
      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Статус звонка</h2>
          <p className="rh-typography-b1">
            Показывает, звонили ли по объекту и когда был последний звонок.
          </p>
        </div>
        <StatusTable statuses={callStatuses} />
      </section>
      <section className="grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Статус объекта</h2>
          <p className="rh-typography-b1">
            Показывает результат контакта с собственником или состояние объекта в работе.
          </p>
        </div>
        <StatusTable statuses={objectStatuses} />
      </section>
    </div>
  );
}
