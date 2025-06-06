import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Privacy = ({ user, menuTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  menuTitle = location.state?.menuName || "개인정보처리방침";

  return (
    <div className="container py-5" style={{ paddingBottom: '300px' }}>
      <div className="dashboard-title-wrapper mb-5 clearfix">
        <div className="dashboard-title" style={{ float: 'left', cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        >{menuTitle}</div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', lineHeight: '1.8' }}>
        <h1>개인정보처리방침</h1>
        <p>본 웹사이트(이하 "사이트")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 방침은 사이트에서 수집하는 개인정보, 이용 목적, 처리 방식 등을 설명합니다.</p>
        
        <hr />

        <h3>1. 수집하는 개인정보 항목</h3>
        <p><strong>[회원가입 시 수집 항목]</strong></p>
        <ul>
          <li>아이디</li>
          <li>비밀번호 (암호화 저장)</li>
          <li>이름</li>
          <li>이메일 주소</li>
          <li>가입일</li>
        </ul>
        <p><strong>[서비스 이용 중 자동 수집 항목]</strong></p>
        <ul>
          <li>로그인 횟수</li>
          <li>최종 로그인일 또는 정보 수정일</li>
          <li>IP 주소, 브라우저 정보, 접속 시간</li>
          <li>쿠키 및 웹 로그 분석 정보 (Google Analytics 등)</li>
        </ul>

        <hr />

        <h3>2. 개인정보 수집 및 이용 목적</h3>
        <ul>
          <li>회원 관리: 회원 식별, 가입 및 탈퇴 관리, 로그인 이력 확인 등</li>
          <li>서비스 제공 및 개선: 사용자 경험 개선, 오류 분석 등</li>
          <li>마케팅 및 광고: Google AdSense 등 광고 플랫폼을 통한 맞춤형 광고 제공</li>
          <li>법령 준수: 법적 의무 이행</li>
        </ul>

        <hr />

        <h3>3. 개인정보 보유 및 이용 기간</h3>
        <ul>
          <li><strong>회원정보:</strong> 회원 탈퇴 시까지 보유 후 지체 없이 파기</li>
          <li><strong>로그인 및 서비스 이용기록:</strong> 최대 1년 보관 후 자동 파기</li>
          <li><strong>법령에 따라 보존할 필요가 있는 경우:</strong> 관련 법령이 정한 기간 동안 보관</li>
        </ul>

        <hr />

        <h3>4. 개인정보 제3자 제공 및 위탁</h3>
        <p>본 사이트는 사용자의 명시적인 동의 없이 개인정보를 제3자에게 제공하지 않으며, 현재 위탁 처리하고 있는 업무도 없습니다.</p>
        <p>다만 Google Analytics, Google AdSense 등 외부 서비스 제공자에 의해 일부 정보가 수집될 수 있습니다.</p>

        <hr />

        <h3>5. 쿠키(Cookie)의 운영</h3>
        <p>사이트는 사용자 맞춤 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.</p>
        <p><strong>쿠키 사용 목적:</strong></p>
        <ul>
          <li>방문자 분석 (Google Analytics)</li>
          <li>맞춤형 광고 제공 (Google AdSense)</li>
        </ul>

        <hr />

        <h3>6. 이용자의 권리</h3>
        <ul>
          <li>개인정보 열람, 수정, 삭제, 처리 정지 요청</li>
          <li>쿠키 설정 변경</li>
          <li>회원 탈퇴 시 개인정보 자동 파기</li>
        </ul>

        <hr />

        <h3>7. 개인정보의 보호조치</h3>
        <ul>
          <li>비밀번호는 암호화 저장</li>
          <li>개인정보 접근 권한 최소화</li>
          <li>서버 및 DB 접근 제한</li>
          <li>웹사이트 보안 HTTPS 적용</li>
        </ul>

        <hr />

        <h3>8. 개인정보 보호 책임자</h3>
        <p>개인정보 관련 문의, 신고 또는 요청사항은 아래로 연락 주시기 바랍니다.</p>
        <ul>
          <li>이름: 사이트 관리자</li>
          <li>이메일: <a href="mailto:leejaeseong0307@gmail.com">leejaeseong0307@gmail.com</a></li>
          {/* <li>처리부서: 개인정보보호 담당팀</li> */}
        </ul>

        <hr />

        <h3>9. 고지의 의무</h3>
        <p>개인정보처리방침은 변경될 수 있으며, 변경 시 본 페이지를 통해 사전 고지합니다.</p>
        <p><strong>최종 변경일:</strong> 2025년 6월 6일</p>
      </div>
    </div>
  );
};

export default Privacy;
