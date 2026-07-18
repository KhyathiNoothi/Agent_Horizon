export class AiReasoningService {
  estimateCosts(techStack: string) {
    return {
      hosting: 30,
      database: 20,
      storage: 15,
      email_service: 10,
      monitoring: 15,
      ai_apis: 25,
      third_party_apis: 20,
      cdn: 10,
      backup: 5,
    };
  }

  planHackathon(teamSize: number, hoursAvailable: number, features: string[]) {
    return {
      phases: [
        { phase: 'Setup', hours: Math.max(2, Math.floor(hoursAvailable * 0.1)) },
        { phase: 'Development', hours: Math.max(6, Math.floor(hoursAvailable * 0.55)) },
        { phase: 'Testing', hours: Math.max(4, Math.floor(hoursAvailable * 0.2)) },
        { phase: 'Launch', hours: hoursAvailable - Math.max(2, Math.floor(hoursAvailable * 0.1)) - Math.max(6, Math.floor(hoursAvailable * 0.55)) - Math.max(4, Math.floor(hoursAvailable * 0.2)) },
      ],
      teamDistribution: features.map((feature, index) => ({
        role: `Person ${(index % teamSize) + 1}`,
        feature,
      })),
    };
  }
}
