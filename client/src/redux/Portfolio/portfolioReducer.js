import { PORTFOLIO_ACTION } from "./portfolioAction"

const initial_portfolio = {
  holdings: [],
  timestamp: 0,
  networth: 0,
  stocks_portfolio: 0,
  cryptocurrencies: 0,
  etf: 0
}

const initialState = {
  // GET PORTFOLIO
  loadingPortfolio: false,
  portfolio: initial_portfolio
}

export const portfolioReducer = (state = initialState, action = { type: "", payload: null }) => {
  switch (action.type) {
    // GET PORTFOLIO
    case PORTFOLIO_ACTION.GET_PORTFOLIO:
      return {...state, loadingPortfolio: true}
    case PORTFOLIO_ACTION.SUCCESS_GET_PORTFOLIO:
      return {...state, loadingPortfolio: false, portfolio: action.payload}
    case PORTFOLIO_ACTION.ERROR_GET_PORTFOLIO:
      return {...state, loadingPortfolio: false, portfolio: initial_portfolio}

    default:
      return {...state}
  }
}