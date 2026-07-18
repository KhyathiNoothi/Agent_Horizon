import { Module } from '@nitrostack/core';
import { TechStackTools } from './tech-stack.tools.js';
import { TechStackResources } from './tech-stack.resources.js';
import { TechStackPrompts } from './tech-stack.prompts.js';

@Module({
  name: 'tech-stack',
  providers: [TechStackTools, TechStackResources, TechStackPrompts],
})
export class TechStackModule {}
