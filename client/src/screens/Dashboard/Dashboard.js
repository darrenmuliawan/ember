import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import "../../css/container.scss";
import "../../css/fonts.scss";
import { getPortfolio } from '../../redux/Portfolio/portfolioAction';
import ethereum from '../../img/ethereum.svg';
import bitcoin from '../../img/bitcoin.svg';
import cardano from '../../img/cardano.svg';

const DashboardPage = (props) => {
	const {
		// REDUCER STATE
		loadingPortfolio,
		portfolio,

		// DISPATCH ACTION
		getPortfolio
	} = props;

	useEffect(() => {
		getPortfolio();
	}, []);

	const _getUnit = (ticker) => {
		const crypto_tickers = ["BTC", "ETH", "ADA"];

		if (crypto_tickers.includes(ticker)) {
			return ticker;
		}

		return "";
	}

	const _getIcon = (ticker) => {
		if (ticker === "BTC") {
			return <img src={bitcoin} className="crypto-icon"/>;
		} else if (ticker === 'ETH') {
			return <img src={ethereum} className="crypto-icon"/>;
		} else if (ticker === 'ADA') {
			return <img src={cardano} className="crypto-icon"/>;
		}
		return null;
	}

    return (
        <div className="container center-h">
            <Header />
            <div className="inner-container inner-container-header">
                <div className="section">
                    <div className="side-by-side-container">
                        <div className="">
                            <p>Portfolio</p>
                        </div>
                        <div className="right">

                        </div>
                    </div>
                    <div className="side-by-side-container border">
                        <div className="section">
                            <p>${portfolio.networth}</p>
                        </div>
                        <div className="section">

                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="side-by-side-container">
                        <div className="">
                            <p>Assets</p>
                        </div>
                        <div className="right">
                            <p></p>
                        </div>
                    </div>
                    <div className="border">
						<div>
							<div className="section space-between">
								<div>
									<p className="large-text">Name</p>
								</div>
								<div>
									<p className="large-text">Balance</p>
								</div>
								<div>
									<p className="large-text">Price</p>
								</div>
							</div>
							<div className="right">
								<p></p>
							</div>
							<div className="separator"/>
						</div>
						{
							portfolio.holdings.map((asset, index) => 
							<div key={`asset-${index}`}>
								<div className="section space-between">
									<div className="horizontal">
										{_getIcon(asset.ticker)}
										<p className="large-text" style={{marginRight: '10px'}}>{asset.name}</p>
										<p className="medium-text secondary-text">{asset.ticker}</p>
									</div>
									<div className="horizontal">
										<p className="large-text" style={{marginRight: '10px'}}>{asset.total} {_getUnit(asset.ticker)}</p>
										<p className="medium-text secondary-text">≈ ${asset.value}</p>
									</div>
									<div>
										<p className="large-text">${asset.price}</p>
									</div>
								</div>
								<div className="right">
									<p></p>
								</div>
								{
									index !== portfolio.holdings.length - 1 &&
									<div style={{ paddingRight: '20px', paddingLeft: '20px' }}>
										<div className="separator"/>
									</div>
								}
							</div>
							)
						}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {...state.portfolio}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPortfolio: () => {
			dispatch(getPortfolio())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (DashboardPage);