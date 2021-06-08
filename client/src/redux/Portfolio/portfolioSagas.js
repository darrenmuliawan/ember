import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { PORTFOLIO_ACTION } from './portfolioAction';

export function* portfolioSagas() {
  yield takeLatest(PORTFOLIO_ACTION.GET_PORTFOLIO, _getPortfolio);
}

function* _getPortfolio() {
  try {
    console.log('Getting portfolio value...');
    let res = yield call(axios.get, "http://10.0.0.72:9000/portfolio");

    if (res) {
      console.log(res);
      yield put({ type: PORTFOLIO_ACTION.SUCCESS_GET_PORTFOLIO, payload: res.data })
    }
  } catch (e) {
    console.log(e);
    console.log(e.response);
    yield put({ type: PORTFOLIO_ACTION.ERROR_GET_PORTFOLIO })
  }
}