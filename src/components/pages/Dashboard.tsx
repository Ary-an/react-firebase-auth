import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSuccess } from "../../redux/actions/authAction";
import { RootState } from "../../redux/index";
import { User, GalleryImage } from "../../redux/types";
import { deleteImage, getImages } from "../../redux/actions/galleryAction";

import Message from "../Ui/Message";
import Button from "../Ui/Button";
import UploadImageModal from "../Ui/UploadImageModal";
import ImageModal from "../Ui/ImageModal";
import Card from "../Ui/Card";
import Alert from "../Ui/Alert";

const Dashboard: FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [showUploadImagesModal, setShowUploadImagesModal] = useState(false);
  const [showDeleteImageAlert, setShowDeleteImageAlert] = useState(false);
  const [selectedImages, setSelectedImages] = useState<GalleryImage | null>();
  const [deleting, setDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [userImages, setUserImages] = useState<GalleryImage[]>([]);

  const { user, success, needVerification } = useSelector(
    (state: RootState) => state.auth
  );
  const { images, imagesLoaded } = useSelector(
    (state: RootState) => state.galley
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!imagesLoaded) {
      dispatch(getImages());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(imagesLoaded);

  useEffect(() => {
    if (images.length > 0) {
      const filteredImg = images.filter(
        (i) => i.uploaderId === currentUser?.id
      );
      setUserImages(filteredImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const handleDelete = (image: GalleryImage, e: MouseEvent) => {
    e.preventDefault();
    setShowDeleteImageAlert(true);
    setSelectedImages(image);
  };

  const handleImageDelete = () => {
    if (selectedImages) {
      setDeleting(true);
      dispatch(
        deleteImage(selectedImages, () => {
          setDeleting(false);
          setShowDeleteImageAlert(false);
        })
      );
    }
  };

  const imagesOfUser =
    userImages.length === 0 ? (
      <Message type="info" msg="No images, please upload some images" />
    ) : (
      <div className="cards-wrapper is-flex">
        {userImages.map((image: GalleryImage) => (
          <Card
            key={image.id}
            imageUrl={image.imageUrl}
            onDelete={(e: MouseEvent) => handleDelete(image, e)}
            onImageClick={() => setImageUrl(image.imageUrl)}
          />
        ))}
      </div>
    );

  return (
    <section className="section">
      <div className="container">
        {needVerification && (
          <Message type="success" msg="Please verify your email address" />
        )}
        <h1 className="is-size-1">Welcome {currentUser?.firstName} </h1>

        <Button
          text="Upload images"
          className="mb-5"
          onClick={() => setShowUploadImagesModal(true)}
        />

        {imagesLoaded ? (
          imagesOfUser
        ) : (
          <h2 className="is-size-3">Loading images...</h2>
        )}

        {showUploadImagesModal && (
          <UploadImageModal onClose={() => setShowUploadImagesModal(false)} />
        )}

        {showDeleteImageAlert && (
          <Alert
            title="Are you sure want to delete this image"
            onClose={() => setShowDeleteImageAlert(false)}
            onSubmit={handleImageDelete}
            deleting={deleting}
          />
        )}

        {imageUrl && (
          <ImageModal url={imageUrl} onClose={() => setImageUrl("")} />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
