import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "./features/auth/authSlice";

import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Short from "./pages/Short";
import Long from "./pages/Long";
import Profile from "./pages/Profile";
import My from "./pages/My";
import FindId from "./pages/FindId";
import FindPw from "./pages/FindPw";
import Home from "./pages/Home";
import LongForm from "./pages/LongForm";
import LongView from "./pages/LongView";
import Footer from './components/Footer';

import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import ImageCredit from './components/ImageCredit';

import 'bootstrap/dist/css/bootstrap.min.css';

import CookieConsent from "./CookieConsent";


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  // const [loading, setLoading] = useState(true); // API 호출 완료 여부

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(true);
  //const [menuTitle, setMenuTitle] = useState("전체");
  const [menuTitle, setMenuTitle] = useState(() => {
    return sessionStorage.getItem("menuTitle") || "Home";
  });

  useEffect(() => {
    sessionStorage.setItem("menuTitle", menuTitle);
  }, [menuTitle]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/session`, {
      credentials: "include"
    })
      .then((res) => {
        if (res.ok) return res.json();
        if (res.status === 401) {
          return null;
        }
        //throw new Error("알 수 없는 에러");
        return res.text().then((text) => {
          throw new Error(`에러: ${res.status} - ${text}`);
        });
      })
      .then((data) => {
        if (data) {
          dispatch(setUser(data)); // 데이터가 있을 때만 로그인 처리
        }else{
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        //dispatch(logout()); // 리덕스에서 로그인 상태 제거
        //window.location.href = "/login";
      })
      .finally(() => setLoading(false)); // 완료되면 로딩 false
  }, [dispatch, isLoggedIn]); 

  // const handleLogout = () => {
  //   fetch("http://localhost:8081/api/logout", {
  //     method: "POST",
  //     credentials: "include"
  //   }).then(() => {
  //     //setIsLoggedIn(false);
  //     //setUserInfo(null);
  //     dispatch(logout());
  //     window.location.href = "/login";
  //   });
  // };

  const location = useLocation();
  const path = location.pathname;

  const showHeader = isLoggedIn || path === '/home' || path === '/';

  if (loading) return <p>로딩 중...</p>; // 세션 확인 중

  return (
    <>
      {/* {showHeader && <Header setMenuTitle={setMenuTitle}/>} */}
      <Header setMenuTitle={setMenuTitle}/>
      <ImageCredit />
      <div style={{ paddingBottom: '120px' }}>
      {/* <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userInfo={userInfo} /> */}
      <Routes>
        {/* <Route path="/" element={<index />} /> */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} /> */}

         {/* / 또는 /login 접근 시 */}
         <Route
          path="/"
          element={
            isLoggedIn ? <Home user={userInfo} menuTitle={menuTitle} /> : <Home menuTitle={menuTitle}/>
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Home user={userInfo} menuTitle={menuTitle} /> : <Login />
            // isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        <Route
          path="/home"
          element={
            isLoggedIn ? <Home user={userInfo} menuTitle={menuTitle} /> : <Home menuTitle={menuTitle}/>
            // isLoggedIn ? <Dashboard user={userInfo} menuTitle={menuTitle} /> : <Navigate to="/login" />
          }
        />

        {/* 대시보드는 로그인한 경우만 */}
        <Route
          path="/register"
          element={
            isLoggedIn ? <Home user={userInfo}  menuTitle={menuTitle} /> : <Register />
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile user={userInfo}  menuTitle={menuTitle} /> : <Navigate to="/home" menuTitle={menuTitle}/>
          }
        />

        <Route
          path="/my"
          element={
            isLoggedIn ? <My user={userInfo}  menuTitle={menuTitle} /> : <Navigate to="/home" menuTitle={menuTitle}/>
          }
        />

        <Route
          path="/findId"
          element={
            isLoggedIn ? <Home user={userInfo}  menuTitle={menuTitle} /> : <FindId />
          }
        />

        <Route
          path="/findPw"
          element={
            isLoggedIn ? <Home user={userInfo}  menuTitle={menuTitle} /> : <FindPw />
          }
        />

        <Route
          path="/short"
          element={
            isLoggedIn ? <Short user={userInfo}  menuTitle={menuTitle} /> :  <Short menuTitle={menuTitle}/>
          }
        />

        <Route
          path="/long"
          element={
            isLoggedIn ? <Long user={userInfo}  menuTitle={menuTitle} /> :  <Long menuTitle={menuTitle}/>
          }
        />

        <Route
          path="/longView"
          element={
            isLoggedIn ? <Long user={userInfo}  menuTitle={menuTitle} /> :  <Long menuTitle={menuTitle}/>
          }
        />

        <Route
          path="/longForm"
          element={
            isLoggedIn ? <LongForm user={userInfo}  menuTitle={menuTitle} /> :  <Navigate to="/" />
          }
        />

        <Route
          path="/longView/:id"
          element={
            isLoggedIn ? <LongView user={userInfo}  menuTitle={menuTitle} /> :  <LongView menuTitle={menuTitle}/>
          }
        />
        
        <Route
          path="/Terms"
          element={
            isLoggedIn ? <Terms user={userInfo} menuTitle={menuTitle} /> : <Terms menuTitle={menuTitle}/>
          }
        />

        <Route
          path="/Privacy"
          element={
            isLoggedIn ? <Privacy user={userInfo} menuTitle={menuTitle} /> : <Privacy menuTitle={menuTitle}/>
          }
        />

        {/* 그 외 경로는 로그인 여부에 따라 처리 */}
        <Route
          path="*"
          // element={<Dashboard />}
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />

      </Routes>
      </div>
      <Footer />
      <CookieConsent />
      </>
  );
}

export default App;

