import { NextRequest, NextResponse } from "next/server";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const routeDir = path.dirname(fileURLToPath(import.meta.url));
    const orchestratorPath = path.join(routeDir, "../../../../../dist/modules/orchestrator/orchestrator.tools.js");
    const orchestratorExists = fs.existsSync(orchestratorPath);
    console.log('ORCHESTRATOR_PATH', orchestratorPath, 'exists=', orchestratorExists);
    if (!orchestratorExists) console.error('Orchestrator compile missing at', orchestratorPath);
    const { runStartupAnalysis } = await import(orchestratorPath);

    const body = await request.json();
    const input = {
      idea: String(body.idea ?? ""),
      budget: Number(body.budget ?? 0),
      location: String(body.location ?? ""),
      teamSize: Number(body.teamSize ?? 0)
    };

    try {
    const result = await runStartupAnalysis(input);
    return NextResponse.json(result);
} catch (err: any) {
    console.error("RUN STARTUP ANALYSIS FAILED");
    console.error(err);
    console.error(err?.stack);

    return NextResponse.json(
      {
        error: err?.message,
        stack: err?.stack,
      },
      { status: 500 }
    );
}
  } catch (error) {
    console.error('ANALYSIS_ROUTE_ERROR', error, (error as any)?.stack);
    const payload: any = { error: (error as Error).message || 'Internal server error' };
    if (process.env.NODE_ENV !== 'production') payload.stack = (error as any)?.stack;
    return NextResponse.json(payload, { status: 500 });
  }
}
