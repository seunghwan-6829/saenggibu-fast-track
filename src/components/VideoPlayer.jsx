import { useRef, useEffect } from 'react';

export default function VideoPlayer({ src, onProgress }) {
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration) {
      const percentage = (currentTime / duration) * 100;
      // 90% 이상 시청 시 완료로 간주 (MVP용 데모)
      const isCompleted = percentage > 90;
      onProgress(percentage, isCompleted);
    }
  };

  // 비디오 소스가 변경되면 리로드
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <video 
      ref={videoRef}
      controls 
      onTimeUpdate={handleTimeUpdate}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        objectFit: 'contain'
      }}
    >
      <source src={src} type="video/mp4" />
      브라우저가 동영상을 지원하지 않습니다.
    </video>
  );
}
