class Release extends React.Component{
    // If a user has a station reserved then this is where they 
    // can release their reservation 

	if desired_computer.is_reserved{

		db.session.remove(desired_computer)

	}

	//create release button	
          
	render(){
		return(
	
	alert("Computer has been released")
		<button 
          	id="release-button"
                className="btn btn-primary"
                onClick={(event) => {
                	event.preventDefault();
                        this.releaseUser();
                    }}>
                        Release
                </button>
	)
	
	}

	}

class Reserve extends React.Component{
    // This is where the user will be able to reserve their station
	 constructor(props) {
                super(props);
                this.state = {
                        computers: [],
                        error: null,
                        pageLoaded: false
                }
        }

        reserveComp(computer) {
                fetch("/api/reserve/" + computer + "/", {
                        method: "PUT",
                })

                        .then(
                                result => result.text()
                        )
                        .then(
                                (result) => {
                                        if (result == "ok") {
                                                fetch("/api/statuses/", {
                                                        method: "GET",
                                                })
                                                        .then(
                                                                result => result.json()
                                                        )
                                                        .then(
                                                                (result) => {
                                                                        this.setState({
                                                                                computers: result
                                                                        })
                                                                },
                                                                (error) => {
                                                                        this.setState({
                                                                                error: error
                                                                        })
                                                                })
                                                this.props.loggedIn()

                                        }
                                        else {
                                                alert("This computer could not be reserved, sorry for the inconvenience.")
                                        }},
                                (error) => {
                                        alert("You have encountered a server or browser error, please try again.")
                                })}
	 render() {
                if (this.state.pageLoaded) {
                        return (
                                <>
                                <div>{computer} has been reserved.</div>
                                <div id="computer-table">
                                <ul>
                                {this.state.computers.map(computer => {
                                        <li>
                                                {computer}
                                                </li>
                                })}
                                </ul>
                                </div>
                                </>
                        )
                }
                else {
                        return(
                                <>
                                <h1>
                                Waiting for Content to Load
                                </h1>
                                <strong>
                                The page content has not loaded yet
                                </strong>
                                </>
                        )
                }

        }


}

class Register extends React.Component{
    // This is where the new users will be able to create a new account
    makeUser() {
        let newUserFormData = new FormData(document.querySelector("#new-user-form"))
        fetch("/api/register/", {
            method: "POST",
            body: newUserFormData
        })
        .then(
            result => result.text()
        )
        .then(
            (result) => {
                if (result == "ok"){
                    this.props.goToLogin();
                }
                else {
                    alert("Your 'Username' has already been taken, please choose a new 'Username' and try again.")
                }
            },
            (error) => {
                alert("You have encountered a server or browser error, please try again. ")
            }
        )
    }

    render() {
        return(
            <form id="new-user-form">
                <div
                    class="input-group-prepend">
                        <span 
                            className="input-group-text">
                                Username
                        </span>
                </div>
                <input 
                    type="text" 
                    className="form-control"
                    name="username"
                    />
                <div
                    class="input-group-prepend">
                        <span 
                            className="input-group-text">
                                Password
                        </span>
                </div>
                <input 
                    type="password" 
                    className="form-control"
                    name="password"
                    />
                <div
                    class="input-group-prepend">
                        <span 
                            className="input-group-text">
                                Email
                        </span>
                </div>
                <input 
                    type="email" 
                    className="form-control"
                    name="email"
                    />
                <br />
                <button 
                    id="new-user-button"
                    className="btn btn-primary mb-3"
                    onClick={(event) => {
                        event.preventDefault();
                        this.makeUser();
                    }}>
                        Make a New Profile
                </button>
            </form>
        )
    }
}

class Main extends React.Component{
    // This is the main landing page for logged in users, 
    // form here they can see the current state of all stations 

    constructor(props) {
        super(props);
        this.state = {
            computers: [],
            error: null,
            pageLoaded: false
        }
    }

    componentDidMount() {
        fetch("/api/statuses/", {
            method: "GET",
        })
        .then(
            result => result.json()
        )
        .then(
            (result) => {
                this.setState({
                    computers: result,
                    pageLoaded: true
                })
            },
            (error) => {
                this.setState({
                    error: error,
                    pageLoaded: true
                })
            }
        )
    }

    render() {
        if( this.state.pageLoaded){
            return(
                <div id="computer-table">
                    <ul>
                        {this.state.computers.map(computer => {
                            <li>
                                {computer}
                            </li>
                        })}
                    </ul>
                </div>
            )
        }
        else {
            return(
                <>
                    <h1>
                        Waiting for Content to Load
                    </h1>
                    <strong>
                        The page content has not loaded yet
                    </strong>
                </>
            )
        }
    }
}

class Login extends React.Component{
    // This will be the first loading page, and will be where the uses logins form 

    loginRequest() {
        let loginFormData = new FormData(document.querySelector("#login-form"))
        fetch("/api/login/", {
            method: "POST",
            body: loginFormData
        })
        .then(
            result => result.text()
        )
        .then(
            (result) => {
                if (result == "ok") {
                    this.props.loggedIn();
                }
                else {
                    alert("Your login failed due to a bad Username/Password pair, please try again.");
                }
            },
            (error) => {
                alert("You have encountered a server or browser error, please try again. ")
            }
        )
    }

    render() {
        return(
            <form id="login-form">
                <div
                    className="input-group-prepend">
                        <span 
                            className="input-group-text">
                                Username
                        </span>
                </div>
                <input 
                    type="text" 
                    className="form-control"
                    name="username"
                    />
                <div
                    className="input-group-prepend">
                        <span 
                            className="input-group-text">
                                Password
                        </span>
                </div>
                <input 
                    type="password" 
                    className="form-control"
                    name="password"
                    />
                <br />
                <button 
                    id="login-button"
                    className="btn btn-primary"
                    onClick={(event) => {
                        event.preventDefault();
                        this.loginRequest();
                    }}>
                        Login
                </button>
                <br />
                <button 
                    id="register-button"
                    className="btn btn-success"
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.register();
                    }}>
                        Make a New Profile
                </button>

            </form>
        )
    }
}

class App extends React.Component{
    // This is the main method that will handle loading the app
    constructor(props){
        super(props);

        this.state = {
            view: "login"
        }
    };

    goToLogin() {
        this.setState({
            view: "login"
        })
    }

    register() {
        this.setState({
            view: "register"
        })
    }

    loggedIn() {
        this.setState({
            view: "main"
        })
    }

    render() {
        let currentComponent = <Login 
                                    loggedIn={() => this.loggedIn()}
                                    register={() => this.register()}
                                />;

        if (this.state.view == "main") {
            currentComponent = <Main />
        }
        else if (this.state.view == "register") {
            currentComponent = <Register 
                                    goToLogin={() => this.goToLogin()}
                                />
        }

        return(
            <div className="app">
                {currentComponent}  
            </div>
        )
    }
}

const container = document.querySelector("#app");
const root = ReactDOM.createRoot(container);
root.render(<App />);
