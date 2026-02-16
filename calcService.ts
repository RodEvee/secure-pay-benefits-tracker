
import { TimeEntry, UserSettings, WeeklyPaySummary } from '../types';

export const calculateWeeklyPay = (entries: TimeEntry[], settings: UserSettings): WeeklyPaySummary => {
  const totalMinutes = entries.reduce((acc, entry) => acc + entry.duration, 0);
  const totalHours = totalMinutes / 60;
  
  const hourlyRate = settings.salary.hourlyRate;
  const otThreshold = settings.salary.otThreshold;
  const otMultiplier = settings.salary.otMultiplier;

  let regularHours = Math.min(totalHours, otThreshold);
  let overtimeHours = Math.max(0, totalHours - otThreshold);

  const grossPay = (regularHours * hourlyRate) + (overtimeHours * hourlyRate * otMultiplier);

  // Pre-tax 401k
  let k401Employee = 0;
  if (settings.deductions.isK401Percent) {
    k401Employee = grossPay * (settings.deductions.k401EmployeePercent / 100);
  } else {
    k401Employee = settings.deductions.k401EmployeeAmount;
  }

  const insuranceDeductions = settings.deductions.healthEmployee + 
                               settings.deductions.dentalEmployee + 
                               settings.deductions.visionEmployee;

  const totalDeductions = k401Employee + insuranceDeductions;
  const netPay = Math.max(0, grossPay - totalDeductions);

  // Hidden/Report Logic: Total Compensation
  const employer401kMatch = k401Employee * (settings.deductions.k401EmployerMatchPercent / 100);
  const employerInsurance = settings.deductions.healthEmployer + 
                              settings.deductions.dentalEmployer + 
                              settings.deductions.visionEmployer;
  
  const totalCompensation = grossPay + employer401kMatch + employerInsurance;

  // Find start/end dates from entries
  const dates = entries.map(e => new Date(e.day).getTime());
  const startDate = entries.length > 0 ? new Date(Math.min(...dates)).toLocaleDateString() : 'N/A';
  const endDate = entries.length > 0 ? new Date(Math.max(...dates)).toLocaleDateString() : 'N/A';

  return {
    startDate,
    endDate,
    totalHours,
    grossPay,
    netPay,
    totalDeductions,
    totalCompensation
  };
};
