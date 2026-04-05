import { Credit } from 'src/types/credit';

type ContentInfoProps = {
  movieId: number;
  credits: Credit;
};

// 콘텐츠 정보 탭
const ContentInfoTab = ({ movieId, credits }: ContentInfoProps) => {
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
                  <img
                    src={
                      director.profile_path
                        ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                        : '/placeholder-avatar.png'
                    }
                    alt={director.name}
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
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : '/placeholder-avatar.png'
                    }
                    alt={person.name}
                  />
                </div>
                <div>
                  <div className='cast-name-text'>{person.name}</div>
                  <div className='cast-role-text'>출연 · {person.character}</div>
                </div>
              </div>
            ))}

            {/* <ReviewSection movieId={movieId} /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentInfoTab;
