import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { CostTools } from './cost.tools.js';
import { CostResources } from './cost.resources.js';

@Module({
  name: 'cost',
  providers: [CostTools, CostResources],
})
export class CostModule {}