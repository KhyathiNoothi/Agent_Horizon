import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { LegalTools } from './legal.tools.js';
import { LegalResources } from './legal.resources.js';
import { LegalPrompts } from './legal.prompts.js';

@Module({
  name: 'legal',
  providers: [LegalTools, LegalResources, LegalPrompts],
})
export class LegalModule {}