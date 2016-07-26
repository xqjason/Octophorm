import React from 'react';

class Header extends React.Component {
    render() {

    	console.log(this.props.text);

        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
};

export default Header;