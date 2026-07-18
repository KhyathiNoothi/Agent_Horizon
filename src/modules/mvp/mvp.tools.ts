import { ToolDecorator as Tool, Widget, z, ExecutionContext } from '@nitrostack/core';

export class MvpTools {
  @Tool({
    name: 'plan_mvp',
    description:
      'Creates a complete MVP plan with features, milestones, roadmap and implementation strategy',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      timeline: z.string().describe('Available timeline e.g. 3 months, 6 months'),
      teamSize: z.number().describe('Number of people in the team'),
    }),
    invocation: {
      invoking: 'Building your MVP roadmap...',
      invoked: 'MVP plan ready',
    },
    examples: {
      request: {
        idea: 'AI-powered recipe app',
        timeline: '3 months',
        teamSize: 2,
      },
      response: {
        idea: 'AI-powered recipe app',
        timeline: '3 months',
        teamSize: 2,
        coreFeatures: [
          {
            feature: 'User Authentication',
            priority: 'Must Have',
            effort: '3 days',
            description: 'Sign up, login, password reset',
          },
        ],
        milestones: [
          { phase: 'Phase 1: Foundation', week: 'Week 1-2', goal: 'Set up project & core infra' },
        ],
        roadmap: { phases: [] },
      },
    },
  })
  @Widget('mvp-roadmap')
  async planMvp(
    input: {
      idea: string;
      timeline: string;
      teamSize: number;
    },
    ctx: ExecutionContext
  ) {
    const months = parseInt(input.timeline) || 3;
    const totalWeeks = Math.max(months * 4, 4);
    const isSoloOrSmallTeam = input.teamSize <= 2;

    const coreFeatures = [
      {
        feature: 'User Authentication',
        priority: 'Must Have',
        effort: '3 days',
        description: 'Sign up, login, password reset',
      },
      {
        feature: 'Core Feature 1',
        priority: 'Must Have',
        effort: '2 weeks',
        description: `The primary workflow that delivers on the core promise of "${input.idea}"`,
      },
      {
        feature: 'Core Feature 2',
        priority: 'Must Have',
        effort: '1.5 weeks',
        description: 'A supporting feature that makes the core workflow usable end-to-end',
      },
      {
        feature: 'Basic User Dashboard',
        priority: 'Should Have',
        effort: '1 week',
        description: 'A simple place for users to see their data and activity',
      },
      {
        feature: 'Onboarding Flow',
        priority: 'Should Have',
        effort: '3 days',
        description: 'Guides new users to their first "aha moment" quickly',
      },
      {
        feature: 'Payments / Billing',
        priority: 'Could Have',
        effort: '1 week',
        description: 'Stripe or similar integration if monetization is needed at launch',
      },
      {
        feature: 'Admin Panel',
        priority: 'Wont Have (v1)',
        effort: '1 week',
        description: 'Internal tooling — safe to defer past MVP',
      },
    ];

    const phaseCount = totalWeeks >= 12 ? 4 : totalWeeks >= 8 ? 3 : 2;
    const weeksPerPhase = Math.ceil(totalWeeks / phaseCount);
    const phaseNames = [
      'Foundation & Setup',
      'Core Feature Development',
      'Polish & Beta Testing',
      'Launch Prep',
    ];

    const roadmap = Array.from({ length: phaseCount }, (_, i) => {
      const startWeek = i * weeksPerPhase + 1;
      const endWeek = Math.min((i + 1) * weeksPerPhase, totalWeeks);
      return {
        phase: `Phase ${i + 1}: ${phaseNames[i] || 'Iteration'}`,
        weekRange: `Week ${startWeek}-${endWeek}`,
        tasks:
          i === 0
            ? ['Set up repo & CI/CD', 'Configure database & auth', 'Deploy skeleton app']
            : i === phaseCount - 1
            ? ['Fix critical bugs', 'Prepare launch assets', 'Deploy to production']
            : ['Build core features', 'Internal testing', 'Gather early feedback'],
      };
    });

    const milestones = roadmap.map((phase, i) => ({
      milestone: phase.phase,
      dueBy: phase.weekRange,
      description:
        i === roadmap.length - 1
          ? 'MVP is live and ready for real users'
          : `Deliverables for ${phase.phase.toLowerCase()} complete`,
    }));

    return {
      idea: input.idea,
      timeline: input.timeline,
      teamSize: input.teamSize,
      coreFeatures,
      milestones,
      roadmap: { totalWeeks, phases: roadmap },
      recommendations: [
        isSoloOrSmallTeam
          ? 'With a small team, ruthlessly cut scope to "Must Have" features only'
          : 'Split the team by feature area to parallelize development',
        'Ship something usable every 2 weeks, even if incomplete',
        'Talk to 5-10 potential users before writing code for Phase 2',
        'Defer anything not required to prove the core value proposition',
      ],
    };
  }
}
