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
      {/* 타이틀: 왼쪽 정렬 */}
      <div className="dashboard-title-wrapper mb-5">
        <h2 className="dashboard-title fw-bold">{menuTitle}</h2>
      </div>

      {/* 카드와 타이틀 사이 간격 추가 */}
      <div style={{ marginTop: '80px' }} />

      {/* 카드 2개 */}
      <div className="row g-5 justify-content-center">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="col-12 col-md-6 d-flex justify-content-center"
            //onClick={() => navigate(card.link)}
            onClick={() => navigate(card.link, { state: { menuName: card.title } })}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="card text-white card-overlay"
              style={{
                width: '100%',
                maxWidth: '450px',
                height: '600px',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <img
                src={card.image}
                className="card-img"
                alt={card.title}
                style={{
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                }}
              />
              <div className="card-img-overlay d-flex justify-content-center align-items-center">
                <h2 className="card-title fw-bold text-center bg-dark bg-opacity-50 px-4 py-2 rounded">
                  {card.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
