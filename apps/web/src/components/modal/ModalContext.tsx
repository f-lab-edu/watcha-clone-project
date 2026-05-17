import { overlay } from 'overlay-kit';
import { createContext, use } from 'react';

import type { ReactNode } from 'react';

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

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const openModal = (init: ModalState) => {
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
  };

  return <ModalContext value={{ openModal }}>{children}</ModalContext>;
};

export const useModal = () => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error('ModalProvider와 함께 사용해주세요');
  }

  return context;
};
