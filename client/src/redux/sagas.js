import { all } from "@redux-saga/core/effects";
import { fork } from "redux-saga/effects";
import { portfolioSagas } from "./Portfolio/portfolioSagas";

export function* rootSaga() {
  yield all([
    fork(portfolioSagas)
  ])
}