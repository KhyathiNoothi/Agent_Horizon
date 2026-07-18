export class GithubService {
  async getTopProjects(query: string) {
    return [{ name: 'example-repo', stars: 0, description: 'Mock repository data.' }];
  }

  async getPopularFrameworks(type: string) {
    return [`${type}-framework-1`, `${type}-framework-2`, `${type}-framework-3`];
  }
}
