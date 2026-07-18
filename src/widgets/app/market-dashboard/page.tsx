'use client';

import { useWidgetSDK, useTheme, useDisplayMode } from '@nitrostack/widgets';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Competitor {
  name: string;
  description: string;
  marketShare?: string;
  strength?: string;
}

interface TrendPoint {
  period: string;
  value: number;
}

interface MarketDashboardData {
  idea: string;
  marketSize: {
    tam?: string;
    sam?: string;
    som?: string;
  };
  competitors: Competitor[];
  trend: TrendPoint[];
  opportunities: string[];
}

export default function MarketDashboard() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();
  const displayMode = useDisplayMode();

  if (!isReady) {
    return <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>Loading...</div>;
  }

  const data = getToolOutput<MarketDashboardData>();

  if (!data) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>No data available</div>
    );
  }

  const isFullscreen = displayMode === 'fullscreen';
  const isDark = theme === 'dark';

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

  const sizeCards = [
    { label: 'TAM', value: data.marketSize.tam },
    { label: 'SAM', value: data.marketSize.sam },
    { label: 'SOM', value: data.marketSize.som },
  ].filter((c) => c.value);

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: isFullscreen ? 24 : 18, marginBottom: 20 }}>
        Market Overview — {data.idea}
      </h2>

      {sizeCards.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${sizeCards.length}, 1fr)`,
            gap: 12,
            marginBottom: 24,
          }}
        >
          {sizeCards.map((c) => (
            <div key={c.label} style={{ ...cardStyle, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: isDark ? '#999' : '#666', marginBottom: 4 }}>
                {c.label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{c.value}</div>
            </div>
          ))}
        </div>
      )}

      {data.trend?.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: 24, height: isFullscreen ? 260 : 200 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Market Trend</div>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#eee'} />
              <XAxis dataKey="period" stroke={isDark ? '#999' : '#666'} fontSize={11} />
              <YAxis stroke={isDark ? '#999' : '#666'} fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: isDark ? '#1a1a1a' : '#fff',
                  border: `1px solid ${isDark ? '#333' : '#ddd'}`,
                  borderRadius: 8,
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Competitors</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isFullscreen ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {data.competitors.map((c) => (
          <div key={c.name} style={cardStyle}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: isDark ? '#aaa' : '#555', marginBottom: 6 }}>
              {c.description}
            </div>
            {c.marketShare && (
              <div style={{ fontSize: 11, color: isDark ? '#999' : '#777' }}>
                Market share: {c.marketShare}
              </div>
            )}
            {c.strength && (
              <div style={{ fontSize: 11, color: isDark ? '#999' : '#777' }}>{c.strength}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Opportunities</div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.opportunities.map((o) => (
          <li key={o} style={{ fontSize: 13, color: isDark ? '#ddd' : '#333' }}>
            {o}
          </li>
        ))}
      </ul>
    </div>
  );
}
