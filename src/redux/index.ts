import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { galleryReducer } from "./reducers/galleryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  galley: galleryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
