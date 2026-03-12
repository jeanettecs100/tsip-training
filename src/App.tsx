import { Route, Routes } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import { ContributorTraining } from '@/components/training/ContributorTraining';
import { HomePage } from '@/components/training/HomePage';
import { ReviewerTraining } from '@/components/training/ReviewerTraining';

export function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contributor' element={<ContributorTraining />} />
        <Route path='/reviewer' element={<ReviewerTraining />} />
      </Routes>
    </>
  );
}
