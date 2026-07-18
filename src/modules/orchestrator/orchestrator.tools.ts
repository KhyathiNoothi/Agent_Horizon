import {
  ToolDecorator as Tool,
  ExecutionContext,
  z,
} from "@nitrostack/core";

import {
  StartupInput,
  AgentResult,
} from "../../shared/types/analysis.types.js";

import { calculateScores } from "../scoring/scoring.tools.js";
import { generateVerdict } from "../consensus/consensus.tools.js";
import { runSimulation } from "../simulator/simulator.tools.js";
import { generateReport } from "../reports/reports.tools.js";

export class OrchestratorTools {

  @Tool({
    name: "run_startup_analysis",
    description: "Run complete startup analysis",
    inputSchema: z.object({
      idea: z.string(),
      budget: z.number(),
      location: z.string(),
      teamSize: z.number(),
    }),
  })
  async runStartupAnalysis(
    input: StartupInput,
    ctx: ExecutionContext
  ) {

    ctx.logger.info("Running startup analysis");

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

      agentResults: results,
    };
  }
}