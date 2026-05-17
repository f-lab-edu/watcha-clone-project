import ContentDetailTabs from '@components/content/detail/ContentDetailTabs';
import ImageComp from '@components/image/ImageComp';
import { useModal } from '@components/modal/ModalContext';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBackgroundImage, getImageUrl } from '@utils/image.util';
import { getRunningTimeToString } from '@utils/time.util';
import { StaticRequest } from '@watcha/api';
import { movieDetailQueryOptions, tvDetailQueryOptions } from '@watcha/queries';
import { useParams } from 'react-router';
import { CONTENT_TAB_TYPE, ContentDetailTabProvider } from 'src/context/ContentDetailTabContext';

import NotFound from './NotFound';

const ContentDetail = () => {
  const { id, mediaType } = useParams();
  const contentType = mediaType === 'movie' || mediaType === 'tv' ? mediaType : null;
  const isValid = !!id && !Number.isNaN(Number(id)) && !!contentType;
  const safeId = isValid ? Number(id) : -1;

  const { data } = useSuspenseQuery(
    contentType === 'movie'
      ? movieDetailQueryOptions(safeId, StaticRequest.baseRequest)
      : tvDetailQueryOptions(safeId, StaticRequest.baseRequest),
  );

  const { openModal } = useModal();

  const handleModal = () =>
    openModal({
      title: '왓챠를 시작해보세요',
      desc: '로그인이 필요해요',
    });

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
              <h1>{contentType === 'movie' ? data.title : data.name}</h1>
              {contentType === 'movie' ? (
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

      <ContentDetailTabProvider key={data.id} initialTab={CONTENT_TAB_TYPE.INFO}>
        <ContentDetailTabs data={data} mediaType={contentType} />
      </ContentDetailTabProvider>
    </div>
  );
};

export default ContentDetail;
