import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div>
      <div className="Overlay"></div>
      <div className="modalContainer">
        <div className="modal-closeIcon" onClick={onClose}>
          <AiOutlineCloseCircle />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
