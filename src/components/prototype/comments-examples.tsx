import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Comments } from "@/components/ui/comments"
import { CommentMessage } from "@/components/ui/comment-message"

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
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white w-full items-stretch">
              <Comments />
            </div>]}
        title="Состав"
      />
      <ShowcaseSection
        codeSnippet={<code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]"><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">CommentMessage</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span></code>}
        description="Статичное сообщение с автором, временем, текстом и необязательной служебной подписью. Использует Avatar и IconButton."
        id="comment-message"
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white w-full items-stretch"><CommentMessage author="Екатерина Морозова" avatarSrc="/Rhood/assets/comments/avatar-user.jpeg" message="Телефон собственника 892212345, позвонить в пт, квартира 42" metadata="private" timestamp="2 марта, 15:20" /></div>]}
        title="Сообщение"
      />
    </div>
  )
}

export { CommentsExamples }
