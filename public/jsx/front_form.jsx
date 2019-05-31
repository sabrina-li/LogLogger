console.log("Beginning of React File");
// eslint-disable-next-line no-unused-vars
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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
        if (event.target.name==="username"){
            this.setState({
                username: event.target.username
            });
        } else if (event.target.name==="password"){
            this.setState({
                password: event.target.password
            });
        }
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        // event.preventDefault();
        // const history = createBrowserHistory();

        // // Get the current location.
        // const location = history.location;

        // // Listen for changes to the current location.
        // const unlisten = history.listen((location, action) => {
        //     // location is an object like window.location
        //     console.log(action, location.pathname, location.state);
        // });
        // this.props.history.push("/signup");
    }



    render() {
        // if (this.state.username && this.state.password) {
        //     return <Redirect to='/signup' />;
        // }
        return (
            <form className="col s12" method="POST" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            name="username"
                            id="username"
                            type="text"
                            className="validate"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                            aria-required="true" />
                        <label htmlFor="username">
                            username
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            name="password"
                            id="password"
                            type="password"
                            className="validate"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                            aria-required="true" />
                        <label htmlFor="password">
                            Password
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <button id="loginBtn" className="waves-effect waves-light btn" type="submit" formAction="/login">
                            Login
                        </button>
                        <button id="signupBtn" className="waves-effect waves-light btn" type="submit" formAction="/signup">
                            SignUp
                        </button>
                    </div>
                    <div className="error"></div>
                </div>
            </form>
        );
    }
}

//Promise.resolve().finally();


ReactDOM.render(<LoginForm />, document.getElementById("front-form"));