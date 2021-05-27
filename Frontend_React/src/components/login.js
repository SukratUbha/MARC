import Axios from 'axios';
import React, {useState, useEffect} from 'react';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;
    
    /*Abstract tasks within the send function, potentially as anonymous functions?*/
    const sendCredentials = () => {
        Axios.post("/api/user/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
            }
        });
    }
      

    useEffect(() => { //similar to componentDidMount, maybe have this in the parent element?
        Axios.get("/api/user/loginStatus").then((response) => {
          if (response.data.loggedIn === true) {
            setLoginStatus(response.data.user[0].username);
                console.log(0);
          }
        });
      });
    

    return (
        <div className="loginComponent">
            <div id="loginForm">
                <div className="login-control">
                    <label htmlFor="username" className="login-label">Username</label>
                    <input id="username" className="login-input" type="text" placeholder="username" 
                        onChange={event => {
                            setUsername(event.target.value);
                        }
                    }
                    />
                </div>

                <div className="login-control">
                    <label htmlFor="password" className="login-label">Password</label>
                    <input id="password" className="login-input" type="password" placeholder="password"
                        onChange={event => {
                            setPassword(event.target.value);
                        }
                    }
                    />
                </div>

                <div className="login-submit">
                    <button id="loginButton" onclick={sendCredentials}>Login</button>
                </div>

            </div>
        </div>
        );
}

export default Login;