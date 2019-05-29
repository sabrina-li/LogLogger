console.log("Beginning of React File"); // eslint-disable-next-line no-unused-vars

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "text";
    const name = target.value;
    this.setState({
      [name]: value // userName: event.target.userName,
      // password: event.target.password

    });
  }

  render() {
    return React.createElement("form", {
      className: "col s12",
      method: "POST"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "input-field col s12"
    }, React.createElement("input", {
      name: "userName",
      id: "username",
      type: "text",
      className: "validate",
      value: this.state.userName,
      onChange: this.handleInputChange,
      required: true,
      "aria-required": "true"
    }), React.createElement("label", {
      htmlFor: "username"
    }, "Username"))), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "input-field col s12"
    }, React.createElement("input", {
      name: "password",
      id: "password",
      type: "password",
      className: "validate",
      value: this.state.password,
      onChange: this.handleInputChange,
      required: true,
      "aria-required": "true"
    }), React.createElement("label", {
      htmlFor: "password"
    }, "Password"))), React.createElement("div", {
      class: "row"
    }, React.createElement("div", {
      class: "input-field col s12"
    }, React.createElement("button", {
      id: "loginBtn",
      className: "waves-effect waves-light btn",
      type: "submit",
      formaction: "/login"
    }, "Login"), React.createElement("button", {
      id: "signupBtn",
      className: "waves-effect waves-light btn",
      type: "submit",
      formaction: "/signup"
    }, "SignUp"))));
  }

} //Promise.resolve().finally();


ReactDOM.render(React.createElement(LoginForm, null), document.getElementById("front-form"));