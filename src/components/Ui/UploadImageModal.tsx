import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../redux/actions/galleryAction";
import Button from "./Button";
import FileUploader from "./FileUploader";
import Modal from "./Modal";
import { RootState } from "../../redux/index";
import { FC, FormEvent, useState } from "react";

interface UploadImageModalProps {
  onClose: () => void;
}

interface Image {
  name: string;
  progress: number;
}

const UploadImageModal: FC<UploadImageModalProps> = ({ onClose }) => {
  const [files, setFiles] = useState<FileList | null>();
  const [filesArray, setFilesArray] = useState<Image[]>([]);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { user } = useSelector<RootState, RootState["auth"]>(
    (state) => state.auth
  );

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setDisabled(false);
      let images: Image[] = [];
      Array.from(e.currentTarget.files).forEach((file) =>
        images.push({ name: file.name, progress: 0 })
      );
      setFilesArray(images);
    } else {
      setFilesArray([]);
      setDisabled(true);
    }

    setFiles(e.currentTarget.files);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files && files.length > 0 && user) {
      dispatch(
        addImage(files, user, (process, file) => {
          const copyOfFilesArray = [...filesArray];

          const findFile = copyOfFilesArray.find((f) => f.name === file.name);

          if (findFile) {
            findFile.progress = Math.floor(process);
          }
          const updatedArray = copyOfFilesArray.map((f) =>
            f.name === file.name ? (findFile ? findFile : f) : f
          );

          setFilesArray(updatedArray);
        })
      );

      setFiles(null);
      setDisabled(false);
    }
  };
  return (
    <Modal onClose={onClose} title="Upload images">
      <form onSubmit={handleSubmit}>
        <FileUploader onChange={handleChange} />
        {filesArray.length > 0 && (
          <ul className="mt-3 mb-3">
            {filesArray.map((file: Image, index) => (
              <li className="mb-2" key={index}>
                <p className="is-size-7 mb-1">
                  {file.name}
                  {file.progress === 100 && (
                    <span className="ml-1 has-text-success hast-text-weight-bold ">
                      UPLOADED
                    </span>
                  )}
                </p>

                <progress
                  className="progress is-primary is-small"
                  value={file.progress}
                  max="100"
                >
                  {file.progress}%
                </progress>
              </li>
            ))}
          </ul>
        )}

        <Button text="Upload" disabled={disabled} className="is-primary mt-2" />
      </form>
    </Modal>
  );
};

export default UploadImageModal;
