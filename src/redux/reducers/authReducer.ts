import {
  AuthAction,
  AuthState,
  SET_ERROR,
  SET_SUCCESS,
  NEED_VERIFICATION,
  SET_LOADING,
  SET_USER,
  SIGN_OUT,
} from "../types";

const initialState: AuthState = {
  user: null,
  authenticated: false,
  error: "",
  loading: false,
  needVerification: false,
  success: "",
};

export const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SIGN_OUT:
      return {
        user: null,
        authenticated: false,
        loading: false,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case NEED_VERIFICATION:
      return {
        ...state,
        needVerification: true,
      };

    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    default:
      return state;
  }
};
