import { PromptDecorator as Prompt, z } from '@nitrostack/core';

export class TechStackPrompts {
  @Prompt({
    name: 'tech_stack_prompt',
    description: 'Template for recommending a tech stack',
  })
  async getTechStackPrompt(args: { idea: string; budget: string }) {
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Recommend the best technology stack for: "${args.idea}"

Budget level: ${args.budget}

Please provide:
1. Frontend framework (with reason)
2. Backend framework (with reason)
3. Database (with reason)
4. Cloud hosting (with reason)
5. AI/ML tools if needed
6. Authentication solution
7. Total estimated monthly cost
8. Time to build MVP`,
          },
        },
      ],
    };
  }
}
