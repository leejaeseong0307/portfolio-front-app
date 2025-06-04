import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '../css/LongForm.css';

const LongForm = ({ user, menuTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef();

  const mode = location.state?.mode || 'create';
  const initialData = location.state?.data;

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [season, setSeason] = useState(1);
  const [thumbnail, setThumbnail] = useState('');

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.contTitle);
      setGenre(initialData.longGanre);
      setThumbnail(initialData.contImg);
      editorRef.current?.getInstance().setHTML(initialData.contDetail);
    }
  }, [mode, initialData]);

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
  const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      alert('PNG, JPG, JPEG 형식의 이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert('이미지 용량은 10MB 이하만 업로드 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setThumbnail(result.url);
    } catch (error) {
      console.error('썸네일 업로드 실패:', error);
      alert('썸네일 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    const content = editorRef.current.getInstance().getHTML();

    if (!title || !genre || !content || !thumbnail) {
      alert('제목, 장르, 썸네일, 내용을 모두 입력해 주세요.');
      return;
    }

    const payload = {
      userId: userInfo.userId,
      contTitle: title,
      contDetail: content,
      longGanre: genre,
      contImg: thumbnail
    };

    const url = mode === 'edit'
      ? `${process.env.REACT_APP_API_URL}/api/longform/${initialData.longNo}`
      : `${process.env.REACT_APP_API_URL}/api/longform`;

    const method = mode === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`${mode === 'edit' ? '수정' : '등록'} 성공!`);
        navigate(`/longView/${mode === 'edit' ? initialData.longNo : result.id}`);
      } else {
        const errorText = await response.text();
        console.error(`${mode === 'edit' ? '수정' : '등록'} 실패:`, errorText);
        alert('저장 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <div className="container py-5" style={{ paddingBottom: '300px' }}>
      <div className="dashboard-title-wrapper mb-5 clearfix">
        <div className="dashboard-title" style={{ float: 'left' }}>{menuTitle || 'Long Story'}</div>
        {user && (
          <div className="register-button-wrapper" style={{ float: 'right' }}>
            <button className="btn btn-dark register-button" onClick={handleSave}>
              저장
            </button>
          </div>
        )}
      </div>

      <input
        className="form-control mb-3"
        style={{ fontSize: '1rem', fontFamily: 'inherit' }}
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="form-select mb-3"
        style={{ fontSize: '1rem', fontFamily: 'inherit' }}
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">장르 선택</option>
        <option value="romance">로맨스</option>
        <option value="fantasy">판타지</option>
        <option value="thriller">스릴러</option>
      </select>

      <input
        className="form-control mb-3"
        type="file"
        style={{ fontSize: '1rem', fontFamily: 'inherit' }}
        accept="image/*"
        onChange={handleThumbnailUpload}
      />

      {thumbnail && (
        <div className="mb-3">
          <img src={thumbnail} alt="썸네일 미리보기" style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
      )}

      <Editor
        ref={editorRef}
        previewStyle="vertical"
        height="700px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        placeholder="내용을 입력하세요..."
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            if (!VALID_IMAGE_TYPES.includes(blob.type)) {
              alert('PNG, JPG, JPEG 형식의 이미지 파일만 업로드 가능합니다.');
              return;
            }

            if (blob.size > MAX_IMAGE_SIZE) {
              alert('이미지 용량은 5MB 이하만 업로드 가능합니다.');
              return;
            }

            const formData = new FormData();
            formData.append('image', blob);

            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-image`, {
                method: 'POST',
                body: formData,
              });
              const result = await response.json();
              const imageUrl = result.url;
              callback(imageUrl, 'image');
              if (!thumbnail) setThumbnail(imageUrl);
            } catch (error) {
              console.error('이미지 업로드 실패:', error);
              alert('이미지 업로드 중 오류가 발생했습니다.');
            }
          }
        }}
      />
    </div>
  );
};

export default LongForm;
