import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../css/Long.css';

const Long = ({ user, menuTitle }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const bottomRef = useRef(null);
  const PAGE_SIZE = 2;

  const fetchLongItems = async (pageNum) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/long?page=${pageNum}&size=${PAGE_SIZE}`);
      const data = await response.json();

      setItems(prev => [...prev, ...data]);

      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLongItems(1); // 초기 페이지 1번 로드
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        const nextPage = page + 1;
        fetchLongItems(nextPage);
        setPage(nextPage);
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, page]);

  const navigate = useNavigate();
  const location = useLocation();
 // menuTitle = location.state?.menuName || "Long Story";

  return (
    <div className="container py-5 long-container">
      <div className="dashboard-title-wrapper mb-5 clearfix">
        <div className="dashboard-title" style={{ float: 'left', cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        >Long Story</div>
        {user && (
          <div className="register-button-wrapper" style={{ float: 'right' }}>
            <button
              className="btn btn-dark register-button"
              onClick={() => navigate('/longForm')}
            >
              등록
            </button>
          </div>
        )}
      </div>

      <div className="long-card-grid" onContextMenu={(e) => e.preventDefault()}>
        {items.map(item => (
          <Link to={`/longView/${item.longNo}`} key={item.longNo} className="long-card">
            <img src={item.contImg} alt={item.contTitle} className="long-thumbnail" />
            <div className="long-card-content">
              <h2 className="long-card-title">{item.contTitle}</h2>
              <p className="long-card-description">{item.contDetail}...</p>
              <button className="long-view-button">자세히 보기</button>
            </div>
          </Link>
        ))}
      </div>

      <div ref={bottomRef} style={{ height: '20px' }} />
      {loading && <p className="text-center mt-3">로딩 중...</p>}
      {!hasMore && <p className="text-center mt-3">모든 콘텐츠를 불러왔습니다.</p>}
    </div>
  );
};

export default Long;
