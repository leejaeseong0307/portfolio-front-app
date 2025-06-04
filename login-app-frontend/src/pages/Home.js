import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = ({ menuTitle }) => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Short Story',
      image: '/images/shortterm.jpg',
      link: '/short',
    },
    {
      title: 'Long Story',
      image: '/images/longterm.jpg',
      link: '/long',
    },
  ];

  return (
    <div className="container py-5" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* 타이틀 */}
      <div className="dashboard-title-wrapper mb-5">
        <h2 className="dashboard-title fw-bold">{menuTitle}</h2>
      </div>

      {/* 소개 문구 */}
      <div className="text-center my-5">
        <h4 style={{ fontWeight: '500', color: '#444' }}>
          AI의 짧고 강렬한 이야기부터 깊이 있는 장편까지,
        </h4>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          당신의 이야기도 Long Story에서 남겨보세요.
        </p>
      </div>

      {/* 카드 */}
      <div className="row g-5 justify-content-center">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="col-12 col-md-6 d-flex flex-column align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(card.link, { state: { menuName: card.title } })}
          >
            <div
              className="card position-relative card-overlay" onContextMenu={(e) => e.preventDefault()}
              style={{
                width: '100%',
                maxWidth: '450px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              }}
            >
              <img
                src={card.image}
                className="card-img"
                alt={card.title}
                style={{
                  objectFit: 'cover',
                  height: '600px',
                  width: '100%',
                }}
              />
              <div className="card-img-overlay d-flex justify-content-center align-items-center">
                <h2 className="card-title fw-bold text-white bg-dark bg-opacity-50 px-4 py-2 rounded">
                  {card.title}
                </h2>
              </div>
            </div>
            <div 
              className="d-flex align-items-center justify-content-start mt-3 w-100 hover-area" 
              style={{ maxWidth: '450px' }}
            >
              <span className="hover-text" style={{ fontWeight: '700', color: '#aaa', fontSize: '1.05rem' }}>바로가기</span>
              <svg className="hover-arrow ms-2" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* 카드 사이 텍스트 */}
      <div className="col-12 text-center mt-5">
        <div style={{ margin: '60px 0', position: 'relative' }}>
          {/* <hr style={{ border: 'none', borderTop: '2px solid #bbb', marginBottom: '20px' }} /> */}
          <span style={{ backgroundColor: '#fff', padding: '0 20px', color: '#888', fontWeight: '500', fontSize: '1.1rem' }}>
            당신은 어떤 이야기를 원하시나요?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
