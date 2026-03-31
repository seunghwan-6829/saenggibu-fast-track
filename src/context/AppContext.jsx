import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 가상의 로그인된 유저 (MVP용 Mock Data)
  const [currentUser] = useState({ 
    id: 'user_1234', 
    name: '김학생', 
    email: 'student@example.com',
    profileImg: 'https://ui-avatars.com/api/?name=김학생&background=random'
  });

  // 로컬 스토리지에서 생기부 제출 목록 불러오기
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('consultingSubmissions');
    return saved ? JSON.parse(saved) : [];
  });

  // 제출 목록이 변경될 때마다 로컬 스토리지에 동기화
  useEffect(() => {
    localStorage.setItem('consultingSubmissions', JSON.stringify(submissions));
  }, [submissions]);

  // 컨설팅 제출하기
  const addSubmission = (recordData) => {
    const newSubmission = {
      ...recordData,
      id: Date.now().toString(), // 고유 ID
      userId: currentUser.id,
      userName: currentUser.name,
      status: 'pending', // 대기중(pending) | 검토중(reviewing) | 완료(completed)
      submittedAt: new Date().toISOString()
    };
    setSubmissions([newSubmission, ...submissions]);
  };

  // 관리자용: 상태 업데이트
  const updateSubmissionStatus = (submissionId, newStatus) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus } : sub
    ));
  };

  return (
    <AppContext.Provider value={{ currentUser, submissions, addSubmission, updateSubmissionStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
