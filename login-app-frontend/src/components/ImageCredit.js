import React from 'react';

const ImageCredit = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '75px',
      right: '10px',
      fontSize: '0.75rem',
      color: '#888',
      zIndex: 1000,
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: '4px 8px',
      borderRadius: '6px'
    }}>
      이미지 출처 : Images from <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>
    </div>
  );
};

export default ImageCredit;
