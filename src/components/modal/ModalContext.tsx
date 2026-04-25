import { createContext, useContext, useState } from 'react';
import Modal from './Modal';

type ModalState = {
  isOpen: boolean;
  title: string;
  desc: string;
  onOk?: (() => void) | null;
};

type ModalContextType = {
  openModal: (init: ModalState) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const INIT_STATE: ModalState = {
  isOpen: false,
  title: '',
  desc: '',
  onOk: null,
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ModalState>({ ...INIT_STATE });

  const openModal = (init: ModalState) => {
    setState({ ...init });
  };

  const closeModal = () => {
    setState({ ...INIT_STATE });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        isOpen={state.isOpen}
        onClose={closeModal}
        title={state.title}
        desc={state.desc}
        onOk={state.onOk ?? closeModal}></Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalProvider와 함께 사용해주세요');
  }

  return context;
};
