import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { CompletionScreen } from '@/components/training/CompletionScreen';
import { ContributorTraining } from '@/components/training/ContributorTraining';
import { HomePage } from '@/components/training/HomePage';
import { ReviewerTraining } from '@/components/training/ReviewerTraining';

function ContributorComplete() {
  const navigate = useNavigate();
  if (localStorage.getItem('tsip-contributor-unlocked') !== 'true') {
    return <Navigate to="/" replace />;
  }
  return <CompletionScreen onReviewModules={() => navigate('/contributor')} />;
}

function ReviewerComplete() {
  const navigate = useNavigate();
  if (localStorage.getItem('tsip-reviewer-unlocked') !== 'true') {
    return <Navigate to="/" replace />;
  }
  return <CompletionScreen onReviewModules={() => navigate('/reviewer')} />;
}

export function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contributor' element={<ContributorTraining />} />
        <Route path='/contributor/complete' element={<ContributorComplete />} />
        <Route path='/reviewer' element={<ReviewerTraining />} />
        <Route path='/reviewer/complete' element={<ReviewerComplete />} />
      </Routes>
    </>
  );
}
