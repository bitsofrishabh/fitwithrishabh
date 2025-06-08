import React from 'react';

interface WeightGraphProps {
  weights: { [day: string]: number };
}

export default function WeightGraph({ weights }: WeightGraphProps) {
  const entries = Object.entries(weights)
    .map(([day, weight]) => ({ day: parseInt(day, 10), weight }))
    .sort((a, b) => a.day - b.day);

  if (entries.length === 0) {
    return <p className="text-gray-600">No weight data available.</p>;
  }

  const width = 500;
  const height = 300;
  const padding = 40;

  const minX = entries[0].day;
  const maxX = entries[entries.length - 1].day;
  const minY = Math.min(...entries.map(e => e.weight));
  const maxY = Math.max(...entries.map(e => e.weight));

  const xScale = (x: number) =>
    padding + ((x - minX) * (width - padding * 2)) / Math.max(1, maxX - minX);
  const yScale = (y: number) =>
    height - padding - ((y - minY) * (height - padding * 2)) / Math.max(1, maxY - minY);

  const points = entries.map(e => `${xScale(e.day)},${yScale(e.weight)}`).join(' ');

  return (
    <svg width={width} height={height} className="mx-auto mt-4">
      <polyline
        points={points}
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
      />
      {entries.map(e => (
        <circle
          key={e.day}
          cx={xScale(e.day)}
          cy={yScale(e.weight)}
          r={3}
          fill="#14b8a6"
        />
      ))}
      {/* Axes */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="#e5e7eb"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="#e5e7eb"
      />
    </svg>
  );
}
