'use client';

import { useWidgetSDK, useTheme, useDisplayMode } from '@nitrostack/widgets';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CostItem {
  category: string;
  amount: number; // monthly USD
}

interface CostBreakdownData {
  idea: string;
  costs: CostItem[];
  monthlyTotal: number;
  savingTips: string[];
}

const COLORS = ['#3b82f6', '#a855f7', '#22c55e', '#f97316', '#ef4444', '#14b8a6', '#eab308'];

export default function CostBreakdown() {
  const { isReady, getToolOutput } = useWidgetSDK();
  const theme = useTheme();
  const displayMode = useDisplayMode();

  if (!isReady) {
    return <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>Loading...</div>;
  }

  const data = getToolOutput<CostBreakdownData>();

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

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: isFullscreen ? 24 : 18, marginBottom: 4 }}>
        Cost Breakdown — {data.idea}
      </h2>
      <div style={{ fontSize: 28, fontWeight: 800, margin: '8px 0 20px' }}>
        ${data.monthlyTotal.toLocaleString()}
        <span style={{ fontSize: 13, fontWeight: 400, color: isDark ? '#999' : '#666' }}>
          {' '}
          / month
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isFullscreen ? '1fr 1fr' : '1fr',
          gap: 20,
        }}
      >
        <div style={{ ...cardStyle, height: isFullscreen ? 300 : 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.costs}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius="45%"
                outerRadius="75%"
                paddingAngle={2}
              >
                {data.costs.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: isDark ? '#1a1a1a' : '#fff',
                  border: `1px solid ${isDark ? '#333' : '#ddd'}`,
                  borderRadius: 8,
                }}
                formatter={(value: number) => [`$${value}`, 'Cost']}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, color: isDark ? '#ccc' : '#444' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.costs.map((c, i) => (
            <div
              key={c.category}
              style={{
                ...cardStyle,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: COLORS[i % COLORS.length],
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: 12 }}>{c.category}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700 }}>${c.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {data.savingTips?.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Saving Tips</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isFullscreen ? 'repeat(2, 1fr)' : '1fr',
              gap: 10,
            }}
          >
            {data.savingTips.map((tip, i) => (
              <div key={i} style={{ ...cardStyle, fontSize: 12, color: isDark ? '#ccc' : '#444' }}>
                💡 {tip}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
