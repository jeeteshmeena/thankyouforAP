import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
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
    closed: "This window is ready to be closed.",
    closedHint: "If it stays open, close the tab manually from your browser.",
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
    closed: "यह विंडो अब बंद की जा सकती है।",
    closedHint: "अगर यह खुली रहे, तो ब्राउज़र से टैब ख़ुद बंद कर दें।",
    announce: "भाषा बदलकर हिन्दी कर दी गई है",
  },
} as const;

function Index() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [closing, setClosing] = useState(false);
  const [closed, setClosed] = useState(false);
  const t = copy[lang];
  const isHi = lang === "hi";
  const hiFont = "'Noto Sans Devanagari', 'Inter', sans-serif";
  const fontsReady = useFontsReady();
  const { ref: fitRef, scale } = useFitText<HTMLDivElement>([lang, fontsReady]);

  const closeWindow = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosed(true);
      try {
        window.close();
      } catch {
        /* browser blocked programmatic close */
      }
    }, 720);
  }, []);

  return (
    <main className="min-h-dvh w-full bg-page p-3 font-sans sm:p-4">
      <section
        className={`relative h-[calc(100dvh-24px)] w-full overflow-hidden rounded-2xl bg-stage will-change-transform sm:h-[calc(100dvh-32px)] sm:rounded-3xl ${
          closing && !closed ? "window-closing" : closed ? "soft-in" : ""
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
