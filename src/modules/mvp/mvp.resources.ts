import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

export class MvpResources {
  @Resource({
    uri: 'mvp://templates',
    name: 'MVP Templates',
    description: 'MVP roadmap templates for different timelines and team sizes',
  })
  async getMvpTemplates(ctx: ExecutionContext) {
    return {
      templates: {
        soloFounder: {
          name: 'Solo Founder — 3 Months',
          teamSize: 1,
          timeline: '3 months',
          phases: [
            'Week 1-2: Foundation & Setup',
            'Week 3-8: Core Feature Development',
            'Week 9-11: Polish & Beta Testing',
            'Week 12: Launch Prep',
          ],
          advice: 'Focus on ONE core feature. Use no-code/low-code where possible.',
        },
        smallTeam: {
          name: 'Small Team (2-4) — 3 Months',
          teamSize: 3,
          timeline: '3 months',
          phases: [
            'Week 1-2: Foundation & Setup',
            'Week 3-7: Core Feature Development',
            'Week 8-10: Polish & Beta Testing',
            'Week 11-12: Launch Prep',
          ],
          advice: 'Split by feature area: one on frontend, one on backend, one on infra/AI.',
        },
        fundedTeam: {
          name: 'Funded Team (5+) — 6 Months',
          teamSize: 6,
          timeline: '6 months',
          phases: [
            'Month 1: Foundation & Architecture',
            'Month 2-4: Core Feature Development',
            'Month 5: Polish & Beta Testing',
            'Month 6: Launch Prep & Scale Readiness',
          ],
          advice: 'Invest in testing infra and CI/CD early since the team is larger.',
        },
      },
    };
  }
}
