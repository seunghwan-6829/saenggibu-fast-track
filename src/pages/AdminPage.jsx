import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './AdminPage.css';

export default function AdminPage() {
  const { submissions, updateSubmissionStatus } = useAppContext();
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    updateSubmissionStatus(id, newStatus);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
         <div className="admin-brand">🛡️ 생기부 추월차선 <span>관리자 센터</span></div>
         <button className="btn btn-secondary" onClick={() => navigate('/')}>학생 화면으로 돌아가기</button>
      </header>

      <main className="admin-main">
         <div className="admin-stats">
            <div className="stat-card">
               <h4>🟡 접수 대기</h4>
               <p>{submissions.filter(s => s.status === 'pending').length}<span>건</span></p>
            </div>
            <div className="stat-card">
               <h4>🔵 검토 중</h4>
               <p>{submissions.filter(s => s.status === 'reviewing').length}<span>건</span></p>
            </div>
            <div className="stat-card">
               <h4>🟢 처리 완료</h4>
               <p>{submissions.filter(s => s.status === 'completed').length}<span>건</span></p>
            </div>
         </div>

         <div className="submissions-list">
            <h3>생기부 컨설팅 신청 관리 현황</h3>
            {submissions.length === 0 ? (
               <div className="no-data">아직 접수된 컨설팅 신청 내역이 없습니다. 학생 화면에서 폼을 제출해 보세요!</div>
            ) : (
               <table className="admin-table">
                  <thead>
                     <tr>
                        <th>신청 일시</th>
                        <th>신청자 정보</th>
                        <th>제출된 내용 미리보기 (동기/과정)</th>
                        <th>현재 컨설팅 처리 상태</th>
                     </tr>
                  </thead>
                  <tbody>
                     {submissions.map((sub) => (
                        <tr key={sub.id}>
                           <td>
                              <div style={{color: '#64748b', fontSize: '0.85rem'}}>
                                 {new Date(sub.submittedAt).toLocaleDateString()}
                              </div>
                              <div style={{fontWeight: 600}}>
                                 {new Date(sub.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                           </td>
                           <td>
                              <strong>{sub.userName}</strong>
                              <div style={{color: '#94a3b8', fontSize: '0.8rem'}}>{sub.userId}</div>
                           </td>
                           <td 
                              title={`마우스를 올리면 전체 내용 요약을 볼 수 있습니다.\n[동기]: ${sub.motive}\n[과정]: ${sub.activity}\n[결과]: ${sub.result}`}
                              style={{ maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}
                           >
                             <strong style={{color: 'var(--primary)'}}>동기:</strong> {sub.motive || '(미작성)'} <br/>
                             <span style={{color: '#64748b'}}><strong style={{color: '#475569'}}>과정:</strong> {sub.activity || '(미작성)'}</span>
                           </td>
                           <td>
                              <select 
                                value={sub.status}
                                onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                                className={`status-badge ${sub.status}`}
                              >
                                 <option value="pending">접수 대기 (Pending)</option>
                                 <option value="reviewing">검토 및 첨삭 중 (Reviewing)</option>
                                 <option value="completed">컨설팅 완료 (Completed)</option>
                              </select>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>
      </main>
    </div>
  );
}
