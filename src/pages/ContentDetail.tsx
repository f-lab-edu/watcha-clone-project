import StaticRequest from '@api/dto/staticRequest';
import { movieDetailQueryOptions } from '@api/hooks/movieQueries';
import ContentInfoTab from '@components/content/ContentInfoTab';
import RelatedTab from '@components/content/detail/RelatedContentSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getBackgroundImage, getImageUrl } from 'src/utils/image.util';
import { getRunningTimeToString } from 'src/utils/time.util';

import { tvDetailQueryOptions } from '@api/hooks/videoQueries';
import { useModal } from '@components/modal/ModalContext';
import NotFound from './NotFound';

type Tab = '콘텐츠 정보' | '관련 콘텐츠';

const ContentDetail = () => {
  const { id, mediaType } = useParams();
  if (!id || Number.isNaN(Number(id)) || (mediaType !== 'movie' && mediaType !== 'tv')) {
    return <NotFound type='ERROR' />;
  }

  const { data, isPending, isError, isFetching } = useSuspenseQuery(
    mediaType === 'movie'
      ? movieDetailQueryOptions(Number.isNaN(id) ? -1 : Number(id), StaticRequest.baseRequest)
      : tvDetailQueryOptions(Number.isNaN(id) ? -1 : Number(id), StaticRequest.baseRequest),
  );

  const { openModal } = useModal();
  const [tab, setTab] = useState<Tab>('콘텐츠 정보');
  const handleModal = () =>
    openModal({
      isOpen: true,
      title: '왓챠를 시작해보세요',
      desc: '로그인이 필요해요',
    });

  useEffect(() => {
    setTab('콘텐츠 정보');
  }, [id]);

  return (
    <>
      {isError ? (
        <NotFound type='ERROR' />
      ) : (
        <div className='page'>
          {/* 히어로 */}
          {data.data && (
            <div className='detail-hero'>
              <div
                className='detail-hero-bg'
                style={{
                  backgroundImage: getBackgroundImage(data.data.backdrop_path, 'w500'),
                }}
              />
              <div className='detail-hero-grad' />
              <div className='detail-hero-inner'>
                {/* 왼쪽 */}
                <div className='detail-left'>
                  <h1>{mediaType === 'movie' ? data.data.title : data.data.name}</h1>
                  {mediaType === 'movie' ? (
                    <div className='detail-badge-row'>
                      <span className='detail-age-badge'>
                        {data.data.release_dates.results?.find((r) => r.iso_3166_1 === 'KR')
                          ?.release_dates[0].certification || 'ALL'}
                      </span>
                      <span>{data.data.release_date.split('-')[0]}</span>
                      <span>·</span>
                      <span>{getRunningTimeToString(data.data.runtime)}</span>
                      <span>·</span>
                      <span>{data.data.genres.map((g) => g.name).join('·')}</span>
                    </div>
                  ) : (
                    <div className='detail-badge-row'>
                      <span className='detail-age-badge'>
                        {data.data.content_ratings.results?.find((r) => r.iso_3166_1 === 'KR')
                          ?.rating || 'ALL'}
                      </span>
                      <span>{data.data.first_air_date}</span>
                      <span>·</span>
                      <span>{data.data.genres.map((g) => g.name).join('·')}</span>
                    </div>
                  )}
                  <p className={'detail-desc'}>
                    {data.data.overview}
                    <button className='more-btn'>더보기</button>
                  </p>

                  {/* 평점 */}
                  <div className='detail-stats'>
                    <div className='stat-item'>
                      <div className='stat-value'>
                        <span className='star'>★</span>
                        {Number.parseFloat(data.data.vote_average.toString()).toFixed(1)}
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
                    <img
                      src={getImageUrl(data.data.backdrop_path, 'w780')}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      alt={`Trailer-img-${data.data.title ? data.data.title : data.data.name}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 탭 */}
          <div className='detail-tabs'>
            {(['콘텐츠 정보', '관련 콘텐츠'] as Tab[]).map((t) => (
              <button
                key={t}
                className={`detail-tab ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          {data?.data.id && (
            <div className='tab-content'>
              {tab === '콘텐츠 정보' && <ContentInfoTab credits={data?.data.credits ?? []} />}
              {tab === '관련 콘텐츠' && <RelatedTab movieId={data.data.id} type={mediaType} />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ContentDetail;
