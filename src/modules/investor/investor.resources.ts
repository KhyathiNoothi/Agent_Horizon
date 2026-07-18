import { ResourceDecorator as Resource } from '@nitrostack/core';
import { loadJsonData } from '../../shared/utils/json.loader.js';

const defaultInvestorData = {
  accelerators: [],
  angel_networks: [],
  vc_firms: [],
  government_grants: []
};

export class InvestorResources {
  @Resource({
    uri: "investor://database",
    name: "Investor Database",
    description:
      "Database of accelerators, angel networks, VC firms, and government grants for Indian startups with funding amounts, focus areas, and application details",
    mimeType: "application/json",
  })
  async getInvestorDatabase() {
    const data = loadJsonData('investor-database.json', defaultInvestorData);
    return {
      contents: [
        {
          uri: "investor://database",
          mimeType: "application/json",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  @Resource({
    uri: "investor://accelerators",
    name: "Accelerator Programs",
    description: "List of startup accelerator programs with funding, equity, and application details",
    mimeType: "application/json",
  })
  async getAccelerators() {
    const data = loadJsonData('investor-database.json', defaultInvestorData);
    return {
      contents: [
        {
          uri: "investor://accelerators",
          mimeType: "application/json",
          text: JSON.stringify(data.accelerators, null, 2),
        },
      ],
    };
  }

  @Resource({
    uri: "investor://grants",
    name: "Government Grants",
    description: "Government funding schemes and grants available for Indian startups",
    mimeType: "application/json",
  })
  async getGrants() {
    const data = loadJsonData('investor-database.json', defaultInvestorData);
    return {
      contents: [
        {
          uri: "investor://grants",
          mimeType: "application/json",
          text: JSON.stringify(data.government_grants, null, 2),
        },
      ],
    };
  }
}