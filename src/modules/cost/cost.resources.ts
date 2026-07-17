import 'reflect-metadata';
import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

export class CostResources {
  @Resource({
    uri: 'cost://pricing-templates',
    name: 'cost-pricing-templates',
    description: 'Pricing templates and cost benchmarks for startups',
  })
  async getPricingTemplates(ctx: ExecutionContext) {
    return {
      cloudProviders: {
        aws: {
          name: 'Amazon Web Services',
          freetier: '12 months free tier',
          startupCredits: '$5,000 - $100,000',
          bestFor: 'Enterprise scale',
        },
        gcp: {
          name: 'Google Cloud Platform',
          freetier: '$300 free credits',
          startupCredits: '$200,000 via Google for Startups',
          bestFor: 'AI/ML workloads',
        },
        vercel: {
          name: 'Vercel',
          freetier: 'Generous free tier',
          startupCredits: 'Free for small projects',
          bestFor: 'Frontend + Serverless',
        },
        supabase: {
          name: 'Supabase',
          freetier: '2 free projects',
          startupCredits: 'Free tier very generous',
          bestFor: 'Database + Auth',
        },
      },
      saasToolCosts: {
        stripe: '2.9% + 30c per transaction',
        sendgrid: 'Free up to 100 emails/day',
        twilio: '$0.0075 per SMS',
        openai: '$0.002 per 1K tokens',
        mongodb: 'Free 512MB cluster',
      },
      typicalStartupBudget: {
        preMvp: '$0 - $500/month',
        mvp: '$500 - $2000/month',
        earlyStage: '$2000 - $10000/month',
        growth: '$10000+/month',
      },
    };
  }
}