import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PleaseLogin() {
    const navigate = useNavigate()
  return (
    <div className="please-login-container">
        <h3>Please Login</h3>
        <button onClick={() => navigate('/')}>Login</button>
    </div>
  )
}

export default PleaseLogin