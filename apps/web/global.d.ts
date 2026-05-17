declare module '*.png' {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
    API_ACCESS_TOKEN: string;
    TMDB_BASE_URL: string;
  }
}
