import React from 'react';
import Header from './frame/header.jsx';

class LoginPanel extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  handleLoginSubmit(data) {
    $.ajax({
      url: "/session/login",
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        document.cookie = "token=" + data.token + "; username=" + data.username;
        const path = '/';
        this.context.router.push(path);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        /*const path = '/world';
        this.context.router.push(path);*/
        this.setState({text:"Your username or password not correct. Please try again"});
      }.bind(this)
    });
  }
  render() {

    console.log("Render LoginPanel Start");

    return(
      <div>
        <Header text="Please Login first"/>        
        <LoginForm onLoginSubmit={this.handleLoginSubmit} text={this.state.text} />        
      </div>
    );
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {

    console.log("Enter handleSubmit");

    e.preventDefault();
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    if (!email || !password) {
      this.setState({text:"please input both username and password!"});
      return;
    }
    this.props.onLoginSubmit({email:email,password:password});
  }
  render() {

    console.log("Render LoginForm Start");
    

    var warning = (this.props.text == ""? this.state.text: this.props.text);    

    return (
        <form onSubmit={this.handleSubmit} className="content">
          <input type="email" placeholder="Your username" ref="email"/>
          <input type="password" placeholder="Your password" ref="password"/>
          <input className="btn btn-positive btn-block" type="submit" value="Login"/>
          <font color="red">{warning}</font>
        </form>
    )
  }
};

export default LoginPanel;