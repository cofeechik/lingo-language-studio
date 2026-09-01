import { useEffect } from "react";
import { useLinkInterception, useRoute } from "./lib/router";
import { Home } from "./pages/Home";
import { Trial } from "./pages/Trial";

export default function App() {
  const { path, params } = useRoute();
  useLinkInterception();

  const onTrial = path === "trial";

  // A route change starts a new page, so it starts at the top — but an
  // in-page anchor on the landing page must keep its own scrolling.
  useEffect(() => {
    if (onTrial || !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [onTrial]);

  useEffect(() => {
    document.title = onTrial
      ? "Пробный урок — LINGO"
      : "LINGO — студия языков";
  }, [onTrial]);

  return onTrial ? <Trial params={params} /> : <Home />;
}
