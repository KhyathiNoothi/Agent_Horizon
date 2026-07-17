import { PromptDecorator as Prompt } from '@nitrostack/core';

export class CostPrompts {
  @Prompt({
    name: 'cost_analysis_prompt',
    description: 'Analyze startup costs'
  })
  async getCostPrompt(args: { startupStage: string; teamSize: number }) {
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Analyze costs for a ${args.startupStage} stage startup with ${args.teamSize} people`,
          },
        },
      ],
    };
  }
}