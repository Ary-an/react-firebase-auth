import { FC } from "react";

interface ImageModalProps {
  onClose: () => void;
  url: string;
}

const ImageModal: FC<ImageModalProps> = ({ onClose, url }) => {
  const modal = (
    <div className="modal">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content modal-content--image">
        <img src={url} alt="" />
      </div>
      <button className="modal-close id-large" onClick={onClose}></button>
    </div>
  );

  return modal;
};

export default ImageModal;
