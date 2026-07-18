import {
  AllScores,
  Verdict,
  SimulationResult
} from "../../shared/types/analysis.types.js";

export function generateReport(
  scores: AllScores,
  verdict: Verdict,
  simulation: SimulationResult
) {
  return {
    generatedAt: new Date(),

    summary: {
      verdict: verdict.decision,
      startupScore: scores.startupScore,
      marketScore: scores.marketScore,
      successProbability: scores.successProbability
    },

    simulation,

    recommendations: verdict.suggestedChanges
  };
}