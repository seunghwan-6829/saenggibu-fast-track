import { useState } from 'react';
import './StudentRecordForm.css';

export default function StudentRecordForm({ currentLectureTitle }) {
  const [formData, setFormData] = useState({
    motive: '',
    activity: '',
    result: '',
    feeling: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-resize textarea logic
    if (e.target.tagName.toLowerCase() === 'textarea') {
      e.target.style.height = 'inherit';
      e.target.style.height = `${Math.max(120, e.target.scrollHeight)}px`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('작성하신 생활기록부 내용이 성공적으로 저장되었습니다! (MVP 버전 확인용)');
  };

  const handleReset = () => {
    if(window.confirm('작성 중인 내용을 초기화하시겠습니까?')) {
        setFormData({ motive: '', activity: '', result: '', feeling: '' });
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">
          <span>📝</span> 
          <span>나만의 세특 쓰기</span>
        </h2>
        <p className="form-subtitle">현재 수강 강의 : <strong>{currentLectureTitle}</strong></p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="motive">탐구(활동) 동기</label>
          <input 
            type="text" 
            id="motive" 
            name="motive" 
            className="form-input" 
            placeholder="어떤 계기로 이 주제에 관심을 가지게 되었나요?"
            value={formData.motive}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="activity">구체적인 활동 과정</label>
          <textarea 
            id="activity" 
            name="activity" 
            className="form-textarea" 
            placeholder="강의 내용을 바탕으로 본인이 수행한 탐구 내용이나 문제해결 과정을 작성해주세요."
            value={formData.activity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="result">활동 결과 및 구체적인 성취</label>
          <textarea 
            id="result" 
            name="result" 
            className="form-textarea" 
            placeholder="활동을 통해 얻은 결과물이나 학업 역량이 돋보이도록 구체적으로 적어주세요."
            value={formData.result}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="feeling">느낀 점 및 진로 연관성</label>
          <textarea 
            id="feeling" 
            name="feeling" 
            className="form-textarea" 
            placeholder="이 활동이 자신의 진로나 가치관에 미친 영향을 깊이 있게 적어주세요."
            value={formData.feeling}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleReset}>초기화</button>
          <button type="submit" className="btn btn-primary">임시저장</button>
        </div>
      </form>
    </div>
  );
}
