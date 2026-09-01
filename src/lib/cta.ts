import { BASE } from "./router";

/**
 * Every call-to-action on the landing page points here. Optional context
 * travels as query params so the form can open already partly answered.
 */
export function trialHref(
  context: { language?: string; course?: string; tariff?: string } = {},
) {
  const params = new URLSearchParams();
  if (context.language) params.set("language", context.language);
  if (context.course) params.set("course", context.course);
  if (context.tariff) params.set("tariff", context.tariff);
  const query = params.toString();
  // trailing slash: GitHub Pages serves <route>/index.html with a 200
  return `${BASE}trial/${query ? `?${query}` : ""}`;
}

export const HOME_HREF = BASE;
