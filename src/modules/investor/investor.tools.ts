import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class InvestorTools {
  @Tool({
    name: 'analyze_funding_opportunities',
    description: 'Analyze funding opportunities: matching accelerators, angel networks, VC firms, government grants, fundraising roadmap, pitch deck structure, and investment score.',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      industry: z.string().describe('Industry sector'),
      stage: z.enum(['idea', 'mvp', 'pre_launch', 'launched', 'scaling']).describe('Current startup stage'),
      fundingNeeded: z.number().optional().describe('Funding needed in INR'),
      location: z.string().optional().describe('Location of startup'),
      teamSize: z.number().optional().describe('Team size'),
      hasRevenue: z.boolean().optional().describe('Whether startup has revenue'),
      monthlyRevenue: z.number().optional().describe('Monthly revenue in INR')
    })
  })
  async analyzeFundingOpportunities(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Analyzing funding opportunities', { stage: input.stage, industry: input.industry });

    const dataPath = path.join(process.cwd(), 'data', 'investor-database.json');
    const investorData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const industry = (input.industry || '').toLowerCase();
    const loc = (input.location || '').toLowerCase();

    const matchedAccelerators = investorData.accelerators.map((acc: any) => {
      let m = 50;
      const focus = (acc.focus || []).map((f: string) => f.toLowerCase());
      if (focus.some((f: string) => f.includes(industry) || f.includes('all') || f.includes('technology'))) m += 30;
      if (input.stage === 'idea' || input.stage === 'mvp') m += 10;
      if (acc.location && acc.location.toLowerCase().includes('india')) m += 5;
      return { ...acc, match_score: Math.min(100, m) };
    }).sort((a: any, b: any) => b.match_score - a.match_score);

    const matchedAngels = investorData.angel_networks.map((an: any) => {
      let m = 50;
      const focus = (an.focus || []).map((f: string) => f.toLowerCase());
      if (focus.some((f: string) => f.includes(industry) || f.includes('technology'))) m += 25;
      if (an.location && loc && an.location.toLowerCase().includes(loc.split(',')[0])) m += 15;
      return { ...an, match_score: Math.min(100, m) };
    }).sort((a: any, b: any) => b.match_score - a.match_score);

    const matchedVCs = investorData.vc_firms.map((vc: any) => {
      let m = 40;
      const focus = (vc.focus || []).map((f: string) => f.toLowerCase());
      if (focus.some((f: string) => f.includes(industry) || f.includes('consumer') || f.includes('enterprise'))) m += 25;
      const vcStage = (vc.stage || '').toLowerCase();
      if (input.stage === 'idea' && vcStage.includes('pre-seed')) m += 15;
      if (input.stage === 'mvp' && vcStage.includes('seed')) m += 15;
      if (input.stage === 'launched' && vcStage.includes('series')) m += 15;
      if (vcStage.includes('seed') || vcStage.includes('early')) m += 10;
      return { ...vc, match_score: Math.min(100, m) };
    }).sort((a: any, b: any) => b.match_score - a.match_score);

    const matchedGrants = investorData.government_grants.map((g: any) => {
      let m = 60;
      if (industry.includes('biotech') && g.name.includes('BIRAC')) m += 30;
      if ((industry.includes('tech') || industry.includes('software') || industry.includes('ai')) &&
          (g.name.includes('MeitY') || g.name.includes('Startup India'))) m += 20;
      if ((loc.includes('telangana') || loc.includes('hyderabad')) &&
          (g.name.includes('Telangana') || g.name.includes('TSIC'))) m += 25;
      return { ...g, match_score: Math.min(100, m) };
    }).sort((a: any, b: any) => b.match_score - a.match_score);

    let investmentScore = 50;
    if (input.stage === 'launched' || input.stage === 'scaling') investmentScore += 15;
    else if (input.stage === 'mvp') investmentScore += 10;
    if (input.hasRevenue) investmentScore += 15;
    if (input.monthlyRevenue && input.monthlyRevenue > 100000) investmentScore += 10;
    if (input.teamSize && input.teamSize >= 3) investmentScore += 5;
    if (['ai', 'saas', 'fintech'].includes(industry)) investmentScore += 5;
    investmentScore = Math.max(20, Math.min(100, investmentScore));

    const roadmap: any[] = [];
    if (input.stage === 'idea' || input.stage === 'mvp') {
      roadmap.push({
        round: 'Pre-seed',
        timeline: 'Month 1-3',
        amount: 'Rs 10-50 lakhs',
        source: 'Angels, Friends & Family, Government Grants',
        milestones_before: ['Validate idea with 50+ customer conversations', 'Build basic prototype'],
        use_of_funds: ['MVP development', 'Initial hiring', 'Market validation']
      });
    }
    roadmap.push({
      round: 'Seed',
      timeline: input.stage === 'launched' ? 'Month 1-3' : 'Month 6-9',
      amount: 'Rs 50 lakhs - 3 crores',
      source: 'Seed VCs, Angel Networks, Accelerators',
      milestones_before: ['MVP launched', '50+ customers', 'Product-market fit signals'],
      use_of_funds: ['Team expansion', 'Customer acquisition', 'Product development']
    });
    roadmap.push({
      round: 'Series A',
      timeline: input.stage === 'scaling' ? 'Month 3-6' : 'Month 18-24',
      amount: 'Rs 3-20 crores',
      source: 'Series A VCs',
      milestones_before: ['Rs 50L+ MRR', 'Strong unit economics', 'Proven growth'],
      use_of_funds: ['Scale team', 'Geographic expansion', 'Marketing']
    });

    return {
      startup: input.idea,
      funding_readiness: {
        stage: input.stage,
        has_revenue: input.hasRevenue || false,
        recommended_next_round: (input.stage === 'idea' || input.stage === 'mvp') ? 'Pre-seed / Seed' : 'Seed / Series A',
        funding_needed: input.fundingNeeded || 'Not specified'
      },
      matching_accelerators: matchedAccelerators.slice(0, 5),
      matching_angel_networks: matchedAngels.slice(0, 5),
      matching_vc_firms: matchedVCs.slice(0, 5),
      government_grants: matchedGrants.slice(0, 5),
      fundraising_roadmap: roadmap,
      pitch_deck_structure: [
        'Slide 1: Problem - What pain point are you solving?',
        'Slide 2: Solution - How do you solve it?',
        'Slide 3: Market Size - TAM, SAM, SOM',
        'Slide 4: Business Model - How do you make money?',
        'Slide 5: Traction - Users, revenue, growth metrics',
        'Slide 6: Product Demo - Screenshots or live demo',
        'Slide 7: Go-to-Market - Customer acquisition strategy',
        'Slide 8: Competition - Landscape and positioning',
        'Slide 9: Team - Founders and key hires',
        'Slide 10: Financials - Projections and unit economics',
        'Slide 11: The Ask - How much, what for, milestones',
        'Slide 12: Vision - Where this goes in 5 years'
      ],
      investment_score: investmentScore,
      investment_score_breakdown: {
        founder_credibility: Math.round(investmentScore * 0.25),
        market_opportunity: Math.round(investmentScore * 0.25),
        product_traction: Math.round(investmentScore * 0.20),
        team_composition: Math.round(investmentScore * 0.15),
        growth_potential: Math.round(investmentScore * 0.15)
      }
    };
  }

  @Tool({
    name: 'match_investors',
    description: 'Find matching investors (VCs, angels, accelerators, grants) for a specific industry and stage',
    inputSchema: z.object({
      industry: z.string().describe('Industry sector'),
      stage: z.string().describe('Startup stage'),
      location: z.string().optional().describe('Location preference'),
      amountNeeded: z.number().optional().describe('Amount needed in INR')
    })
  })
  async matchInvestors(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Matching investors', { industry: input.industry, stage: input.stage });

    const dataPath = path.join(process.cwd(), 'data', 'investor-database.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    return {
      query: { industry: input.industry, stage: input.stage, location: input.location },
      accelerators: data.accelerators.slice(0, 3),
      angel_networks: data.angel_networks.slice(0, 3),
      vc_firms: data.vc_firms.slice(0, 3),
      government_grants: data.government_grants.slice(0, 3),
      recommendation: `For ${input.stage} stage ${input.industry} startup, start with accelerators and angel networks before approaching VCs`
    };
  }
}