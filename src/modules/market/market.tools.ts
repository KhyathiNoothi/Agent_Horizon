import { ToolDecorator as Tool, Widget, z, ExecutionContext } from '@nitrostack/core';
import { NewsService } from '../../shared/services/news.service.js';
import { FinnhubService } from '../../shared/services/finnhub.service.js';
import { AiReasoningService } from '../../shared/services/ai-reasoning.service.js';

export class MarketTools {
  private news = new NewsService();
  private finnhub = new FinnhubService();
  private ai = new AiReasoningService();

  @Tool({
    name: 'analyze_market',
    description: 'Analyzes the market for a startup idea including competitors, market size, trends and opportunities',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea to analyze'),
      industry: z.string().describe('The industry category e.g. fintech, edtech, healthtech'),
    }),
  })
  @Widget('market-dashboard')
  async analyzeMarket(
    input: { idea: string; industry: string },
    ctx: ExecutionContext
  ) {
    const [news, trends, sector] = await Promise.all([
      this.news.getMarketNews(input.idea),
      this.news.getTrends(input.industry),
      this.finnhub.getSectorData(input.industry),
    ]);

    return {
      idea: input.idea,
      industry: input.industry,
      marketSize: sector.avgValuation,
      growthRate: sector.growth,
      competitors: sector.topPlayers.map((name: string) => ({
        name,
        type: 'Established Player',
        threat: 'High',
      })),
      trends: trends.trends,
      opportunities: [
        `Gap in ${input.industry} for AI-powered solutions`,
        `Underserved SMB segment in ${input.industry}`,
        `Mobile-first approach not yet dominant`,
        `International markets largely untapped`,
      ],
      recentNews: news.slice(0, 3),
      sentiment: trends.sentiment,
      recommendation: `Strong market opportunity in ${input.industry}. Focus on differentiation through AI and UX.`,
    };
  }

  @Tool({
    name: 'find_competitors',
    description: 'Finds and analyzes competitors for a startup idea',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      industry: z.string().describe('Industry category'),
    }),
  })
  async findCompetitors(
    input: { idea: string; industry: string },
    ctx: ExecutionContext
  ) {
    const sector = await this.finnhub.getSectorData(input.industry);
    const news = await this.news.getMarketNews(input.idea);

    return {
      directCompetitors: sector.topPlayers.map((name: string, i: number) => ({
        name,
        strength: i === 0 ? 'Very Strong' : i === 1 ? 'Strong' : 'Moderate',
        weakness: `Limited focus on ${input.idea.split(' ')[0]} niche`,
        marketShare: `${30 - i * 8}%`,
      })),
      indirectCompetitors: [
        { name: 'Manual Process', description: 'People doing this manually' },
        { name: 'Spreadsheets', description: 'Excel/Sheets based solutions' },
      ],
      yourAdvantage: [
        'AI-powered automation',
        'Better UX/UI design',
        'Lower pricing',
        'Niche focus',
      ],
      recentNews: news.slice(0, 2),
    };
  }
}