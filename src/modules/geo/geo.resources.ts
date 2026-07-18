import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';
import { loadJsonData } from '../../shared/utils/json.loader.js';

const defaultGeoData = {
  india: {
    telangana: {
      hyderabad: {
        districts: {
          rangareddy: {
            areas: {
              gachibowli: {
                type: 'Commercial Hub',
                coworking_monthly: 8000,
                dedicated_office_sqft: 650,
                internet_speed: '100 Mbps',
                nearby_companies: ['Startups', 'Tech firms'],
                nearby_colleges: ['IIT Hyderabad', 'IIIT Hyderabad'],
                ecosystem: { investors: ['Seed funds'], accelerators: ['T-Hub'] },
                connectivity: { airport: '30 min', metro: '15 min' },
                living_costs: { rent: 'Moderate', food: 'Low' },
                score: 85
              }
            }
          }
        }
      }
    }
  }
};

export class GeoResources {
  @Resource({
    uri: 'geo://locations',
    name: 'Location Intelligence Database',
    description: 'Hierarchical database of startup locations across India from country to locality level',
    mimeType: 'application/json'
  })
  async getLocations(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching location database');
    const data = loadJsonData('geo-locations.json', defaultGeoData);
    return { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(data, null, 2) }] };
  }

  @Resource({
    uri: 'geo://hyderabad',
    name: 'Hyderabad Location Data',
    description: 'Area-level data for Hyderabad: Gachibowli, Madhapur, HiTech City with scores and costs',
    mimeType: 'application/json'
  })
  async getHyderabadData(uri: string, ctx: ExecutionContext) {
    ctx.logger.info('Fetching Hyderabad data');
    const data = loadJsonData('geo-locations.json', defaultGeoData);
    return {
      contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(data.india.telangana.hyderabad, null, 2) }]
    };
  }
}