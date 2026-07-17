import { PromptDecorator as Prompt, z } from '@nitrostack/core';

export class HackathonPrompts {
  @Prompt({
    name: 'hackathon_plan_prompt',
    description: 'Template for creating a hackathon execution plan'
  })
  async getHackathonPrompt(args: {
    projectName: string;
    hoursAvailable: number;
    teamSize: number;
  }) {
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Create a detailed hackathon execution plan for:

Project: ${args.projectName}
Available time: ${args.hoursAvailable} hours
Team size: ${args.teamSize} people

Please provide:
1. Hour-by-hour timeline
2. Task assignment per person
3. Critical path items
4. Risk mitigation strategies
5. Submission checklist
6. Tips for winning`,
          },
        },
      ],
    };
  }
}