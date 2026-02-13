/**
 * Dispatch and Scheduling Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerDispatchTools(client: HousecallProClient) {
  return {
    get_dispatch_board: {
      description: 'Get the dispatch board showing scheduled jobs and employee assignments',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Date for dispatch board (ISO 8601 date, e.g. "2024-01-15")',
          },
          employee_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter by specific employee IDs',
          },
        },
      },
      handler: async (params: any) => {
        const board = await client.getDispatchBoard(params);
        return board;
      },
    },

    assign_employee_to_job: {
      description: 'Assign an employee to a job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          employee_id: {
            type: 'string',
            description: 'Employee ID to assign',
          },
        },
        required: ['job_id', 'employee_id'],
      },
      handler: async (params: { job_id: string; employee_id: string }) => {
        const result = await client.assignEmployee(params.job_id, params.employee_id);
        return result;
      },
    },

    get_employee_availability: {
      description: 'Get availability slots for an employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          start_date: {
            type: 'string',
            description: 'Start date for availability (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'End date for availability (ISO 8601)',
          },
        },
        required: ['employee_id'],
      },
      handler: async (params: any) => {
        const { employee_id, ...dateParams } = params;
        const availability = await client.getEmployeeAvailability(employee_id, dateParams);
        return availability;
      },
    },
  };
}
