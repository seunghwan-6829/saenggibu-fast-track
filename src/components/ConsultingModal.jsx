import { useAppContext } from '../context/AppContext';
import './ConsultingModal.css';

export default function ConsultingModal({ isOpen, onClose }) {
  const { currentUser, addSubmission } = useAppContext();
  
  if (!isOpen) return null;

  const getDraft = () => {
    const saved = localStorage.getItem('studentDraft');
    return saved ? JSON.parse(saved) : { motive: '', activity: '', result: '', feeling: '' };
  };

  const draft = getDraft();

  const handleSubmit = () => {
    // 덜 썼어도 우선 제출되게 하는 부드러운 MVP 로직
    addSubmission(draft);
    localStorage.removeItem('studentDraft');
    alert('🎉 성공적으로 자소서가 첨부되어 컨설팅이 신청되었습니다!\n\n(관리자 모드에서 검토 상태를 확인할 수 있습니다.)');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>컨설팅 신청</h3>
        <p>현재까지 작성된 생기부 내용을 첨부하여 제출하시겠습니까?</p>
        
        <div className="draft-preview">
          <div><strong>신청자 계정:</strong> {currentUser.name} ({currentUser.email})</div>
          <hr />
          <div className="preview-field"><strong>동기:</strong> {draft.motive || '(미작성)'}</div>
          <div className="preview-field"><strong>과정:</strong> {draft.activity || '(미작성)'}</div>
          <div className="preview-field"><strong>결과:</strong> {draft.result || '(미작성)'}</div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>취소</button>
          <button className="btn btn-primary" onClick={handleSubmit}>지금 자소서 첨부하기</button>
        </div>
      </div>
    </div>
  );
}
