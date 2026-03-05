import React from 'react';

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse text-sm">Loading...</p>
    </div>
  </div>
);

export default PageLoader;
