//types
export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";

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

//actions
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
