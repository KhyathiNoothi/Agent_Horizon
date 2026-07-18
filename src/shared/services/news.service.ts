export class NewsService {
  async getLatestNews(topic: string) {
    return [{ title: `Latest news on ${topic}`, url: '', summary: 'No data available.' }];
  }

  async getMarketNews(idea: string) {
    return [{ title: `Market news for ${idea}`, url: '', summary: 'No data available.' }];
  }

  async getTrends(industry: string) {
    return {
      trends: [
        { period: 'Q1', value: 30 },
        { period: 'Q2', value: 45 },
        { period: 'Q3', value: 55 },
        { period: 'Q4', value: 65 },
      ],
      sentiment: 'positive',
    };
  }
}
