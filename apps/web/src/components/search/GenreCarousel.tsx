import Carousel from '@components/Carousel/Carousel';
import { Link } from 'react-router';
import { Genre } from 'src/types/content';
import { getPatterBackGround } from 'src/utils/style.util';

type GenreCarouselProps = { type: 'movie' | 'tv'; items: Genre[]; ranDomIndex?: number };

const GenreCarousel = ({ type, items, ranDomIndex = 0 }: GenreCarouselProps) => {
  return (
    <Carousel
      breakpoints={{
        320: { slidesPerView: 2, slidesPerGroup: 2 },
        640: { slidesPerView: 3, slidesPerGroup: 3 },
        1024: { slidesPerView: 4, slidesPerGroup: 4 },
        1280: { slidesPerView: 5, slidesPerGroup: 5 },
      }}
      gap={10}
      items={items.map((g) => (
        <Link to={`/tag?ids=${g.id}&type=${type}`}>
          <div key={g.id} className='sp-genre-card'>
            <div className='sp-genre-bg' style={getPatterBackGround(g.id + ranDomIndex)} />
            <div className='sp-genre-label'>{g.name}</div>
          </div>
        </Link>
      ))}
    />
  );
};

export default GenreCarousel;
