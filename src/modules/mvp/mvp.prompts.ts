import { PromptDecorator as Prompt, z } from '@nitrostack/core';

export class MvpPrompts {
  @Prompt({
    name: 'mvp_plan_prompt',
    description: 'Template for planning an MVP',
  })
  async getMvpPlanPrompt(args: { idea: string; timeline: string }) {
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Create an MVP plan for: "${args.idea}"

Timeline: ${args.timeline}

Please provide:
1. Core features (Must Have / Should Have / Could Have)
2. A phased roadmap with week ranges
3. Key milestones and what "done" looks like for each
4. Risks or scope-cut recommendations for hitting the timeline`,
          },
        },
      ],
    };
  }
}
