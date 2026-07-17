import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { InvestorTools } from './investor.tools.js';
import { InvestorPrompts } from './investor.prompts.js';
import { InvestorResources } from './investor.resources.js';

@Module({
  name: 'investor',
  providers: [InvestorTools, InvestorPrompts, InvestorResources],
})
export class InvestorModule {}