import { ResourceDecorator as Resource } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class InvestorResources {
  @Resource({
    uri: "investor://database",
    name: "Investor Database",
    description:
      "Database of accelerators, angel networks, VC firms, and government grants for Indian startups with funding amounts, focus areas, and application details",
    mimeType: "application/json",
  })
  async getInvestorDatabase() {
    const dataPath = path.join(process.cwd(), 'data', 'investor-database.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    return {
      contents: [
        {
          uri: "investor://database",
          mimeType: "application/json",
          text: data,
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
    const dataPath = path.join(process.cwd(), 'data', 'investor-database.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
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
    const dataPath = path.join(process.cwd(), 'data', 'investor-database.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
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