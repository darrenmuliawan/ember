import React from 'react';
import './Header.scss';

const Header = (props) => {
	return (
		<div className="header">
			<div className="section">
				<p className="text-button text-button--selected">Dashboard</p>
			</div>
			<div className="section">
				<p className="text-button">History</p>
			</div>
		</div>
	)
}

export default Header;