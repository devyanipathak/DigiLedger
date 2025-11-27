import React, { useState } from "react";
import styled from "styled-components";
import profile from "../../img/profile.jpg";
import { signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import { useNavigate, useLocation } from "react-router-dom";
import SignOutDialog from "../Dialogs/SignOutDialog";
import { useGlobalContext } from "../../context/globalContext";

function Navigation() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useGlobalContext();

  const handleSignOutConfirm = () => {
    logoutUser();
    setOpenDialog(false);
    navigate("/");
  };

  return (
    <>
      <NavStyled>
        <div className="user-con">
          <img src={profile} alt="" />
          <div className="text">
            <h2>{user?.name || "User"}</h2>
            <p>Your Money</p>
          </div>
        </div>

        <ul className="menu-items">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.link;

            return (
              <li
                key={item.id}
                onClick={() => navigate(item.link)}
                className={isActive ? "active" : ""}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>

        <div className="bottom-nav">
          <li onClick={() => setOpenDialog(true)}>{signout} Sign Out</li>
        </div>
      </NavStyled>

      <SignOutDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleSignOutConfirm}
      />
    </>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0,0,0,0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }

    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .bottom-nav {
    li {
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(34, 34, 96, 0.8);
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
