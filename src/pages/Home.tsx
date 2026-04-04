import HeroCarousel from '@components/home/HeroCarousel';
import MovieGenreList from '@components/home/MovieGenreList';
import TopRatedSection from '@components/home/TopRatedSection';
import LoadingSkeleton from '@components/skeleton/LoadingSkeleton';
import { Suspense } from 'react';

const Home = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className='page'>
        {/* Hero */}
        <HeroCarousel />
        {/* 랭킹 */}
        <TopRatedSection />
        {/* 장르별 영화 */}
        <MovieGenreList />
      </div>
    </Suspense>
  );
};
export default Home;
