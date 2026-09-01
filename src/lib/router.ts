import { useEffect, useState } from "react";

/** Vite injects the project-page prefix, e.g. "/lingo-language-studio/". */
export const BASE = import.meta.env.BASE_URL;

const ROUTE_EVENT = "lingo:route";

export interface Route {
  /** Path relative to BASE: "" for the landing page, "trial" for the form. */
  path: string;
  params: URLSearchParams;
}

function read(): Route {
  const { pathname, search } = window.location;
  const rel = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return {
    path: rel.replace(/^\/+|\/+$/g, ""),
    params: new URLSearchParams(search),
  };
}

/** Push a new in-app URL and let every subscriber know. */
export function navigate(to: string, replace = false) {
  const url = to.startsWith("/") ? to : `${BASE}${to}`;
  window.history[replace ? "replaceState" : "pushState"]({}, "", url);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(read);

  useEffect(() => {
    const sync = () => setRoute(read());
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  return route;
}

/**
 * Turns same-document links into client-side navigations, so every CTA stays
 * a plain <a href> — crawlable, middle-clickable, and still working if the
 * script never runs. In-page anchors and external links are left alone.
 */
export function useLinkInterception() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      // in-page anchors, external links and protocol links stay native
      if (href.startsWith("#") || /^[a-z]+:/i.test(href) || href.startsWith("//"))
        return;

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
