import WidgetErrorBoundary from '@components/layout/error-boundary/WidgetErrorBoundary';
import { MovieDetailResponse } from '@watcha/api';
import { ListSkeleton } from '@watcha/ui';
import { Activity, Suspense } from 'react';
import { CONTENT_TAB_TYPE, useTab } from 'src/context/ContentDetailTabContext';

import ContentInfoTab from '../ContentInfoTab';
import RelatedTab from './RelatedContentSection';

interface ContentDetailTabsProps {
  data: MovieDetailResponse;
  mediaType: 'movie' | 'tv';
}

const ContentDetailTabs = ({ data, mediaType }: ContentDetailTabsProps) => {
  const { activeTab, setActiveTab } = useTab();

  return (
    <>
      <div className='detail-tabs'>
        {[CONTENT_TAB_TYPE.INFO, CONTENT_TAB_TYPE.RELATED].map((t) => (
          <button
            key={t}
            className={`detail-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {data.id && (
        <div className='tab-content'>
          <Activity mode={activeTab === CONTENT_TAB_TYPE.INFO ? 'visible' : 'hidden'}>
            <ContentInfoTab credits={data.credits ?? []} />
          </Activity>
          <Activity mode={activeTab === CONTENT_TAB_TYPE.RELATED ? 'visible' : 'hidden'}>
            <Suspense fallback={<ListSkeleton />}>
              <WidgetErrorBoundary>
                <RelatedTab movieId={data.id} type={mediaType} />
              </WidgetErrorBoundary>
            </Suspense>
          </Activity>
        </div>
      )}
    </>
  );
};

export default ContentDetailTabs;
