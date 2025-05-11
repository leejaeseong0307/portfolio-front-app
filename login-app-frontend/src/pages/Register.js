import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice'; // redux slice에서 불러옴

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    passwordChk: '',
    verifyCode: '',
    agreeYn: false
  });

  // const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const emailInputRef = useRef(null);
  const idInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const [timeLeft, setTimeLeft] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if(formData.id.trim() === ''){
      alert('아이디를 입력하세요.');
      idInputRef.current.focus();
      return;
    }

    if(formData.email.trim() === ''){
      alert('이메일 주소를 입력하세요.');
      emailInputRef.current.focus();
      return;
    }
    setMessage('');
    setIsLoading(true); // 로딩 시작

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/email/send-code`, null, {
        params: { email:formData.email }
      });

      if (response.status === 200) {
        alert('인증번호가 이메일로 전송되었습니다.');
        setCodeSent(true);
        setTimeLeft(60); // 1분 타이머 시작
        setIsVerified(false); // 인증 초기화
      }

    } catch (error) {
      console.error(error);
      alert('인증번호 전송에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      setMessage('인증 시간이 만료되었습니다.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/email/verify-code`, null, {
        params: {
          email:formData.email,
          code:formData.verifyCode
        },
      });

      if (response.status === 200) {
        setMessage('인증 성공!');
        setIsVerified(true);
        setVerifiedEmail(formData.email);
        setTimeLeft(0);
      }
    } catch (error) {
      setMessage('인증 실패. 다시 시도해 주세요.');
      setIsVerified(false);
    }
  };

   // 타이머 감소 로직
   useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 시간 포맷
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}분 ${s < 10 ? '0' : ''}${s}초`;
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;


    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }));

    // 이름 검사
    // if (name === 'name') {
    //   console.log(newValue.length);
    //   if (newValue.length <= 0) {
    //     setNameError('이름을을 입력해주세요.');
    //   }
    // }

    // 이메일 검사
    if (name === 'email') {
      if (!isValidEmail(newValue)) {
        setEmailError('올바른 이메일 형식을 입력해주세요.');
      } else {
        setEmailError('');
      }
    }

   // 비밀번호 검사
   if (name === 'password') {
    if (newValue.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }

    // 비밀번호 변경 시 확인값도 다시 체크
    if (formData.passwordChk && newValue !== formData.passwordChk) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError('');
    }
  }    

  // 비밀번호 확인 검사
  if (name === 'passwordChk') {
    if (newValue !== formData.password) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError('');
    }
  }
};

const isFormValid =
  formData.id.trim() !== '' &&
  formData.name.trim() !== '' &&
  formData.email.trim() !== '' &&
  isValidEmail(formData.email) &&
  formData.password.trim().length >= 6 &&
  formData.password === formData.passwordChk &&
  formData.agreeYn;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('모든 항목을 올바르게 입력하고 동의해주세요.');
      return;
    }

    // if (!isVerified) {
    //   alert("이메일 인증을 먼저 완료해주세요!");
    //   return;
    // }

    if (!isVerified || verifiedEmail !== formData.email) {
      alert("이메일 인증을 먼저 완료해주세요!");
      return;
    }

    console.log('회원가입 정보:', formData);
    // TODO: 백엔드로 formData 전송

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        dispatch(setUser(result));
        alert(result.message); // "회원가입 성공"
        navigate('/dashboard'); //
        //window.location.href = "/";
      } else {
        alert(result.message); // 에러 메시지
      }

    } catch (error) {
      console.error('회원가입 에러:', error);
    }

  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        overflowY: 'auto',      
        paddingTop: '50px',     
        paddingBottom: '50px'   
      }}
    >
      <Loader show={isLoading} />
    <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }}>
      <h3 className="sign-title">Sign Up</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label">Identifier</label>
          <input
            type="text"
            name="id"
            className="form-control"
            ref={idInputRef}
            value={formData.id}
            onChange={handleChange}
            //required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            //required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            ref={emailInputRef}
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            //required
          />
          <button onClick={handleSendCode} //disabled={isVerified}
          className="toggle-password">
            Send Code
          </button>
        </div>
        {emailError && <p className="error-msg">{emailError}</p>}

        <div className="mb-3">
        <label className="form-label">Verify Code</label>
        <input className="form-control" disabled={isVerified}
          type="text"
          name="verifyCode"
          value={formData.verifyCode}
          onChange={handleChange}
          //required
        />
        {!isVerified && (
            <button onClick={handleVerify} 
            //disabled={isVerified}
              className="toggle-password">
              인증 확인
            </button>
        )}
         </div>

         {!isVerified && timeLeft > 0 && (
          <p className="error-msg" style={{ color: timeLeft <= 10 ? 'red' : 'gray', fontWeight: 'bold' }}>
            남은 시간: {formatTime(timeLeft)}
          </p>
        )}

        {message && (
          <p className="error-msg" style={{color: message.includes('성공') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
           // required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? '숨기기' : '보기'}
          </button>
        </div>
        {passwordError && <p className="error-msg">{passwordError}</p>}

        <div className="mb-4">
          <label className="form-label">PasswordChek</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="passwordChk"
            className="form-control"
            value={formData.passwordChk}
            onChange={handleChange}
           // required
          />
        </div>
        {passwordConfirmError && <p className="error-msg">{passwordConfirmError}</p>}

        <div className="mb-4">
          <label><span className="form-label">개인정보 수집 및 활용에 동의합니다. </span>
            <input
              type="checkbox"
              name="agreeYn"
              value={formData.agreeYn}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className="login-button w-100" 
        //disabled={!isFormValid}
        >
          Please Submit
        </button>

      </form>
    </div>
  </div>
);
    
};

const Loader = ({ show }) => {
  return (
    <div className={`loader-overlay ${show ? 'show' : ''}`}>
      <div className="loader-text">⏳ Requesting...</div>
    </div>
  );
};

export default Register;