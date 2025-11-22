import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { FunctionParams } from '../types';

interface Graph3DProps {
  params: FunctionParams;
}

export const Graph3D: React.FC<Graph3DProps> = ({ params }) => {
  const { A, B, C } = params;

  const data = useMemo(() => {
    const size = 50;
    const range = 5;
    const xPoints = new Array(size).fill(0).map((_, i) => -range + (i * (2 * range)) / (size - 1));
    const yPoints = new Array(size).fill(0).map((_, i) => -range + (i * (2 * range)) / (size - 1));
    
    const zPoints: number[][] = [];

    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        const x = xPoints[j];
        const y = yPoints[i];
        // z = A * sin(B*x) * cos(C*y)
        const z = A * Math.sin(B * x) * Math.cos(C * y);
        row.push(z);
      }
      zPoints.push(row);
    }

    return { x: xPoints, y: yPoints, z: zPoints };
  }, [A, B, C]);

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <Plot
        data={[
          {
            z: data.z,
            x: data.x,
            y: data.y,
            type: 'surface',
            colorscale: 'Viridis',
            contours: {
              z: {
                show: true,
                usecolormap: true,
                highlightcolor: '#42f5e6',
                project: { z: true },
              },
            },
            opacity: 0.9,
          },
        ]}
        layout={{
          autosize: true,
          title: {
            text: `z = ${A.toFixed(1)}sin(${B.toFixed(1)}x)cos(${C.toFixed(1)}y)`,
            font: { color: '#e2e8f0', size: 16 },
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: {
            color: '#94a3b8',
          },
          scene: {
            xaxis: { title: 'X', gridcolor: '#334155', zerolinecolor: '#94a3b8' },
            yaxis: { title: 'Y', gridcolor: '#334155', zerolinecolor: '#94a3b8' },
            zaxis: { title: 'Z', gridcolor: '#334155', zerolinecolor: '#94a3b8' },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.2 },
            },
          },
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 50,
          },
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
        config={{
            displayModeBar: true,
            responsive: true,
        }}
      />
    </div>
  );
};