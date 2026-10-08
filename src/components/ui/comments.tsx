import * as React from "react"

import { Avatar } from "@/components/ui/avatar"
import { CommentMessage, type CommentMessageMetadata } from "@/components/ui/comment-message"
import { cn } from "@/lib/utils"

type Comment = {
  author: string
  avatarSrc: string
  message: string
  metadata?: CommentMessageMetadata
  timestamp: string
}

type CommentsProps = React.ComponentProps<"section"> & {
  comments?: Comment[]
  placeholder?: string
  title?: string
  userAvatarSrc?: string
}

const defaultComments: Comment[] = [
  {
    author: "Сергей Николаев",
    avatarSrc: "/Rhood/assets/comments/avatar-sergey.jpeg",
    message: "работает с другим АН",
    metadata: "auto",
    timestamp: "1 марта, 15:20",
  },
  {
    author: "Екатерина Морозова",
    avatarSrc: "/Rhood/assets/comments/avatar-user.jpeg",
    message: "Телефон собственника 892212345, позвонить в пт, квартира 42",
    metadata: "private",
    timestamp: "2 марта, 15:20",
  },
  {
    author: "Екатерина Морозова",
    avatarSrc: "/Rhood/assets/comments/avatar-user.jpeg",
    message: "Объект рекламируется риэлтором АН",
    timestamp: "2 марта, 15:20",
  },
]

function Comments({
  className,
  comments = defaultComments,
  placeholder = "Ваш комментарий",
  title = "Комментарии",
  userAvatarSrc = "/Rhood/assets/comments/avatar-user.jpeg",
  ...props
}: CommentsProps) {
  return (
    <section className={cn("grid w-full gap-8", className)} {...props}>
      <h2 className="rh-typography-h4">{title}</h2>

      <div className="grid gap-5">
        <div className="flex items-start gap-3">
          <Avatar imageSrc={userAvatarSrc} />
          <div className="flex h-10 min-w-0 flex-1 items-center rounded-[var(--rh-sizing-common-input-shape-border-radius)] border border-[var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)] px-[var(--rh-sizing-common-input-padding-px-md)] text-[var(--rh-theme-text-neutral-secondary)]">
            <span className="rh-typography-b1">{placeholder}</span>
          </div>
        </div>

        <div className="grid gap-5">
          {comments.map((comment, index) => (
            <CommentMessage key={`${comment.author}-${index}`} {...comment} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Comments }
export type { Comment, CommentsProps }
