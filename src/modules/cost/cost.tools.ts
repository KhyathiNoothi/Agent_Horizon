import { ToolDecorator as Tool, Widget, z, ExecutionContext } from '@nitrostack/core';
import { FinnhubService } from '../../shared/services/finnhub.service.js';
import { AiReasoningService } from '../../shared/services/ai-reasoning.service.js';

export class CostTools {
  private finnhub = new FinnhubService();
  private ai = new AiReasoningService();

  @Tool({
    name: 'estimate_costs',
    description: 'Estimates monthly and annual costs for a startup including cloud, APIs, and infrastructure',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      techStack: z.string().describe('Technology stack e.g. React, Node.js, PostgreSQL'),
      expectedUsers: z.number().describe('Expected number of users in first 6 months'),
    }),
  })
  @Widget('cost-breakdown')
  async estimateCosts(
    input: { idea: string; techStack: string; expectedUsers: number },
    ctx: ExecutionContext
  ) {
    const sentiment = await this.finnhub.getMarketSentiment();
    const costs = this.ai.estimateCosts(input.techStack);

    const userScaling = input.expectedUsers > 1000 ? 2 :
      input.expectedUsers > 500 ? 1.5 : 1;

    const breakdown = {
      hosting: Math.round(20 * userScaling),
      database: Math.round(15 * userScaling),
      storage: Math.round(10 * userScaling),
      email_service: 10,
      monitoring: 15,
      domain_ssl: 5,
      ai_apis: Math.round(30 * userScaling),
      third_party_apis: 20,
      cdn: Math.round(10 * userScaling),
      backup: 5,
    };

    const monthly = Object.values(breakdown).reduce((a, b) => a + b, 0);
    const annual = monthly * 12;
    const setupCost = 500;

    return {
      idea: input.idea,
      techStack: input.techStack,
      expectedUsers: input.expectedUsers,
      breakdown,
      costs: Object.entries(breakdown).map(([category, amount]) => ({
        category: category.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
        amount,
      })),
      monthlyTotal: monthly,
      summary: {
        monthly,
        annual,
        firstYearTotal: annual + setupCost,
        setupCost,
        costPerUser: Math.round(monthly / Math.max(input.expectedUsers, 1) * 100) / 100,
      },
      phases: [
        {
          phase: 'Month 1-3 (MVP)',
          monthlyCost: Math.round(monthly * 0.4),
          note: 'Minimal infrastructure, free tiers',
        },
        {
          phase: 'Month 4-6 (Launch)',
          monthlyCost: Math.round(monthly * 0.7),
          note: 'Growing infrastructure needs',
        },
        {
          phase: 'Month 7-12 (Growth)',
          monthlyCost: monthly,
          note: 'Full production infrastructure',
        },
      ],
      savingTips: [
        'Use Vercel free tier for frontend hosting',
        'Start with Supabase free tier for database',
        'Use Cloudflare for CDN (free tier)',
        'AWS/GCP startup credits can save $5000+',
        'Use open source tools wherever possible',
      ],
      marketSentiment: sentiment.sentiment,
    };
  }

  @Tool({
    name: 'get_funding_options',
    description: 'Returns funding options and investor types for a startup',
    inputSchema: z.object({
      stage: z.string().describe('Startup stage: idea, mvp, growth'),
      industry: z.string().describe('Industry category'),
      monthlyBurn: z.number().describe('Monthly burn rate in USD'),
    }),
  })
  async getFundingOptions(
    input: { stage: string; industry: string; monthlyBurn: number },
    ctx: ExecutionContext
  ) {
    const runway = Math.round(50000 / input.monthlyBurn);

    return {
      stage: input.stage,
      recommendedFunding: [
        {
          type: 'Bootstrapping',
          amount: '$0 - $10,000',
          pros: 'Full control, no dilution',
          cons: 'Limited resources',
          recommended: input.stage === 'idea',
        },
        {
          type: 'Friends & Family',
          amount: '$10,000 - $50,000',
          pros: 'Fast, flexible terms',
          cons: 'Personal relationships at risk',
          recommended: input.stage === 'idea',
        },
        {
          type: 'Angel Investors',
          amount: '$50,000 - $500,000',
          pros: 'Mentorship + capital',
          cons: '10-25% equity',
          recommended: input.stage === 'mvp',
        },
        {
          type: 'Seed VC',
          amount: '$500,000 - $2,000,000',
          pros: 'Large capital + network',
          cons: '20-30% equity, high expectations',
          recommended: input.stage === 'growth',
        },
      ],
      monthlyBurn: input.monthlyBurn,
      runwayWithSeed: `${runway} months`,
      indianOptions: [
        'Startup India Seed Fund (up to ₹20 lakhs)',
        'SIDBI Fund of Funds',
        'Indian Angel Network',
        'Mumbai Angels',
        'Sequoia Surge India',
      ],
    };
  }
}