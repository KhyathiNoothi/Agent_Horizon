import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class TalentTools {
  @Tool({
    name: 'analyze_hiring_needs',
    description: 'Analyze hiring needs for a startup: team composition, hiring phases, salary benchmarks, equity allocation, and sourcing strategy across GitHub, WellFound, Kaggle, Devpost.',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      industry: z.string().describe('Industry sector'),
      teamSize: z.number().describe('Target team size'),
      techStack: z.string().optional().describe('Technology stack being used'),
      monthlyBudget: z.number().optional().describe('Monthly hiring budget in INR'),
      location: z.string().optional().describe('Location of startup'),
      remote: z.boolean().optional().describe('Whether remote hiring is possible'),
      stage: z.string().optional().describe('Stage: idea, mvp, pre_launch, launched, scaling')
    })
  })
  async analyzeHiringNeeds(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Analyzing hiring needs', { teamSize: input.teamSize, location: input.location });

    const dataPath = path.join(process.cwd(), 'data', 'talent-platforms.json');
    const talentData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const salary = talentData.salary_benchmarks_india;

    const roles: any[] = [];

    if (input.teamSize >= 1) {
      roles.push({
        role: 'Full Stack Developer',
        priority: 'Critical',
        quantity: Math.min(Math.ceil(input.teamSize * 0.4), 5),
        skills_required: ['React/Vue', 'Node.js/Python', 'SQL/NoSQL', 'Git', 'REST APIs'],
        experience: '2-5 years',
        salary_range: salary.software_engineer.mid_2_5yrs,
        equity: '0.5-1.5%',
        where_to_find: ['GitHub', 'WellFound', 'LinkedIn'],
        why_critical: 'Core product development'
      });
    }
    if (input.teamSize >= 2) {
      roles.push({
        role: 'UI/UX Designer',
        priority: 'High',
        quantity: 1,
        skills_required: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
        experience: '1-3 years',
        salary_range: salary.ui_ux_designer.mid_2_5yrs,
        equity: '0.3-0.8%',
        where_to_find: ['Dribbble', 'Behance', 'LinkedIn'],
        why_critical: 'Product usability and customer experience'
      });
    }
    if (input.teamSize >= 3) {
      roles.push({
        role: 'Marketing Lead',
        priority: 'High',
        quantity: 1,
        skills_required: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
        experience: '2-4 years',
        salary_range: salary.marketing_lead.mid_2_5yrs,
        equity: '0.3-0.5%',
        where_to_find: ['LinkedIn', 'WellFound'],
        why_critical: 'Customer acquisition and brand building'
      });
    }

    const stack = (input.techStack || '').toLowerCase();
    const ind = (input.industry || '').toLowerCase();
    if (ind.includes('ai') || ind.includes('ml') || stack.includes('ai') || stack.includes('ml')) {
      roles.push({
        role: 'AI/ML Engineer',
        priority: 'Critical',
        quantity: 1,
        skills_required: ['Python', 'TensorFlow/PyTorch', 'NLP', 'MLOps'],
        experience: '2-5 years',
        salary_range: salary.data_scientist.mid_2_5yrs,
        equity: '0.5-1.5%',
        where_to_find: ['Kaggle', 'GitHub', 'LinkedIn'],
        why_critical: 'Core AI product development'
      });
    }
    if (input.teamSize >= 5) {
      roles.push({
        role: 'DevOps Engineer',
        priority: 'Medium',
        quantity: 1,
        skills_required: ['AWS/GCP', 'Docker', 'CI/CD', 'Kubernetes', 'Monitoring'],
        experience: '2-4 years',
        salary_range: salary.devops_engineer.mid_2_5yrs,
        equity: '0.3-0.8%',
        where_to_find: ['GitHub', 'LinkedIn'],
        why_critical: 'Infrastructure reliability and deployment automation'
      });
    }

    const totalMonthlyCost = roles.reduce(
      (sum, r) => sum + (r.salary_range.max / 12) * r.quantity, 0
    );

    let hiringScore = 75;
    const loc = (input.location || '').toLowerCase();
    if (loc.includes('bangalore') || loc.includes('hyderabad')) hiringScore += 10;
    else if (loc.includes('mumbai')) hiringScore += 5;
    if (input.remote) hiringScore += 8;
    if (input.monthlyBudget && input.monthlyBudget < totalMonthlyCost * 0.5) hiringScore -= 15;
    if (input.teamSize > 10) hiringScore -= 5;
    hiringScore = Math.max(20, Math.min(100, hiringScore));

    return {
      startup: input.idea,
      recommended_team: roles,
      hiring_phases: [
        {
          phase: 1,
          name: 'MVP Build',
          timeline: 'Month 1-3',
          hires: roles.filter(r => r.priority === 'Critical').map(r => ({ role: r.role, quantity: r.quantity })),
          rationale: 'Critical roles needed to build and launch MVP'
        },
        {
          phase: 2,
          name: 'Growth',
          timeline: 'Month 4-6',
          hires: roles.filter(r => r.priority === 'High').map(r => ({ role: r.role, quantity: r.quantity })),
          rationale: 'Growth roles needed after MVP launch'
        },
        {
          phase: 3,
          name: 'Scale',
          timeline: 'Month 7-12',
          hires: roles.filter(r => r.priority === 'Medium').map(r => ({ role: r.role, quantity: r.quantity })),
          rationale: 'Support roles for infrastructure and operations'
        }
      ],
      sourcing_strategy: Object.values(talentData.platforms).map((p: any) => ({
        platform: p.name,
        best_for: p.best_for,
        effectiveness: p.effectiveness,
        how_to_evaluate: p.how_to_evaluate
      })),
      intern_recommendations: {
        recommended: input.teamSize <= 5,
        roles: [
          { role: 'Development Intern', stipend: salary.intern.stipend_monthly, source: 'College campus, Devpost, Internshala' },
          { role: 'Marketing Intern', stipend: salary.intern.stipend_monthly, source: 'LinkedIn, Internshala' }
        ]
      },
      budget_summary: {
        estimated_monthly_team_cost: Math.round(totalMonthlyCost),
        estimated_annual_cost: Math.round(totalMonthlyCost * 12),
        budget_provided: input.monthlyBudget || 'Not specified',
        budget_sufficient: input.monthlyBudget ? input.monthlyBudget >= totalMonthlyCost * 0.6 : 'Unknown'
      },
      hiring_score: hiringScore,
      hiring_score_breakdown: {
        talent_availability: Math.round(hiringScore * 0.25),
        salary_competitiveness: Math.round(hiringScore * 0.20),
        startup_appeal: Math.round(hiringScore * 0.20),
        remote_flexibility: input.remote ? 15 : 8,
        hiring_competition: Math.round(hiringScore * 0.20)
      },
      note: 'All sourcing uses publicly available profiles only. Private profiles are never scraped.'
    };
  }

  @Tool({
    name: 'get_salary_benchmark',
    description: 'Get salary benchmarks for a specific role in Indian startups by experience level, with city premium applied',
    inputSchema: z.object({
      role: z.enum([
        'software_engineer', 'frontend_developer', 'backend_developer',
        'data_scientist', 'ui_ux_designer', 'product_manager',
        'marketing_lead', 'devops_engineer', 'intern'
      ]).describe('The role to benchmark'),
      location: z.string().optional().describe('City for location premium adjustment')
    })
  })
  async getSalaryBenchmark(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Fetching salary benchmark', { role: input.role });

    const dataPath = path.join(process.cwd(), 'data', 'talent-platforms.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const salaryData = data.salary_benchmarks_india[input.role];

    if (!salaryData) {
      throw new Error(`Role not found. Available: ${Object.keys(data.salary_benchmarks_india).join(', ')}`);
    }

    let premium = 0;
    const loc = (input.location || '').toLowerCase();
    if (loc.includes('bangalore')) premium = 20;
    else if (loc.includes('mumbai')) premium = 15;
    else if (loc.includes('delhi') || loc.includes('gurugram')) premium = 15;
    else if (loc.includes('hyderabad')) premium = 10;
    else if (loc.includes('pune')) premium = 5;

    return {
      role: input.role,
      location: input.location || 'Pan India',
      location_premium: `+${premium}%`,
      salary_ranges: salaryData,
      note: premium > 0 ? `Add ${premium}% to base ranges for ${input.location}` : 'Base India ranges'
    };
  }
}