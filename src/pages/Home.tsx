import HeroCarousel from '@components/home/HeroCarousel';
import MovieGenreList from '@components/home/MovieGenreList';
import TopRatedSection from '@components/home/TopRatedSection';

const Home = () => {
  return (
    <main className='page'>
      {/* Hero */}
      <HeroCarousel />
      {/* 랭킹 */}
      <TopRatedSection />
      {/* 장르별 영화 */}
      <MovieGenreList />
    </main>
  );
};
export default Home;
