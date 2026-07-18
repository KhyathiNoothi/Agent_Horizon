export class FinnhubService {
  async getMarketSentiment() {
    return {
      sentiment: 'neutral',
      score: 0.5,
    };
  }

  async getSectorData(industry: string) {
    return {
      avgValuation: {
        tam: '100M',
        sam: '30M',
        som: '10M',
      },
      growth: 'strong',
      topPlayers: ['Competitor A', 'Competitor B', 'Competitor C'],
    };
  }
}
