import { PromptDecorator as Prompt } from '@nitrostack/core';

export class TalentPrompts {
  @Prompt({
    name: "talent_matching_prompt",
    description:
      "Template for analyzing hiring needs, matching talent, recommending team composition, and creating hiring roadmap for a startup",
  })
  async getTalentPrompt(args: {
    idea: string;
    industry: string;
    budget: string;
    teamSize: string;
    location: string;
    techStack: string;
  }) {
    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `You are an expert Talent Intelligence Agent for startups. Analyze hiring needs and recommend team composition.

Startup Idea: ${args.idea}
Industry: ${args.industry}
Budget for Hiring: ${args.budget}
Target Team Size: ${args.teamSize}
Location: ${args.location}
Tech Stack: ${args.techStack}

This works BOTH WAYS:
- Founders finding people
- People finding startups

Provide response in this JSON format:
{
  "recommended_team": [
    {
      "role": "Role Title",
      "priority": "Critical/High/Medium",
      "quantity": 1,
      "skills_required": ["skill1", "skill2"],
      "experience_years": "X-Y years",
      "salary_range": {"min": 0, "max": 0, "currency": "INR", "period": "annual"},
      "equity_percentage": "X%",
      "hiring_timeline": "Month X",
      "where_to_find": ["GitHub", "WellFound", "LinkedIn"],
      "job_description_summary": "What they will do",
      "why_critical": "Why this role matters for this startup"
    }
  ],
  "hiring_phases": [
    {
      "phase": 1,
      "phase_name": "MVP Build",
      "timeline": "Month 1-3",
      "hires": [{"role": "Role", "quantity": 1}],
      "monthly_cost": 0,
      "rationale": "Why hire these now"
    }
  ],
  "sourcing_strategy": [
    {
      "platform": "GitHub/WellFound/Kaggle/Devpost/LinkedIn",
      "best_for_roles": ["role1", "role2"],
      "effectiveness": 0-10,
      "cost": "Free/Paid",
      "how_to_use": "Step-by-step approach",
      "expected_response_rate": "X%"
    }
  ],
  "salary_benchmarks": [
    {
      "role": "Role",
      "junior_0_2yrs": "Rs X LPA",
      "mid_2_5yrs": "Rs X LPA",
      "senior_5plus": "Rs X LPA",
      "location_premium": "+/- X% for this city"
    }
  ],
  "equity_allocation": {
    "total_esop_pool": "X% of company",
    "allocation": [
      {"role": "Role", "equity": "X%", "vesting": "4 years with 1 year cliff"}
    ]
  },
  "cofounder_recommendation": {
    "need_cofounder": true/false,
    "ideal_cofounder_profile": "Description",
    "where_to_find": ["platform1", "platform2"],
    "equity_split_recommendation": "50-50 or 60-40 with reasoning"
  },
  "intern_strategy": {
    "recommended_interns": [
      {"role": "Intern title", "stipend_monthly": "Rs X", "duration": "X months", "source": "College/Platform"}
    ],
    "benefits_of_interns": ["benefit1", "benefit2"],
    "risks": ["risk1"]
  },
  "hiring_budget_summary": {
    "month_1_3_cost": 0,
    "month_4_6_cost": 0,
    "month_7_12_cost": 0,
    "total_year_1_hiring_cost": 0
  },
  "hiring_score": 0-100,
  "hiring_score_breakdown": {
    "talent_availability": 0-25,
    "salary_competitiveness": 0-20,
    "startup_appeal": 0-20,
    "remote_flexibility": 0-15,
    "hiring_competition": 0-20
  }
}`,
          },
        },
      ],
    };
  }
}