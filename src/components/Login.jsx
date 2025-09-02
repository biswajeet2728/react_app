import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["B-token"]);
  const navigate = useNavigate();

  

  const register = async () =>{
    try{
      const resp = await fetch("https://biswajeet.pythonanywhere.com/api/user/",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
      });
      if (!resp.ok){
        console.log("ërror");
      }
      const data = await resp.json();
      console.log(data)
      if (data) login();
    }
    catch{
      console.log('error');
    }
  }

  const login = async () => {
    try {
      const resp = await fetch('https://biswajeet.pythonanywhere.com/auth/', {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
      });
      if (!resp.ok) {
        console.log("Token is not comming");
      }
      const data = await resp.json();
      console.log("Token", data);
      if(data.token) setToken("B-token", data.token, {path : "/", maxAge : 60 * 60 * 24 * 365 * 10, sameSite : "None", secure : true});
    }
    catch {
      console.log("error")
    }

  }
  
  useEffect(() =>{
    if(token["B-token"]) navigate('/papers');
  },[token, navigate]);

  const view_paper = () =>{
    navigate("/papers");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-primary mb-4">Register</h3>
        
          {/* Username Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill shadow-sm"
              placeholder="Enter password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={() => register()}>
            Signup
          </button><br/>
          <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm" onClick={() => view_paper()}>Click to view/download papers directly</button>
      </div>
    </div>
  );
}

export default LoginForm;
