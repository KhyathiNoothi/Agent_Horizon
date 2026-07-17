import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { TalentTools } from './talent.tools.js';
import { TalentPrompts } from './talent.prompts.js';
import { TalentResources } from './talent.resources.js';

@Module({
  name: 'talent',
  providers: [TalentTools, TalentPrompts, TalentResources],
})
export class TalentModule {}