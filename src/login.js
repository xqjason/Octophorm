var ReactDOM = require('react-dom');
var React = require('react');
var $ = require('jquery');


var ProductBox = React.createClass({
  
  getInitialState: function () {
    return {text: '',data :1};
  },
  handleLoginSubmit: function (data) {
    $.post('http://dev.herokuapp.com/session/login',data,function(data){
      this.setState({text:"Login success!" });
    }.bind(this)).error(function (data) {
      console.log(data);
      this.setState({text:"Password or username are incorrect!" });
    }.bind(this));
  },    
  render: function () {
    return(
      <div className="container">
        <LoginForm data={this.state.data} onLoginSubmit={this.handleLoginSubmit} />
        <p className="tips">{this.state.text}</p>
      </div>
    );
  }
  
});

var LoginForm = React.createClass({
  getInitialState: function () {
    return {data:0,tittle: 'Login Test',text:''};
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    if (!email || !password) {
      this.setState({text:"please input both username and password!"});
      return;
    }
    this.props.onLoginSubmit({email:email,password:password});
    this.setState({text:""});
    this.refs.email.value = '';
    this.refs.password.value = '';
  },
  handleLogin: function (e) {
    e.preventDefault();
    this.setState({data: 0,tittle:'Login Test'});
    $(".tips").text("");
  },
  render: function () {
      return (
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <p>{this.state.tittle}</p>
          <input type="email" placeholder="Your username" ref="email"/>
          <input type="password" placeholder="Your password" ref="password"/>
          <input type="submit" value="Login"/>
          <p className="tips">{this.state.text}</p>
        </form>
      )
  }
});

ReactDOM.render(
  <ProductBox />,
  document.getElementById('app')
);