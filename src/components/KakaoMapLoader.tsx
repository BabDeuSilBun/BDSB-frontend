'use client';

import { useEffect } from 'react';

const KakaoMapLoader = () => {
  useEffect(() => {
    const handleLoad = () => {
      console.log('Kakao Maps API loaded successfully.');
    };

    const handleError = (...args: unknown[]) => {
      console.error('Kakao Maps API failed to load.', args);
    };

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b16cd4f753d59b3e2a0eff8e4c137407&libraries=services`;
    script.async = true;
    script.onload = handleLoad;
    script.onerror = handleError;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default KakaoMapLoader;
