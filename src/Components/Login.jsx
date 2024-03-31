import React, { useEffect, useState } from "react";
import Input from "./Common/Input";
import { BsCcCircle } from "react-icons/bs";
import { signIn } from "../API/Auth";
import Toast from "./Common/Toast";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Login() {
  let auth = getAuth();
  let navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  function handleInput(event) {
    let { name, value } = event.target;
    let input = { [name]: value };
    setInputs((prev) => ({ ...prev, ...input }));
  }

  async function handlesignIn() {
    try {
      let response = await signIn(inputs.email, inputs.password);
      localStorage.setItem("username", response.user.displayName);
      localStorage.setItem("userEmail", response.user.email);
      Toast("Log In Successful!", "success");
      setInputs({ email: "", password: "" });
    } catch (error) {
      console.error("Authentication Error:", error.code, error.message); // Add this line for enhanced error logging
      if (error.code === "auth/user-not-found") {
        Toast("User not found. Please check your credentials.", "error");
      } else {
        // Handle other authentication errors
        console.error("Authentication Error:", error.message);
        Toast("Invalid Details.😭", "error");
      }
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/posts");
      }
    });
  }, []);

  return (
    <div className="login-container">
      <BsCcCircle  
      size={70} style={{ margin: '20px' }}
      />
      <Input
        placeholder="Enter your Email"
        name="email"
        handleInput={handleInput}
        value={inputs.email}
        type="email"
      />

      <Input
        placeholder="Enter your Password"
        name="password"
        type="password"
        handleInput={handleInput}
        value={inputs.password}
      />

      <button className="login-btn" onClick={handlesignIn}>
        Log In
      </button>

      <p className="link" onClick={() => navigate("/sign-up")}>
        Create an Account
      </p>
    </div>
  );
}
