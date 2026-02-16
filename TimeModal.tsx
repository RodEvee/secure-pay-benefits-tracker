
import React, { useState } from 'react';
import { TimeEntry } from '../types';
import { X, Trash2 } from 'lucide-react';

interface TimeModalProps {
  entry: TimeEntry;
  onSave: (entry: TimeEntry) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const TimeModal: React.FC<TimeModalProps> = ({ entry, onSave, onDelete, onClose }) => {
  const [startTime, setStartTime] = useState(entry.startTime);
  const [endTime, setEndTime] = useState(entry.endTime);

  const calculateDuration = (start: string, end: string) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    return endTotal - startTotal;
  };

  const handleSave = () => {
    const duration = calculateDuration(startTime, endTime);
    onSave({
      ...entry,
      startTime,
      endTime,
      duration: duration > 0 ? duration : duration + 1440 // Handle overnight shifts
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Log Time for {new Date(entry.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Mock Time Wheels */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Start Time</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">End Time</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
            <span className="text-blue-700 font-medium">Estimated Duration:</span>
            <span className="text-blue-700 font-bold text-lg">
              {(calculateDuration(startTime, endTime) / 60).toFixed(2)} hours
            </span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => onDelete(entry.id)}
              className="flex-none bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-100 transition-colors"
            >
              <Trash2 size={24} />
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Save Time Entry
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TimeModal;
