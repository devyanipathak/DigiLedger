import React, { useState, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import PublicRoute from "./Routes/PublicRoute";
// NEW PAGES
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import TransactionsView from "./Pages/TransactionView";
import { Toaster } from "sonner";
import Loader from "./Components/Loader";
import ProtectedLayout from "./Routes/ProtectedLayout";

function App() {
  const [active, setActive] = useState(1);
  const {
    /* maybe auth later */
  } = useGlobalContext();

  // const orbMemo = useMemo(() => {
  //   return <Orb />;
  // }, []);

  return (
    <AppStyled bg={bg}>
      <Loader />
      {/* {orbMemo} */}

      <Routes>
        {/* Public Pages */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <PublicRoute>
                <Landing />
              </PublicRoute>
            )
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected App Dashboard */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsView />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>

        {/* Redirect Everything Else */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
