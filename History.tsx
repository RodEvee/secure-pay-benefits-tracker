
import React, { useMemo } from 'react';
import { TimeEntry, UserSettings } from '../types';
import { calculateWeeklyPay } from '../services/calcService';
import { TrendingUp, Calendar, ArrowRight } from 'lucide-react';

interface HistoryProps {
  entries: TimeEntry[];
  settings: UserSettings;
}

const History: React.FC<HistoryProps> = ({ entries, settings }) => {
  const weeklySummaries = useMemo(() => {
    // Group entries by week-year (Monday-based)
    const groups: Record<string, TimeEntry[]> = {};
    
    entries.forEach(entry => {
      const d = new Date(entry.day);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(d.setDate(diff)).toDateString();
      
      if (!groups[monday]) groups[monday] = [];
      groups[monday].push(entry);
    });

    return Object.keys(groups)
      .map(monday => calculateWeeklyPay(groups[monday], settings))
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [entries, settings]);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Lifetime Net Pay</h2>
          <p className="text-3xl font-black text-gray-900">
            ${weeklySummaries.reduce((acc, s) => acc + s.netPay, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-green-100 p-3 rounded-full text-green-600">
          <TrendingUp size={28} />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-gray-500 text-sm font-semibold ml-1">Previous Weeks</h3>
        {weeklySummaries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400">No payment history yet.</p>
          </div>
        ) : (
          weeklySummaries.map((summary, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors group cursor-pointer">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-blue-600 uppercase">{summary.startDate} – {summary.endDate}</span>
                <span className="text-gray-500 text-sm">{summary.totalHours.toFixed(1)} Hours Worked</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${summary.netPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Net Pay</p>
                </div>
                <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
