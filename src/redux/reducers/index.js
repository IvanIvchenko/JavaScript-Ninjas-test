import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer.js"

const reducers = combineReducers({
  books: booksReducer
});

export default reducers;