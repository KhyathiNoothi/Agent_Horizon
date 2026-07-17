import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class LegalTools {
  @Tool({
    name: 'analyze_legal_requirements',
    description: 'Analyze all legal requirements for a startup including company registration, GST, MSME, trade license, data protection, and employment law. Returns step-by-step procedures with costs and timelines.',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea description'),
      location: z.string().describe('Where the startup will be based, e.g. Hyderabad, Telangana'),
      businessType: z.enum(['pvt_ltd', 'llp', 'sole_proprietorship']).describe('Business structure type'),
      teamSize: z.number().describe('Planned team size'),
      handlesCustomerData: z.boolean().optional().describe('Whether the startup handles personal customer data'),
      industry: z.string().optional().describe('Industry sector: fintech, healthtech, edtech, ecommerce, saas, other')
    })
  })
  async analyzeLegalRequirements(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Analyzing legal requirements', { location: input.location, type: input.businessType });

    const dataPath = path.join(process.cwd(), 'data', 'legal-requirements.json');
    const legalData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const structure = legalData.india.company_structures[input.businessType]
      || legalData.india.company_structures['pvt_ltd'];

    let legalScore = 85;
    if (input.businessType === 'pvt_ltd') legalScore += 5;
    if (input.businessType === 'sole_proprietorship') legalScore -= 5;
    if (input.handlesCustomerData) legalScore -= 5;
    if (input.industry === 'fintech') legalScore -= 15;
    if (input.industry === 'healthtech') legalScore -= 10;
    if (input.teamSize > 20) legalScore -= 5;
    legalScore = Math.max(20, Math.min(100, legalScore));

    return {
      startup_idea: input.idea,
      location: input.location,
      recommended_structure: {
        type: structure.name,
        cost_range: structure.cost_range,
        timeline: structure.timeline,
        best_for: structure.best_for,
        registration_steps: structure.steps,
        documents_required: structure.documents_required
      },
      gst_registration: legalData.india.gst_registration,
      msme_registration: legalData.india.msme_registration,
      trade_license: legalData.india.trade_license,
      employment_compliance: {
        pf_required: input.teamSize >= 20,
        esi_required: input.teamSize >= 10,
        team_size: input.teamSize,
        note: input.teamSize >= 20
          ? 'PF registration mandatory for 20+ employees'
          : 'PF registration optional but recommended'
      },
      data_protection: {
        handles_data: input.handlesCustomerData || false,
        applicable_laws: ['IT Act 2000', 'IT Rules 2011', 'DPDP Act 2023'],
        requirements: input.handlesCustomerData
          ? [
              'Implement reasonable security practices',
              'Create and publish Privacy Policy',
              'Obtain user consent for data collection',
              'Implement data breach notification procedures',
              'Implement data retention and deletion policies'
            ]
          : ['Basic privacy policy recommended']
      },
      compliance_calendar: legalData.india.compliance_calendar,
      estimated_costs: {
        one_time: 'Rs 10,000 - 50,000',
        annual_recurring: 'Rs 25,000 - 100,000'
      },
      legal_score: legalScore
    };
  }

  @Tool({
    name: 'get_registration_steps',
    description: 'Get detailed step-by-step registration procedure for a specific registration type',
    inputSchema: z.object({
      registrationType: z.enum(['pvt_ltd', 'llp', 'sole_proprietorship', 'gst', 'msme', 'trade_license'])
        .describe('Type of registration to get steps for')
    })
  })
  async getRegistrationSteps(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Fetching registration steps', { type: input.registrationType });

    const dataPath = path.join(process.cwd(), 'data', 'legal-requirements.json');
    const legalData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    if (['pvt_ltd', 'llp', 'sole_proprietorship'].includes(input.registrationType)) {
      return legalData.india.company_structures[input.registrationType];
    }
    if (input.registrationType === 'gst') return legalData.india.gst_registration;
    if (input.registrationType === 'msme') return legalData.india.msme_registration;
    if (input.registrationType === 'trade_license') return legalData.india.trade_license;

    throw new Error('Unknown registration type');
  }

  @Tool({
    name: 'calculate_legal_score',
    description: 'Calculate legal feasibility score for a startup based on structure, industry, data handling, and team size',
    inputSchema: z.object({
      businessType: z.enum(['pvt_ltd', 'llp', 'sole_proprietorship']).describe('Business structure'),
      industry: z.string().describe('Industry sector'),
      teamSize: z.number().describe('Planned team size'),
      handlesData: z.boolean().optional().describe('Whether handles personal data'),
      internationalOps: z.boolean().optional().describe('Whether operating internationally')
    })
  })
  async calculateLegalScore(input: any, ctx: ExecutionContext) {
    let score = 85;
    if (input.businessType === 'pvt_ltd') score += 5;
    if (input.businessType === 'llp') score += 3;
    if (input.businessType === 'sole_proprietorship') score -= 5;
    if (input.industry === 'fintech') score -= 15;
    if (input.industry === 'healthtech') score -= 10;
    if (input.industry === 'edtech') score -= 5;
    if (input.industry === 'ecommerce') score -= 5;
    if (input.handlesData) score -= 5;
    if (input.teamSize > 50) score -= 10;
    else if (input.teamSize > 20) score -= 5;
    if (input.internationalOps) score -= 10;
    score = Math.max(20, Math.min(100, score));

    return {
      legal_score: score,
      rating: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : 'Challenging',
      recommendations: [
        score < 60 ? 'Consider hiring a legal consultant early' : 'Legal requirements are manageable',
        input.handlesData ? 'Prioritize privacy policy and data protection compliance' : '',
        input.industry === 'fintech' ? 'Engage with RBI regulatory sandbox if applicable' : '',
        input.teamSize > 20 ? 'Register for PF and ESI immediately' : ''
      ].filter(Boolean)
    };
  }
}