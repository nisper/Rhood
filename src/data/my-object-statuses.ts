export const myObjectStatuses = [
  { label: "Активный", when: "Когда объект находится в активном статусе CRM.", color: "brand" },
  { label: "Отменен", when: "Когда объект помечен в CRM как отменённый.", color: "error" },
  { label: "Удален", when: "Когда объект помечен в CRM как удалённый.", color: "error" },
  { label: "Задаток", when: "После фиксации задатка в CRM.", color: "brand" },
  { label: "Продан", when: "Когда сделка отмечена в CRM как завершённая.", color: "success" },
  { label: "Предлистинг", when: "До публикации объявления.", color: "brand" },
  { label: "Приостановлен", when: "Пока объект не возвращён в активную работу.", color: "warning" },
] as const;
