import { ProgressIndicator } from '@/components/referral/progress-indicator';
import { CaseInfo } from '@/components/referral/case-info';
import { DocumentUpload } from '@/components/referral/document-upload';
import { PatientInfo } from '@/components/referral/patient-info';
import type { CaseFormData, DocumentFormData, PatientFormData } from '@/lib/schemas/referral';
import { useState } from 'react';

type Step = 'patient' | 'case' | 'documents';

export function NewReferralPage() {
  const [step, setStep] = useState<Step>('patient');
  const [formData, setFormData] = useState({
    patient: {} as PatientFormData,
    case: {} as CaseFormData,
    documents: {} as DocumentFormData,
  });

  const handlePatientSubmit = (data: PatientFormData) => {
    setFormData((prev) => ({ ...prev, patient: data }));
    setStep('case');
  };

  const handleCaseSubmit = (data: CaseFormData) => {
    setFormData((prev) => ({ ...prev, case: data }));
    setStep('documents');
  };

  const handleDocumentSubmit = async (data: DocumentFormData) => {
    setFormData((prev) => ({ ...prev, documents: data }));
    // TODO: Submit the complete form data to the backend
    console.log('Complete form data:', { ...formData, documents: data });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <ProgressIndicator currentStep={step} />
        </div>

        <div className="space-y-6 bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">New IME Referral</h3>
            <p className="mt-1 text-sm text-gray-500">
              Please provide the following information to submit a new IME referral.
            </p>
          </div>

          <div className="mt-5">
            {step === 'patient' && (
              <PatientInfo
                onSubmit={handlePatientSubmit}
                defaultValues={formData.patient}
              />
            )}
            {step === 'case' && (
              <CaseInfo
                onSubmit={handleCaseSubmit}
                onBack={() => setStep('patient')}
                defaultValues={formData.case}
              />
            )}
            {step === 'documents' && (
              <DocumentUpload
                onSubmit={handleDocumentSubmit}
                onBack={() => setStep('case')}
                defaultValues={formData.documents}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}