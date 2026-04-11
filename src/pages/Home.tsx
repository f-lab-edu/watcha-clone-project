import HeroCarousel from '@components/home/HeroCarousel';
import MovieGenreList from '@components/home/MovieGenreList';
import TopRatedSection from '@components/home/TopRatedSection';

const Home = () => {
  return (
    <div className='page'>
      {/* Hero */}
      <HeroCarousel />
      {/* 랭킹 */}
      <TopRatedSection />
      {/* 장르별 영화 */}
      <MovieGenreList />
    </div>
  );
};
export default Home;
