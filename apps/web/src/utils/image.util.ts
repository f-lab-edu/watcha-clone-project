const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 *
 * @param src : 이미지 경로 '/path';
 * @param size : 이미지 사이즈 'w500'
 * @returns 완성된 이미지 경로
 */
export const getImageUrl = (src: string, size: string): string => {
  if (!src) {
    // TODO 대체 이미지
  }

  return `${IMAGE_BASE_URL}/${size}${src}`;
};

export const getBackgroundImage = (src: string, size: string) => {
  if (!src) return 'none';

  return `url(${getImageUrl(src, size)})`;
};
