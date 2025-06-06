import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Terms = ({ user, menuTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  menuTitle = location.state?.menuName || "이용약관";

  return (
    <div className="container py-5" style={{ paddingBottom: '300px' }}>
      <div className="dashboard-title-wrapper mb-5 clearfix">
        <div className="dashboard-title" style={{ float: 'left', cursor: 'pointer' }}
        onClick={() => window.location.reload()}
        >{menuTitle}</div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', lineHeight: '1.8' }}>
        <h1>이용약관</h1>
        <p>본 웹사이트는 사용자의 편의를 위하여 제공되며, 다음과 같은 이용 약관에 따라 운영됩니다. 사용자는 본 사이트에 접속하거나 콘텐츠를 이용함으로써 아래 약관에 동의하는 것으로 간주됩니다.</p>

        <h3>1. 목적</h3>
        <p>본 사이트는 창작 소설 콘텐츠를 제공하는 것을 목적으로 하며, 모든 방문자는 비상업적인 용도로 콘텐츠를 열람할 수 있습니다.</p>

        <h3>2. 지적재산권</h3>
        <p>사이트에 게시된 모든 텍스트, 이미지, 기타 자료는 작성자 또는 해당 권리자에게 저작권이 있으며, 사전 동의 없이 복제, 배포, 전송하는 것을 금합니다.</p>

        <h3>3. 이용자의 의무</h3>
        <p>사용자는 본 사이트를 법률 및 공공질서에 위배되는 방식으로 이용할 수 없습니다. 타인의 권리를 침해하거나, 불쾌감을 줄 수 있는 행위는 금지됩니다.</p>

        <h3>4. 면책 조항</h3>
        <p>본 사이트는 제공되는 정보나 콘텐츠의 정확성 또는 완전성을 보장하지 않습니다. 사이트 이용 중 발생할 수 있는 모든 문제에 대하여 법적 책임을 지지 않습니다.</p>

        <h3>5. 약관의 변경</h3>
        <p>본 사이트는 필요 시 이용약관을 변경할 수 있으며, 변경된 내용은 본 페이지를 통해 고지합니다. 변경 후에도 사이트를 이용하는 경우, 변경된 약관에 동의한 것으로 간주됩니다.</p>

        <h3>6. 연락처</h3>
        <p>사이트 이용 중 문의사항이 있으실 경우 아래 이메일로 연락 주시기 바랍니다.</p>
        <ul>
          <li>이메일: <a href="mailto:leejaeseong0307@gmail.com">leejaeseong0307@gmail.com</a></li>
        </ul>

        <hr />
        <p><strong>최종 수정일:</strong> 2025년 6월 6일</p>
      </div>
    </div>
  );
};

export default Terms;
