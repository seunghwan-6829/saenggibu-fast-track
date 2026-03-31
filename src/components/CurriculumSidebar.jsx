import './CurriculumSidebar.css';

export default function CurriculumSidebar({ curriculum, currentLectureId, onSelectLecture, completedCount }) {
  const totalCount = curriculum.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2 className="sidebar-title">커리큘럼</h2>
        <div className="progress-section">
          <div className="progress-labels">
            <div className="progress-count">
              <svg className="progress-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              진도율 {completedCount}/{totalCount}
            </div>
            <div className="progress-percent">{progressPercent}%</div>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="lecture-list">
        <div className="section-header">
          <span>섹션 1. 잘 팔리는 상품의 상세페이지 핵심 비밀</span>
          <span>8강 - 36분</span>
        </div>
        {curriculum.map((lec) => (
          <div 
            key={lec.id} 
            className={`lecture-item ${currentLectureId === lec.id ? 'active' : ''}`}
            onClick={() => onSelectLecture(lec.id)}
          >
            <div className={`lecture-icon ${lec.completed ? 'completed' : ''}`}>
              {lec.completed ? (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="lecture-info">
              <span className="lecture-title">{lec.title}</span>
              <span className="lecture-duration">{lec.durationStr}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
