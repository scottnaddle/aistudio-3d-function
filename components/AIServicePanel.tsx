import React, { useState } from 'react';
import { FunctionParams } from '../types';
import { analyzeFunction } from '../services/geminiService';
import { Sparkles, Loader2, Info } from 'lucide-react';

interface AIServicePanelProps {
  params: FunctionParams;
}

export const AIServicePanel: React.FC<AIServicePanelProps> = ({ params }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeFunction(params);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-pink-400">
          <Sparkles size={20} />
          <h3 className="font-semibold">AI Analysis</h3>
        </div>
      </div>

      <div className="rounded-xl bg-slate-800 border border-slate-700 p-1 shadow-inner">
        {!analysis && !loading && (
            <div className="p-4 text-center text-slate-400 text-sm">
                <p className="mb-3">Get insights about the current wave geometry.</p>
                <button
                onClick={handleAnalyze}
                className="w-full rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-pink-500 hover:to-purple-500 active:scale-95"
                >
                Analyze Graph
                </button>
            </div>
        )}

        {loading && (
            <div className="flex flex-col items-center justify-center p-6 text-slate-400">
                <Loader2 size={24} className="animate-spin mb-2 text-pink-500" />
                <span className="text-xs">Consulting Gemini...</span>
            </div>
        )}

        {analysis && !loading && (
            <div className="p-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                    {analysis}
                </p>
                <button 
                    onClick={handleAnalyze}
                    className="mt-3 text-xs text-pink-400 hover:text-pink-300 underline decoration-pink-400/30 underline-offset-4"
                >
                    Refresh Analysis
                </button>
            </div>
        )}
      </div>
      
      <div className="flex gap-2 rounded-md bg-blue-500/10 p-3 text-xs text-blue-200">
        <Info size={16} className="flex-shrink-0 text-blue-400" />
        <p>
            Try adjusting coefficients A, B, or C and hitting "Refresh Analysis" to see how the geometry changes.
        </p>
      </div>
    </div>
  );
};