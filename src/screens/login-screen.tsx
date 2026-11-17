import * as React from "react";
import { Eye, EyeOff, Headset, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Textfield } from "@/components/ui/text-field";

function SupportLauncher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-20 flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="Написать в поддержку"
          className="w-[min(360px,calc(100vw-32px))] rounded-[var(--rh-sizing-common-input-shape-border-radius)] border border-[var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="rh-typography-b1-med text-[var(--rh-theme-text-neutral-primary)]">Поддержка</h2>
              <p className="rh-typography-b2 mt-1 text-[var(--rh-theme-text-neutral-secondary)]">
                Напиши, если нужна помощь со входом.
              </p>
            </div>
            <IconButton
              aria-label="Закрыть поддержку"
              appearance="ghost"
              icon={<X aria-hidden="true" />}
              size="sm"
              onClick={() => setIsOpen(false)}
            />
          </div>
          {sent ? (
            <p className="rh-typography-b2 text-[var(--rh-theme-text-success)]" role="status">
              Сообщение отправлено. Мы скоро ответим.
            </p>
          ) : (
            <form className="grid gap-3" onSubmit={sendMessage}>
              <label className="rh-typography-b2-med text-[var(--rh-theme-text-neutral-primary)]" htmlFor="support-message">
                Сообщение
              </label>
              <textarea
                className="rh-typography-b2 min-h-24 resize-y rounded-[var(--rh-sizing-common-input-shape-border-radius)] border border-[var(--rh-theme-border-light)] bg-[var(--rh-theme-surface-bg)] px-3 py-2 text-[var(--rh-theme-text-neutral-primary)] outline-none placeholder:text-[var(--rh-theme-text-neutral-secondary)] focus:border-[var(--rh-theme-border-focus)]"
                id="support-message"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Опиши, что случилось"
                required
                value={message}
              />
              <Button appearance="primary" className="w-full" endIcon={false} size="md" startIcon={<Send aria-hidden="true" />} type="submit">
                Отправить
              </Button>
            </form>
          )}
        </section>
      )}
      <IconButton
        aria-label="Поддержка"
        aria-expanded={isOpen}
        appearance="contrast"
        icon={<Headset aria-hidden="true" />}
        iconSize="lg"
        size="lg"
        onClick={() => {
          setIsOpen((open) => !open);
          setSent(false);
        }}
      />
    </div>
  );
}

function LoginScreen() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [notice, setNotice] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Вход в прототипе не подключён.");
  }

  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 py-10 text-[var(--rh-theme-text-neutral-primary)] sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26, 26, 26, 0.28), rgba(26, 26, 26, 0.28)), url('/Rhood/assets/archive-unsplash-exterior-1.jpg')",
        }}
      />
      <section className="w-full max-w-[480px] rounded-[var(--rh-sizing-common-input-shape-border-radius)] bg-[var(--rh-theme-surface-bg)] px-6 py-8 shadow-[0_12px_48px_rgba(26,26,26,0.12)] sm:px-10 sm:py-10">
        <div className="mb-8 flex justify-center">
          <img alt="Rhood" className="h-7 w-auto" src="/Rhood/assets/rhood-logo.svg" />
        </div>

        <header className="mb-8 text-center">
          <h1 className="rh-typography-h3 text-[var(--rh-theme-text-neutral-primary)]">Войти в RHOOD</h1>
        </header>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="login-email">Электронная почта</label>
          <Textfield appearance="neutral" autoComplete="username" id="login-email" name="email" placeholder="Электронная почта" required size="lg" type="email" />

          <div className="grid gap-2">
            <label className="sr-only" htmlFor="login-password">Пароль</label>
            <div className="relative">
              <Textfield appearance="neutral" autoComplete="current-password" className="pr-14" id="login-password" name="password" placeholder="Пароль" required size="lg" type={showPassword ? "text" : "password"} />
              <IconButton
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                appearance="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                icon={showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                iconSize="lg"
                size="lg"
                onClick={() => setShowPassword((shown) => !shown)}
              />
            </div>
          </div>

          <Button appearance="primary" className="w-full" endIcon={false} size="lg" startIcon={false} type="submit">
            Войти
          </Button>
          <Button appearance="ghost" className="w-full" endIcon={false} onClick={() => setNotice("Восстановление пароля пока не подключено.")} size="lg" startIcon={false} type="button">
            Забыли пароль?
          </Button>
          {notice && <p className="rh-typography-b2 text-center text-[var(--rh-theme-text-neutral-secondary)]" role="status">{notice}</p>}
        </form>
      </section>
      <SupportLauncher />
    </main>
  );
}

export { LoginScreen };
