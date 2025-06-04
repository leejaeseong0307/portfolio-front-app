import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../css/LongView.css';

const LongView = ({ user, menuTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/longform/${id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          alert('데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
      }
    };

    fetchData();
  }, [id]);

  menuTitle = location.state?.menuName || "Long Story";

  const isOwner = user && data && user.userId === data.userId;

  return (
    <div className="container py-5" style={{ paddingBottom: '300px' }}>
      <div className="dashboard-title-wrapper mb-5 clearfix">
        <div className="dashboard-title" style={{ float: 'left' }}>{menuTitle}</div>
        {isOwner && (
          <div className="register-button-wrapper" style={{ float: 'right' }}>
            <button
              className="btn btn-dark register-button"
              onClick={() => navigate(`/longForm`, { state: { mode: 'edit', data } })}
            >
              수정
            </button>
          </div>
        )}
      </div>

      {data ? (
        <div style={{ fontFamily: '"Segoe UI", Roboto, "Noto Sans KR", sans-serif' }}>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem' }}>{data.contTitle}</h2>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', fontStyle: 'italic' }}>{data.longGanre}</p>
          <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#666', marginBottom: '10px', lineHeight: '1.5' }}>
            <div>글쓴이: {data.userId}</div>
            <div>등록일: {data.createdDt}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={data.contImg} 
              alt="썸네일" 
              style={{ 
                maxWidth: '30%', 
                height: 'auto', 
                marginBottom: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="mt-4"
            style={{ maxWidth: '800px', width: '100%', textAlign: 'left' }}
            dangerouslySetInnerHTML={{ __html: data.contDetail }}
          />
        </div>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
      <br /><br />
    </div>
  );
};

export default LongView;
