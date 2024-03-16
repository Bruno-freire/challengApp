import React from 'react';

interface ModalProps {
  onClose: () => void;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, content }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={handleClose}>
      <div className="bg-white p-8 rounded-lg w-1/2" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-700" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;
