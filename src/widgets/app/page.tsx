"use client";

import { useState } from "react";
import { runStartupAnalysis } from "../../modules/orchestrator/orchestrator.tools";

export default function HomePage() {

  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const [result, setResult] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const runAnalysis = async () => {

    setResult("Running FoundrAI Analysis...");

    const response = await runStartupAnalysis({
      idea,
      budget: Number(budget),
      location,
      teamSize: Number(teamSize)
    });

    setAnalysisResult(response);

    setResult("Analysis Completed");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>FoundrAI</h1>

      <h2>Startup Analysis Platform</h2>

      <br />

      <input
        placeholder="Startup Idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Team Size"
        value={teamSize}
        onChange={(e) => setTeamSize(e.target.value)}
      />

      <br />
      <br />

      <button onClick={runAnalysis}>
        Analyze Startup
      </button>

      <br />
      <br />

      <p>{result}</p>

      {analysisResult && (
        <div>

          <h3>Results</h3>

          <p>
            Startup Score: {analysisResult.scores.startupScore}
          </p>

          <p>
            Market Score: {analysisResult.scores.marketScore}
          </p>

          <p>
            Success Probability:
            {" "}
            {analysisResult.scores.successProbability}%
          </p>

          <p>
            Verdict:
            {" "}
            {analysisResult.verdict.decision}
          </p>

          <p>
            Reason:
            {" "}
            {analysisResult.verdict.reasoning}
          </p>

        </div>
      )}

    </div>
  );
}