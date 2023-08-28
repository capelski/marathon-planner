import { Chart } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

export type ChartData = {
  backgroundColor?: string;
  label: string;
  value: any;
};

export type ChartComponentProps = {
  data: ChartData[];
  options?: Chart.ChartConfiguration['options'];
  type: Chart.ChartConfiguration['type'];
};

export const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }

    const context = canvasRef.current?.getContext('2d');
    if (context) {
      setChart(
        new Chart(context, {
          data: {
            labels: props.data.map((x) => x.label),
            datasets: [
              {
                backgroundColor: props.data.map((x) => x.backgroundColor || ''),
                data: props.data.map((x) => x.value)
              }
            ]
          },
          options: props.options,
          type: props.type
        })
      );
    }
  }, [props.data]);

  return <canvas ref={canvasRef} />;
};
