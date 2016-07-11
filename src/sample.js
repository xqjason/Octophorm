var ReactDOM = require('react-dom');
var React = require('react');
var SmartForm = require('../lib/SmartForm/SmartForm');
var SmartInput = require('../lib/SmartForm/SmartInput');


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

/*
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
*/

var SmartFormPage = React.createClass({
  handleOnClick: function(data){
    console.log(data);
  },
  render: function(){
    /* return <SmartForm data = {this.props.data} onClick = {this.handleOnClick}/>*/
    var Records = this.props.data.map(function (record){
            return <SmartInput key = {record._id} recorditem = {record}/>
        });
        return (
            <ul className="table-view">
                {Records}
            </ul>
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
                    <SmartFormPage data={this.state.data} />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
  <HomePage url="http://octo-dev.herokuapp.com/form/56e595003e2891110071c64b/FormFields" pollInterval={2000} />,
  document.getElementById('app')
);