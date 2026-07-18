import { SimulationResult } from "../../shared/types/analysis.types.js";

export function runSimulation(): SimulationResult {
  return {
    scenario: "realistic",

    month3: {
      users: 100,
      revenue: 5000,
      burnRate: 2000
    },

    month6: {
      users: 500,
      revenue: 25000,
      burnRate: 8000
    },

    month12: {
      users: 2000,
      revenue: 100000,
      burnRate: 25000
    },

    successProbability: 75,

    risks: [
      "Strong competition",
      "Funding challenges",
      "Customer acquisition cost may increase"
    ]
  };
}