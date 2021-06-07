import { combineReducers } from "redux";
import { portfolioReducer } from "./Portfolio/portfolioReducer";

export const rootReducer = combineReducers({
  portfolio: portfolioReducer
})