import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFitText } from "@/hooks/use-fit-text";
import { useFontsReady } from "@/hooks/use-fonts-ready";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Payment Successful — Convix Software" },
      {
        name: "description",
        content:
          "Your payment to Convix Software was successful. You can safely close this window or tab in your Telegram browser.",
      },
      { property: "og:title", content: "Payment Successful — Convix Software" },
      {
        property: "og:description",
        content: "Thanks for your purchase. Your payment has been confirmed by Convix Software.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const copy = {
  en: {
    title: "Thanks for your",
    titleItalic: "purchase",
    line: "Your payment is successful.",
    sub: "You can now safely close this window or tab in your Telegram browser.",
    toggle: "हिन्दी",
    label: "Switch language to Hindi",
    close: "Close window",
    closeLabel: "Close this window or tab",
    closed: "Closing your Telegram tab…",
    closedHint: "If it stays open, tap the close button in your Telegram browser.",
    tab: "SliceURL — Payment successful",
    announce: "Language changed to English",
  },
  hi: {
    title: "आपकी ख़रीद के लिए",
    titleItalic: "धन्यवाद",
    line: "आपका भुगतान सफलतापूर्वक पूरा हुआ।",
    sub: "अब आप अपने टेलीग्राम ब्राउज़र में यह विंडो या टैब बंद कर सकते हैं।",
    toggle: "English",
    label: "भाषा बदलकर अंग्रेज़ी करें",
    close: "विंडो बंद करें",
    closeLabel: "यह विंडो या टैब बंद करें",
    closed: "आपका टेलीग्राम टैब बंद किया जा रहा है…",
    closedHint: "अगर यह खुला रहे, तो टेलीग्राम ब्राउज़र का क्लोज़ बटन दबाएँ।",
    tab: "SliceURL — भुगतान सफल",
    announce: "भाषा बदलकर हिन्दी कर दी गई है",
  },
} as const;

type TelegramWebApp = { close?: () => void; ready?: () => void };

function closeTelegramBrowser() {
  const tg = (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
  try {
    tg?.ready?.();
    tg?.close?.();
  } catch {
    /* not inside a Telegram WebApp context */
  }
  try {
    window.close();
  } catch {
    /* browser blocked programmatic close */
  }
}

function Index() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [closing, setClosing] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [closed, setClosed] = useState(false);
  const timers = useRef<number[]>([]);
  const t = copy[lang];
  const isHi = lang === "hi";
  const hiFont = "'Noto Sans Devanagari', 'Inter', sans-serif";
  const fontsReady = useFontsReady();
  const { ref: fitRef, scale } = useFitText<HTMLDivElement>([lang, fontsReady]);

  useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const closeWindow = useCallback(() => {
    setClosing(true);
    // The pointer glides up to the Telegram tab's close control, clicks it,
    // and only then does the sheet dismiss and the in-app browser close.
    timers.current.push(
      window.setTimeout(() => setDismissing(true), 1050),
      window.setTimeout(() => setClosed(true), 1500),
      window.setTimeout(() => closeTelegramBrowser(), 1620),
    );
  }, []);

  return (
    <main className="min-h-dvh w-full bg-page p-3 font-sans sm:p-4">
      <section
        className={`relative h-[calc(100dvh-24px)] w-full overflow-hidden rounded-2xl bg-stage will-change-transform sm:h-[calc(100dvh-32px)] sm:rounded-3xl ${
          dismissing && !closed ? "window-closing" : closed ? "soft-in" : ""
        }`}
      >
        <div className="flashlight-in absolute inset-0">
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disableRemotePlayback
            poster="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60"
            {...{ "webkit-playsinline": "true", "x5-playsinline": "true" }}
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4" />
          </video>
          <div className="absolute inset-0 bg-background/10" />
        </div>

        <div
          className="flash-burst pointer-events-none absolute inset-0 z-20 bg-background"
          aria-hidden="true"
        />

        {closing && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-3 pt-3">
            <div
              className={`tab-strip-in relative flex w-full max-w-sm items-center gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-sm ${
                closed ? "tab-dismiss" : ""
              }`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span
                lang={isHi ? "hi" : "en"}
                className="flex-1 truncate text-ink/80"
                style={{ fontFamily: isHi ? hiFont : undefined, fontSize: "12.5px" }}
              >
                {t.tab}
              </span>
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-ink/8 text-ink">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                <span className="click-ring absolute inset-0 rounded-full ring-2 ring-ink/50" />
                <span className="cursor-glide absolute top-3 left-3">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink drop-shadow-sm">
                    <path
                      d="M5 3l14 8.2-6.1 1.2L10.6 19 5 3z"
                      fill="currentColor"
                      stroke="var(--color-card)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-8 text-center sm:px-8 sm:py-12">
          <div
            ref={fitRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease",
              opacity: fontsReady ? 1 : 0,
            }}
            className="flex w-full max-w-4xl flex-col items-center"
          >
          <span
            className="rise-in inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 shadow-sm"
            style={{ fontSize: "13px", animationDelay: "0.35s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="text-ink" style={{ letterSpacing: "0.01em", fontWeight: 500 }}>
              SliceURL
            </span>
          </span>

          <h1
            lang={isHi ? "hi" : "en"}
            className="rise-in mt-5 max-w-4xl text-balance text-ink sm:mt-6"
            style={{
              fontFamily: isHi ? hiFont : undefined,
              fontSize: isHi ? "clamp(30px, 6.6vw, 58px)" : "clamp(34px, 7.6vw, 68px)",
              lineHeight: isHi ? 1.28 : 1.06,
              fontWeight: 500,
              letterSpacing: isHi ? "0" : "-0.02em",
              animationDelay: "0.45s",
            }}
          >
            {t.title}{" "}
            <span
              style={{
                fontFamily: isHi
                  ? "'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif"
                  : "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {t.titleItalic}
            </span>
          </h1>

          <p
            lang={isHi ? "hi" : "en"}
            className="rise-in mt-4 max-w-2xl text-balance text-ink sm:mt-5"
            style={{
              fontFamily: isHi ? hiFont : undefined,
              fontSize: isHi ? "clamp(16px, 4vw, 23px)" : "clamp(17px, 4.4vw, 26px)",
              lineHeight: isHi ? 1.55 : 1.35,
              fontWeight: 500,
              letterSpacing: isHi ? "0" : "-0.01em",
              animationDelay: "0.55s",
            }}
          >
            {t.line}
          </p>

          <p
            lang={isHi ? "hi" : "en"}
            className="rise-in mt-3 max-w-xl px-2 text-pretty text-ink/70 sm:mt-4"
            style={{
              fontFamily: isHi ? hiFont : undefined,
              fontSize: isHi ? "clamp(13px, 3.3vw, 16px)" : "clamp(13.5px, 3.4vw, 16.5px)",
              lineHeight: isHi ? 1.75 : 1.6,
              letterSpacing: isHi ? "0" : "0.005em",
              animationDelay: "0.65s",
            }}
          >
            {t.sub}
          </p>

          {closed ? (
            <p
              lang={isHi ? "hi" : "en"}
              className="soft-in mt-7 max-w-md rounded-2xl bg-card/90 px-5 py-4 text-ink shadow-sm sm:mt-9"
              style={{
                fontFamily: isHi ? hiFont : undefined,
                fontSize: "14px",
                lineHeight: isHi ? 1.7 : 1.55,
              }}
            >
              {t.closed}
              <span className="mt-1 block text-ink/60" style={{ fontSize: "12.5px" }}>
                {t.closedHint}
              </span>
            </p>
          ) : (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
              <button
                type="button"
                lang={isHi ? "en" : "hi"}
                aria-label={t.label}
                title={t.label}
                onClick={() => setLang(isHi ? "en" : "hi")}
                className="rise-in inline-flex min-h-11 items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 text-card transition-transform outline-none hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-2.5 sm:pl-7"
                style={{
                  fontFamily: isHi ? undefined : hiFont,
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  animationDelay: "0.75s",
                }}
              >
                {t.toggle}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-card/15"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6 15 12 9 18" />
                  </svg>
                </span>
              </button>

              <button
                type="button"
                lang={isHi ? "hi" : "en"}
                aria-label={t.closeLabel}
                onClick={closeWindow}
                className="rise-in inline-flex min-h-11 items-center gap-2 rounded-full bg-card/90 px-5 py-2 text-ink shadow-sm transition-transform outline-none hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-2.5"
                style={{
                  fontFamily: isHi ? hiFont : undefined,
                  fontSize: "14px",
                  fontWeight: 500,
                  animationDelay: "0.85s",
                }}
              >
                {t.close}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          </div>

          <p aria-live="polite" className="sr-only">
            {t.announce}
          </p>
        </div>
      </section>
    </main>
  );
}
