import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <LandingStyled>
      <div className="content">
        <h1>DigiLedger</h1>
        <p>The simplest way to track your expenses & manage your finances.</p>

        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn outline">Create Account</Link>
        </div>
      </div>
    </LandingStyled>
  )
}

const LandingStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7ff;

  .content{
    text-align: center;
    h1{
      font-size: 4rem;
      color: #222260;
    }
    p{
      font-size: 1.3rem;
      margin: 1rem 0;
      color: #333;
    }
    .buttons{
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    .btn{
      padding: 0.8rem 2rem;
      background: #222260;
      color: white;
      border-radius: 12px;
      text-decoration: none;
      font-weight: bold;
    }
    .outline{
      background: transparent;
      border: 2px solid #222260;
      color: #222260;
    }
  }
`;

export default Landing;
