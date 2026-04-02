import { SearchRequest } from '@api/dto/searchRequest';

import CardPoster from '@components/home/CardPoster';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import SwiperSection from '@components/swiper/SwiperSection';
import { Link } from 'react-router';
import { SwiperSlide } from 'swiper/react';
import { useGenres, useMovieListByGenre, useNowPlaying, useTopRated } from '../api/hooks/useMovies';
import HeroCarousel from '../components/home/HeroCarousel';

const Home = () => {
  const { data: heroData, isPending: isHeroPending } = useNowPlaying(new SearchRequest());

  const {data: topRatedData, isPending: isTopRatedPending} = useTopRated(new SearchRequest());
  
  const {data: genresData, isPending: isGenresPending } = useGenres(new SearchRequest());
  const genres = ((genresData?.data.genres ?? []).slice(0,5));
  const {data: movieList, isPending: isMovieListPending} = useMovieListByGenre(genres.map(g => g.id), new SearchRequest());


  return (
    <div className='page'>
      {
        (isHeroPending || isTopRatedPending || isGenresPending || isMovieListPending) 
        ? <ListSkeleton />
        : (
        <>
        {/* Hero */}
      <HeroCarousel contents={heroData?.data.results.slice(0,10) ?? []} />

      {/* 랭킹 */}
      {
        topRatedData && 
        <SwiperSection title='오늘의 TOP 10'>
          {
            topRatedData.data.results.map((m, i) => (
              <SwiperSlide key={`swiper-slide-${m.id}`} className="swiper-slide">
                <Link to={`/movie/${m.id}`}>
                  <div className='rank-card'>
                    <div className='rank-number'>{i + 1}</div>
                    <CardPoster
                      img={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))
          }
        </SwiperSection>
      }
      {/* 장르별 영화 */}
      {
        movieList.map((list, id) => 
       list &&
            <SwiperSection title={genres[id].name}>
              { 
                list.map((m) => (
                  <SwiperSlide key={`swiper-slide-${genres[id].name}-${m.id}`} className="swiper-slide">
                        <Link to={`/movie/${m.id}`}>
                            <CardPoster img={`https://image.tmdb.org/t/p/w342${m.poster_path}`}/>
                        </Link>
                    </SwiperSlide>
                ))
              }
          </SwiperSection>
          )
        }
        </>
        )
      }
      
    </div>
  );
};
export default Home;
