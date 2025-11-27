import React from "react";
import styled from "styled-components";

function SignOutDialog({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <DialogOverlay>
      <DialogBox>
        <h3>Are you sure you want to sign out?</h3>

        <div className="buttons">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="confirm" onClick={onConfirm}>Yes, Sign Out</button>
        </div>
      </DialogBox>
    </DialogOverlay>
  );
}

const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const DialogBox = styled.div`
  width: 380px;
  padding: 2rem;
  background: #fff;
  border-radius: 20px;
  text-align: center;

  h3 {
    margin-bottom: 1.5rem;
    color: #222260;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;

    .cancel {
      padding: 0.8rem 1.5rem;
      background: #ccc;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    .confirm {
      padding: 0.8rem 1.5rem;
      background: #222260;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

export default SignOutDialog;
