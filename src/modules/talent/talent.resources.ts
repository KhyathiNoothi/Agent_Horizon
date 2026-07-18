import { ResourceDecorator as Resource } from '@nitrostack/core';
import { loadJsonData } from '../../shared/utils/json.loader.js';

const defaultTalentData = {
  platforms: {},
  salary_benchmarks_india: {
    software_engineer: { min: 2500000, mid_2_5yrs: { min: 70000, max: 120000 }, max: 180000 },
    ui_ux_designer: { min: 1500000, mid_2_5yrs: { min: 45000, max: 85000 }, max: 120000 },
    marketing_lead: { min: 1800000, mid_2_5yrs: { min: 50000, max: 90000 }, max: 130000 },
    devops_engineer: { min: 2200000, mid_2_5yrs: { min: 60000, max: 110000 }, max: 150000 },
    data_scientist: { min: 2500000, mid_2_5yrs: { min: 70000, max: 130000 }, max: 170000 },
    intern: { stipend_monthly: 15000 }
  },
  role_templates: []
};

export class TalentResources {
  @Resource({
    uri: "talent://platforms",
    name: "Talent Sourcing Platforms",
    description:
      "Database of talent sourcing platforms including GitHub, WellFound, Kaggle, Devpost with effectiveness ratings and salary benchmarks for Indian startup roles",
    mimeType: "application/json",
  })
  async getTalentPlatforms() {
    const data = loadJsonData('talent-platforms.json', defaultTalentData);
    return {
      contents: [
        {
          uri: "talent://platforms",
          mimeType: "application/json",
          text: JSON.stringify(data, null, 2),
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
    const data = loadJsonData('talent-platforms.json', defaultTalentData);
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
    const data = loadJsonData('talent-platforms.json', defaultTalentData);
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