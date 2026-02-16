
import React from 'react';
import { AppView } from '../types';
import { Home, History, Settings as SettingsIcon, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="bg-blue-600 px-6 py-6 pb-8 shadow-lg z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold tracking-tight">
            {currentView === AppView.DASHBOARD && "Pay & Benefits"}
            {currentView === AppView.HISTORY && "Payment History"}
            {currentView === AppView.SETTINGS && "Settings"}
          </h1>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 -mt-4 rounded-t-2xl bg-gray-50 z-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-30">
        <button 
          onClick={() => setView(AppView.DASHBOARD)}
          className={`flex flex-col items-center gap-1 ${currentView === AppView.DASHBOARD ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Home size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Tracker</span>
        </button>
        <button 
          onClick={() => setView(AppView.HISTORY)}
          className={`flex flex-col items-center gap-1 ${currentView === AppView.HISTORY ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <History size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">History</span>
        </button>
        <button 
          onClick={() => setView(AppView.SETTINGS)}
          className={`flex flex-col items-center gap-1 ${currentView === AppView.SETTINGS ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <SettingsIcon size={22} />
          <span className="text-[10px] font-medium uppercase tracking-wider">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
