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

  //menuTitle = location.state?.menuName || "Long Story";

  const handleCancel = () => {
    navigate('/long');
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/longdel/${data.longNo}`, {
        method:'DELETE',
        //headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.text();
        navigate('/long');
      } else {
        const errorText = await response.text();
        console.error('삭제 실패:', errorText);
        alert('삭제 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('에러가 발생했습니다.');
    }
  };

  const isOwner = user && data && user.userId === data.userId;

  return (
    <div className="container py-5" style={{ paddingBottom: '300px' }}>
      <div className="dashboard-title-wrapper mb-5 clearfix">
        <div className="dashboard-title" style={{ float: 'left' }}>Long Story</div>
        {isOwner && (
          <div className="register-button-wrapper" style={{ float: 'right', marginTop: '70px' }}>
            <button className="btn btn-secondary me-2" onClick={handleCancel}>
                  이전
            </button>
            <button className="btn btn-danger me-2" onClick={handleDelete}>
                  삭제
            </button>
            
            <button
              className="btn btn-dark register-button me-2"
              onClick={() => navigate(`/longForm`, { state: { mode: 'edit', data } })}
            >
              수정
            </button>

            <button
              className="btn btn-secondary register-button"
              onClick={() => navigate('/longForm')}
            >
              등록
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
          <div style={{ display: 'flex', justifyContent: 'center' }} onContextMenu={(e) => e.preventDefault()}>
            <img 
              src={data.contImg} 
              alt={data.contTitle} 
              style={{ 
                maxWidth: '65%', 
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
    </div>
  );
};

export default LongView;
