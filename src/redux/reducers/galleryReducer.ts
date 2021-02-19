import {
  ADD_IMAGE,
  DELETE_IMAGE,
  GalleryAction,
  GalleryState,
  GET_IMAGES,
} from "../types";

const initialState: GalleryState = {
  images: [],
  imagesLoaded: false,
};

export const galleryReducer = (state = initialState, action: GalleryAction) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        imagesLoaded: true,
      };

    case ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images],
      };

    case DELETE_IMAGE:
      const filteredImages = state.images.filter(
        (image) => image.id !== action.payload.id
      );
      return {
        ...state,
        images: filteredImages,
      };

    default:
      return state;
  }
};
