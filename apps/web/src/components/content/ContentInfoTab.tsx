import ImageComp from '@components/image/ImageComp';
import { Credit } from '@watcha/types';

import { getImageUrl } from '../../utils/image.util';

type ContentInfoProps = {
  credits: Credit;
};

// 콘텐츠 정보 탭
const ContentInfoTab = ({ credits }: ContentInfoProps) => {
  const director = credits.crew.find((c) => c.job === 'Directing');

  return (
    <>
      {/* 감독/출연 */}
      {credits && (
        <div className='cast-section'>
          <div className='cast-section-header'>
            <h2 className='cast-section-title'>감독/출연</h2>
            <button className='more-link'>더보기</button>
          </div>
          <div className='cast-grid'>
            {director && (
              <div className='cast-row'>
                <div className='cast-avatar'>
                  <ImageComp
                    src={
                      director.profile_path
                        ? getImageUrl(director.profile_path, 'w185')
                        : '/placeholder-avatar.png'
                    }
                    alt={'director-img' + director.name}
                  />
                </div>
                <div>
                  <div className='cast-name-text'>{director.name}</div>
                  <div className='cast-role-text'>감독</div>
                </div>
              </div>
            )}

            {credits?.cast?.slice(0, 8).map((person) => (
              <div className='cast-row' key={person.id}>
                <div className='cast-avatar'>
                  <ImageComp
                    src={
                      person.profile_path
                        ? getImageUrl(person.profile_path, 'w185')
                        : '/placeholder-avatar.png'
                    }
                    alt={'character-img' + person.name}
                  />
                </div>
                <div>
                  <div className='cast-name-text'>{person.name}</div>
                  <div className='cast-role-text'>출연 · {person.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentInfoTab;
