import HeroCarousel from '@components/home/HeroCarousel';
import MovieGenreList from '@components/home/MovieGenreList';
import TopRatedSection from '@components/home/TopRatedSection';
import WidgetErrorBoundary from '@components/layout/error-boundary/WidgetErrorBoundary';

const Home = () => {
  return (
    <main className='page'>
      {/* Hero */}
      <HeroCarousel />
      {/* 랭킹 */}
      <WidgetErrorBoundary>
        <TopRatedSection />
      </WidgetErrorBoundary>
      {/* 장르별 영화 */}
      <WidgetErrorBoundary>
        <MovieGenreList />
      </WidgetErrorBoundary>
    </main>
  );
};
export default Home;
