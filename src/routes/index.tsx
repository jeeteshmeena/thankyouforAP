import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
    badge: "Convix Software",
    title: "Thanks for your",
    titleItalic: "purchase",
    line: "Your payment is successful.",
    sub: "You can now safely close this window or tab in your Telegram browser.",
    toggle: "हिन्दी",
    label: "Switch language",
  },
  hi: {
    badge: "कॉन्विक्स सॉफ़्टवेयर",
    title: "आपकी ख़रीद के लिए",
    titleItalic: "धन्यवाद",
    line: "आपका भुगतान सफलतापूर्वक पूरा हुआ।",
    sub: "अब आप अपने टेलीग्राम ब्राउज़र में यह विंडो या टैब बंद कर सकते हैं।",
    toggle: "English",
    label: "भाषा बदलें",
  },
} as const;

function Index() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const t = copy[lang];

  return (
    <main className="min-h-screen w-full bg-page p-3 font-sans sm:p-4">
      <section className="relative h-[calc(100vh-24px)] w-full overflow-hidden rounded-2xl bg-stage sm:h-[calc(100vh-32px)] sm:rounded-3xl">
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

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-8">
          <span
            className="rise-in inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 shadow-sm"
            style={{ fontSize: "13px", animationDelay: "0.35s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="text-ink">{t.badge}</span>
          </span>

          <h1
            className="rise-in mt-5 max-w-4xl text-ink sm:mt-6"
            style={{
              fontSize: "clamp(34px, 7.5vw, 68px)",
              lineHeight: 1.06,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              animationDelay: "0.45s",
            }}
          >
            {t.title}{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {t.titleItalic}
            </span>
          </h1>

          <p
            className="rise-in mt-4 max-w-2xl font-medium text-ink sm:mt-5"
            style={{ fontSize: "clamp(17px, 4.4vw, 26px)", animationDelay: "0.55s" }}
          >
            {t.line}
          </p>

          <p
            className="rise-in mt-3 max-w-xl px-2 text-muted-foreground"
            style={{ fontSize: "clamp(13px, 3.4vw, 16px)", lineHeight: 1.6, animationDelay: "0.65s" }}
          >
            {t.sub}
          </p>

          <button
            type="button"
            aria-label={t.label}
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="rise-in mt-7 inline-flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 text-card transition-transform hover:scale-[1.03] sm:mt-9 sm:py-2.5 sm:pl-7"
            style={{ fontSize: "14px", animationDelay: "0.75s" }}
          >
            {t.toggle}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-card/15 sm:h-7 sm:w-7">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 15 12 9 18" />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
