import React, { useState } from 'react';
import { render } from 'react-dom';
import { RegistrationView } from '../registration-view/registration-view';
// setting state of username and password as empty by default
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toRegister] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

    /*let handleClick = () => { toRegister = false };

    if (toRegister = false) return <RegistrationView />*/

    return (
        <div>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}


