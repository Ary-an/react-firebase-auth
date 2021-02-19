import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/index";
import { GalleryImage } from "../../redux/types";
import { getImages } from "../../redux/actions/galleryAction";

import ImageModal from "../Ui/ImageModal";
import Card from "../Ui/Card";

const Homepage: FC = () => {
  const [imageUrl, setImageUrl] = useState("");
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

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-size-1 mb-6">Welcome</h1>
        <h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex ut
          reprehenderit sit eaque dicta in officia illum! Consequuntur delectus
          tempora dolor minus laudantium sit fuga dignissimos, quaerat obcaecati
          magnam ab?
        </h2>

        {images.length > 0 && (
          <div className="cards-wrapper is-flex">
            {images.map((image: GalleryImage) => (
              <Card
                key={image.id}
                imageUrl={image.imageUrl}
                onDelete={() => {}}
                onImageClick={() => setImageUrl(image.imageUrl)}
                publicCard
                uploader={image.uploaderName}
              />
            ))}
          </div>
        )}
      </div>

      {imageUrl && (
        <ImageModal url={imageUrl} onClose={() => setImageUrl("")} />
      )}
    </section>
  );
};

export default Homepage;
