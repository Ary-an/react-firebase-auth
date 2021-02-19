import { FC, FormEvent, useRef } from "react";
import Button from "./Button";

interface FileUploaderProps {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

const FileUploader: FC<FileUploaderProps> = ({ onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const pickImageButtonClickHandle = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  return (
    <div className="file-upload">
      <input
        type="file"
        name="files"
        onChange={onChange}
        className="is-hidden"
        multiple
        ref={fileInput}
      />

      <Button
        text="Pick Images"
        onClick={pickImageButtonClickHandle}
        type="button"
        className="is-link"
      />
    </div>
  );
};

export default FileUploader;
