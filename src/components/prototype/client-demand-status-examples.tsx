import * as React from "react";

import { ClientDemandStatus } from "@/components/ui/client-demand-status";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

function ClientDemandStatusExamples() {
  const [checkedAt, setCheckedAt] = React.useState("Проверили 2 мин. назад");

  return (
    <div className="grid min-w-0 gap-10">
      <ShowcaseSection
        codeSnippet={
          <code className="font-mono text-sm leading-5">
            {"<ClientDemandStatus status=\"found\" count={38} />"}
          </code>
        }
        description="Статус показывает результат проверки спроса на объект: отсутствие покупателя или число подходящих покупателей."
        showcase={
          <ShowcaseSurface direction="vertical">
            <ShowcasePanel>
              <div className="grid w-full max-w-[309px] gap-3">
                <ClientDemandStatus checkedAt="Проверили 2 мин. назад" />
                <ClientDemandStatus count={38} status="found" />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Стиль"
      />

      <ShowcaseSection
        codeSnippet={
          <code className="font-mono text-sm leading-5">
            {"<ClientDemandStatus onRefresh={refreshDemand} />"}
          </code>
        }
        description="Кнопка обновления доступна в обоих состояниях. Нажми её, чтобы увидеть изменение времени проверки."
        showcase={
          <ShowcaseSurface>
            <ShowcasePanel>
              <div className="w-full max-w-[309px]">
                <ClientDemandStatus
                  checkedAt={checkedAt}
                  count={38}
                  onRefresh={() => setCheckedAt("Проверили только что")}
                  status="found"
                />
              </div>
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />
    </div>
  );
}

export { ClientDemandStatusExamples };
