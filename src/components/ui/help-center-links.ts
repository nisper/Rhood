type HelpCenterLink = {
  href?: string;
  label: string;
};

const helpCenterLinks: readonly HelpCenterLink[] = [
  { label: "Техническая поддержка" },
  { label: "Инструкция к сервису" },
  { label: "Обучающий курс" },
  { label: "Договор оферты" },
];

export { helpCenterLinks };
export type { HelpCenterLink };
