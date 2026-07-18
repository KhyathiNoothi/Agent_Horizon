import { Verdict } from "../../shared/types/analysis.types.js";

export function generateVerdict(
  overallScore: number
): Verdict {

  if (overallScore >= 85) {
    return {
      decision: "BUILD_IT",
      reasoning:
        "The startup shows strong market potential, scalability, and profitability.",
      suggestedChanges: []
    };
  }

  if (overallScore >= 70) {
    return {
      decision: "BUILD_WITH_CHANGES",
      reasoning:
        "The idea is promising but requires improvements before launch.",
      suggestedChanges: [
        "Improve marketing strategy",
        "Validate customer demand",
        "Optimize costs"
      ]
    };
  }

  if (overallScore >= 50) {
    return {
      decision: "PIVOT_IDEA",
      reasoning:
        "The startup has potential, but the current business model needs major changes.",
      suggestedChanges: [
        "Re-evaluate target market",
        "Modify value proposition",
        "Explore alternative revenue models"
      ]
    };
  }

  return {
    decision: "DO_NOT_BUILD",
    reasoning:
      "The startup faces significant risks and low chances of success.",
    suggestedChanges: [
      "Conduct deeper market research",
      "Identify a stronger problem to solve",
      "Consider a different startup idea"
    ]
  };
}