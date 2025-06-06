import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "true") {
      setConsented(true); // 이미 동의한 경우
    } else {
      setShowBanner(true); // 아직 동의 안 한 경우
    }
  }, []);

  const handleAccept = () => {
    const confirmAccept = window.confirm(
    "Google Analytics 쿠키 수집에 동의하시겠습니까?\n방문자 분석 목적으로 사용됩니다."
  );

  if (!confirmAccept) return;
    
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
    setConsented(true);
    // 여기에 Analytics 로드 로직 넣으면 됨

     const script1 = document.createElement("script");
      script1.async = true;
      script1.src = "https://www.googletagmanager.com/gtag/js?id=G-xxxxxxxx";

      const script2 = document.createElement("script");
      script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-xxxxxxxx');
    `;

  document.head.appendChild(script1);
  document.head.appendChild(script2);
  };

  const deleteAnalyticsCookies = () => {
  const cookiesToDelete = ['_ga', '_gid', '_gat', '_gcl_au'];

  cookiesToDelete.forEach(name => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname};`;
  });
};


  const handleRevoke = () => {
    localStorage.removeItem("cookie_consent");

    // 주요 GA 쿠키 제거
    deleteAnalyticsCookies();
    //document.cookie = "_ga=; Max-Age=0; path=/";
    //document.cookie = "_gid=; Max-Age=0; path=/";
    //document.cookie = "_gat=; Max-Age=0; path=/";

    // 새로고침하여 추적 코드가 다시 실행되지 않도록
    window.location.reload();
  };

  if (showBanner) {
    return (
      <div style={styles.banner}>
        <p style={styles.text}>
          이 사이트는 사용자 경험 향상을 위해 쿠키를 사용합니다. Google Analytics를 포함한 일부 쿠키는 웹사이트 분석에 사용됩니다.
        </p>
        <button onClick={handleAccept} style={styles.button}>
          동의합니다
        </button>
      </div>
    );
  }

  if (consented) {
    return (
      <div style={styles.revokeContainer}>
        <button onClick={handleRevoke} style={styles.revokeButton}>
          쿠키 동의 철회하기
        </button>
      </div>
    );
  }

  return null;
};

const styles = {
  banner: {
  position: "fixed",
  left: "20px",
  right: "20px",
  bottom: "80px", // ✅ 푸터 위로 띄움
  backgroundColor: "#222",
  color: "#fff",
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 9999,
  fontSize: "14px",
  flexWrap: "wrap",
  borderRadius: "8px", // 선택: 떠 있는 느낌 줄 수 있음
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)" // 선택: 그림자
},
  text: {
    margin: 0,
    flex: 1,
  },
  button: {
    marginLeft: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  revokeContainer: {
    position: "fixed",
    bottom: "100px",
    right: "10px",
    zIndex: 9999,
  },
  revokeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "12px",
  },
};

export default CookieConsent;
