import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Circle,
  Compass,
  Exam,
  ListChecks,
  Lock,
  PencilSimple,
  RocketLaunch,
  Table,
  Trophy,
} from '@phosphor-icons/react';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

import { MODULES } from './data/modules-config';
import type { ModuleId, ModuleScore, ModuleStatus } from './shared/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  RocketLaunch,
  Table,
  PencilSimple,
  ListChecks,
  Compass,
  Trophy,
  Exam,
};

interface TrainingSidebarProps {
  getModuleStatus: (id: ModuleId) => ModuleStatus;
  getModuleScore: (id: ModuleId) => ModuleScore | undefined;
  currentModule: ModuleId;
  viewingModule: ModuleId;
  completedCount: number;
  onModuleClick: (id: ModuleId) => void;
  onShowExamples: () => void;
  onGoHome: () => void;
}

function StatusIcon({ status }: { status: ModuleStatus }) {
  if (status === 'completed') {
    return <CheckCircle className='size-5 text-emerald-500' weight='fill' />;
  }
  if (status === 'locked') {
    return <Lock className='size-5 text-muted-foreground/50' />;
  }
  return <Circle className='size-5 text-primary' weight='fill' />;
}

export function TrainingSidebar({
  getModuleStatus,
  getModuleScore,
  viewingModule,
  completedCount,
  onModuleClick,
  onShowExamples,
  onGoHome,
}: TrainingSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className='hidden w-72 shrink-0 border-r bg-card md:flex md:flex-col'>
        <div className='border-b px-6 py-5'>
          <button
            onClick={onGoHome}
            className='mb-2 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground'
          >
            <ArrowLeft className='size-3.5' />
            <span>Back to home</span>
          </button>
          <h2 className='text-lg font-bold text-foreground'>TSIP Training</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            {completedCount} of 7 modules complete
          </p>
          <Progress
            value={completedCount}
            max={7}
            className='mt-3'
          />
        </div>

        <nav className='flex-1 overflow-y-auto py-2'>
          {MODULES.map(mod => {
            const status = getModuleStatus(mod.id);
            const score = getModuleScore(mod.id);
            const isViewing = mod.id === viewingModule;
            const Icon = ICON_MAP[mod.iconName];
            const scorePct = score && score.total > 0
              ? Math.round((score.correct / score.total) * 100)
              : null;

            return (
              <button
                key={mod.id}
                onClick={() => onModuleClick(mod.id)}
                disabled={status === 'locked'}
                className={cn(
                  'flex w-full items-center gap-3 px-6 py-3 text-left text-sm transition-colors',
                  isViewing &&
                    'border-l-4 border-l-primary bg-primary/5 font-medium text-foreground',
                  !isViewing &&
                    status !== 'locked' &&
                    'hover:bg-muted/50 text-foreground',
                  status === 'locked' &&
                    'cursor-not-allowed text-muted-foreground/50'
                )}
              >
                <StatusIcon status={status} />
                <div className='flex flex-1 items-center gap-2'>
                  {Icon && (
                    <Icon
                      className={cn(
                        'size-4',
                        status === 'locked'
                          ? 'text-muted-foreground/50'
                          : 'text-muted-foreground'
                      )}
                    />
                  )}
                  <span>{mod.title}</span>
                </div>
                {status === 'completed' && scorePct !== null && (
                  <span
                    className={cn(
                      'ml-auto rounded-full px-2 py-0.5 text-xs font-medium',
                      scorePct >= 80
                        ? 'bg-emerald-100 text-emerald-700'
                        : scorePct >= 50
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                    )}
                  >
                    {scorePct}%
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Examples button — always accessible */}
        <div className='border-t px-4 py-3'>
          <button
            onClick={onShowExamples}
            className='flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5'
          >
            <BookOpen className='size-5' />
            <span>View Examples</span>
          </button>
        </div>
      </aside>

      {/* Mobile module bar */}
      <div className='flex items-center gap-1 overflow-x-auto border-b bg-card px-4 py-3 md:hidden'>
        <button
          onClick={onGoHome}
          className='flex shrink-0 items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors'
        >
          <ArrowLeft className='size-3' />
        </button>
        {MODULES.map(mod => {
          const status = getModuleStatus(mod.id);
          const score = getModuleScore(mod.id);
          const isViewing = mod.id === viewingModule;
          const scorePct = score && score.total > 0
            ? Math.round((score.correct / score.total) * 100)
            : null;

          return (
            <button
              key={mod.id}
              onClick={() => onModuleClick(mod.id)}
              disabled={status === 'locked'}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                isViewing && 'bg-primary text-primary-foreground',
                !isViewing &&
                  status === 'completed' &&
                  'bg-emerald-100 text-emerald-700',
                !isViewing &&
                  status === 'current' &&
                  'bg-muted text-foreground',
                status === 'locked' &&
                  'cursor-not-allowed bg-muted text-muted-foreground/50'
              )}
            >
              <span>{mod.id}</span>
              <span className='hidden sm:inline'>{mod.title}</span>
              {status === 'completed' && scorePct !== null && (
                <span className='text-[10px] opacity-75'>({scorePct}%)</span>
              )}
            </button>
          );
        })}
        <button
          onClick={onShowExamples}
          className='flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors'
        >
          <BookOpen className='size-3.5' />
          <span>Examples</span>
        </button>
      </div>
    </>
  );
}
