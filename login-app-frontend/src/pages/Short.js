import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHeart, FaThumbsUp, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Short.css';

const PAGE_SIZE = 6;

const Short = ({ user, menuTitle }) => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const [likedContents, setLikedContents] = useState({});

  // 콘텐츠 가져오기 (중복 방지 포함)
  const fetchContents = async (pageNum) => {
  if (!hasMore || loading) return;

  setLoading(true);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/contents?page=${pageNum}&size=${PAGE_SIZE}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) throw new Error('서버 에러');

    const data = await response.json();

    const newContents = data.filter(
      (item) => !contents.some((existing) => existing.contNo === item.contNo)
    );

    setContents((prev) => [...prev, ...newContents]);

    // 여기 추가됨: liked 상태 저장
    const newLikedMap = {};
    newContents.forEach((item) => {
      if (item.liked === 1) {
        newLikedMap[item.contNo] = true;
      }
    });

    setLikedContents((prev) => ({
      ...prev,
      ...newLikedMap,
    }));

    if (data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  } catch (error) {
    console.error('에러 발생:', error);
  } finally {
    setLoading(false);
  }
};


  // 페이지 변경되면 fetch 호출
  useEffect(() => {
    fetchContents(page);
  }, [page]);

  // 무한 스크롤용 IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && hasMore) {
          console.log("관찰됨 → 페이지 증가");
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 1,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    const current = bottomRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [loading, hasMore]);

  const handleLike = async (contNo) => {

    if (!user) {
      alert("로그인 후 사용할 수 있습니다.");
      return;
    }

    const isLiked = likedContents[contNo];

  // 상태 먼저 토글
  setContents((prev) =>
    prev.map((item) =>
      item.contNo === contNo
        ? { ...item, likeCnt: parseInt(item.likeCnt || 0, 10) + (isLiked ? -1 : 1) }
        : item
    )
  );

  setLikedContents((prev) => ({
    ...prev,
    [contNo]: !isLiked,
  }));

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contents/${contNo}/like`, {
      method: isLiked ? 'DELETE' : 'POST', // 좋아요 취소는 DELETE, 추가는 POST
      credentials: 'include',
    });

    if (!response.ok) throw new Error('좋아요 처리 실패');

  } catch (err) {
    console.error(err);

    // 실패 시 상태 롤백
    setContents((prev) =>
      prev.map((item) =>
        item.contNo === contNo
          ? { ...item, likeCnt: parseInt(item.likeCnt || 0, 10) + (isLiked ? 1 : -1) }
          : item
      )
    );
    setLikedContents((prev) => ({
      ...prev,
      [contNo]: isLiked,
    }));
  }
  };

const location = useLocation();
menuTitle = location.state?.menuName || "Short Story";
console.log(menuTitle);

  return (
    <div className="container py-5" style={{ paddingBottom: '300px' }}>
      <div className="dashboard-title-wrapper mb-5">
        <div className="dashboard-title">{menuTitle}</div>
      </div>

      <div className="dashboard-content-area" style={{ minHeight: '200vh' }}>
        <div className="row g-0">
          {contents.map((cont) => (
            <div
              key={cont.contNo}
              className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center mb-5"
            >
              <div className="card custom-card-vertical">
                <img
                  src={cont.contImg}
                  className="card-img-top custom-img"
                  alt={cont.contTitle}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  style={{
                    userSelect: 'none',
                    pointerEvents: 'none',
                    WebkitUserDrag: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0)', // 완전 투명
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                />

              <div className="image-overlay-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.2', margin: 0 }}>
                {cont.contDetail}
              </div>
              
                {/* 좋아요 & 조회수 아이콘 겹치기 */}
                <div className="badge-container">
                <div
                    className="like-badge"
                    onClick={() => user && handleLike(cont.contNo)}
                    style={{ cursor: user ? 'pointer' : 'not-allowed' }}
                  >
                    <FaThumbsUp
                      color={likedContents[cont.contNo] ? 'blue' : 'black'}
                      size={16}
                      style={{ marginRight: '4px' }}
                    />
                    <span className="badge-text">{cont.likeCnt}</span>
                  </div>
                  {/* <div className="view-badge">
                    <FaEye color="black" size={16} style={{ marginRight: '4px' }} />
                    <span className="badge-text">{cont.contView || 0}</span>
                  </div> */}
                </div>

                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">{cont.contTitle}</h5>
                  {/* <p className="card-text">{cont.contDetail}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 무한 스크롤 트리거 */}
        <div
          ref={bottomRef}
          style={{ height: '10px', background: 'transparent', marginTop: '50px' }}
        />

        {/* 상태 표시 */}
        {loading && <p className="text-center mt-3">로딩 중...</p>}
        {!hasMore && <p className="text-center mt-3">모든 콘텐츠를 불러왔습니다.</p>}
      </div>
    </div>
  );
};

export default Short;
