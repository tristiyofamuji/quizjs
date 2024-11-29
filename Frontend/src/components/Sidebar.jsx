import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoHome,
  IoLogOut,

} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const renderMenu = () => {
    if (!user) {
      return null; // Jangan render apapun jika user belum ada
    }

    switch (user.role) {
      case "superadmin":
        return (
          <>
            <li>
              <NavLink to={"/dashboard"}>
                <IoHome /> Dashboard
              </NavLink>
            </li>
            <p className="menu-label">Super Admin</p>
            <li>
              <NavLink to={"/users"}>
                <IoPerson /> Users
              </NavLink>
            </li>
          </>
        );
      case "user":
        return (
          <>
            <li>
              <NavLink to={"/dashboard"}>
                <IoHome /> Dashboard
              </NavLink>
            </li>
          </>
        );
      default:
        return <p>Role tidak dikenali</p>;
    }
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">{renderMenu()}</ul>

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
