import { combineReducers } from "redux";

import todo from "./todoReducer";
import point from "./pointReducer";

export default combineReducers({
  todo,
  point,
});
