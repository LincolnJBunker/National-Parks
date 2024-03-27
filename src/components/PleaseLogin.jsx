import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function PleaseLogin() {
    const navigate = useNavigate()
  return (
    <Alert variant="primary">
        <div className="please-login-container">
            <Alert.Heading>Please Login</Alert.Heading>
            <button onClick={() => navigate('/')}>Login</button>
        </div>
    </Alert>
  )
}

export default PleaseLogin