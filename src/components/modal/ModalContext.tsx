import { overlay } from 'overlay-kit';
import { createContext, useCallback, useContext, useMemo } from 'react';
import Modal from './Modal';

export type ModalState = {
  title: string;
  desc: string;
  onOk?: (() => void) | null;
};

type ModalContextType = {
  openModal: (init: ModalState) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const openModal = useCallback((init: ModalState) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        title={init.title}
        desc={init.desc}
        onOk={init.onOk ?? close}
      />
    ));
  }, []);

  const value = useMemo(() => ({ openModal }), [openModal]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalProvider와 함께 사용해주세요');
  }

  return context;
};
