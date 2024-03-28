import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from 'axios';

function Login() {
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    const userId = useSelector((state) => state.userId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    username: res.data.username,
                    password: res.data.password,
                    bio: res.data.bio,
                    userPic: res.data.userPic
                }
            })
            navigate('/home')
        }
        alert(res.data.message)
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert('Please fill out all of the fields')
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
                navigate('/parks')
            }
            // alert(res.data.message)
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

    const handleClose = () => {
        setShow(false);
        setShowError(false)
        navigate('/home')
    };

    const handleError = () => {
        setShowError(true) 
        return (
            <Modal>
                <Modal.Body>
                    Reeeeee that is incorrect !!!!!!!!
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>try again</button>
                </Modal.Footer>
            </Modal>
        )
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

  return (
    <div className="login-page">
            <h3>{showCreateAccount ? 'Create an Account' : 'Login Below'}</h3>
            {showCreateAccount ? (
                <form className="create-account-form" onSubmit={handleCreateAccount}>
                    <div className="login-inputs">
                        <input 
                            type="text" 
                            placeholder="Create Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button>Register</button>
                    {/* <button onClick={() => setShowCreateAccount(false)}>Return to Login</button> */}
                </form>
            ) : (
                <div className="login-form">
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
                    <button onClick={handleShow}>Login</button>
                        <Modal show={showError} onHide={() => setShowError(false)}>
                            <Modal.Body>
                                <p>Incorrect Username or Password</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={() => setShowError(false)}>Try Again</button>
                            </Modal.Footer>
                        </Modal>
                
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <p>User Logged in</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleClose}>Close</button>
                        </Modal.Footer>
                    </Modal>
                    <button onClick={() => setShowCreateAccount(true)}>Create an Account</button>
                </div>
            )}
        </div>
    );
}

export default Login