import { PromptDecorator as Prompt } from '@nitrostack/core';

export class MarketPrompts {
  @Prompt({
    name: 'market_analysis_prompt',
    description: 'Analyze market opportunities'
  })
  async getMarketPrompt(args: { industry: string; targetAudience: string }) {
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Analyze market for ${args.industry} targeting ${args.targetAudience}`,
          },
        },
      ],
    };
  }
}