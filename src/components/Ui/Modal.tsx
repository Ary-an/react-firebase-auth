import { FC, ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}
const Modal: FC<ModalProps> = ({ onClose, title, children }) => {
  const modal = (
    <div className="modal">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>

        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
  return modal;
};

export default Modal;
