import StaticRequest from '@api/dto/staticRequest';
import { searchQueryOptions } from '@api/hooks/videoQueries';
import WidgetErrorBoundary from '@components/layout/error-boundary/WidgetErrorBoundary';
import GenreSection from '@components/search/GenreSection';
import TodayTrend from '@components/search/TodayTrend';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebounce from 'src/hooks/useDebounce';
import { Content } from 'src/types/content';
import { getBackgroundImage } from 'src/utils/image.util';

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState('');

  const handleClear = () => {
    setKeyword('');
    inputRef.current?.focus();
  };

  const debouncedQuery = useDebounce<string>(keyword, 300);
  const { data } = useSuspenseQuery(searchQueryOptions(debouncedQuery, StaticRequest.baseRequest));

  const handleSearchNavigation = (result: Content) => {
    if (result.media_type === 'person') {
      return;
    }

    navigate(`/contents/${result.media_type}/${result.id}`);
  };

  return (
    <>
      <div className='sp-root'>
        {/* ── 검색바 ── */}
        <div className='sp-search-bar'>
          <div className='sp-search-inner'>
            <span className='sp-search-icon'>🔍</span>
            <input
              ref={inputRef}
              className='sp-search-input'
              placeholder='콘텐츠, 태그, 인물 검색'
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              autoFocus
            />
            {keyword && (
              <button className='sp-clear-btn' onClick={handleClear}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* TODO person일경우 처리 필요 */}
        {debouncedQuery ? (
          <div className='sp-result-list sp-fade'>
            {data.results.length === 0 ? (
              <div className='sp-empty'>
                <p className='sp-empty-text'>검색 결과가 없습니다</p>
                <br />
                <Suspense fallback={<ListSkeleton />}>
                  <GenreSection />
                </Suspense>
              </div>
            ) : (
              <>
                {data.results.map((result) => (
                  <Link
                    key={`search-result-${result.id}`}
                    to={`/contents/${result.media_type}/${result.id}`}>
                    <div className='sp-result-item' onClick={() => handleSearchNavigation(result)}>
                      <div className='sp-result-thumb'>
                        <div
                          className='sp-result-thumb-img'
                          style={{
                            background: getBackgroundImage(
                              result.poster_path ?? result.profile_path,
                              'w45',
                            ),
                          }}
                        />
                      </div>
                      <div className='sp-result-info'>
                        <div className='sp-result-title'>
                          {result.media_type === 'movie' ? result.title : result.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className='sp-fade'>
            {/* 인기 검색어 */}
            <TodayTrend />
            {/* 비디오 장르 */}
            <WidgetErrorBoundary>
              <Suspense fallback={<ListSkeleton />}>
                <GenreSection />
              </Suspense>
            </WidgetErrorBoundary>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
