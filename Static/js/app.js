class Release extends React.Component {
    // If a user has a station reserved then this is where they 
    // can release their reservation 
}

class Register extends React.Component {
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
                    if (result == "ok") {
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
        return (
            <div className="row">
                <div className="mx-auto col-10 col-md-8 col-lg-6">
                    <form id="new-user-form">
                        <div className="input-group input-group-lg">
                            <span
                                className="input-group-text">
                                Username
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                            />
                        </div>
                        <div className="input-group input-group-lg">
                            <span
                                className="input-group-text">
                                Password
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                            />
                        </div>
                        <div className="input-group input-group-lg">
                            <span
                                className="input-group-text">
                                Email
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                            />
                        </div>
                        <div className="col border-end  d-flex justify-content-center align-items-center">
                            <button
                                id="new-user-button"
                                className="btn btn-success btn-lg "
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.makeUser();
                                }}>
                                Make a New Profile
                            </button>
                        </div>
                        <div className="col border-end  d-flex justify-content-center align-items-center">
                            <button
                                id="go-back-login"
                                className="btn btn-primary btn-lg "
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.goToLogin();
                                }}>
                                Go Back to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

class Login extends React.Component {
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
        return (
            <div className="row">
                <div className="mx-auto col-10 col-md-8 col-lg-6">
                    <form id="login-form">
                        <div className="input-group input-group-lg">
                            <span className="input-group-text">
                                Username
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                            />
                        </div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text">
                                Password
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                            />
                        </div>
                        <div className="col border-end  d-flex justify-content-center align-items-center">
                            <button
                                id="login-button"
                                className="btn btn-primary btn-lg"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.loginRequest();
                                }}>
                                Login
                            </button>
                        </div>
                        <div className="col border-end  d-flex justify-content-center align-items-center">
                            <button
                                id="register-button"
                                className="btn btn-success btn-lg"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.register();
                                }}>
                                Make a New Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

class Main extends React.Component {
    // This is the main landing page for logged in users, 
    // form here they can see the current state of all stations 

    constructor(props) {
        super(props);
        this.state = {
            computers: [],
            error: null,
            pageLoaded: false,
            currUserId: "1",
            allUsers: []
        }
    }

    getUserId() {
        fetch("/api/getUserId/", {
            method: "GET"
        })
        .then( result => result.text())
        .then(
            (result) => {
                this.setState({
                    currUserId: result
                })
            }
        )
    }

    fetchUser() {
        fetch("/api/getUser/", {
            method: "GET"
        })
        .then(result => result.json())
        .then( 
            (result) => {
                this.setState({
                    allUsers: result
                })
            }
        )
    }   

    logout() {
        fetch("/api/logout/", {
            method: "GET"
        })
        .then(result => result.text())
        .then(
            (result) => {
                if( result == "ok") {
                    this.props.goToLogin()
                }
            }
        )
    }

    releaseComp(computer) {
        fetch("/api/release/" + computer + "/", {
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
                    }
                    else {
                        alert("This computer could not be reserved, sorry for the inconvenience.")
                    }
                },
                (error) => {
                    alert("You have encountered a server or browser error, please try again.")
                })
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
                    }
                    else {
                        alert("This computer could not be released, sorry for the inconvenience.")
                    }
                },
                (error) => {
                    alert("You have encountered a server or browser error, please try again.")
                })
    }

    componentDidMount() {
        this.getUserId()
        this.fetchUser()
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
        if (this.state.pageLoaded) {
            return (
                <><h1>A list of all computers</h1>
                    <nav><button className="btn btn-danger btn-lg" onClick={() => this.logout()}>Logout</button></nav>

                    <div id="computer-table" >
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Computer ID</th>
                                    <th scope="col">Computer Status</th>
                                    <th scope="col">Reservation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.computers.map(computer => {
                                    let status = "Available"
                                    if (computer.isReserved) {
                                        for( let user of this.state.allUsers) {
                                            if( user.id == computer.userID){
                                                status = `Reserved by ${user.username}`
                                            }
                                        }
                                            if( this.state.currUserId == computer.userID) {
                                                return (
                                                    <tr key={computer.id}>
                                                        <th scope="row">{computer.id}</th>
                                                        <td>{status}</td>
                                                        <td><button onClick={() => this.releaseComp(computer.id)}>Release</button></td>
                                                    </tr>
                                                )
                                            }
                                            else {
                                                return (
                                                    <tr key={computer.id}>
                                                        <th scope="row">{computer.id}</th>
                                                        <td>{status}</td>
                                                    </tr>
                                                )
                                            }
                                    }
                                    else {
                                        return (
                                            <tr key={computer.id}>
                                                <th scope="row">{computer.id}</th>
                                                <td>{status}</td>
                                                <td><button onClick={() => this.reserveComp(computer.id)}>Reserve</button></td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div></>
            )
        }
        else {
            return (
                <>
                    <h1>
                        Waiting for Content to Load
                    </h1>
                    <strong>
                        The page content has not loaded yet...please wait
                    </strong>
                </>
            )
        }
    };
}

class App extends React.Component {
    // This is the main method that will handle loading the app
    constructor(props) {
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
            currentComponent = <Main 
                goToLogin={() => this.goToLogin()}
            />
        }
        else if (this.state.view == "register") {
            currentComponent = <Register
                goToLogin={() => this.goToLogin()}
            />
        }

        return (
            <div className="app">
                {currentComponent}
            </div>
        )
    }
}

const container = document.querySelector("#app");
const root = ReactDOM.createRoot(container);
root.render(<App />);
