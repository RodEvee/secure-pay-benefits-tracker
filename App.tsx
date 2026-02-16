
import React, { useState, useEffect } from 'react';
import { AppView, UserSettings, TimeEntry } from './types';
import { storageService } from './services/storageService';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Settings from './components/Settings';
import Layout from './components/Layout';

const DEFAULT_SETTINGS: UserSettings = {
  salary: {
    hourlyRate: 25,
    otThreshold: 40,
    otMultiplier: 1.5
  },
  deductions: {
    healthEmployee: 50,
    healthEmployer: 200,
    dentalEmployee: 5,
    dentalEmployer: 10,
    visionEmployee: 2,
    visionEmployer: 5,
    k401EmployeeAmount: 100,
    k401EmployeePercent: 5,
    k401EmployerMatchPercent: 50,
    isK401Percent: true
  },
  isBiometricEnabled: true,
  is2FAEnabled: false
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.AUTH);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    const savedSettings = storageService.load('user_settings');
    const savedEntries = storageService.load('time_entries');
    if (savedSettings) setSettings(savedSettings);
    if (savedEntries) setEntries(savedEntries);
  }, []);

  const handleAuthSuccess = () => {
    setView(AppView.DASHBOARD);
  };

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    storageService.save('user_settings', newSettings);
  };

  const updateEntries = (newEntries: TimeEntry[]) => {
    setEntries(newEntries);
    storageService.save('time_entries', newEntries);
  };

  if (view === AppView.AUTH) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <Layout currentView={view} setView={setView}>
      {view === AppView.DASHBOARD && (
        <Dashboard 
          settings={settings} 
          entries={entries} 
          onUpdateEntries={updateEntries} 
        />
      )}
      {view === AppView.HISTORY && (
        <History entries={entries} settings={settings} />
      )}
      {view === AppView.SETTINGS && (
        <Settings settings={settings} onUpdateSettings={updateSettings} />
      )}
    </Layout>
  );
};

export default App;
