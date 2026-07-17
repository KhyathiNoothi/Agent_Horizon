import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class GeoPrompts {
  @Prompt({
    name: 'geo_analysis_prompt',
    description: 'Hierarchical geographic analysis from country down to specific locality',
    arguments: [
      { name: 'idea', description: 'The startup idea', required: true },
      { name: 'industry', description: 'Industry sector', required: true },
      { name: 'budget', description: 'Available budget', required: false },
      { name: 'targetAudience', description: 'Target customer description', required: false }
    ]
  })
  async getGeoPrompt(args: any, ctx: ExecutionContext) {
    ctx.logger.info('Generating geo analysis prompt');

    return [
      {
        role: 'user' as const,
        content: `You are an expert Geo Intelligence Agent for startups.

CRITICAL: DO NOT stop at city level. You MUST drill down to specific area/locality.

Startup Idea: ${args.idea}
Industry: ${args.industry}
Budget: ${args.budget || 'not specified'}
Target Audience: ${args.targetAudience || 'not specified'}

Provide analysis in this hierarchy, with a score and reasoning at EACH level:

Country → State → City → District → Area/Locality → Recommended Office Location

Example of required depth:
India → Telangana → Hyderabad → Rangareddy → Gachibowli → Success Rate 97%

For the recommended locality, provide:
- Nearby colleges with distance and student count
- Nearby companies and ecosystem signal
- Startup ecosystem (incubators, coworking, community strength)
- Internet and transport connectivity
- Infrastructure quality
- Estimated office costs (coworking vs dedicated)
- Talent availability and salary ranges
- Local competition
- Investment/VC presence
- Target audience density
- Living costs for the team
- 2-3 alternative localities with scores

End with a location score out of 100 and its breakdown.`
      }
    ];
  }
}