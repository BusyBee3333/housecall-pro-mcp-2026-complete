/**
 * Reporting and Analytics Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { RevenueReport, JobCompletionReport, EmployeePerformanceReport } from '../types/index.js';

export function registerReportingTools(client: HousecallProClient) {
  return {
    get_revenue_report: {
      description: 'Get revenue report for a date range',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: 'Start date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'End date (ISO 8601)',
          },
          group_by: {
            type: 'string',
            enum: ['day', 'week', 'month'],
            description: 'Group results by time period',
          },
        },
        required: ['start_date', 'end_date'],
      },
      handler: async (params: any) => {
        const report = await client.getRevenueReport(params);
        return report;
      },
    },

    get_job_completion_report: {
      description: 'Get job completion statistics for a date range',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: 'Start date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'End date (ISO 8601)',
          },
        },
        required: ['start_date', 'end_date'],
      },
      handler: async (params: any) => {
        const report = await client.getJobCompletionReport(params);
        return report;
      },
    },

    get_employee_performance_report: {
      description: 'Get employee performance metrics for a date range',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID (optional - leave blank for all employees)',
          },
          start_date: {
            type: 'string',
            description: 'Start date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'End date (ISO 8601)',
          },
        },
        required: ['start_date', 'end_date'],
      },
      handler: async (params: any) => {
        const report = await client.getEmployeePerformanceReport(params);
        return report;
      },
    },
  };
}
