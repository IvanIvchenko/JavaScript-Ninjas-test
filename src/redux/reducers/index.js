import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer.js"

const reducers = combineReducers({
  library: booksReducer
});

export default reducers;