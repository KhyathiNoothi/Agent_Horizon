import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class LegalPrompts {
  @Prompt({
    name: 'legal_compliance_prompt',
    description: 'Analyze legal requirements, registrations, and compliance for a startup',
    arguments: [
      { name: 'idea', description: 'The startup idea', required: true },
      { name: 'location', description: 'Startup location', required: true },
      { name: 'businessType', description: 'pvt_ltd, llp, or sole_proprietorship', required: false },
      { name: 'industry', description: 'Industry sector', required: false }
    ]
  })
  async getLegalPrompt(args: any, ctx: ExecutionContext) {
    ctx.logger.info('Generating legal compliance prompt');

    return [
      {
        role: 'user' as const,
        content: `You are an expert Legal Compliance Agent for startups.

Startup Idea: ${args.idea}
Location: ${args.location}
Business Type: ${args.businessType || 'not specified'}
Industry: ${args.industry || 'not specified'}

Provide STEP-BY-STEP procedures. Do NOT give vague advice. Cover:

1. Recommended company structure with reasoning
2. Registration steps with exact costs and timelines
3. GST registration requirement and procedure
4. MSME/Udyam registration and benefits
5. Trade license requirements
6. Data protection obligations (IT Act, DPDP Act 2023)
7. Employment law compliance (PF, ESI, contracts)
8. Required contracts (ToS, Privacy Policy, NDA, IP assignment, Founder agreement)
9. Compliance calendar with deadlines and penalties
10. Industry-specific regulations
11. Total legal cost: one-time and annual recurring
12. Legal feasibility score out of 100 with reasoning

Reference actual government portals. Be specific with rupee amounts and day counts.`
      }
    ];
  }
}