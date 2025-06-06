import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // ✅ 리덕스 로그아웃
import axios from 'axios';
import '../css/Short.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Profile = ({ user, menuTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.userName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleVisibility = (target) => {
    if (target === 'current') setShowCurrentPassword(!showCurrentPassword);
    else if (target === 'new') setShowNewPassword(!showNewPassword);
    else if (target === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("새 비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const updatedUser = {
      id: user?.userId,
      email: user?.userEmail,
      no: user.userNo,
      name,
      currentPassword,
      newPassword,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/update`, updatedUser, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
    
        await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
          method: "POST",
          credentials: "include",
        });
    
        dispatch(logout());
    
        //navigate("/login");
        window.location.href = "/login";
      } else {
        alert("예상치 못한 응답입니다: " + response.data);
      }

    } catch (error) {
      console.error("업데이트 실패:", error.response?.data || error.message);
      const message = error.response?.data || "잠시 후 다시 시도해주세요.";
      alert(message);
      //alert("정보 저장에 실패했습니다.\n" + (error.response?.data?.message || "잠시 후 다시 시도해주세요."));
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/delete`, {
        withCredentials: true,
        data: { id: user?.userId }, // 💡 DELETE 요청은 data 옵션에 바디를 넣어야 함
      });
  
      alert("회원탈퇴가 완료되었습니다.");
  
      // 로그아웃 처리
      await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
  
      dispatch(logout());
      window.location.href = "/";
  
    } catch (error) {
      console.error("회원탈퇴 실패:", error.response?.data || error.message);
      alert("회원탈퇴 중 오류가 발생했습니다.\n" + (error.response?.data || "잠시 후 다시 시도해주세요."));
    }
  };

  return (
    <div className="container py-5">
      <div className="dashboard-title-wrapper mb-4">
        <div className="dashboard-title"
        style={{ cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        >{menuTitle}</div>
      </div>

      <div className="card p-4">
        <h4 className="mb-4">프로필 수정</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">아이디</label>
            <div className="form-control-plaintext">{user?.userId}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">이메일</label>
            <div className="form-control-plaintext">{user?.userEmail}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">이름</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">현재 비밀번호</label>
            <div className="input-group">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span className="input-group-text" onClick={() => toggleVisibility('current')} style={{ cursor: 'pointer' }}>
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">새 비밀번호</label>
            <div className="input-group">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="input-group-text" onClick={() => toggleVisibility('new')} style={{ cursor: 'pointer' }}>
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">새 비밀번호 확인</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="input-group-text" onClick={() => toggleVisibility('confirm')} style={{ cursor: 'pointer' }}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary">정보 저장</button>
            <button  type="button"  className="btn btn-outline-secondary"  onClick={handleDeleteAccount}>회원탈퇴</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
