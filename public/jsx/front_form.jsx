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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        // console.log(event);
        // const target = event.target;
        // const value = target.type === "text";
        // const name = target.value;
        if (event.target.name==="userName"){
            this.setState({
                userName: event.target.userName
            });
        } else if (event.target.name==="password"){
            this.setState({
                password: event.target.password
            });
        }
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        this.props.history.push("/signup");
    }



    render() {
        // if (this.state.userName && this.state.password) {
        //     return <Redirect to='/signup' />;
        // }
        return (
            <form className="col s12" method="POST" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
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
                </div>
            </form>
        );
    }
}

//Promise.resolve().finally();


ReactDOM.render(<LoginForm />, document.getElementById("front-form"));