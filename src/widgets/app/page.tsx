"use client";

import { useState } from "react";

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const [status, setStatus] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const runAnalysis = async () => {
    setStatus("Running FoundrAI Analysis...");

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, budget: Number(budget), location, teamSize: Number(teamSize) })
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();
      setAnalysisResult(data);
      setStatus("Analysis Completed");
    } catch (err: any) {
      setStatus(`Analysis failed: ${err?.message || err}`);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🚀 FoundrAI</h1>

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

      <p>{status}</p>

      {analysisResult && (
        <div>

          <h2>📊 Startup Scores</h2>

          <p>Startup Score: {analysisResult.scores?.startupScore}</p>
          <p>Market Score: {analysisResult.scores?.marketScore}</p>
          <p>Investment Score: {analysisResult.scores?.investmentScore}</p>
          <p>Hiring Score: {analysisResult.scores?.hiringScore}</p>
          <p>Competition Score: {analysisResult.scores?.competitionScore}</p>
          <p>Legal Score: {analysisResult.scores?.legalScore}</p>
          <p>Marketing Score: {analysisResult.scores?.marketingScore}</p>
          <p>Location Score: {analysisResult.scores?.locationScore}</p>
          <p>Success Probability: {analysisResult.scores?.successProbability}%</p>
          <p>Risk Score: {analysisResult.scores?.riskScore}</p>
          <p>Profitability Score: {analysisResult.scores?.profitabilityScore}</p>
          <p>Scalability Score: {analysisResult.scores?.scalabilityScore}</p>

          <hr />

          <h2>📋 Legal Analysis</h2>
          {analysisResult.legalResult ? (
            <div>
              <p>Legal Score: {analysisResult.legalResult.legal_score}</p>
              <p>Recommended Structure: {analysisResult.legalResult.recommended_structure?.type}</p>
              <p>Estimated One-time Cost: {analysisResult.legalResult.estimated_costs?.one_time}</p>
            </div>
          ) : <p>No legal analysis available</p>}

          <hr />

          <h2>💰 Investor Analysis</h2>
          {analysisResult.investorResult ? (
            <div>
              <p>Investment Score: {analysisResult.investorResult.investment_score}</p>
              <p>Top Accelerator Match: {analysisResult.investorResult.matching_accelerators?.[0]?.name || 'N/A'}</p>
              <p>Recommended Next Round: {analysisResult.investorResult.funding_readiness?.recommended_next_round}</p>
            </div>
          ) : <p>No investor analysis available</p>}

          <hr />

          <h2>👥 Hiring Analysis</h2>
          {analysisResult.talentResult ? (
            <div>
              <p>Hiring Score: {analysisResult.talentResult.hiring_score}</p>
              <p>Estimated Monthly Team Cost: {analysisResult.talentResult.budget_summary?.estimated_monthly_team_cost}</p>
              <h4>Recommended Team</h4>
              <ul>
                {analysisResult.talentResult.recommended_team?.map((r: any, i: number) => (
                  <li key={i}>{r.role} — {r.quantity} ({r.priority})</li>
                ))}
              </ul>
            </div>
          ) : <p>No hiring analysis available</p>}

          <hr />

          <h2>📍 Geo Analysis</h2>
          {analysisResult.geoResult ? (
            <div>
              <p>Location Score: {analysisResult.geoResult.location_score}</p>
              <p>Recommended City: {analysisResult.geoResult.hierarchical_recommendation?.city}</p>
              <p>Area Coworking Monthly: {analysisResult.geoResult.area_details?.coworking_monthly}</p>
            </div>
          ) : <p>No geo analysis available</p>}

          <hr />

          <h2>🏆 Final Verdict</h2>

          <p>
            <strong>
              {analysisResult.verdict?.decision}
            </strong>
          </p>

          <p>
            {analysisResult.verdict?.reasoning}
          </p>

          <hr />

          <h2>📈 Startup Simulation</h2>

          <h3>3 Months</h3>
          <p>Users: {analysisResult.simulation?.month3?.users}</p>
          <p>Revenue: {analysisResult.simulation?.month3?.revenue}</p>
          <p>Burn Rate: {analysisResult.simulation?.month3?.burnRate}</p>

          <h3>6 Months</h3>
          <p>Users: {analysisResult.simulation?.month6?.users}</p>
          <p>Revenue: {analysisResult.simulation?.month6?.revenue}</p>
          <p>Burn Rate: {analysisResult.simulation?.month6?.burnRate}</p>

          <h3>12 Months</h3>
          <p>Users: {analysisResult.simulation?.month12?.users}</p>
          <p>Revenue: {analysisResult.simulation?.month12?.revenue}</p>
          <p>Burn Rate: {analysisResult.simulation?.month12?.burnRate}</p>

          <p>
            Success Probability:
            {" "}
            {analysisResult.simulation?.successProbability}%
          </p>

          <h3>⚠ Risks</h3>

          <ul>
            {analysisResult.simulation?.risks?.map(
              (risk: string, index: number) => (
                <li key={index}>{risk}</li>
              )
            )}
          </ul>

        </div>
      )}
    </div>
  );
}