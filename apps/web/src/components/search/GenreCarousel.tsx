import { Carousel } from '@watcha/ui';
import { Link } from 'react-router';
import { Genre } from '@watcha/types';
import { getPatterBackGround } from '@utils/style.util';

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
        <Link key={g.id} to={`/tag?ids=${g.id}&type=${type}`}>
          <div className='sp-genre-card'>
            <div className='sp-genre-bg' style={getPatterBackGround(g.id + ranDomIndex)} />
            <div className='sp-genre-label'>{g.name}</div>
          </div>
        </Link>
      ))}
    />
  );
};

export default GenreCarousel;
