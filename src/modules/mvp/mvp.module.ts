import { Module } from '@nitrostack/core';
import { MvpTools } from './mvp.tools.js';
import { MvpResources } from './mvp.resources.js';
import { MvpPrompts } from './mvp.prompts.js';

@Module({
  name: 'mvp',
  providers: [MvpTools, MvpResources, MvpPrompts],
})
export class MvpModule {}
