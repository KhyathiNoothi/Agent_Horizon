'use client';

import { useWidgetSDK, useTheme, useDisplayMode } from '@nitrostack/widgets';

interface TechChoice {
  name: string;
  reason: string;
  alternatives: string[];
  cost?: string;
  difficulty?: string;
}

interface TechStackData {
  idea: string;
  recommended: Record<string, TechChoice>;
  totalEstimatedCost?: string;
  setupTime?: string;
  mvpReadyIn?: string;
  tips?: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  hosting: 'Hosting',
  aiIntegration: 'AI Integration',
  authentication: 'Authentication',
};

function difficultyColor(difficulty?: string) {
  switch (difficulty) {
    case 'Easy':
      return '#22c55e';
    case 'Medium':
      return '#f59e0b';
    case 'Hard':
      return '#ef4444';
    default:
      return '#888';
  }
}

export default function TechStackViewer() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();
  const displayMode = useDisplayMode();

  if (!isReady) {
    return <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>Loading...</div>;
  }

  const data = getToolOutput<TechStackData>();

  if (!data) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>No data available</div>
    );
  }

  const isDark = theme === 'dark';
  const isFullscreen = displayMode === 'fullscreen';

  const containerStyle: React.CSSProperties = {
    background: isDark ? '#0f0f0f' : '#ffffff',
    color: isDark ? '#fff' : '#111',
    padding: isFullscreen ? 40 : 24,
    borderRadius: 16,
    border: `1px solid ${isDark ? '#262626' : '#eee'}`,
    fontFamily: 'system-ui, sans-serif',
  };

  const cardStyle: React.CSSProperties = {
    background: isDark ? '#1a1a1a' : '#f7f7f8',
    borderRadius: 12,
    padding: 16,
    border: `1px solid ${isDark ? '#2a2a2a' : '#e5e5e5'}`,
  };

  const entries = Object.entries(data.recommended);

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: isFullscreen ? 24 : 18, marginBottom: 4 }}>
        Recommended Stack — {data.idea}
      </h2>

      {(data.totalEstimatedCost || data.setupTime || data.mvpReadyIn) && (
        <div style={{ display: 'flex', gap: 16, margin: '12px 0 20px', flexWrap: 'wrap' }}>
          {data.totalEstimatedCost && (
            <span style={{ fontSize: 12, color: isDark ? '#999' : '#666' }}>
              💰 {data.totalEstimatedCost}
            </span>
          )}
          {data.setupTime && (
            <span style={{ fontSize: 12, color: isDark ? '#999' : '#666' }}>
              ⚙️ Setup: {data.setupTime}
            </span>
          )}
          {data.mvpReadyIn && (
            <span style={{ fontSize: 12, color: isDark ? '#999' : '#666' }}>
              🚀 MVP in: {data.mvpReadyIn}
            </span>
          )}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isFullscreen
            ? 'repeat(3, 1fr)'
            : 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {entries.map(([key, tech]) => (
          <div key={key} style={cardStyle}>
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: isDark ? '#888' : '#999',
                marginBottom: 6,
              }}
            >
              {CATEGORY_LABELS[key] || key}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{tech.name}</div>
            <div style={{ fontSize: 12, color: isDark ? '#bbb' : '#555', marginBottom: 8 }}>
              {tech.reason}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {tech.alternatives?.map((alt) => (
                <span
                  key={alt}
                  style={{
                    fontSize: 10,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: isDark ? '#262626' : '#eee',
                    color: isDark ? '#ccc' : '#555',
                  }}
                >
                  {alt}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              {tech.cost && <span style={{ color: isDark ? '#999' : '#777' }}>{tech.cost}</span>}
              {tech.difficulty && (
                <span style={{ color: difficultyColor(tech.difficulty), fontWeight: 600 }}>
                  {tech.difficulty}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {data.tips && data.tips.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Tips</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.tips.map((t, i) => (
              <li key={i} style={{ fontSize: 12, color: isDark ? '#ccc' : '#444' }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
