import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';
import { loadJsonData } from '../../shared/utils/json.loader.js';

const defaultLegalData = {
  india: {
    company_structures: {
      pvt_ltd: {
        name: 'Private Limited Company',
        cost_range: 'Rs 10,000 - 50,000',
        timeline: '1-3 weeks',
        best_for: 'Tech startups seeking external investment',
        steps: ['Incorporate company', 'Apply for DSC', 'File e-form SPICe+'],
        documents_required: ['Aadhar', 'PAN', 'Address proof', 'MOA/AOA']
      },
      llp: {
        name: 'LLP',
        cost_range: 'Rs 5,000 - 20,000',
        timeline: '1-2 weeks',
        best_for: 'Professional services and bootstrapped businesses',
        steps: ['Draft LLP agreement', 'File FiLLiP', 'Obtain LLPIN'],
        documents_required: ['Aadhar', 'PAN', 'Address proof', 'Partner details']
      },
      sole_proprietorship: {
        name: 'Sole Proprietorship',
        cost_range: 'Rs 1,000 - 5,000',
        timeline: '1-2 weeks',
        best_for: 'Freelancers and very small startups',
        steps: ['Register business name', 'Apply for GST if needed'],
        documents_required: ['Aadhar', 'PAN', 'Address proof']
      }
    },
    gst_registration: { description: 'GST registration required if annual turnover exceeds threshold', process: ['Apply on GST portal', 'Submit documents', 'Receive GSTIN'] },
    msme_registration: { description: 'MSME registration benefits and process', process: ['Register on Udyam portal', 'Provide business details'] },
    trade_license: { description: 'Trade license necessary for local compliance', process: ['Apply with municipal authority', 'Submit identity/address proofs'] },
    compliance_calendar: { monthly: [], quarterly: [], annual: [] }
  }
};

export class LegalResources {
  @Resource({
    uri: 'legal://requirements',
    name: 'Legal Requirements Database',
    description: 'Registration procedures, compliance rules, and legal requirements for Indian startups',
    mimeType: 'application/json'
  })
  async getLegalRequirements(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching legal requirements');
    const data = loadJsonData('legal-requirements.json', defaultLegalData);
    return { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(data, null, 2) }] };
  }

  @Resource({
    uri: 'legal://compliance-calendar',
    name: 'Compliance Calendar',
    description: 'Monthly, quarterly, and annual compliance deadlines for Indian startups',
    mimeType: 'application/json'
  })
  async getComplianceCalendar(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching compliance calendar');
    const data = loadJsonData('legal-requirements.json', defaultLegalData);
    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(data.india.compliance_calendar, null, 2)
      }]
    };
  }
}
