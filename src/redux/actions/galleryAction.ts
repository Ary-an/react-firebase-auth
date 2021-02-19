import { ThunkAction } from "redux-thunk";

import {
  GET_IMAGES,
  ADD_IMAGE,
  DELETE_IMAGE,
  GalleryAction,
  GalleryImage,
  User,
} from "../types";
import { RootState } from "../index";
import firebase from "../../firebase/config";

//add or upload image action
export const addImage = (
  files: FileList,
  user: User,
  onProgress: (num: number, file: File) => void
): ThunkAction<void, RootState, null, GalleryAction> => {
  return async (dispatch) => {
    Array.from(files).forEach(async (file: File) => {
      const filePath = `/images/${user.id}/${new Date().getTime()}-${
        file.name
      }`;

      const storageRef = firebase.storage().ref(filePath);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          onProgress(progress, file);
        },
        (error) => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(async (downloadUrl) => {
              try {
                const data: GalleryImage = {
                  imageUrl: downloadUrl,
                  fileName: file.name,
                  filePath,
                  uploaderName: user.firstName,
                  uploaderId: user.id,
                  createdAt: new Date().getTime(),
                };

                const ref = await firebase
                  .firestore()
                  .collection("gallery")
                  .add(data);
                data.id = ref.id;

                dispatch({
                  type: ADD_IMAGE,
                  payload: data,
                });
              } catch (err) {
                console.error(err);
              }
            })
            .catch((err) => console.error(err));
        }
      );
    });
  };
};

//get images

export const getImages = (): ThunkAction<
  void,
  RootState,
  null,
  GalleryAction
> => {
  return async (dispatch) => {
    try {
      const docs = await firebase.firestore().collection("gallery").get();
      const array: GalleryImage[] = [];
      docs.forEach((doc) => {
        const {
          createdAt,
          fileName,
          filePath,
          imageUrl,
          uploaderName,
          uploaderId,
        } = doc.data();

        array.push({
          createdAt,
          fileName,
          filePath,
          imageUrl,
          uploaderName,
          uploaderId,
        });
      });

      dispatch({
        type: GET_IMAGES,
        payload: array,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

//delete images

export const deleteImage = (
  image: GalleryImage,
  onSuccess: () => void
): ThunkAction<void, RootState, null, GalleryAction> => {
  return async (dispatch) => {
    try {
      const imageRef = firebase.storage().ref().child(image.filePath);

      await imageRef.delete();
      await firebase.firestore().collection("gallery").doc(image.id).delete();

      dispatch({
        type: DELETE_IMAGE,
        payload: image,
      });

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };
};
