import { useNavigate } from 'react-router-dom';

import { CompletionScreen } from './CompletionScreen';
import { EmailGate, getStoredEmail } from './EmailGate';
import { useTrainingProgress } from './shared/useTrainingProgress';
import { TrainingHome } from './TrainingHome';

export function HomePage() {
  const navigate = useNavigate();
  const contributor = useTrainingProgress();

  if (!getStoredEmail()) {
    return <EmailGate onSubmit={() => navigate('/', { replace: true })} />;
  }

  if (contributor.isAllComplete) {
    return <CompletionScreen onReviewModules={() => navigate('/contributor')} />;
  }

  return (
    <TrainingHome
      onStartTraining={() => navigate('/contributor')}
      onStartReviewerTraining={() => navigate('/reviewer')}
    />
  );
}
