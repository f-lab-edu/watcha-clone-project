import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

const TRANSITION_DURATION = 300;

type Breakpoint = {
  slidesPerView: number;
  slidesPerGroup: number;
};

type CarouselProps = {
  items: React.ReactNode[];
  loop?: boolean;
  delay?: number;
  breakpoints?: Record<number, Breakpoint>;
  gap?: number;
};

const getActiveSetting = (breakpoints?: Record<number, Breakpoint>): Breakpoint => {
  if (typeof window === 'undefined' || !breakpoints) {
    return { slidesPerView: 1, slidesPerGroup: 1 };
  }

  const width = window.innerWidth;
  const sortedKeys = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => a - b);

  let active: Breakpoint = { slidesPerView: 1, slidesPerGroup: 1 };
  for (const key of sortedKeys) {
    if (width >= key) active = breakpoints[key];
  }
  return active;
};

const Carousel = ({ items, loop = false, delay = 4000, breakpoints, gap = 0 }: CarouselProps) => {
  const [setting, setSetting] = useState<Breakpoint>(() => getActiveSetting(breakpoints));
  const isTransitionRef = useRef(false);

  const { slidesPerView, slidesPerGroup } = setting;
  const [currentIdx, setCurrentIdx] = useState(slidesPerView);
  const lastPageRealIdx = Math.max(items.length - slidesPerView, 0);

  const extendedItems =
    items.length < slidesPerView
      ? items.map((item, i) => ({ item, key: `real-${i}` }))
      : [
          ...items.slice(-slidesPerView).map((item, i) => ({ item, key: `clone-prev-${i}` })),
          ...items.map((item, i) => ({ item, key: `real-${i}` })),
          ...items.slice(0, slidesPerView).map((item, i) => ({ item, key: `clone-next-${i}` })),
        ];

  const slideBasis = `calc((100% - ${gap * (slidesPerView - 1)}px) / ${slidesPerView})`;

  const trackStyle: CSSProperties = {
    display: 'flex',
    gap: `${gap}px`,
    transform: `translateX(calc(${currentIdx} * (${slideBasis} + ${gap}px) * -1))`,
    transition: isTransitionRef.current ? `transform ${TRANSITION_DURATION}ms ease-in-out` : 'none',
  };

  const slideStyle: CSSProperties = {
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: slideBasis,
  };

  const moveCarousel = useCallback(
    (direction: number) => {
      if (isTransitionRef.current) return;

      isTransitionRef.current = true;
      setCurrentIdx((prev: number) => {
        const realIdx = prev - slidesPerView;
        if (direction > 0) {
          if (realIdx >= lastPageRealIdx) return slidesPerView + items.length;
          if (realIdx + slidesPerGroup >= lastPageRealIdx) return slidesPerView + lastPageRealIdx;
          return prev + slidesPerGroup;
        } else {
          if (realIdx <= 0) return slidesPerView - 1;
          if (realIdx <= slidesPerGroup) return slidesPerView;
          return prev - slidesPerGroup;
        }
      });
    },
    [slidesPerView, slidesPerGroup, lastPageRealIdx, items.length],
  );

  useEffect(() => {
    if (!loop) return;
    const interval = setInterval(() => moveCarousel(1), delay);
    return () => clearInterval(interval);
  }, [loop, delay, moveCarousel]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setSetting(getActiveSetting(breakpoints)), 300);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  useEffect(() => {
    isTransitionRef.current = false;
    setCurrentIdx(slidesPerView);
  }, [setting, slidesPerView]);

  useEffect(() => {
    if (!isTransitionRef.current) return;
    const timer = setTimeout(() => {
      isTransitionRef.current = false;
      setCurrentIdx((prev: number) => {
        if (prev >= slidesPerView + items.length) return slidesPerView;
        if (prev < slidesPerView) return slidesPerView + lastPageRealIdx;
        return prev;
      });
    }, TRANSITION_DURATION);
    return () => clearTimeout(timer);
  }, [currentIdx, slidesPerView, items.length, lastPageRealIdx]);

  if (items.length === 0) return null;

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };

  if (items.length <= slidesPerView) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', gap: `${gap}px` }}>
          {items.map((item, index) => (
            <div key={index} style={slideStyle}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={trackStyle}>
        {extendedItems.map(({ item, key }) => (
          <div key={key} style={slideStyle}>
            {item}
          </div>
        ))}
      </div>
      <button
        className='arrow arrow-left'
        onClick={() => moveCarousel(-1)}
        aria-label='이전 슬라이드'>
        {'<'}
      </button>
      <button
        className='arrow arrow-right'
        onClick={() => moveCarousel(1)}
        aria-label='다음 슬라이드'>
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
