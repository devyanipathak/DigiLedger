import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signupUser } = useGlobalContext();
  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await signupUser(name, email, password);
    if (res.success) {
      navigate("/login");
    } else {
      alert(res.message);
    }
  };
  return (
    <AuthStyled>
      <div className="box">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
          type = "name"
          placeholder = "Name"
          value = {name}
          onChange = {(e) => setName(e.target.value)}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </AuthStyled>
  );
}

const AuthStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    background: white;
    padding: 3rem;
    width: 400px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #aaa;
      }

      button {
        padding: 1rem;
        border: none;
        background: #222260;
        color: white;
        border-radius: 12px;
        cursor: pointer;
      }

      p {
        text-align: center;
      }
    }
  }
`;

export default Signup;
