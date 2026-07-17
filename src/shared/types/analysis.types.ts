export interface StartupInput {
  idea: string;
  budget: number;
  location: string;
  teamSize: number;
}

export interface AgentResult {
  agentName: string;
  score: number;
  summary: string;
  recommendation: string;
}

export interface AllScores {
  startupScore: number;
  marketScore: number;
  investmentScore: number;
  hiringScore: number;
  competitionScore: number;
  legalScore: number;
  marketingScore: number;
  locationScore: number;
  successProbability: number;
  riskScore: number;
  profitabilityScore: number;
  scalabilityScore: number;
}

export interface Verdict {
  decision:
    | "BUILD_IT"
    | "BUILD_WITH_CHANGES"
    | "PIVOT_IDEA"
    | "DO_NOT_BUILD";

  reasoning: string;
  suggestedChanges: string[];
}

export interface SimulationResult {
  scenario:
    | "optimistic"
    | "realistic"
    | "pessimistic";

  month3: {
    users: number;
    revenue: number;
    burnRate: number;
  };

  month6: {
    users: number;
    revenue: number;
    burnRate: number;
  };

  month12: {
    users: number;
    revenue: number;
    burnRate: number;
  };

  successProbability: number;
  risks: string[];
}