import useModalStore from '@/zustand/useModalStore';
import propTypes from 'prop-types';

// 모달 컴포넌트
function ModalComponent({ children }) {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) {
    return null;
  }

  const handleOutsideClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed flex top-0 left-0 bottom-0 right-0 bg-[rgba(0,134,255,0.5)] items-center justify-center z-50">
      <div onClick={handleContentClick} className="relative bg-white p-8 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
}

ModalComponent.propTypes = {
  children: propTypes.node,
};

export default ModalComponent;
