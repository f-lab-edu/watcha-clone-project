import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  title: string;
  desc?: string;
  onOk?: () => void;
  onClose: () => void;
  onExit?: () => void;
};

const Modal = ({ isOpen, title, desc, onOk, onClose, onExit }: ModalProps) => {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      onExit?.();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, onExit]);

  useEffect(() => {
    if (!document) {
      return;
    }

    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-box' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>
          ✕
        </button>
        <div className='modal-title'>{title}</div>
        {desc && <div className='modal-desc'>{desc}</div>}
        <button type='button' className='modal-confirm-btn' onClick={onOk ?? onClose}>
          확인
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
