import { Button } from '@/components/ui/button';
import { documentSchema, type DocumentFormData } from '@/lib/schemas/referral';
import { zodResolver } from '@hookform/resolvers/zod';
import { File, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

interface DocumentUploadProps {
  onSubmit: (data: DocumentFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<DocumentFormData>;
}

interface UploadedFile {
  file: File;
  type: keyof DocumentFormData;
}

export function DocumentUpload({ onSubmit, onBack, defaultValues }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        type: 'otherDocuments' as keyof DocumentFormData,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setValue('otherDocuments', true);
    },
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      if (newFiles.length === 0) {
        setValue('otherDocuments', false);
      }
      return newFiles;
    });
  };

  const watchedFields = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="medicalRecords"
                type="checkbox"
                {...register('medicalRecords')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="medicalRecords" className="ml-2 block text-sm text-gray-700">
                Medical Records
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="diagnosticReports"
                type="checkbox"
                {...register('diagnosticReports')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="diagnosticReports" className="ml-2 block text-sm text-gray-700">
                Diagnostic Reports (X-rays, MRI, CT scans)
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="priorAuthDocuments"
                type="checkbox"
                {...register('priorAuthDocuments')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="priorAuthDocuments" className="ml-2 block text-sm text-gray-700">
                Prior Authorization Documents
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="otherDocuments"
                type="checkbox"
                {...register('otherDocuments')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="otherDocuments" className="ml-2 block text-sm text-gray-700">
                Other Supporting Documents
              </label>
            </div>
          </div>

          <div
            {...getRootProps()}
            className={`mt-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? 'Drop the files here...'
                : 'Drag and drop files here, or click to select files'}
            </p>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Uploaded Files</h4>
              <ul className="divide-y divide-gray-200">
                {uploadedFiles.map((uploadedFile, index) => (
                  <li key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <File className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploadedFile.file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          disabled={!Object.values(watchedFields).some(Boolean)}
        >
          Submit Referral
        </Button>
      </div>
    </form>
  );
}