
import React, { useState, useMemo } from 'react';
import { UserSettings, TimeEntry } from '../types';
import { calculateWeeklyPay } from '../services/calcService';
import { ChevronLeft, ChevronRight, Plus, Clock, DollarSign, Download } from 'lucide-react';
import TimeModal from './TimeModal';
import ExportModal from './ExportModal';

interface DashboardProps {
  settings: UserSettings;
  entries: TimeEntry[];
  onUpdateEntries: (entries: TimeEntry[]) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, entries, onUpdateEntries }) => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Get current week range (Mon-Sun)
  const weekData = useMemo(() => {
    const current = new Date(selectedWeek);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(current.setDate(diff));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d);
    }
    return week;
  }, [selectedWeek]);

  const currentWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.day);
    return entryDate >= weekData[0] && entryDate <= weekData[6];
  });

  const summary = calculateWeeklyPay(currentWeekEntries, settings);

  const handlePrevWeek = () => {
    const d = new Date(selectedWeek);
    d.setDate(d.getDate() - 7);
    setSelectedWeek(d);
  };

  const handleNextWeek = () => {
    const d = new Date(selectedWeek);
    d.setDate(d.getDate() + 7);
    setSelectedWeek(d);
  };

  const openAddModal = (date: Date) => {
    const existing = currentWeekEntries.find(e => new Date(e.day).toDateString() === date.toDateString());
    if (existing) {
      setEditingEntry(existing);
    } else {
      setEditingEntry({
        id: Math.random().toString(36).substr(2, 9),
        day: date.toISOString(),
        startTime: '09:00',
        endTime: '17:00',
        duration: 480
      });
    }
    setShowTimeModal(true);
  };

  const handleSaveEntry = (entry: TimeEntry) => {
    const filtered = entries.filter(e => e.id !== entry.id);
    onUpdateEntries([...filtered, entry]);
    setShowTimeModal(false);
  };

  const handleDeleteEntry = (id: string) => {
    onUpdateEntries(entries.filter(e => e.id !== id));
    setShowTimeModal(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Date Navigation */}
      <div className="bg-blue-600 px-6 pb-6 text-white">
        <div className="flex justify-between items-center mb-1">
          <p className="text-blue-100 text-sm font-medium">Current Pay Period</p>
          <button 
            onClick={() => setShowExportModal(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Download size={18} />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handlePrevWeek} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">
            {weekData[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {weekData[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h2>
          <button onClick={handleNextWeek} className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Days List */}
      <div className="p-4 space-y-2">
        {weekData.map((date, idx) => {
          const entry = currentWeekEntries.find(e => new Date(e.day).toDateString() === date.toDateString());
          const isToday = new Date().toDateString() === date.toDateString();
          
          return (
            <div 
              key={idx}
              onClick={() => openAddModal(date)}
              className={`bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-transparent active:border-blue-300 transition-all ${isToday ? 'ring-2 ring-blue-400' : ''}`}
            >
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-bold uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <span className="text-gray-900 font-semibold">{date.toLocaleDateString('en-US', { day: 'numeric' })}</span>
              </div>
              
              {entry ? (
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Shift</p>
                    <p className="text-sm font-medium text-gray-700">{entry.startTime} – {entry.endTime}</p>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <p className="text-xs text-gray-400 font-medium">Total</p>
                    <p className="text-sm font-bold text-blue-600">{(entry.duration / 60).toFixed(1)}h</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-300 italic text-sm">
                  <Plus size={16} />
                  <span>Tap to log time</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Persistent Footer */}
      <div className="sticky bottom-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6 m-4 border border-gray-100 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Hours</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{summary.totalHours.toFixed(1)}</span>
        </div>
        <div className="flex flex-col gap-1 border-x border-gray-100 px-4">
          <div className="flex items-center gap-1 text-gray-400">
            <DollarSign size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Gross</span>
          </div>
          <span className="text-lg font-bold text-gray-800">${summary.grossPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex flex-col gap-1 pl-2">
          <div className="flex items-center gap-1 text-blue-500">
            <ShieldCheckIcon size={14} />
            <span className="text-[10px] font-bold uppercase tracking-tight">Net Pay</span>
          </div>
          <span className="text-lg font-bold text-blue-600">${summary.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      {showTimeModal && editingEntry && (
        <TimeModal 
          entry={editingEntry}
          onSave={handleSaveEntry}
          onDelete={handleDeleteEntry}
          onClose={() => setShowTimeModal(false)}
        />
      )}

      {showExportModal && (
        <ExportModal 
          summary={summary}
          entries={currentWeekEntries}
          settings={settings}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

const ShieldCheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Dashboard;
