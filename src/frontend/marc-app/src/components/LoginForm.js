import React, {useState} from 'react';

function LoginForm() {

    const [username, setUsername] = useState("");
    const [password,setPassword] = useState(""); 

    return(
        <div className='loginForm'>
            <h2>
                LOGIN
            </h2>
            <label htmlFor='username'>
                Username
                <input 
                    type='text'
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                 />
            </label>
            <label>
                Password
                <input
                    type='password' 
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }
                    }/>
            </label>
            <button
                onclick="app.get"
            
            >
                Login 
            </button>
        </div>
    )
}

export default LoginForm;