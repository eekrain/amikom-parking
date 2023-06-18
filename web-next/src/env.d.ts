/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly WEB_ADMIN_USERNAME: string;
  readonly WEB_ADMIN_PASSWORD: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
