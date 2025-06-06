import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice'; // redux slice에서 불러옴
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('로그인 정보:', formData);
    // TODO: 백엔드에 로그인 요청

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loginProc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 세션을 위해 중요!
        body: JSON.stringify(formData),
      });

      //const result = await response.text();
      //alert(result);
      const data = await response.json();
      if (response.ok) {
        // 로그인 성공 시 이동
        console.log(data.message);     // "로그인 성공"
        // console.log(data.email);       // user email
        // console.log(data.id);          // user id
        // console.log(data.username);    // user name
        dispatch(setUser(data)); // Redux에 사용자 정보 저장
        navigate('/home');
        //window.location.href = "/dashboard";
      }else{
        alert(data.message);
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }

  };

  const goToRegister = () => {
    navigate('/register'); 
  };

  const goToFindId = () => {
    navigate('/findId'); 
  };

  const goToFindPw = () => {
    navigate('/findPw'); 
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      // style={{
      //   // background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
      //   backgroundImage: `url('https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat'
      // }}
    >
      <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
        <h3 className="login-title">LOGIN</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Identifier</label>
            <input
              type="text"
              name="id"
              className="form-control rounded-pill px-3 py-2"
              value={formData.id}
              onChange={handleChange}
              required
              placeholder="Enter your Identifier"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-pill px-3 py-2"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button w-100">
            Login
          </button>
        </form>

        <br /><span className="form-label">If you don't have an account yet,
          <span  className="signup-link" onClick={goToRegister}> Sign up here.</span>
        </span>
        
        <span className="text-center">
          <span onClick={goToFindId} className="form-label signup-link me-3">Find Id?</span>
          <span onClick={goToFindPw} className="form-label signup-link">Find Pw?</span>
        </span>
        {/* <button type="submit" className="login-button w-100" onClick={goToRegister}
          style={{
            backgroundColor: '#FF6F61',
            color: 'white',
            border: 'none'
          }}
        >
        Sign Up
          </button> */}
        {/* <div className="text-center">
          <span>계정이 없으신가요?</span><br />
          <button className="btn btn-outline-secondary btn-sm mt-2" onClick={goToRegister}>
            회원가입
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
