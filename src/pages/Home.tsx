import { SearchRequest } from '@api/dto/searchRequest';

import CardPoster from '@components/home/CardPoster';
import SwiperSection from '@components/swiper/SwiperSection';
import { Link } from 'react-router';
import { SwiperSlide } from 'swiper/react';
import { useGenres, useMovieListByGenre, useTopRated } from '../api/hooks/useMovies';
import HeroCarousel from '../components/home/HeroCarousel';

const Home = () => {
  const {data: topRated} = useTopRated(new SearchRequest());
  
  const {data: genresData} = useGenres(new SearchRequest());
  const genres = ((genresData?.data.genres ?? []).slice(0,5));
  const movieList = useMovieListByGenre(genres.map(g => g.id), new SearchRequest());


  return (
    <div className='page'>
      {/* Hero */}
      <HeroCarousel />

      {/* 랭킹 */}
      {topRated && topRated.data.results.length > 0 && 
      <SwiperSection title='오늘의 TOP 10'>
        {
          topRated?.data.results.map((m,i) => (
            <SwiperSlide key={`swiper-slide-${m.id}`} className="swiper-slide">
                  <Link to={`/movie/${m.id}`}>
                    <div className='rank-card' key={m.id}>
                      <div className='rank-number'>{i + 1}</div>
                      <CardPoster img={`https://image.tmdb.org/t/p/original${m.poster_path}`} />
                    </div>
                  </Link>
              </SwiperSlide>
          ))
        }
      </SwiperSection>}

      {/* 장르별 영화 */}
      {
        movieList.map((list, id) => {
          const movies = list.data?.data.results.slice(0, 10) ?? [];
          if (!movies || movies.length === 0) {
            return;
          }

          return (
            <SwiperSection title={genres[id].name}>
              {
                movies.map((m,i) => (
                  <SwiperSlide key={`swiper-slide-${m.id}`} className="swiper-slide">
                        <Link to={`/movie/${m.id}`}>
                            <CardPoster img={`https://image.tmdb.org/t/p/original${m.poster_path}`} />
                        </Link>
                    </SwiperSlide>
                ))
              }
          </SwiperSection>
          )
        })
      }
    </div>
  );
};
export default Home;
