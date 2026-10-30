import { FormLabel } from "@/components/ui/form-label"
import { ShowcaseSection } from "@/components/ui/showcase-section"

export function FormLabelExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Цвет лейбла показывает состояние связанного поля. Отступ между лейблом и контролом настраивает FormBlock, а не FormLabel."
        panels={[
          <div className="grid min-h-[136px] content-center gap-4 rounded-xl bg-white px-6 py-4" key="states">
            <FormLabel>Имя</FormLabel>
            <FormLabel color="error">Имя</FormLabel>
            <FormLabel color="disabled">Имя</FormLabel>
          </div>,
        ]}
        settings={["color: default · error · disabled"]}
        title="Состояния"
      />
      <ShowcaseSection
        description="Можно задать насыщенность, отметить обязательность или добавить стартовую иконку. Встроенного отступа сверху у FormLabel нет."
        panels={[
          <div className="grid min-h-[136px] content-center gap-4 rounded-xl bg-white px-6 py-4" key="composition">
            <FormLabel>Обычный лейбл</FormLabel>
            <FormLabel fontWeight="medium">Средний вес</FormLabel>
            <FormLabel required>Обязательное поле</FormLabel>
            <FormLabel startIcon>С иконкой</FormLabel>
          </div>,
        ]}
        settings={["fontWeight: regular · medium", "required: boolean", "startIcon: boolean"]}
        title="Состав"
      />
    </div>
  )
}
