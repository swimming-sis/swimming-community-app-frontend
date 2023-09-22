import useModalStore from '@/zustand/useModalStore';
import propTypes from 'prop-types';
import { useLayoutEffect, useRef, useCallback } from 'react';

// 모달 컴포넌트
function ModalComponent({ children }) {
  const { isOpen, closeModal } = useModalStore();
  const dialogRef = useRef(null);

  const handleOutsideClick = useCallback((e) => {
    e.stopPropagation();
    closeModal();
  }, [closeModal]);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return; 

    const dialog = dialogRef.current;

    const handleKeyboardTrap = (e) => {
      const { target, key, shiftKey } = e;
      const focusableElements = dialog.querySelectorAll('[href], button, input, textarea');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (target === firstElement && key === 'Tab' && shiftKey) {
        e.preventDefault();
        lastElement.focus();
      } else if (target === lastElement && key === 'Tab' && !shiftKey) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    dialog.addEventListener('keydown', handleKeyboardTrap);

    function handleEscape(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    dialog.addEventListener('keydown', handleEscape);

    return () => {
      dialog.removeEventListener('keydown', handleKeyboardTrap);
      dialog.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed flex top-0 left-0 bottom-0 right-0 bg-[rgba(0,134,255,0.5)] items-center justify-center z-50">
      <div
        ref={dialogRef}
        onClick={handleContentClick}
        className="relative bg-white p-8 text-sm rounded-xl shadow-lg border-tertiary">
        {children}
      </div>
    </div>
  );
}

ModalComponent.propTypes = {
  children: propTypes.node,
};

export default ModalComponent;
