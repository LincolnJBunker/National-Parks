import { useState } from "react";

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className="login-page">
            <h3>{showCreateAccount ? 'Create an Account' : 'Login Below'}</h3>
            {showCreateAccount ? (
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="login-inputs">
                        <input 
                            type="text" 
                            placeholder="Create Username"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
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
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-inputs">
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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