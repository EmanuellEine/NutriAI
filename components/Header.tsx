
import React from 'react';

interface HeaderProps {
  activeTab: 'nutrition' | 'workout';
  onTabChange: (tab: 'nutrition' | 'workout') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-[100] border-b border-zinc-100 py-6 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 p-2 rounded-xl shadow-lg shadow-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-base font-black tracking-tight text-zinc-900 uppercase">
            NutriAI <span className="text-zinc-300 font-bold">Expert</span>
          </h1>
        </div>
        <nav className="flex gap-8 md:gap-12 text-xs font-bold uppercase tracking-[0.2em]">
          <button 
            onClick={() => onTabChange('nutrition')}
            className={`transition-all pb-2 border-b-2 ${activeTab === 'nutrition' ? 'text-zinc-900 border-zinc-900' : 'text-zinc-400 border-transparent hover:text-zinc-600'}`}
          >
            Nutrição
          </button>
          <button 
            onClick={() => onTabChange('workout')}
            className={`transition-all pb-2 border-b-2 ${activeTab === 'workout' ? 'text-zinc-900 border-zinc-900' : 'text-zinc-400 border-transparent hover:text-zinc-600'}`}
          >
            Treino
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
