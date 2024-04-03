import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from 'axios';

function Login() {
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false)
    const [showNewAccount, setShowNewAccount] = useState(false)
    const [showEmailError, setShowEmailError] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const userId = useSelector((state) => state.userId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleClose = () => {
        setShow(false);
        setShowError(false);
        navigate('/home');
    };

    const handleCloseCreateAccount = () => {
        setShowNewAccount(false);
        setShowError(false);
        setShowEmailError(false);
        navigate('/parks');
    };

    const handleNewAccount = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setShowError(true)
            return
        }
         
        if (!email.includes('@')) {
            setShowEmailError(true)
            return
        }

        const res = await axios.post('/api/createaccount', {
            username: username,
            email: email,
            password: password
        })
        console.log(res.data)
            if (res.data.success) {
                console.log(res.data)
                dispatch({
                    type: 'USER_AUTH',
                    payload: {
                        userId: res.data.userId,
                        username: res.data.username,
                        password: res.data.password,
                        bio: res.data.bio,
                        userPic: res.data.userPic
                    }
                })
                setShowNewAccount(true)
            } else {
                setShowError(true)
            }
    }

    const handleShow = async (e) => {
        e.preventDefault();
        
        const bodyObj = {
            username: username,
            password: password
        }
        console.log(bodyObj)
        // console.log(res.data)
        const res = await axios.post('/api/login', bodyObj)

        if (res.data.success) {
            console.log(res.data)
            dispatch({
                type: 'USER_AUTH',
                payload: {
                    userId: res.data.userId,
                    username: res.data.username,
                    password: res.data.password,
                    bio: res.data.bio,
                    userPic: res.data.userPic
                }
            })
            setShow(true);
            setShowError(false)
        } else {
            setShowError(true)
        }
    };

    useEffect(() => {
        sessionCheck()
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log(e.key)
            handleClose();
          }
    }

  return (
    
    <div className="log-page">
        <div className="log-form">
            <h3 className="login-title">{showCreateAccount ? 'Create an Account' : 'Login Below'}</h3>
            {showCreateAccount ? (
            <form className="create-account-form">
                <div className="create-account">
                    <div className="log-form">
                        <div className="input-holders">
                        <input 
                        className="form-inputs"
                            type="text" 
                            placeholder="Create Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div className="input-holders">
                        <input 
                        className="form-inputs"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="input-holders">
                        
                        <input 
                        className="form-inputs"
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                    </div>
                    <button onClick={handleNewAccount}>Register</button>
                    <Modal show={showEmailError} onHide={() => setShowEmailError(false)}>
                            <Modal.Body>
                                <p>Please Insert a Valid Email</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={() => setShowEmailError(false)}>Try Again</button>
                            </Modal.Footer>
                        </Modal>
                    <Modal show={showError} onHide={() => setShowError(false)}>
                            <Modal.Body>
                                <p>Please Insert all of the fields</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={() => setShowError(false)}>Try Again</button>
                            </Modal.Footer>
                        </Modal>
                    <Modal show={showNewAccount} onHide={handleCloseCreateAccount}>
                        <Modal.Body>
                            <p>Account successfully created!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleCloseCreateAccount}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </form>
            ) : (
                <form className="login-form-container" onSubmit={handleShow}>
                <div>
                    <div className="log-form">
                        <input 
                        className="login-inputs"
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                        className="login-inputs"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login-btns">
                    <button onClick={handleClose} type="submit">Login</button>
                        <Modal show={showError} onHide={() => setShowError(false)}>
                            <Modal.Body>
                                <p>Incorrect Username or Password</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={() => setShowError(false)}>Try Again</button>
                            </Modal.Footer>
                        </Modal>
                    <button onClick={() => setShowCreateAccount(true)}>Create an Account</button>
                </div>
                </div>
            </form>
            )}
            </div>
        </div>
    );
}

export default Login