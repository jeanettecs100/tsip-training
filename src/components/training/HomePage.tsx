import { useNavigate } from 'react-router-dom';

import { EmailGate, getStoredEmail } from './EmailGate';
import { TrainingHome } from './TrainingHome';

export function HomePage() {
  const navigate = useNavigate();

  if (!getStoredEmail()) {
    return <EmailGate onSubmit={() => navigate('/', { replace: true })} />;
  }

  return (
    <TrainingHome
      onStartTraining={() => navigate('/contributor')}
      onStartReviewerTraining={() => navigate('/reviewer')}
    />
  );
}
