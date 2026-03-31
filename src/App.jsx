import { useState } from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';
import StudentRecordForm from './components/StudentRecordForm';
import CurriculumSidebar from './components/CurriculumSidebar';

// mock data matching the user's screenshot
const mockCurriculum = [
  { id: 1, title: '01. 당신의 상품 USP는 무엇인가요?', durationStr: '05:57', completed: false, videoSrc: 'https://vjs.zencdn.net/v/oceans.mp4' },
  { id: 2, title: '02. 한 눈에 보는 A to Z 상세페이지 제작', durationStr: '05:24', completed: false, videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 3, title: '03. 이렇게 하면 됩니다. 상세페이지 장단점 분석', durationStr: '05:36', completed: false, videoSrc: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
  { id: 4, title: '04. 같은 제품이라도 차별화를 두는 핵심 방법', durationStr: '04:36', completed: false, videoSrc: 'https://media.w3.org/2010/05/bunny/trailer.mp4' },
  { id: 5, title: '05. 소비자의 심리를 활용한 상세페이지 제작 방법', durationStr: '04:57', completed: false, videoSrc: 'https://www.w3schools.com/tags/movie.mp4' },
  { id: 6, title: '06. 구매 유발하는 카피라이팅 작성 방법', durationStr: '05:31', completed: false, videoSrc: 'https://vjs.zencdn.net/v/oceans.mp4' },
  { id: 7, title: '07. 톤앤매너로 일관된 상세페이지 제작 방법', durationStr: '04:19', completed: false, videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

function App() {
  const [curriculum, setCurriculum] = useState(mockCurriculum);
  const [currentLectureId, setCurrentLectureId] = useState(1);
  const [videoProgress, setVideoProgress] = useState(0);

  const handleLectureSelect = (id) => {
    setCurrentLectureId(id);
    setVideoProgress(0); // Reset local percentage view if desired
  };

  const handleVideoProgress = (progressPercent, isCompleted) => {
    setVideoProgress(progressPercent);
    if (isCompleted) {
      setCurriculum((prev) =>
        prev.map((lec) =>
          lec.id === currentLectureId && !lec.completed ? { ...lec, completed: true } : lec
        )
      );
    }
  };

  const currentLecture = curriculum.find(lec => lec.id === currentLectureId);
  const completedCount = curriculum.filter(lec => lec.completed).length;

  return (
    <div className="app-container">
      <aside className="sidebar left-sidebar">
        <CurriculumSidebar 
           curriculum={curriculum}
           currentLectureId={currentLectureId}
           onSelectLecture={handleLectureSelect}
           completedCount={completedCount}
        />
      </aside>

      <main className="main-content center-content">
        <header className="top-nav">
          <div><span className="brand-accent">생기부</span> 추월차선</div>
        </header>

        <section className="video-section">
          {currentLecture && (
            <VideoPlayer 
               src={currentLecture.videoSrc} 
               onProgress={handleVideoProgress} 
            />
          )}
        </section>
      </main>

      <aside className="sidebar right-sidebar">
        <StudentRecordForm currentLectureTitle={currentLecture?.title} />
      </aside>
    </div>
  )
}

export default App;
