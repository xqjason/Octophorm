import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
    	this.handleChange = this.handleChange.bind(this);
	};
    handleChange() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    };
    render() {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" ref="searchKey" onChange={this.handleChange} value={this.props.searchKey}/>
            </div>
        );
    }
};

export default SearchBar;