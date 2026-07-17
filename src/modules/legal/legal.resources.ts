import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class LegalResources {
  @Resource({
    uri: 'legal://requirements',
    name: 'Legal Requirements Database',
    description: 'Registration procedures, compliance rules, and legal requirements for Indian startups',
    mimeType: 'application/json'
  })
  async getLegalRequirements(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching legal requirements');
    const dataPath = path.join(process.cwd(), 'data', 'legal-requirements.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    return { contents: [{ uri, mimeType: 'application/json', text: data }] };
  }

  @Resource({
    uri: 'legal://compliance-calendar',
    name: 'Compliance Calendar',
    description: 'Monthly, quarterly, and annual compliance deadlines for Indian startups',
    mimeType: 'application/json'
  })
  async getComplianceCalendar(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching compliance calendar');
    const dataPath = path.join(process.cwd(), 'data', 'legal-requirements.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return {
      contents: [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(data.india.compliance_calendar, null, 2)
      }]
    };
  }
}