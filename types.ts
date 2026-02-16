
export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  SETTINGS = 'SETTINGS'
}

export interface TimeEntry {
  id: string;
  day: string; // ISO Date String
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  duration: number; // minutes
}

export interface DeductionSettings {
  healthEmployee: number;
  healthEmployer: number;
  dentalEmployee: number;
  dentalEmployer: number;
  visionEmployee: number;
  visionEmployer: number;
  k401EmployeeAmount: number;
  k401EmployeePercent: number;
  k401EmployerMatchPercent: number;
  isK401Percent: boolean;
}

export interface SalarySettings {
  hourlyRate: number;
  otThreshold: number; // e.g. 40 hours
  otMultiplier: number; // e.g. 1.5
}

export interface UserSettings {
  salary: SalarySettings;
  deductions: DeductionSettings;
  isBiometricEnabled: boolean;
  is2FAEnabled: boolean;
}

export interface WeeklyPaySummary {
  startDate: string;
  endDate: string;
  totalHours: number;
  grossPay: number;
  netPay: number;
  totalDeductions: number;
  totalCompensation: number;
}
