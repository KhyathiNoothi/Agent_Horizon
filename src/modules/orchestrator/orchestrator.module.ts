import "reflect-metadata";
import { Module } from "@nitrostack/core";
import { OrchestratorTools } from "./orchestrator.tools.js";

@Module({
  name: "orchestrator",
  providers: [OrchestratorTools],
})
export class OrchestratorModule {}