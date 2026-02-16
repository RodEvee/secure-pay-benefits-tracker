
import React, { useState } from 'react';
import { UserSettings } from '../types';
import { Save, Info, Briefcase, Heart, Shield } from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings }) => {
  const [formData, setFormData] = useState<UserSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateNested = (category: keyof UserSettings, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value
      }
    }));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Income Settings */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Briefcase size={20} />
          <h3 className="font-bold text-lg">Income Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Hourly Rate ($)</label>
            <input 
              type="number" 
              value={formData.salary.hourlyRate}
              onChange={(e) => updateNested('salary', 'hourlyRate', parseFloat(e.target.value))}
              className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Overtime Multiplier (1.5x)</span>
              <div className="group relative">
                <Info size={14} className="text-gray-300" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Applies time-and-a-half rate after the threshold.
                </span>
              </div>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Weekly OT Threshold (Hours)</label>
            <input 
              type="number" 
              value={formData.salary.otThreshold}
              onChange={(e) => updateNested('salary', 'otThreshold', parseFloat(e.target.value))}
              className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Pre-Tax Deductions */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Shield size={20} />
          <h3 className="font-bold text-lg">Retirement (401k)</h3>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
          <button 
            onClick={() => updateNested('deductions', 'isK401Percent', true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.deductions.isK401Percent ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            Percentage (%)
          </button>
          <button 
            onClick={() => updateNested('deductions', 'isK401Percent', false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!formData.deductions.isK401Percent ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            Fixed Amount ($)
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Employee Contrib.</label>
            <input 
              type="number" 
              value={formData.deductions.isK401Percent ? formData.deductions.k401EmployeePercent : formData.deductions.k401EmployeeAmount}
              onChange={(e) => updateNested('deductions', formData.deductions.isK401Percent ? 'k401EmployeePercent' : 'k401EmployeeAmount', parseFloat(e.target.value))}
              className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 font-semibold outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Employer Match (%)</label>
            <input 
              type="number" 
              value={formData.deductions.k401EmployerMatchPercent}
              onChange={(e) => updateNested('deductions', 'k401EmployerMatchPercent', parseFloat(e.target.value))}
              className="w-full bg-gray-50 border-gray-100 rounded-xl p-3 font-semibold outline-none"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Heart size={20} />
          <h3 className="font-bold text-lg">Insurance & Benefits</h3>
        </div>

        <BenefitInput 
          label="Healthcare" 
          employee={formData.deductions.healthEmployee} 
          employer={formData.deductions.healthEmployer}
          onUpdate={(e, v) => updateNested('deductions', e ? 'healthEmployee' : 'healthEmployer', v)}
        />
        <BenefitInput 
          label="Dental" 
          employee={formData.deductions.dentalEmployee} 
          employer={formData.deductions.dentalEmployer}
          onUpdate={(e, v) => updateNested('deductions', e ? 'dentalEmployee' : 'dentalEmployer', v)}
        />
        <BenefitInput 
          label="Vision" 
          employee={formData.deductions.visionEmployee} 
          employer={formData.deductions.visionEmployer}
          onUpdate={(e, v) => updateNested('deductions', e ? 'visionEmployee' : 'visionEmployer', v)}
        />
      </section>

      <button 
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${isSaved ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        <Save size={20} />
        {isSaved ? 'Settings Saved!' : 'Update Payroll Profile'}
      </button>
    </div>
  );
};

interface BenefitInputProps {
  label: string;
  employee: number;
  employer: number;
  onUpdate: (isEmployee: boolean, val: number) => void;
}

const BenefitInput: React.FC<BenefitInputProps> = ({ label, employee, employer, onUpdate }) => (
  <div className="space-y-2 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
    <p className="text-sm font-bold text-gray-700 mb-2">{label}</p>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Your Cost ($/wk)</label>
        <input 
          type="number" 
          value={employee}
          onChange={(e) => onUpdate(true, parseFloat(e.target.value))}
          className="w-full bg-gray-50 rounded-lg p-2 text-sm font-medium outline-none"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Employer Paid ($/wk)</label>
        <input 
          type="number" 
          value={employer}
          onChange={(e) => onUpdate(false, parseFloat(e.target.value))}
          className="w-full bg-gray-50 rounded-lg p-2 text-sm font-medium outline-none"
        />
      </div>
    </div>
  </div>
);

export default Settings;
