//types for auth
export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";

//types for image gallery
export const GET_IMAGES = "GET_IMAGES";
export const ADD_IMAGE = "ADD_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";

//user object type
export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt?: any;
}

// auth state types
export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

//sign up types
export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

//sign in types
export interface SignInData {
  email: string;
  password: string;
}

//actions for auth
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetSignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SetSignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction;

// actions for gallery

export interface GalleryImage {
  id?: string;
  imageUrl: string;
  filePath: string;
  fileName: string;
  createdAt: number;
  uploaderName: string;
  uploaderId: string;
}

export interface GalleryState {
  images: GalleryImage[];
  imagesLoaded: boolean;
}

interface AddImageAction {
  type: typeof ADD_IMAGE;
  payload: GalleryImage;
}

interface GetImagesAction {
  type: typeof GET_IMAGES;
  payload: GalleryImage[];
}

interface DeleteImageAction {
  type: typeof DELETE_IMAGE;
  payload: GalleryImage;
}

export type GalleryAction =
  | AddImageAction
  | GetImagesAction
  | DeleteImageAction;
