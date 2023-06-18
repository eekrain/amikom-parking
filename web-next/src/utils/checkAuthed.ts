import type { AstroGlobal } from "astro";

const checkAuthed = (astro: Readonly<AstroGlobal<Record<string, any>>>) => {
  if (!astro.cookies.has("authed")) {
    return astro.redirect("/auth");
  }
  return true;
};

export default checkAuthed;
