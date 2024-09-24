import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children, ...props }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-4 rounded-lg relative max-w-lg w-full"
        {...props}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
