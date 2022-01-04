import React, { useState } from 'react';
// setting state of username and password as empty by default
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }
    //Adding the appropriate information for users to login - username and password. 
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
//^^^ The above button will also include a function in the next exercise to direct users without a login to the registration view. 