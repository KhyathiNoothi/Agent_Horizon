import { PromptDecorator as Prompt } from '@nitrostack/core';

export class InvestorPrompts {
  @Prompt({
    name: "investor_analysis_prompt",
    description:
      "Template for analyzing funding opportunities, matching investors, and creating a fundraising roadmap for a startup",
  })
  async getInvestorPrompt(args: {
    idea: string;
    industry: string;
    stage: string;
    fundingNeeded: string;
    location: string;
  }) {
    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `You are an expert Investor Intelligence Agent. Analyze funding opportunities for this startup:

Startup Idea: ${args.idea}
Industry: ${args.industry}
Stage: ${args.stage}
Funding Needed: ${args.fundingNeeded}
Location: ${args.location}

Provide response in this JSON format:
{
  "funding_readiness": {
    "is_ready": true/false,
    "current_stage": "pre_seed/seed/series_a",
    "recommended_round": "Round name",
    "recommended_amount": "Rs X",
    "prerequisites_met": ["met1", "met2"],
    "prerequisites_missing": ["missing1", "missing2"]
  },
  "matching_accelerators": [
    {
      "name": "Accelerator name",
      "funding": "Amount",
      "equity": "X%",
      "program_length": "X months",
      "focus_areas": ["area1"],
      "match_score": 0-100,
      "application_url": "URL",
      "why_good_fit": "Reasoning"
    }
  ],
  "matching_angel_networks": [
    {
      "name": "Network name",
      "check_size": "Rs X - Y",
      "focus": ["area1"],
      "location": "City",
      "match_score": 0-100,
      "how_to_approach": "Strategy"
    }
  ],
  "matching_vc_firms": [
    {
      "name": "VC name",
      "stage_focus": "Stage",
      "ticket_size": "Rs X - Y crore",
      "sector_focus": ["sector1"],
      "match_score": 0-100,
      "notable_investments": ["company1"],
      "how_to_approach": "Strategy"
    }
  ],
  "government_grants": [
    {
      "name": "Grant name",
      "amount": "Rs X",
      "eligibility": "Criteria",
      "apply_at": "URL",
      "match_score": 0-100
    }
  ],
  "fundraising_roadmap": [
    {
      "round": "Round name",
      "timeline": "Month X-Y",
      "amount": "Rs X",
      "valuation_estimate": "Rs X crore",
      "dilution": "X%",
      "milestones_needed_before": ["milestone1"],
      "use_of_funds": ["use1"]
    }
  ],
  "pitch_deck_structure": [
    "Slide 1: Problem",
    "Slide 2: Solution"
  ],
  "investment_score": 0-100,
  "investment_score_breakdown": {
    "founder_credibility": 0-25,
    "market_opportunity": 0-25,
    "product_traction": 0-20,
    "team_composition": 0-15,
    "growth_potential": 0-15
  }
}`,
          },
        },
      ],
    };
  }
}