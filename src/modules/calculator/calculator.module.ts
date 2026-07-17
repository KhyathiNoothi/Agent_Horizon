import 'reflect-metadata';
import { Module } from '@nitrostack/core';
import { CalculatorTools } from './calculator.tools.js';
import { CalculatorResources } from './calculator.resources.js';
import { CalculatorPrompts } from './calculator.prompts.js';

@Module({
  name: 'calculator',
  providers: [CalculatorTools, CalculatorResources, CalculatorPrompts],
})
export class CalculatorModule {}