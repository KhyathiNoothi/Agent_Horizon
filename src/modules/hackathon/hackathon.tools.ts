import { ToolDecorator as Tool, Widget, z, ExecutionContext } from '@nitrostack/core';
import { AiReasoningService } from '../../shared/services/ai-reasoning.service.js';
import { GithubService } from '../../shared/services/github.service.js';

export class HackathonTools {
  private ai = new AiReasoningService();
  private github = new GithubService();

  @Tool({
    name: 'plan_hackathon',
    description: 'Creates a complete hackathon plan with timeline, task distribution and implementation strategy for a team',
    inputSchema: z.object({
      projectName: z.string().describe('Name of the hackathon project'),
      idea: z.string().describe('The startup idea being built'),
      teamSize: z.number().describe('Number of team members'),
      hoursAvailable: z.number().describe('Total hours available for hackathon'),
      features: z.array(z.string()).describe('List of main features to build'),
    }),
  })
  @Widget('hackathon-timeline')
  async planHackathon(
    input: {
      projectName: string;
      idea: string;
      teamSize: number;
      hoursAvailable: number;
      features: string[];
    },
    ctx: ExecutionContext
  ) {
    const plan = this.ai.planHackathon(
      input.teamSize,
      input.hoursAvailable,
      input.features
    );

    const hourlySchedule = this.generateHourlySchedule(
      input.hoursAvailable,
      input.features,
      input.teamSize
    );



    

    return {
      projectName: input.projectName,
      idea: input.idea,
      teamSize: input.teamSize,
      hoursAvailable: input.hoursAvailable,
      phases: plan.phases,
      hourlySchedule,
      teamDistribution: plan.teamDistribution,
      criticalPath: [
        'Setup GitHub repo and invite team (Hour 0)',
        'Install NitroStack and create project (Hour 0-1)',
        'Build shared services first (Hour 1-3)',
        'Build modules in parallel (Hour 3-14)',
        'Integrate and test (Hour 14-18)',
        'Deploy and record demo (Hour 18-22)',
        'Submit before deadline (Hour 22-24)',
      ],
      riskMitigation: [
        {
          risk: 'API rate limits',
          mitigation: 'Use fallback mock data in every service',
        },
        {
          risk: 'Integration failures',
          mitigation: 'Test each module independently first',
        },
        {
          risk: 'Time overrun',
          mitigation: 'Prioritize core features, skip nice-to-haves',
        },
        {
          risk: 'Team blockers',
          mitigation: 'Check in every 2 hours, reassign if needed',
        },
      ],
      submissionChecklist: [
        'Deployed public URL working',
        '2-minute demo video recorded',
        '200-400 word description written',
        'GitHub repo public and linked',
        'McpToTheMoon Discord post done',
        'McpToTheMoon Reddit post done',
        'All team member names submitted',
      ],
    };
  }

  @Tool({
    name: 'get_tech_recommendations',
    description: 'Gets technology recommendations for a hackathon project based on GitHub trends',
    inputSchema: z.object({
      projectType: z.string().describe('Type of project e.g. web app, mobile, AI tool'),
      timeLimit: z.number().describe('Hours available to build'),
    }),
  })
  async getTechRecommendations(
    input: { projectType: string; timeLimit: number },
    ctx: ExecutionContext
  ) {
    const [frontend, backend, database] = await Promise.all([
      this.github.getPopularFrameworks('frontend'),
      this.github.getPopularFrameworks('backend'),
      this.github.getPopularFrameworks('database'),
    ]);

    const quickStack = input.timeLimit < 12 ? {
      frontend: 'React + Vite (fastest setup)',
      backend: 'Node.js + Express (simplest)',
      database: 'SQLite (zero config)',
      deployment: 'Vercel (one command deploy)',
    } : {
      frontend: 'Next.js (full featured)',
      backend: 'NestJS (enterprise grade)',
      database: 'PostgreSQL + Supabase',
      deployment: 'Railway or Render',
    };

    return {
      projectType: input.projectType,
      timeLimit: input.timeLimit,
      recommendedStack: quickStack,
      trendingOnGithub: {
        frontend: frontend.slice(0, 2),
        backend: backend.slice(0, 2),
        database: database.slice(0, 2),
      },
      hackathonTips: [
        'Use NitroStack — it handles MCP protocol automatically',
        'Start with working code, beautify later',
        'Use free tiers of all services',
        'Keep it simple — judges want working demos',
        'Record demo video as you build, not at the end',
        'Commit to GitHub every 30 minutes',
      ],
    };
  }

  private generateHourlySchedule(
    totalHours: number,
    features: string[],
    teamSize: number
  ): any[] {
    const schedule = [];
    const setupHours = Math.floor(totalHours * 0.1);
    const buildHours = Math.floor(totalHours * 0.55);
    const testHours = Math.floor(totalHours * 0.2);
    const demoHours = totalHours - setupHours - buildHours - testHours;

    schedule.push({
      timeRange: `Hour 0 - ${setupHours}`,
      phase: 'Setup',
      tasks: [
        'Create GitHub repo',
        'Clone and setup NitroStack project',
        'Install all dependencies',
        'Setup .env with API keys',
        'Team sync call - assign tasks',
      ],
      owner: 'All team members',
    });

    schedule.push({
      timeRange: `Hour ${setupHours} - ${setupHours + buildHours}`,
      phase: 'Core Development',
      tasks: features.map((f, i) => `Build ${f} (Person ${(i % teamSize) + 1})`),
      owner: 'Parallel development',
    });

    schedule.push({
      timeRange: `Hour ${setupHours + buildHours} - ${setupHours + buildHours + testHours}`,
      phase: 'Integration & Testing',
      tasks: [
        'Merge all branches to dev',
        'Fix integration issues',
        'Test all tools in NitroStudio',
        'Polish UI widgets',
        'Deploy to NitroStack cloud',
      ],
      owner: 'All team members',
    });

    schedule.push({
      timeRange: `Hour ${setupHours + buildHours + testHours} - ${totalHours}`,
      phase: 'Demo & Submission',
      tasks: [
        'Record 2-minute demo video',
        'Write submission description',
        'Submit via hackathon portal',
        'Post to McpToTheMoon Discord',
        'Post to McpToTheMoon Reddit',
      ],
      owner: 'Team Lead (Person 1)',
    });

    return schedule;
  }
}