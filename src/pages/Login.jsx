import { useState } from "react";

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showLogin, setShowLogin] = useState(true)

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
                            placeholder="Desired Username"
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
                    <button>Submit</button>
                    <button onClick={() => setShowCreateAccount(true)}>Create an Account</button>
                </form>
            )}
        </div>
    );
}

export default Login