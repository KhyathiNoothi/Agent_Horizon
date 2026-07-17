'use client';

import { useWidgetSDK, useTheme, useDisplayMode } from '@nitrostack/widgets';

interface ScoreData {
  label: string;
  score: number; // 0-100
  color: string;
}

interface IdeaAnalysisData {
  idea: string;
  summary?: string;
  scores: {
    feasibility: number;
    scalability: number;
    innovation: number;
    difficulty: number;
  };
}

function ScoreCircle({
  label,
  score,
  color,
  theme,
  size,
}: {
  label: string;
  score: number;
  color: string;
  theme: 'light' | 'dark' | null;
  size: number;
}) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, score)) / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme === 'dark' ? '#2a2a2a' : '#eaeaea'}
          strokeWidth={10}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={size * 0.24}
          fontWeight="700"
          fill={theme === 'dark' ? '#fff' : '#111'}
        >
          {score}
        </text>
      </svg>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme === 'dark' ? '#ccc' : '#444',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function IdeaAnalysisCard() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();
  const displayMode = useDisplayMode();

  if (!isReady) {
    return <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>Loading...</div>;
  }

  const data = getToolOutput<IdeaAnalysisData>();

  if (!data) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>No data available</div>
    );
  }

  const isFullscreen = displayMode === 'fullscreen';
  const circleSize = isFullscreen ? 140 : 108;

  const metrics: ScoreData[] = [
    { label: 'Feasibility', score: data.scores.feasibility, color: '#22c55e' },
    { label: 'Scalability', score: data.scores.scalability, color: '#3b82f6' },
    { label: 'Innovation', score: data.scores.innovation, color: '#a855f7' },
    { label: 'Difficulty', score: data.scores.difficulty, color: '#f97316' },
  ];

  const containerStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#0f0f0f' : '#ffffff',
    color: theme === 'dark' ? '#fff' : '#111',
    padding: isFullscreen ? 40 : 24,
    borderRadius: 16,
    border: `1px solid ${theme === 'dark' ? '#262626' : '#eee'}`,
    fontFamily: 'system-ui, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: isFullscreen ? 24 : 18, marginBottom: 4 }}>{data.idea}</h2>
      {data.summary && (
        <p style={{ fontSize: 13, color: theme === 'dark' ? '#999' : '#666', marginBottom: 20 }}>
          {data.summary}
        </p>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 20,
          marginTop: 12,
        }}
      >
        {metrics.map((m) => (
          <ScoreCircle key={m.label} {...m} theme={theme} size={circleSize} />
        ))}
      </div>
    </div>
  );
}
