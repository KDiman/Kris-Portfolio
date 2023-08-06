import React from "react";
import Items from "./items";
import { useContext, useState } from "react";
import { ItemsContext, ItemsProvider } from "./itemProvider";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Itempage from "../pages/Itempage";

const Modal = ({ open, onClose, props }) => {
  if (!open) return null;

  return (
    <div>
      <div className="Overlay"></div>
      <div className="modalContainer">
        <div className="modal-closeIcon" onClick={onClose}>
          <AiOutlineCloseCircle />
        </div>
        <iframe
          className="frame"
          src="https://www.jtexpress.ph/index/query/gzquery.html"
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;
