import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

export class TechStackResources {
  @Resource({
    name: 'techstack://templates',
    description: 'Technology stack templates for different startup types',
  })
  async getTechTemplates(ctx: ExecutionContext) {
    return {
      templates: {
        saas: {
          name: 'SaaS Starter Stack',
          frontend: 'Next.js + TailwindCSS',
          backend: 'Node.js + Express',
          database: 'PostgreSQL + Supabase',
          auth: 'Supabase Auth',
          hosting: 'Vercel + Railway',
          monthlyCost: '$0-25',
        },
        marketplace: {
          name: 'Marketplace Stack',
          frontend: 'Next.js',
          backend: 'Node.js + NestJS',
          database: 'PostgreSQL',
          payments: 'Stripe',
          hosting: 'AWS',
          monthlyCost: '$50-150',
        },
        aiApp: {
          name: 'AI Application Stack',
          frontend: 'React + Vite',
          backend: 'FastAPI (Python)',
          database: 'PostgreSQL + pgvector',
          ai: 'OpenAI or Claude API',
          hosting: 'GCP or AWS',
          monthlyCost: '$30-100',
        },
        mobile: {
          name: 'Mobile App Stack',
          frontend: 'React Native',
          backend: 'Node.js + Express',
          database: 'MongoDB Atlas',
          auth: 'Firebase Auth',
          hosting: 'AWS Lambda',
          monthlyCost: '$0-30',
        },
      },
    };
  }
}
