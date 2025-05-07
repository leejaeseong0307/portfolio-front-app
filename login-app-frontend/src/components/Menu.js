import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useLocation } from 'react-router-dom';

const Menu = ({ setMenuTitle }) => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
      })
      .catch((err) => {
        console.error("메뉴 불러오기 실패:", err);
      });
  }, []);

  const handleClick = (menuRoute, menuName) => {
    //alert(menuRoute);
    setMenuTitle(menuName);
    //navigate(menuRoute);
    window.location.href = menuRoute;
  };

  const handleLogout = (menuName) => {
      fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      }).then(() => {
        //setMenuTitle(menuName);
        dispatch(logout()); // 리덕스에서 로그인 상태 제거
        setMenuTitle(menuName);
        window.location.href = "/";
       // <Navigate to="/" menuTitle={menuTitle}/>
      });
    };

  return (
    // <div className="dropdown-menu" >
    <>
    {/* {isLoggedIn && <p onClick={() => handleClick('/profile')} className={currentPath === '/profile' ? 'active' : ''}>Profile({userInfo.userName} 님)</p>} */}
      {/* {menus.filter((menu) => {
        if (!isLoggedIn) {
          return menu.menuRoute === '/dashboard';
        }
        return true;
      }) */}
      {menus.map((menu) => (
        <p key={menu.menuNo} onClick={() => handleClick(menu.menuRoute, menu.menuName)} className={currentPath === menu.menuRoute ? 'active' : ''}>
          {menu.menuName}
          {/* {menu.menuRoute === '/profile' && ` ${userInfo.userName} 님`} */}
        </p>
      ))}
      {isLoggedIn && <p onClick={() => handleLogout('Home')}>Logout</p>}
      </>
    // </div>
  );
};

export default Menu;