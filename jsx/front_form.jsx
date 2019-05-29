console.log("Beginning of React File");
// eslint-disable-next-line no-unused-vars
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
            [name]: value
            // userName: event.target.userName,
            // password: event.target.password
        });
    }

    render() {
        return (
            <form class="col s12" method="POST">
                <div class="row">
                    <div class="input-field col s12">
                        <input
                            name="userName"
                            id="username"
                            type="text"
                            className="validate"
                            value={this.state.userName}
                            onChange={this.handleInputChange}
                            required
                            aria-required="true" />
                        <label htmlFor="username">
                            Username
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
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
                <div class="row">
                    <div class="input-field col s12">
                        <button id="loginBtn" class="waves-effect waves-light btn" type="submit" formaction="/login">
                            Login
                        </button>
                        <button id="signupBtn" class="waves-effect waves-light btn" type="submit" formaction="/signup">
                            SignUp
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

//Promise.resolve().finally();


ReactDOM.render(<LoginForm />, document.getElementById("front-form"));