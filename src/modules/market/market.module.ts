import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { MarketTools } from './market.tools.js';
import { MarketResources } from './market.resource.js';
import { MarketPrompts } from './market.prompts.js';

@Module({
  name: 'market',
  providers: [MarketTools, MarketResources, MarketPrompts],
})
export class MarketModule {}