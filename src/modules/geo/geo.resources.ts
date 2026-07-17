import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class GeoResources {
  @Resource({
    uri: 'geo://locations',
    name: 'Location Intelligence Database',
    description: 'Hierarchical database of startup locations across India from country to locality level',
    mimeType: 'application/json'
  })
  async getLocations(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching location database');
    const dataPath = path.join(process.cwd(), 'data', 'geo-locations.json');
    return { contents: [{ uri, mimeType: 'application/json', text: fs.readFileSync(dataPath, 'utf-8') }] };
  }

  @Resource({
    uri: 'geo://hyderabad',
    name: 'Hyderabad Location Data',
    description: 'Area-level data for Hyderabad: Gachibowli, Madhapur, HiTech City with scores and costs',
    mimeType: 'application/json'
  })
  async getHyderabadData(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching Hyderabad data');
    const dataPath = path.join(process.cwd(), 'data', 'geo-locations.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return {
      contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(data.india.telangana.hyderabad, null, 2) }]
    };
  }
}