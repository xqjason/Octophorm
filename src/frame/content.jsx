import React from 'react';

class ContentPanel extends React.Component {
    render() {
        return (
        	<div className={"content" + (this.props.hidden==="true"?" hidden":"")}>
        		{this.props.children}
        	</div>
        );
    }
};

export default ContentPanel;