interface ViteTypeOptions {
  // 이 줄을 추가하면 ImportMetaEnv 타입을 엄격하게 만들어 알 수 없는 키를 허용하지 않을 수 있다.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_ACCESS_TOKEN: string
  readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}