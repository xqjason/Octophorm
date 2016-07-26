import React from 'react'

class LoginPanel extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }
  handleLoginSubmit(data) {
    $.ajax({
      url: "http://jsx-dev-react.herokuapp.com/session/login",
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        /*this.setState({data: data, text: "True"});*/
        console.log("success");
        const path = '/hello';
        this.context.router.push(path);

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        const path = '/world';
        this.context.router.push(path);
      }.bind(this)
    });
  }
  render() {

    console.log("Render LoginPanel Start");
    console.log(this.state);

    return(
      <div>
        <LoginForm onLoginSubmit={this.handleLoginSubmit} />
      </div>
    );
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
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
    this.refs.email.value = '';
    this.refs.password.value = '';
  }
  render() {

    console.log("Render LoginForm Start");

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" placeholder="Your username" ref="email"/>
        <input type="password" placeholder="Your password" ref="password"/>
        <input className="btn btn-positive btn-block" type="submit" value="Login"/>
      </form>
    )
  }
};

export default LoginPanel;