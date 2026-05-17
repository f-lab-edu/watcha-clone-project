import { createContext, Dispatch, ReactNode, SetStateAction, use, useState } from 'react';

export const CONTENT_TAB_TYPE = {
  INFO: '콘텐츠 정보',
  RELATED: '관련 콘텐츠',
} as const;

export type ContentTabKey = keyof typeof CONTENT_TAB_TYPE;
export type ContentTabValue = (typeof CONTENT_TAB_TYPE)[keyof typeof CONTENT_TAB_TYPE];

export interface TabContextType {
  activeTab: ContentTabValue;
  setActiveTab: Dispatch<SetStateAction<ContentTabValue>>;
}

const ContentDetailTabContext = createContext<TabContextType | null>(null);

interface ContentDetailTabProviderProps {
  children: ReactNode;
  initialTab?: ContentTabValue;
}

export function ContentDetailTabProvider({
  children,
  initialTab = CONTENT_TAB_TYPE.INFO,
}: ContentDetailTabProviderProps) {
  const [activeTab, setActiveTab] = useState<ContentTabValue>(initialTab);

  return (
    <ContentDetailTabContext value={{ activeTab, setActiveTab }}>
      {children}
    </ContentDetailTabContext>
  );
}

export function useTab() {
  const context = use(ContentDetailTabContext);

  if (!context) {
    throw new Error('useTab must be used within ContentDetailTabContext');
  }

  return context;
}
