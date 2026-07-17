import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

export class HackathonResources {
  @Resource({
    name: 'hackathon_templates',
    uri: 'hackathon://templates',
    description: 'Hackathon planning templates and best practices'
  })
  async getHackathonTemplates(ctx: ExecutionContext) {
    return {
      winningFormula: {
        technical: '40% of score',
        innovation: '25% of score',
        impact: '20% of score',
        presentation: '15% of score',
      },
      demoStructure: {
        duration: '2 minutes',
        structure: [
          '0:00-0:20 — Problem statement (what pain you solve)',
          '0:20-0:40 — Solution demo (show it working)',
          '0:40-1:20 — Key features walkthrough',
          '1:20-1:40 — Technical architecture (MCP tools)',
          '1:40-2:00 — Impact and future potential',
        ],
      },
      submissionTemplate: {
        title: 'AI Startup Co-founder — MCP Server',
        tagline: 'Turn any startup idea into a complete MVP in minutes',
        problemStatement: 'Founders waste months researching markets, planning tech stacks, and creating pitch decks. Our AI Co-founder does all of this in minutes using MCP.',
        solution: 'An MCP server with 10 specialized AI agents that analyze any startup idea and generate complete analysis, market research, tech stack recommendations, architecture diagrams, MVP roadmap, cost estimates, and pitch deck.',
        mcpHighlights: [
          'Uses MCP Tools for market research and analysis',
          'Uses MCP Resources for cached templates and data',
          'Uses MCP Prompts for structured AI interactions',
          'Uses NitroStack Widgets for beautiful visualizations',
          'Multi-agent orchestration for parallel processing',
        ],
      },
      judgesTips: [
        'Show REAL data from APIs not just mock data',
        'Demonstrate multiple MCP tools working together',
        'Show the NitroStack widgets rendering beautifully',
        'Explain WHY you used MCP for this problem',
        'Mention scalability and real-world impact',
      ],
    };
  }
}