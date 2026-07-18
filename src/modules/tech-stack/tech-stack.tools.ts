import { ToolDecorator as Tool, Widget, z, ExecutionContext } from '@nitrostack/core';

export class TechStackTools {
  @Tool({
    name: 'recommend_tech_stack',
    description:
      'Recommends the best technology stack for a startup idea based on requirements, scale, and budget',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      scale: z.string().describe('Expected scale: small, medium, large'),
      budget: z.string().describe('Budget level: low, medium, high'),
    }),
    invocation: {
      invoking: 'Analyzing your idea and picking a stack...',
      invoked: 'Tech stack ready',
    },
    examples: {
      request: {
        idea: 'AI-powered recipe app',
        scale: 'small',
        budget: 'low',
      },
      response: {
        idea: 'AI-powered recipe app',
        recommended: {
          frontend: {
            name: 'React + Vite',
            reason: 'Easiest to learn, huge community',
            alternatives: ['Vue.js', 'Angular', 'Svelte'],
            cost: 'Free',
            difficulty: 'Easy',
          },
          backend: {
            name: 'Node.js + Express',
            reason: 'Same language as frontend, fast development',
            alternatives: ['FastAPI (Python)', 'Django', 'Ruby on Rails'],
            cost: 'Free',
            difficulty: 'Easy',
          },
          database: {
            name: 'Supabase (PostgreSQL)',
            reason: 'Reliable, scalable, free tier available',
            alternatives: ['MongoDB', 'MySQL', 'SQLite'],
            cost: 'Free tier',
            difficulty: 'Medium',
          },
          hosting: {
            name: 'Vercel + Railway',
            reason: 'Free tiers, easy deployment',
            alternatives: ['Render', 'Heroku', 'DigitalOcean'],
            cost: 'Free - $5/month',
            difficulty: 'Easy',
          },
          aiIntegration: {
            name: 'Claude API or OpenAI GPT-4',
            reason: 'Best AI models available via API',
            alternatives: ['Gemini API', 'Mistral', 'Local LLMs'],
            cost: 'Pay per use ($0.002-0.03 per 1K tokens)',
            difficulty: 'Easy',
          },
          authentication: {
            name: 'Supabase Auth or Clerk',
            reason: 'Free tier, easy setup, handles all auth flows',
            alternatives: ['Firebase Auth', 'Auth0', 'NextAuth'],
            cost: 'Free tier available',
            difficulty: 'Easy',
          },
        },
        totalEstimatedCost: '$0-20/month',
        setupTime: '2-3 days',
        mvpReadyIn: '8-12 weeks',
        tips: [
          'Start with free tiers of everything',
          'Use Supabase - it replaces database + auth + storage',
          'Deploy frontend to Vercel (free, instant)',
        ],
      },
    },
  })
  @Widget('tech-stack-viewer')
  async recommendTechStack(
    input: {
      idea: string;
      scale: string;
      budget: string;
    },
    ctx: ExecutionContext
  ) {
    const isLowBudget = input.budget === 'low';
    const isLargeScale = input.scale === 'large';
    // teamExperience isn't part of the public input schema, so we derive a
    // sensible default from scale/budget instead of requiring an extra field.
    const isBeginner = !isLargeScale && isLowBudget;

    return {
      idea: input.idea,
      recommended: {
        frontend: {
          name: isBeginner ? 'React + Vite' : isLargeScale ? 'Next.js' : 'React + Vite',
          reason: isBeginner ? 'Easiest to learn, huge community' : 'Best for production apps',
          alternatives: ['Vue.js', 'Angular', 'Svelte'],
          cost: 'Free',
          difficulty: isBeginner ? 'Easy' : 'Medium',
        },
        backend: {
          name: isBeginner ? 'Node.js + Express' : isLargeScale ? 'NestJS' : 'Node.js + Express',
          reason: 'Same language as frontend, fast development',
          alternatives: ['FastAPI (Python)', 'Django', 'Ruby on Rails'],
          cost: 'Free',
          difficulty: isBeginner ? 'Easy' : 'Medium',
        },
        database: {
          name: isLargeScale ? 'PostgreSQL' : 'Supabase (PostgreSQL)',
          reason: 'Reliable, scalable, free tier available',
          alternatives: ['MongoDB', 'MySQL', 'SQLite'],
          cost: isLowBudget ? 'Free tier' : '$25/month',
          difficulty: 'Medium',
        },
        hosting: {
          name: isLowBudget ? 'Vercel + Railway' : 'AWS / GCP',
          reason: isLowBudget ? 'Free tiers, easy deployment' : 'Enterprise scale',
          alternatives: ['Render', 'Heroku', 'DigitalOcean'],
          cost: isLowBudget ? 'Free - $5/month' : '$50-200/month',
          difficulty: 'Easy',
        },
        aiIntegration: {
          name: 'Claude API or OpenAI GPT-4',
          reason: 'Best AI models available via API',
          alternatives: ['Gemini API', 'Mistral', 'Local LLMs'],
          cost: 'Pay per use ($0.002-0.03 per 1K tokens)',
          difficulty: 'Easy',
        },
        authentication: {
          name: 'Supabase Auth or Clerk',
          reason: 'Free tier, easy setup, handles all auth flows',
          alternatives: ['Firebase Auth', 'Auth0', 'NextAuth'],
          cost: 'Free tier available',
          difficulty: 'Easy',
        },
      },
      totalEstimatedCost: isLowBudget ? '$0-20/month' : '$50-200/month',
      setupTime: isBeginner ? '2-3 days' : '1 day',
      mvpReadyIn: isBeginner ? '8-12 weeks' : '4-6 weeks',
      tips: [
        'Start with free tiers of everything',
        'Use Supabase - it replaces database + auth + storage',
        'Deploy frontend to Vercel (free, instant)',
        'Use Railway for backend (simple, affordable)',
        'Apply for startup credits: AWS ($5000), GCP ($200000)',
      ],
    };
  }
}
