import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { HackathonTools } from './hackathon.tools.js';
import { HackathonResources } from './hackathon.resources.js';
import { HackathonPrompts } from './hackathon.prompts.js';

@Module({
  name: 'hackathon',
  providers: [HackathonTools, HackathonResources, HackathonPrompts],
})
export class HackathonModule {}