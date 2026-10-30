import { FormHelperText } from "@/components/ui/form-helper-text"
import { ShowcaseSection } from "@/components/ui/showcase-section"

export function FormHelperTextExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="FormHelperText поясняет поле под контролом. Цвет передаёт состояние текста; размер и типографика едины для всех вариантов."
        panels={[
          <div className="grid min-h-[136px] content-center gap-3 rounded-xl bg-white px-6 py-4" key="colors">
            <FormHelperText>Helper text</FormHelperText>
            <FormHelperText color="error">Проверь значение</FormHelperText>
            <FormHelperText color="warning">Обрати внимание</FormHelperText>
            <FormHelperText color="disabled">Недоступно</FormHelperText>
          </div>,
        ]}
        settings={["color: default · error · warning · disabled"]}
        title="Состояния"
      />
    </div>
  )
}
