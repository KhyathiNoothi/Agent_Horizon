import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';
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

export class GeoTools {
  @Tool({
    name: 'analyze_location',
    description: 'Analyze startup location hierarchically: Country to State to City to District to Area. Returns scores, nearby colleges, companies, ecosystem data, office costs, and talent availability.',
    inputSchema: z.object({
      idea: z.string().describe('The startup idea'),
      industry: z.string().describe('Industry sector'),
      preferredLocation: z.string().optional().describe('Preferred location, e.g. Hyderabad'),
      budget: z.number().optional().describe('Monthly office budget in INR'),
      teamSize: z.number().optional().describe('Team size'),
      remoteOption: z.boolean().optional().describe('Whether remote work is an option')
    })
  })
  async analyzeLocation(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Analyzing location', { location: input.preferredLocation });

    const geoData = loadJsonData('geo-locations.json', defaultGeoData);

    const loc = (input.preferredLocation || '').toLowerCase();
    let state = 'telangana', city = 'hyderabad', district = 'rangareddy', area = 'gachibowli';

    if (loc.includes('bangalore') || loc.includes('bengaluru')) {
      state = 'karnataka'; city = 'bangalore'; district = 'bangalore_urban'; area = 'koramangala';
    } else if (loc.includes('mumbai')) {
      state = 'maharashtra'; city = 'mumbai'; district = 'mumbai_suburban'; area = 'bandra_kurla_complex';
    } else if (loc.includes('pune')) {
      state = 'maharashtra'; city = 'pune'; district = 'pune_city'; area = 'hinjewadi';
    } else if (loc.includes('gurugram') || loc.includes('gurgaon') || loc.includes('delhi')) {
      state = 'delhi_ncr'; city = 'gurugram'; district = 'gurugram'; area = 'cyber_city';
    }

    let areaData: any;
    try {
      areaData = geoData.india[state][city].districts[district].areas[area];
    } catch {
      areaData = geoData.india.telangana.hyderabad.districts.rangareddy.areas.gachibowli;
    }

    let score = areaData.score || 85;
    if (input.budget && input.budget < 15000) score -= 5;
    if (input.remoteOption) score += 3;
    if (input.teamSize && input.teamSize > 20) score -= 3;
    score = Math.max(30, Math.min(100, score));

    const title = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return {
      hierarchical_recommendation: {
        country: 'India',
        state: title(state),
        city: title(city),
        district: title(district),
        area: title(area),
        success_probability: score
      },
      area_details: {
        type: areaData.type,
        coworking_monthly: areaData.coworking_monthly,
        dedicated_office_sqft: areaData.dedicated_office_sqft,
        internet_speed: areaData.internet_speed,
        nearby_companies: areaData.nearby_companies || [],
        nearby_colleges: areaData.nearby_colleges || []
      },
      ecosystem: areaData.ecosystem || {},
      connectivity: areaData.connectivity || {},
      living_costs: areaData.living_costs || {},
      location_score: score,
      location_score_breakdown: {
        ecosystem_strength: Math.round(score * 0.25),
        talent_availability: Math.round(score * 0.20),
        cost_efficiency: Math.round(score * 0.20),
        connectivity: Math.round(score * 0.15),
        target_audience_fit: Math.round(score * 0.20)
      }
    };
  }

  @Tool({
    name: 'compare_locations',
    description: 'Compare multiple locations for a startup and rank them with scores',
    inputSchema: z.object({
      locations: z.array(z.string()).describe('Locations to compare, e.g. ["Hyderabad", "Bangalore"]'),
      industry: z.string().describe('Startup industry'),
      budget: z.number().optional().describe('Monthly office budget in INR')
    })
  })
  async compareLocations(input: any, ctx: ExecutionContext) {
    ctx.logger.info('Comparing locations', { count: input.locations.length });

    const comparisons = input.locations.map((location: string) => {
      const l = location.toLowerCase();
      let score = 75, costLevel = 'Medium', ecosystem = 'Growing';

      if (l.includes('bangalore') || l.includes('bengaluru')) { score = 95; costLevel = 'High'; ecosystem = 'Mature'; }
      else if (l.includes('hyderabad')) { score = 92; costLevel = 'Medium'; ecosystem = 'Growing-Mature'; }
      else if (l.includes('mumbai')) { score = 88; costLevel = 'Very High'; ecosystem = 'Mature'; }
      else if (l.includes('gurugram') || l.includes('gurgaon') || l.includes('delhi')) { score = 89; costLevel = 'High'; ecosystem = 'Mature'; }
      else if (l.includes('pune')) { score = 85; costLevel = 'Medium-Low'; ecosystem = 'Growing'; }
      else if (l.includes('chennai')) { score = 82; costLevel = 'Medium'; ecosystem = 'Growing'; }

      if (input.budget && input.budget < 20000 && costLevel === 'Very High') score -= 10;
      if (input.budget && input.budget < 20000 && costLevel === 'High') score -= 5;
      score = Math.max(30, Math.min(100, score));

      return {
        location,
        score,
        cost_level: costLevel,
        ecosystem_maturity: ecosystem,
        recommendation: score >= 90 ? 'Highly Recommended' : score >= 80 ? 'Recommended' : score >= 70 ? 'Consider' : 'Less Suitable'
      };
    }).sort((a: any, b: any) => b.score - a.score);

    return {
      comparison: comparisons,
      winner: comparisons[0],
      recommendation: `${comparisons[0].location} scores highest at ${comparisons[0].score}/100`
    };
  }
}