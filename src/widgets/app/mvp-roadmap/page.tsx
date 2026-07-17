'use client';

import { useWidgetSDK, useTheme, useDisplayMode } from '@nitrostack/widgets';

interface CoreFeature {
  feature: string;
  priority: string;
  effort: string;
  description: string;
}

interface Phase {
  phase: string;
  weekRange: string;
  tasks: string[];
}

interface Milestone {
  milestone: string;
  dueBy: string;
  description: string;
}

interface MvpRoadmapData {
  idea: string;
  timeline: string;
  teamSize: number;
  coreFeatures: CoreFeature[];
  milestones: Milestone[];
  roadmap: { totalWeeks: number; phases: Phase[] };
  recommendations?: string[];
}

const PRIORITY_COLOR: Record<string, string> = {
  'Must Have': '#ef4444',
  'Should Have': '#f59e0b',
  'Could Have': '#3b82f6',
  'Wont Have (v1)': '#888',
};

const PHASE_COLORS = ['#3b82f6', '#a855f7', '#f97316', '#22c55e'];

export default function MvpRoadmap() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();
  const displayMode = useDisplayMode();

  if (!isReady) {
    return <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>Loading...</div>;
  }

  const data = getToolOutput<MvpRoadmapData>();

  if (!data) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>No data available</div>
    );
  }

  const isDark = theme === 'dark';
  const isFullscreen = displayMode === 'fullscreen';
  const totalWeeks = data.roadmap.totalWeeks || 12;

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
    padding: 14,
    border: `1px solid ${isDark ? '#2a2a2a' : '#e5e5e5'}`,
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: isFullscreen ? 24 : 18, marginBottom: 4 }}>
        MVP Roadmap — {data.idea}
      </h2>
      <p style={{ fontSize: 12, color: isDark ? '#999' : '#666', marginBottom: 24 }}>
        {data.timeline} · Team of {data.teamSize}
      </p>

      {/* Gantt-style phase bars */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Timeline</div>
        {data.roadmap.phases.map((phase, i) => {
          const match = phase.weekRange.match(/(\d+)-(\d+)/);
          const start = match ? parseInt(match[1]) : 1;
          const end = match ? parseInt(match[2]) : totalWeeks;
          const leftPct = ((start - 1) / totalWeeks) * 100;
          const widthPct = ((end - start + 1) / totalWeeks) * 100;
          return (
            <div key={phase.phase} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 4,
                  color: isDark ? '#ddd' : '#333',
                }}
              >
                {phase.phase} · {phase.weekRange}
              </div>
              <div
                style={{
                  position: 'relative',
                  height: 14,
                  background: isDark ? '#1f1f1f' : '#eee',
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: '100%',
                    background: PHASE_COLORS[i % PHASE_COLORS.length],
                    borderRadius: 8,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Core features */}
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Core Features</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isFullscreen ? 'repeat(2, 1fr)' : '1fr',
          gap: 10,
          marginBottom: 24,
        }}
      >
        {data.coreFeatures.map((f) => (
          <div key={f.feature} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{f.feature}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: PRIORITY_COLOR[f.priority] || '#888',
                }}
              >
                {f.priority}
              </span>
            </div>
            <div style={{ fontSize: 12, color: isDark ? '#aaa' : '#555', marginBottom: 4 }}>
              {f.description}
            </div>
            <div style={{ fontSize: 11, color: isDark ? '#888' : '#888' }}>⏱ {f.effort}</div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Milestones</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.milestones.map((m, i) => (
          <div key={i} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{m.milestone}</div>
              <div style={{ fontSize: 11, color: isDark ? '#999' : '#666' }}>{m.description}</div>
            </div>
            <div style={{ fontSize: 11, color: isDark ? '#bbb' : '#555', whiteSpace: 'nowrap' }}>
              {m.dueBy}
            </div>
          </div>
        ))}
      </div>

      {data.recommendations && data.recommendations.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Recommendations</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.recommendations.map((r, i) => (
              <li key={i} style={{ fontSize: 12, color: isDark ? '#ccc' : '#444' }}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
