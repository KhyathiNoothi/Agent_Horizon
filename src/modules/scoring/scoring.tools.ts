import { AllScores } from "../../shared/types/analysis.types.js";

export function calculateScores(): AllScores {
  return {
    startupScore: 80,
    marketScore: 75,
    investmentScore: 70,
    hiringScore: 72,
    competitionScore: 68,
    legalScore: 85,
    marketingScore: 78,
    locationScore: 80,
    successProbability: 74,
    riskScore: 60,
    profitabilityScore: 82,
    scalabilityScore: 88
  };
}