import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

export class MarketResources {
  @Resource({
    uri: 'market://data',
    name: 'market-data',
    description: 'Market research data and analysis information'
  })
  async getMarketData(ctx: ExecutionContext) {
    return {
      marketSizes: {
        saas: '$150B globally',
        ai_ml: '$136B by 2025',
        fintech: '$305B by 2024',
        ecommerce: '$6.3T by 2024'
      },
      growthRates: {
        saas: '11% CAGR',
        ai_ml: '38% CAGR',
        fintech: '12% CAGR',
        ecommerce: '8% CAGR'
      },
      topMarkets: ['US', 'Europe', 'Asia-Pacific', 'India'],
      competitorAnalysis: {
        description: 'Framework for analyzing competitors',
        factors: ['Market share', 'Growth rate', 'Pricing', 'Features', 'Team size']
      }
    };
  }
}