import { combineReducers } from "redux";
import { superheroesReducer } from "./superheroesReducer.js"

const reducers = combineReducers({
  superheroes: superheroesReducer
});

export default reducers;