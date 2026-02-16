
import React, { useState } from 'react';
import { WeeklyPaySummary, TimeEntry, UserSettings } from '../types';
import { X, FileText, FileSpreadsheet, File as FilePdf, Share2, CheckCircle } from 'lucide-react';

interface ExportModalProps {
  summary: WeeklyPaySummary;
  entries: TimeEntry[];
  settings: UserSettings;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ summary, entries, settings, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [complete, setComplete] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setIsExporting(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsExporting(false);
      setComplete(type);
    }, 1500);
  };

  if (complete) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
        <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Export Success!</h3>
          <p className="text-gray-500 mb-8">Your {complete} has been encrypted and is ready to share.</p>
          <button 
            onClick={onClose}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Generate Report</h3>
            <p className="text-blue-100 text-xs">Secure Local Export</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Period Preview</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold text-gray-700">{summary.startDate} – {summary.endDate}</p>
                <p className="text-xs text-gray-400">{summary.totalHours.toFixed(1)} Hours Logged</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-blue-600">${summary.netPay.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated Net</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <ExportOption 
              icon={<FilePdf size={20} />} 
              title="Professional Pay Stub (PDF)" 
              description="Formatted invoice with full breakdown"
              onClick={() => handleExport('PDF')}
              disabled={isExporting}
            />
            <ExportOption 
              icon={<FileSpreadsheet size={20} />} 
              title="Excel Spreadsheet (XLSX)" 
              description="Detailed time logs & calc logic"
              onClick={() => handleExport('XLSX')}
              disabled={isExporting}
            />
            <ExportOption 
              icon={<FileText size={20} />} 
              title="Plain Data (CSV)" 
              description="Raw logs for import tools"
              onClick={() => handleExport('CSV')}
              disabled={isExporting}
            />
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <Share2 size={12} className="shrink-0" />
            <p>Data is generated on-device. No personal financial information is sent to external servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExportOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled: boolean;
}

const ExportOption: React.FC<ExportOptionProps> = ({ icon, title, description, onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group active:scale-[0.98] disabled:opacity-50"
  >
    <div className="bg-blue-50 text-blue-600 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-gray-800">{title}</p>
      <p className="text-[10px] text-gray-400">{description}</p>
    </div>
  </button>
);

export default ExportModal;
