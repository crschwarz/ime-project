import { Input } from '@/components/ui/input';
import { caseSchema, type CaseFormData } from '@/lib/schemas/referral';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface CaseInfoProps {
  onSubmit: (data: CaseFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<CaseFormData>;
}

export function CaseInfo({ onSubmit, onBack, defaultValues }: CaseInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700">
            Case Number
          </label>
          <Input
            id="caseNumber"
            {...register('caseNumber')}
            error={errors.caseNumber?.message}
          />
        </div>

        <div>
          <label htmlFor="claimNumber" className="block text-sm font-medium text-gray-700">
            Claim Number (Optional)
          </label>
          <Input
            id="claimNumber"
            {...register('claimNumber')}
            error={errors.claimNumber?.message}
          />
        </div>

        <div>
          <label htmlFor="dateOfInjury" className="block text-sm font-medium text-gray-700">
            Date of Injury
          </label>
          <Input
            id="dateOfInjury"
            type="date"
            {...register('dateOfInjury')}
            error={errors.dateOfInjury?.message}
          />
        </div>

        <div>
          <label htmlFor="examType" className="block text-sm font-medium text-gray-700">
            Exam Type
          </label>
          <select
            id="examType"
            {...register('examType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select exam type</option>
            <option value="initial">Initial Evaluation</option>
            <option value="followUp">Follow-up Evaluation</option>
            <option value="permanent">Permanent Impairment Rating</option>
          </select>
          {errors.examType?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.examType.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="injuryDescription" className="block text-sm font-medium text-gray-700">
            Injury Description
          </label>
          <textarea
            id="injuryDescription"
            {...register('injuryDescription')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.injuryDescription?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.injuryDescription.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="specialtyRequired" className="block text-sm font-medium text-gray-700">
            Specialty Required
          </label>
          <select
            id="specialtyRequired"
            {...register('specialtyRequired')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select specialty</option>
            <option value="orthopedic">Orthopedic</option>
            <option value="neurology">Neurology</option>
            <option value="psychiatry">Psychiatry</option>
            <option value="physical-medicine">Physical Medicine</option>
          </select>
          {errors.specialtyRequired?.message && (
            <p className="mt-1 text-sm text-red-500">{errors.specialtyRequired.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                id="urgentRequest"
                type="checkbox"
                {...register('urgentRequest')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="urgentRequest" className="ml-2 block text-sm text-gray-700">
                Urgent Request
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="previousExams"
                type="checkbox"
                {...register('previousExams')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="previousExams" className="ml-2 block text-sm text-gray-700">
                Previous IME Exams
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </form>
  );
}