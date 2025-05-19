import React, { useState, useEffect, useRef  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice"; // 🔥 리덕스 logout 액션
import "../css/Header.css";

import { FaBars } from "react-icons/fa";

import Menu from "./Menu";

const Header = ({ setMenuTitle }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLogout = () => {
  //   fetch("http://localhost:8081/api/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   }).then(() => {
  //     dispatch(logout()); // 리덕스에서 로그인 상태 제거
  //     window.location.href = "/login";
  //   });
  // };

  const handleMenuClick = (path) => {
    navigate(path);
    setMenuOpen(false); // 메뉴 클릭 시 닫기
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleClick = (menuRoute, menuName) => {
    //alert(menuRoute);
    setMenuTitle(menuName);
    //navigate(menuRoute);
    window.location.href = menuRoute;
  };
  
  return (
    <header className="common-header">
      {isLoggedIn &&
      <div className="menu-wrapper" ref={menuRef}>
        <button className="menu-button" 
          onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="hamburger-icon" />
          {/* + {userInfo.userName} 님 */}
        </button>
        {menuOpen && (
          <div className="dropdown-menu" 
            style={{ display: menuOpen ? "block" : "none" }}
          ><Menu setMenuTitle={setMenuTitle} closeMenu={() => setMenuOpen(false)}/>
            {/* <p onClick={() => handleMenuClick("/")}>전체</p>
            <p onClick={() => handleMenuClick("/upload")}>등록</p>
            <p onClick={() => handleMenuClick("/my")}>내 코디</p> */}
          </div>
        )}
      </div>}

      <div className="left-placeholder" /> {/* 좌측 비우기 (중앙정렬을 위한) */}
      
      <div className="header-title">
        <a href="javascript:void(0);" className="title-link" onClick={() => handleClick("/", "Home")}>Ool-Rrim.</a>
      </div>
      
      <div className="header-action">
      {!isLoggedIn && 
          <Link to="/login" className="login-link">Login</Link>
        }
      </div>

      {/* <div className="header-action">
      {isLoggedIn && userInfo ? (
        <>
        <span className="user-info">{userInfo.userName || userInfo.userEmail}님</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div> */}
    </header>
  );
};

export default Header;
