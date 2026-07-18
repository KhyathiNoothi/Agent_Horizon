import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { CalculatorModule } from './modules/calculator/calculator.module.js';
import { SystemHealthCheck } from './health/system.health.js';
import { OrchestratorModule } from './modules/orchestrator/orchestrator.module.js';
import { LegalModule } from './modules/legal/legal.module.js';
import { InvestorModule } from './modules/investor/investor.module.js';
import { TalentModule } from './modules/talent/talent.module.js';
import { GeoModule } from './modules/geo/geo.module.js';
import { CostModule } from './modules/cost/cost.module.js';
import { HackathonModule } from './modules/hackathon/hackathon.module.js';
import { MarketModule } from './modules/market/market.module.js';
import { MvpModule } from './modules/mvp/mvp.module.js';
import { TechStackModule } from './modules/tech-stack/tech-stack.module.js';

/**
 * Root Application Module
 * 
 * This is the main module that bootstraps the MCP server.
 * It registers all feature modules and health checks.
 */
@McpApp({
  module: AppModule,
  server: {
    name: 'FoundrAI',
    version: '1.0.0'
  },
  logging: {
    level: 'info'
  }
})
@Module({
  name: 'app',
  description: 'Root application module',
  imports: [
    ConfigModule.forRoot(),

    OrchestratorModule,
    LegalModule,
    InvestorModule,
    TalentModule,
    GeoModule,
    CalculatorModule,
    CostModule,
    HackathonModule,
    MarketModule,
    MvpModule,
    TechStackModule,
  ],
  providers: [
    // Health Checks
    SystemHealthCheck,
  ]
})
export class AppModule {}


