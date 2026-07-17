import {
  StartupInput,
  AgentResult
} from "../../shared/types/analysis.types";

import { calculateScores } from "../scoring/scoring.tools";
import { generateVerdict } from "../consensus/consensus.tools";
import { runSimulation } from "../simulator/simulator.tools";
import { generateReport } from "../reports/reports.tools";

export async function runStartupAnalysis(
  input: StartupInput
) {

  console.log("Starting startup analysis...");

  const scores = calculateScores();

  const verdict = generateVerdict(
    scores.startupScore
  );

  const simulation = runSimulation();

  const report = generateReport(
    scores,
    verdict,
    simulation
  );

  const results: AgentResult[] = [];

  return {
    startupIdea: input.idea,
    budget: input.budget,
    location: input.location,
    teamSize: input.teamSize,

    scores,
    verdict,
    simulation,
    report,

    agentResults: results
  };
}