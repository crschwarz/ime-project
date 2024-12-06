import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: 'patient' | 'case' | 'documents';
}

const steps = [
  { id: 'patient', name: 'Patient Information' },
  { id: 'case', name: 'Case Details' },
  { id: 'documents', name: 'Required Documents' },
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={cn(
                'group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
                index <= currentStepIndex
                  ? 'border-blue-600'
                  : 'border-gray-200'
              )}
            >
              <span className="text-sm font-medium">
                <span
                  className={cn(
                    'flex items-center gap-2',
                    index < currentStepIndex
                      ? 'text-blue-600'
                      : index === currentStepIndex
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  )}
                >
                  {index < currentStepIndex ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">{step.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium">{step.name}</span>
                    </>
                  )}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}