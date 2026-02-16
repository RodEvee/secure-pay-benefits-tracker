
import React, { useState, useEffect } from 'react';
import { Fingerprint, ShieldCheck, Smartphone, MessageSquare, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [step, setStep] = useState<'BIO' | 'SENDING' | 'SMS' | 'SUCCESS'>('BIO');
  const [otp, setOtp] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleBiometricClick = () => {
    setStep('SENDING');
    // Simulate biometric processing then transition to SMS sending
    setTimeout(() => {
      setStep('SMS');
      triggerSMSNotification();
    }, 1500);
  };

  const triggerSMSNotification = () => {
    setShowNotification(true);
    // Hide notification after 5 seconds
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleResendCode = () => {
    setIsResending(true);
    // Simulate network delay for resending
    setTimeout(() => {
      setIsResending(false);
      triggerSMSNotification();
    }, 1000);
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setStep('SUCCESS');
      setTimeout(() => {
        onAuthSuccess();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-blue-600 p-8 text-white overflow-hidden relative">
      {/* Simulated SMS Notification */}
      <div className={`fixed top-4 left-4 right-4 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4 flex gap-4 text-gray-900 transition-all duration-500 z-50 transform ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'}`}>
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <MessageSquare size={20} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-xs font-bold text-blue-600">MESSAGES</p>
            <p className="text-[10px] text-gray-400 font-medium">now</p>
          </div>
          <p className="text-sm font-semibold leading-tight">Your Secure Pay code is 882-941. Do not share this with anyone.</p>
        </div>
      </div>

      {step === 'BIO' && (
        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in duration-300">
          <div className="bg-white/20 p-6 rounded-full shadow-inner border border-white/10">
            <ShieldCheck size={64} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black mb-2 tracking-tight">Secure Pay</h1>
            <p className="text-blue-100 font-medium opacity-80">Device Authentication Required</p>
          </div>

          <button 
            onClick={handleBiometricClick}
            className="mt-12 bg-white text-blue-600 p-8 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all active:scale-90 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
          >
            <Fingerprint size={56} />
          </button>

          <p className="mt-4 text-sm text-blue-100 font-bold animate-pulse tracking-wide">
            TAP TO SCAN FACE / FINGERPRINT
          </p>
        </div>
      )}

      {step === 'SENDING' && (
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Smartphone size={32} />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">Verifying Biometrics...</p>
            <p className="text-blue-200 text-sm mt-2">Sending secure SMS code next</p>
          </div>
        </div>
      )}

      {step === 'SMS' && (
        <div className="flex flex-col items-center gap-8 w-full max-w-xs animate-in slide-in-from-bottom-10 duration-500">
          <div className="text-center space-y-4">
            <div className="inline-flex bg-white/10 p-4 rounded-2xl">
              <Smartphone size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Enter Code</h2>
            <p className="text-blue-100 text-sm font-medium leading-relaxed">
              We've sent a 6-digit verification code to your phone <br/>
              <span className="text-white font-bold tracking-wider">+1 786-877-6575</span>
            </p>
          </div>
          
          <form onSubmit={handle2FASubmit} className="w-full space-y-4">
            <div className="relative">
              <input 
                autoFocus
                type="text"
                pattern="\d*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-5 text-center text-4xl font-mono tracking-[0.2em] focus:outline-none focus:border-white focus:bg-white/20 transition-all placeholder:text-white/20 shadow-inner"
              />
            </div>

            <div className="flex justify-center">
              <button 
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="flex items-center gap-2 text-blue-200 text-sm font-semibold hover:text-white transition-colors disabled:opacity-50"
              >
                <RotateCcw size={14} className={isResending ? 'animate-spin' : ''} />
                {isResending ? 'Resending...' : 'Resend code'}
              </button>
            </div>

            <button 
              type="submit"
              disabled={otp.length !== 6}
              className="w-full bg-white text-blue-600 font-black py-5 rounded-2xl shadow-2xl disabled:opacity-50 disabled:translate-y-0 transition-all active:scale-95 flex items-center justify-center gap-2 group mt-2"
            >
              Verify Identity
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="text-center space-y-2">
            <button 
              onClick={() => { setStep('BIO'); setOtp(''); }}
              className="text-blue-200 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest opacity-80"
            >
              Back to Biometric
            </button>
            <p className="text-[10px] text-blue-300 font-medium uppercase tracking-widest opacity-60">
              Encrypted Session ID: 8X-992-P0
            </p>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-300">
          <div className="bg-white text-blue-600 p-6 rounded-full shadow-2xl">
            <CheckCircle2 size={64} />
          </div>
          <h2 className="text-3xl font-black">Authorized</h2>
          <p className="text-blue-100 opacity-80 font-medium">Decryption Complete</p>
        </div>
      )}

      <footer className="absolute bottom-8 px-8 text-[11px] text-blue-200/60 font-medium text-center leading-relaxed">
        <p className="mb-1 uppercase tracking-widest">End-to-End Encrypted</p>
        All sensitive financial data is stored locally on this physical device. No unencrypted data is transmitted.
      </footer>
    </div>
  );
};

export default Auth;
