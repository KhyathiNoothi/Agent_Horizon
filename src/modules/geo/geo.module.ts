import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { GeoTools } from './geo.tools.js';
import { GeoResources } from './geo.resources.js';
import { GeoPrompts } from './geo.prompts.js';

@Module({
  name: 'geo',
  providers: [GeoTools, GeoResources, GeoPrompts],
})
export class GeoModule {}