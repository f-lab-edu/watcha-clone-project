import { StaticRequest } from '@watcha/api';
import { movieDetailQueryOptions, tvDetailQueryOptions } from '@watcha/queries';
import ContentInfoTab from '@components/content/ContentInfoTab';
import RelatedTab from '@components/content/detail/RelatedContentSection';
import ImageComp from '@components/image/ImageComp';
import WidgetErrorBoundary from '@components/layout/error-boundary/WidgetErrorBoundary';
import { useModal } from '@components/modal/ModalContext';
import { ListSkeleton } from '@watcha/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Activity, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getBackgroundImage, getImageUrl } from '@utils/image.util';
import { getRunningTimeToString } from '@utils/time.util';

import NotFound from './NotFound';

const CONTENT_TAB_TYPE = {
  INFO: '콘텐츠 정보',
  RELATED: '관련 콘텐츠',
} as const;

type ContentTabValue = (typeof CONTENT_TAB_TYPE)[keyof typeof CONTENT_TAB_TYPE];

const ContentDetail = () => {
  const { id, mediaType } = useParams();
  const isValid =
    !!id && !Number.isNaN(Number(id)) && (mediaType === 'movie' || mediaType === 'tv');
  const safeId = isValid ? Number(id) : -1;

  const { data } = useSuspenseQuery(
    mediaType === 'movie'
      ? movieDetailQueryOptions(safeId, StaticRequest.baseRequest)
      : tvDetailQueryOptions(safeId, StaticRequest.baseRequest),
  );

  const [tab, setTab] = useState<ContentTabValue>(CONTENT_TAB_TYPE.INFO);
  const { openModal } = useModal();

  const handleModal = () =>
    openModal({
      title: '왓챠를 시작해보세요',
      desc: '로그인이 필요해요',
    });

  useEffect(() => {
    setTab(CONTENT_TAB_TYPE.INFO);
  }, [id]);

  if (!isValid) {
    return <NotFound type='ERROR' />;
  }

  return (
    <div className='page'>
      {/* 히어로 */}
      {data && (
        <div className='detail-hero'>
          <div
            className='detail-hero-bg'
            style={{
              backgroundImage: getBackgroundImage(data.backdrop_path, 'w500'),
            }}
          />
          <div className='detail-hero-grad' />
          <div className='detail-hero-inner'>
            {/* 왼쪽 */}
            <div className='detail-left'>
              <h1>{mediaType === 'movie' ? data.title : data.name}</h1>
              {mediaType === 'movie' ? (
                <div className='detail-badge-row'>
                  <span className='detail-age-badge'>
                    {data.release_dates.results?.find((r) => r.iso_3166_1 === 'KR')
                      ?.release_dates[0].certification || 'ALL'}
                  </span>
                  <span>{data.release_date.split('-')[0]}</span>
                  <span>·</span>
                  <span>{getRunningTimeToString(data.runtime)}</span>
                  <span>·</span>
                  <span>{data.genres.map((g) => g.name).join('·')}</span>
                </div>
              ) : (
                <div className='detail-badge-row'>
                  <span className='detail-age-badge'>
                    {data.content_ratings.results?.find((r) => r.iso_3166_1 === 'KR')?.rating ||
                      'ALL'}
                  </span>
                  <span>{data.first_air_date}</span>
                  <span>·</span>
                  <span>{data.genres.map((g) => g.name).join('·')}</span>
                </div>
              )}
              <p className={'detail-desc'}>
                {data.overview}
                <button className='more-btn'>더보기</button>
              </p>

              {/* 평점 */}
              <div className='detail-stats'>
                <div className='stat-item'>
                  <div className='stat-value'>
                    <span className='star'>★</span>
                    {Number.parseFloat(data.vote_average.toString()).toFixed(1)}
                  </div>
                  <div className='stat-label'>평균 별점</div>
                </div>
              </div>

              <button type='button' className='btn-watch' onClick={handleModal}>
                감상하기
              </button>

              <div className='detail-icon-actions'>
                <button type='button' className='icon-action-btn' onClick={handleModal}>
                  <span className='icon'>＋</span>
                  보고싶어요
                </button>
                <button type='button' className='icon-action-btn' onClick={handleModal}>
                  <span className='icon'>☆</span>
                  평가하기
                </button>
                <button type='button' className='icon-action-btn' onClick={handleModal}>
                  <span className='icon'>💬</span>
                  왓챠파티
                </button>
                {/* <button className='icon-action-btn'>
                      <span className='icon'>⋯</span>
                      더보기
                    </button> */}
              </div>
            </div>

            {/* 오른쪽 트레일러 */}
            <div className='detail-right'>
              <div className='detail-trailer'>
                <ImageComp
                  src={getImageUrl(data.backdrop_path, 'w780')}
                  className='cover'
                  alt={`Trailer-img-${data.title ? data.title : data.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 탭 */}
      <div className='detail-tabs'>
        {[CONTENT_TAB_TYPE.INFO, CONTENT_TAB_TYPE.RELATED].map((t) => (
          <button
            key={t}
            className={`detail-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      {data.id && (
        <div className='tab-content'>
          <Activity mode={tab === CONTENT_TAB_TYPE.INFO ? 'visible' : 'hidden'}>
            <ContentInfoTab credits={data.credits ?? []} />
          </Activity>
          <Activity mode={tab === CONTENT_TAB_TYPE.RELATED ? 'visible' : 'hidden'}>
            <Suspense fallback={<ListSkeleton />}>
              <WidgetErrorBoundary>
                <RelatedTab movieId={data.id} type={mediaType} />
              </WidgetErrorBoundary>
            </Suspense>
          </Activity>
        </div>
      )}
    </div>
  );
};

export default ContentDetail;
