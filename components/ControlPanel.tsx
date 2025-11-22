import React from 'react';
import { FunctionParams } from '../types';
import { Sliders } from 'lucide-react';

interface ControlPanelProps {
  params: FunctionParams;
  onParamChange: (key: keyof FunctionParams, value: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ params, onParamChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-indigo-400">
        <Sliders size={20} />
        <h3 className="font-semibold">Parameters</h3>
      </div>

      {/* Parameter A */}
      <div className="group">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="param-a" className="text-sm font-medium text-slate-300">
            Amplitude (A)
          </label>
          <span className="rounded bg-indigo-500/10 px-2 py-1 text-xs font-mono font-bold text-indigo-400">
            {params.A.toFixed(2)}
          </span>
        </div>
        <input
          id="param-a"
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={params.A}
          onChange={(e) => onParamChange('A', parseFloat(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-indigo-500 outline-none transition-all hover:bg-slate-600 focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      {/* Parameter B */}
      <div className="group">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="param-b" className="text-sm font-medium text-slate-300">
            Frequency X (B)
          </label>
          <span className="rounded bg-cyan-500/10 px-2 py-1 text-xs font-mono font-bold text-cyan-400">
            {params.B.toFixed(2)}
          </span>
        </div>
        <input
          id="param-b"
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={params.B}
          onChange={(e) => onParamChange('B', parseFloat(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-500 outline-none transition-all hover:bg-slate-600 focus:ring-2 focus:ring-cyan-500/50"
        />
      </div>

      {/* Parameter C */}
      <div className="group">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="param-c" className="text-sm font-medium text-slate-300">
            Frequency Y (C)
          </label>
          <span className="rounded bg-emerald-500/10 px-2 py-1 text-xs font-mono font-bold text-emerald-400">
            {params.C.toFixed(2)}
          </span>
        </div>
        <input
          id="param-c"
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={params.C}
          onChange={(e) => onParamChange('C', parseFloat(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500 outline-none transition-all hover:bg-slate-600 focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>
    </div>
  );
};