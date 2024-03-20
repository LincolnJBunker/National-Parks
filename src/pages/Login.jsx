import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const userId = useSelector((state) => state.userId);

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        const bodyObj = {
            username: username,
            password: password
        }
        console.log(bodyObj)
        // console.log(res.data)
        const res = await axios.post('/api/login', bodyObj)

        if (res.data.success) {
            dispatch({
                type: 'USER_AUTH',
                payload: {
                    userId: res.data.userId,
                    username: res.data.username
                }
            })
            setUsername('')
            setPassword('')
        }
        alert(res.data.message)
    }

    const sessionCheck = async () => {
        const res = await axios.get('/api/session-check')
        console.log(res)
        if (res.data.success) {
            dispatch({
                type: 'USER_AUTH',
                payload: res.data.userId,
            });
        };
    };

    useEffect(() => {
        sessionCheck()
    }, [])

  return (
    <div className="login-page">
            <h3>{showCreateAccount ? 'Create an Account' : 'Login Below'}</h3>
            {showCreateAccount ? (
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="login-inputs">
                        <input 
                            type="text" 
                            placeholder="Create Username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <input 
                        type="email"
                        placeholder="Enter your Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="Create Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button>Register</button>
                    {/* <button onClick={() => setShowCreateAccount(false)}>Login</button> */}
                </form>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-inputs">
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button>Login</button>
                    <button onClick={() => setShowCreateAccount(true)}>Create an Account</button>
                </form>
            )}
        </div>
    );
}

export default Login