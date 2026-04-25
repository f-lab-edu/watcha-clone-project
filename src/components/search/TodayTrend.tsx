import StaticRequest from '@api/dto/staticRequest';
import { trendingQueryOptions } from '@api/hooks/videoQueries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const POPULAR_KEYWORDS = [
  { rank: 1, title: '힘내라! 나카무라 군!!' },
  { rank: 2, title: '헌터X헌터 Part 1' },
  { rank: 3, title: '주술회전 3기: 사멸회유 전편' },
  { rank: 4, title: '구타유발자들' },
  { rank: 5, title: '나루토 1기' },
  { rank: 6, title: '주술회전' },
  { rank: 7, title: '하우스메이드' },
  { rank: 8, title: '와이 우먼 킬 시즌 1' },
  { rank: 9, title: '간신' },
  { rank: 10, title: '타짜' },
];

const TodayTrend = () => {
  const { data } = useSuspenseQuery(trendingQueryOptions(StaticRequest.baseRequest));
  const trendList = data.data?.results ?? [];

  if (!trendList || trendList.length === 0) {
    return null;
  }

  return (
    <div className='sp-section'>
      <div className='sp-section-header'>
        <span className='sp-section-title'>오늘의 인기 트랜딩 TOP 10</span>
      </div>

      <div className='sp-keyword-grid'>
        {/* 왼쪽 열: 1~5 */}
        <div>
          {trendList.slice(0, 5).map((t, index) => (
            <Link to={`/contents/${t.title ? 'movie' : 'tv'}/${t.id}`} key={`trend-rank-${t.id}`}>
              <div className='sp-keyword-item'>
                <span className={`sp-keyword-rank top`}>{index + 1}</span>
                <span className='sp-keyword-title'>
                  {t.media_type === 'movie' ? t.title : t.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 오른쪽 열: 6~10 */}
        <div>
          {trendList.slice(5, 10).map((t, index) => (
            <Link to={`/contents/${t.title ? 'movie' : 'tv'}/${t.id}`}>
              <div key={`trend-rank-${t.id}`} className='sp-keyword-item'>
                <span className={`sp-keyword-rank top`}>{index + 6}</span>
                <span className='sp-keyword-title'>
                  {t.media_type === 'movie' ? t.title : t.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayTrend;
