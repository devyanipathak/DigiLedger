import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function Loader() {
  const { loading } = useGlobalContext();

  if (!loading) return null;

  return (
    <LoaderWrapper>
      <div className="spinner"></div>
    </LoaderWrapper>
  );
}

const LoaderWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid #ddd;
    border-top-color: #222260;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
