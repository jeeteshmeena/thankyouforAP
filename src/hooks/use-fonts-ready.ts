import { useEffect, useState } from "react";

/** True once webfonts have loaded, so text is revealed without FOUT/FOIT. */
export function useFontsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const done = () => !cancelled && setReady(true);
    const timeout = window.setTimeout(done, 1600);

    if (typeof document !== "undefined" && "fonts" in document) {
      void document.fonts.ready.then(done);
    } else {
      done();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  return ready;
}