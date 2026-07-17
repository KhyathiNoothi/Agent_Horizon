import { ResourceDecorator as Resource } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';

export class TalentResources {
  @Resource({
    uri: "talent://platforms",
    name: "Talent Sourcing Platforms",
    description:
      "Database of talent sourcing platforms including GitHub, WellFound, Kaggle, Devpost with effectiveness ratings and salary benchmarks for Indian startup roles",
    mimeType: "application/json",
  })
  async getTalentPlatforms() {
    const dataPath = path.join(process.cwd(), 'data', 'talent-platforms.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    return {
      contents: [
        {
          uri: "talent://platforms",
          mimeType: "application/json",
          text: data,
        },
      ],
    };
  }

  @Resource({
    uri: "talent://salary-benchmarks",
    name: "Salary Benchmarks India",
    description: "Salary ranges for various tech and non-tech roles in Indian startups by experience level",
    mimeType: "application/json",
  })
  async getSalaryBenchmarks() {
    const dataPath = path.join(process.cwd(), 'data', 'talent-platforms.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    return {
      contents: [
        {
          uri: "talent://salary-benchmarks",
          mimeType: "application/json",
          text: JSON.stringify(data.salary_benchmarks_india, null, 2),
        },
      ],
    };
  }

  @Resource({
    uri: "talent://role-templates",
    name: "Role Templates",
    description: "Pre-built role templates with skills, responsibilities for common startup roles",
    mimeType: "application/json",
  })
  async getRoleTemplates() {
    const dataPath = path.join(process.cwd(), 'data', 'talent-platforms.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    return {
      contents: [
        {
          uri: "talent://role-templates",
          mimeType: "application/json",
          text: JSON.stringify(data.role_templates, null, 2),
        },
      ],
    };
  }
}