import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../styles/Layouts";
import Navigation from "../Components/Navigation/Navigation";
import { useState } from "react";

function ProtectedLayout() {
  const token = localStorage.getItem("token");
  const [active, setActive] = useState(1);

  if (!token) return <Navigate to="/login" />;

  return (
    <MainLayout>
      <Navigation active={active} setActive={setActive} />
      <main>
        <Outlet />   {/* renders nested route content */}
      </main>
    </MainLayout>
  );
}

export default ProtectedLayout;
