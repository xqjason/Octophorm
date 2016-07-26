import React from 'react';

class BottomMenu extends React.Component {
    render() {
        return (
            <div>
            	<nav className="bar bar-tab">
				  <a className="tab-item active" href="#/">
				    <span className="icon icon-home"></span>
				    <span className="tab-label">Home</span>
				  </a>
				  <a className="tab-item" href="#/hello">
				    <span className="icon icon-person"></span>
				    <span className="tab-label">Profile</span>
				  </a>
				  <a className="tab-item" href="#">
				    <span className="icon icon-star-filled"></span>
				    <span className="tab-label">Favorites</span>
				  </a>
				  <a className="tab-item" href="#">
				    <span className="icon icon-search"></span>
				    <span className="tab-label">Search</span>
				  </a>
				  <a className="tab-item" href="#">
				    <span className="icon icon-gear"></span>
				    <span className="tab-label">Settings</span>
				  </a>
				</nav>
            </div>
        );
    }
};

export default BottomMenu;