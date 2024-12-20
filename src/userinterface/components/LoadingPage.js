// LoadingPage.js
import React from 'react';
import '../css/LoadingPage.css';
import MediaRelate from '../../img/MediaRelate.png'
const LoadingPage = () => {
  return (
    <div class="loading-container">
    <div class="loading-content">
       <img src={MediaRelate} style={{
        width:'100%'
       }} />
        
    </div>
</div>

  );
};

export default LoadingPage;
