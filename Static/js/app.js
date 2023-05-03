class NewUser extends React.Component{
    makeNewUser() {
        let newUserData = new FormData( document.querySelector('#new-user'));
        fetch('/api/register/', {
            method: 'POST',
            body: formData
        })
        .then( result => result.text())
        .then(
            (result) => {
                if( result == "ok"){
                    this.prop.login()
                }
                else {
                    alert("YOure Usename has already been taken, please try again.")
                }
            },
            (error) => {
                this.setState({
                    error: error,
                    isLoaded: true
                });
            }
        )
    };
    render() {
        <form id="new-user">
            <input
                id="username"
                name="username"
                type="text"
                placeholder="Username" />
            <br />
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email" />
            <br />
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Password" />
        </form>
    }
}
class Login extends React.Component {
    sendLoginRequest() {
        let formData = new FormData( document.querySelector('#login-form') );
        fetch('/api/login/', {
            method: 'POST',
            body: formData
        })
        .then(result => result.text())
        .then(
            (result) => {
                if (result == 'ok') {
                    this.props.onLogin();
                }
                else {
                    alert('Bad username/password combo');
                }
            },
            (error) => {
                alert('General login error');
            }
        )
    }

    goToRegister(){
        this.setState({
            view: "newUser",
        });
    }
    
    render() {
        return (
            <><form id="login-form">
                <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="username" />
                <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="password" />
                <br />
                <button
                    id="login-button"
                    onClick={(evt) => {
                        evt.preventDefault();
                        this.sendLoginRequest();
                    } }>
                    Login
                </button>
            </form><br />
            <button id="new-user" 
                value="Make Profile"
                onClick={(evt) => {
                    evt.preventDefault();
                    this.goToRegister()
                }}>Make a New Profile
            </button></>
        );
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'login'
        };
    }

    login(){
        this.setState({
            view: "main"
        });
    }

    newUser() {
        this.setState ({
            view: "newUser"
        });
        this.state.forceUpdate();
    }

    render() {
        let component = <Login onLogin={() => this.login()} />;
        if (this.state.view == "newUser") {
            component = <NewUser />
        }

        return (
            <div className="app">
              {component}
            </div>
        );
    }
}

const container = document.querySelector('#app');
const root = ReactDOM.createRoot(container);
root.render(<App />);