/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ssr: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
