
import React from 'react';

interface HeaderProps {
  activeTab: 'nutrition' | 'workout';
  onTabChange: (tab: 'nutrition' | 'workout') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-zinc-100 z-[999] h-16 px-6">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-zinc-900 w-7 h-7 flex items-center justify-center rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-[11px] font-black tracking-tighter text-zinc-900 uppercase">
            NutriAI <span className="text-zinc-300">Expert</span>
          </h1>
        </div>
        <nav className="flex gap-8 h-full">
          <button 
            onClick={() => onTabChange('nutrition')}
            className={`h-full flex items-center text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'nutrition' ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Nutrição
            {activeTab === 'nutrition' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900"></span>}
          </button>
          <button 
            onClick={() => onTabChange('workout')}
            className={`h-full flex items-center text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'workout' ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Treino
            {activeTab === 'workout' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900"></span>}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
