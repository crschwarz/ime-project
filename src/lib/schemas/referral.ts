import { z } from 'zod';

export const patientSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address').optional(),
  address: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().length(2, 'Please enter a valid state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
});

export const caseSchema = z.object({
  caseNumber: z.string().min(1, 'Case number is required'),
  claimNumber: z.string().optional(),
  dateOfInjury: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  injuryDescription: z.string().min(10, 'Please provide a detailed description'),
  examType: z.enum(['initial', 'followUp', 'permanent']),
  specialtyRequired: z.string().min(1, 'Please select a specialty'),
  urgentRequest: z.boolean(),
  previousExams: z.boolean(),
});

export const documentSchema = z.object({
  medicalRecords: z.boolean(),
  diagnosticReports: z.boolean(),
  priorAuthDocuments: z.boolean(),
  otherDocuments: z.boolean(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
export type CaseFormData = z.infer<typeof caseSchema>;
export type DocumentFormData = z.infer<typeof documentSchema>;