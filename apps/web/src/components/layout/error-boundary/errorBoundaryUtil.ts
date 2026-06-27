import { isAxiosError } from "axios";

// 401/403 인증/인가 에러 판정 — 위젯/페이지 바운더리에서 상위로 버블링할 때 사용
export const isAuthError = (error: Error) =>
  isAxiosError(error) &&
  (error.response?.status === 401 || error.response?.status === 403);
