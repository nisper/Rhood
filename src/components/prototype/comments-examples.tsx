import { Comments } from "@/components/ui/comments"
import { CommentMessage } from "@/components/ui/comment-message"
import { ShowcasePanel } from "@/components/ui/showcase-panel"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { ShowcaseSurface } from "@/components/ui/showcase-surface"

function CommentsSnippet() {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
      <span className="text-[var(--rh-palette-purple-700)]">Comments</span>
      <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    </code>
  )
}

function CommentsExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={<CommentsSnippet />}
        description="Блок с полем для комментария и списком сообщений. У каждого сообщения доступны действия из меню."
        showcase={
          <ShowcaseSurface direction="vertical" usedComponents={[{ href: "#comment-message", title: "CommentMessage" }, { href: "/Rhood/?view=components&component=avatar", title: "Avatar" }, { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" }]}>
            <ShowcasePanel className="w-full items-stretch">
              <Comments />
            </ShowcasePanel>
          </ShowcaseSurface>
        }
        title="Состав"
      />
      <ShowcaseSection
        codeSnippet={<code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">CommentMessage</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span></code>}
        description="Статичное сообщение с автором, временем, текстом и необязательной служебной подписью. Использует Avatar и IconButton."
        id="comment-message"
        showcase={<ShowcaseSurface direction="vertical" usedComponents={[{ href: "/Rhood/?view=components&component=avatar", title: "Avatar" }, { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" }, { href: "/Rhood/?view=components&component=menu", title: "Menu" }]}><ShowcasePanel className="w-full items-stretch"><CommentMessage author="Екатерина Морозова" avatarSrc="/Rhood/assets/comments/avatar-user.jpeg" message="Телефон собственника 892212345, позвонить в пт, квартира 42" metadata="private" timestamp="2 марта, 15:20" /></ShowcasePanel></ShowcaseSurface>}
        title="Сообщение"
      />
    </div>
  )
}

export { CommentsExamples }
