import { FC, MouseEvent } from "react";

interface CardProps {
  onDelete: (image?: any, e?: MouseEvent) => void;
  onImageClick: () => void;
  imageUrl: string;
  publicCard?: boolean;
  uploader?: string;
}

const Card: FC<CardProps> = ({
  imageUrl,
  onDelete,
  onImageClick,
  publicCard,
  uploader,
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div
          className="content"
          style={{ backgroundImage: `url(${imageUrl})` }}
          onClick={onImageClick}
        ></div>
      </div>
      <footer className="card-footer">
        {publicCard && <p className="px-5 py-5">Uploaded By: {uploader}</p>}
        {!publicCard && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a href="#" className="card-footer-item" onClick={onDelete}>
            Delete
          </a>
        )}
      </footer>
    </div>
  );
};

export default Card;
