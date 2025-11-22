import React, { useState, useCallback } from 'react';
import { Graph3D } from './components/Graph3D';
import { ControlPanel } from './components/ControlPanel';
import { AIServicePanel } from './components/AIServicePanel';
import { FunctionParams } from './types';
import { Menu, Share2, Github } from 'lucide-react';

export default function App() {
  const [params, setParams] = useState<FunctionParams>({
    A: 1.5,
    B: 1.0,
    C: 1.0,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleParamChange = useCallback((key: keyof FunctionParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-900 text-white md:flex-row">
      {/* Header Mobile */}
      <header className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-3 md:hidden">
        <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          3D Math Explorer
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar Controls */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } absolute z-20 h-full w-80 flex-shrink-0 transform border-r border-slate-700 bg-slate-800 transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hidden md:block">
              3D Explorer
            </h1>
            <div className="flex space-x-2">
               {/* Placeholder icons for visual completeness */}
               <Share2 size={18} className="text-slate-500 hover:text-indigo-400 cursor-pointer" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mb-8 rounded-xl bg-slate-900/50 p-4 border border-slate-700/50">
              <h2 className="mb-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Target Function</h2>
              <div className="text-center font-mono text-lg text-indigo-300">
                z = A · sin(Bx) · cos(Cy)
              </div>
            </div>

            <ControlPanel params={params} onParamChange={handleParamChange} />
            
            <div className="my-6 border-t border-slate-700"></div>

            <AIServicePanel params={params} />
          </div>

          <div className="border-t border-slate-700 p-4 text-center text-xs text-slate-500">
            Powered by React, Plotly & Gemini
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative flex-1 bg-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
            <Graph3D params={params} />
        </div>
        
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </main>
    </div>
  );
}