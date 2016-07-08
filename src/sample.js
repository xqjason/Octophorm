var ReactDOM = require('react-dom');
var React = require('react');
var SmartForm = require('../lib/SmartForm/SmartForm')

var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});


var RecordList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function () {
        var Records = this.props.data.map(function (record){
            return <RecordItem key={record._id} recorditem = {record} />
        });
        return (
            <ul className="table-view">
                {Records}
            </ul>
        );
    }
});

var RecordItem = React.createClass({
    handleOnClick: function(data){
      console.log(data);
    },
    render: function () {
        return (
            <li className="table-view-cell media">
                  <SmartForm 
                    data={this.props.recorditem} 
                    onClick={this.handleOnClick}
                  />
            </li>
        );
    }
});

var HomePage = React.createClass({
    loadConversationsFromServer: function() {
    return $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
      });
    },
    getInitialState: function() {
        return {
            data: []
            };
    },
    componentDidMount: function() {
        this.loadConversationsFromServer();
        this.setInterval(this.loadConversationsFromServer, this.props.pollInterval);
    },
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    },
    render: function () {
        return (
            <div>
                <Header text="Example Form" back="false"/>
                <div className="content">
                    <RecordList data={this.state.data} />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
  <HomePage url="./json/leadForm.json" pollInterval={20000} />,
  document.getElementById('app')
);