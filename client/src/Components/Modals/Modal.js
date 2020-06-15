import React, { useEffect } from "react";
import { createPortal } from "react-dom";

function Portal({ children }) {
  const modalRoot = document.getElementById("modal-root");
  const element = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(element);

    return function cleanup() {
      modalRoot.removeChild(element);
    };
  }, [modalRoot, element]);

  return createPortal(children, element);
}

function Modal({ children, toggle, open }) {
  return (
    <Portal>
      {open && (
        <div className="ModalWrapper" onClick={toggle}>
          <div
            className="ModalBody"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="CloseButton" onClick={toggle}>
              &times;
            </div>
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
}

export default Modal;
