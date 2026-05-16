import HeroCarousel from '@components/home/HeroCarousel';
import MovieGenreList from '@components/home/MovieGenreList';
import TopRatedSection from '@components/home/TopRatedSection';
import WidgetErrorBoundary from '@components/layout/error-boundary/WidgetErrorBoundary';
import { HeroCarouselSkeleton } from '@watcha/ui';
import { ListSkeleton } from '@watcha/ui';
import { Suspense } from 'react';

const Home = () => {
  return (
    <main className='page'>
      {/* Hero */}
      <Suspense fallback={<HeroCarouselSkeleton />}>
        <HeroCarousel />
      </Suspense>
      {/* 랭킹 */}
      <WidgetErrorBoundary>
        <Suspense fallback={<ListSkeleton />}>
          <TopRatedSection />
        </Suspense>
      </WidgetErrorBoundary>
      {/* 장르별 영화 */}
      <WidgetErrorBoundary>
        <Suspense fallback={<ListSkeleton />}>
          <MovieGenreList />
        </Suspense>
      </WidgetErrorBoundary>
    </main>
  );
};
export default Home;
