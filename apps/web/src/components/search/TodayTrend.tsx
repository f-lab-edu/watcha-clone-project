import { StaticRequest } from '@watcha/api';
import { trendingQueryOptions } from '@watcha/queries';
import WidgetErrorBoundary from '@components/layout/error-boundary/WidgetErrorBoundary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const TodayTrend = () => {
  const { data } = useSuspenseQuery(trendingQueryOptions(StaticRequest.baseRequest));
  const trendList = data.results ?? [];

  if (!trendList || trendList.length === 0) {
    return null;
  }

  return (
    <div className='sp-section'>
      <div className='sp-section-header'>
        <span className='sp-section-title'>오늘의 인기 트랜딩 TOP 10</span>
      </div>
      <WidgetErrorBoundary>
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
              <Link
                key={`today-trend-${t.id}`}
                to={`/contents/${t.title ? 'movie' : 'tv'}/${t.id}`}>
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
      </WidgetErrorBoundary>
    </div>
  );
};

export default TodayTrend;
