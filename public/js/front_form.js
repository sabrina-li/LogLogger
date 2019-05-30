console.log("Beginning of React File"); // eslint-disable-next-line no-unused-vars

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    // console.log(event);
    // const target = event.target;
    // const value = target.type === "text";
    // const name = target.value;
    if (event.target.name === "userName") {
      this.setState({
        userName: event.target.userName
      });
    } else if (event.target.name === "password") {
      this.setState({
        password: event.target.password
      });
    }
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault(); // const history = createBrowserHistory();
    // // Get the current location.
    // const location = history.location;
    // // Listen for changes to the current location.
    // const unlisten = history.listen((location, action) => {
    //     // location is an object like window.location
    //     console.log(action, location.pathname, location.state);
    // });

    this.props.history.push("/signup");
  }

  render() {
    // if (this.state.userName && this.state.password) {
    //     return <Redirect to='/signup' />;
    // }
    return React.createElement("form", {
      className: "col s12",
      method: "POST",
      onSubmit: this.handleSubmit
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
      className: "row"
    }, React.createElement("div", {
      className: "input-field col s12"
    }, React.createElement("button", {
      id: "loginBtn",
      className: "waves-effect waves-light btn",
      type: "submit",
      formAction: "/login"
    }, "Login"), React.createElement("button", {
      id: "signupBtn",
      className: "waves-effect waves-light btn",
      type: "submit",
      formAction: "/signup"
    }, "SignUp"))));
  }

} //Promise.resolve().finally();


ReactDOM.render(React.createElement(LoginForm, null), document.getElementById("front-form"));