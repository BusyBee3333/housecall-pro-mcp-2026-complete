/**
 * Time Tracking Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerTimeTrackingTools(client: HousecallProClient) {
  return {
    list_time_entries: {
      description: 'List time entries with optional filters',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Filter by employee ID',
          },
          job_id: {
            type: 'string',
            description: 'Filter by job ID',
          },
          start_date: {
            type: 'string',
            description: 'Filter entries on or after this date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'Filter entries on or before this date (ISO 8601)',
          },
          status: {
            type: 'string',
            enum: ['clocked_in', 'clocked_out'],
            description: 'Filter by status',
          },
          page: {
            type: 'number',
            description: 'Page number (default: 1)',
          },
          page_size: {
            type: 'number',
            description: 'Items per page (default: 50)',
          },
        },
      },
      handler: async (params: any) => {
        const entries = await client.listTimeEntries(params);
        return { entries, count: entries.length };
      },
    },

    get_time_entry: {
      description: 'Get detailed information about a time entry',
      parameters: {
        type: 'object',
        properties: {
          entry_id: {
            type: 'string',
            description: 'Time entry ID',
          },
        },
        required: ['entry_id'],
      },
      handler: async (params: { entry_id: string }) => {
        const entry = await client.getTimeEntry(params.entry_id);
        return entry;
      },
    },

    clock_in: {
      description: 'Clock in an employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          job_id: {
            type: 'string',
            description: 'Associated job ID (optional)',
          },
          notes: {
            type: 'string',
            description: 'Clock in notes',
          },
        },
        required: ['employee_id'],
      },
      handler: async (params: any) => {
        const entry = await client.clockIn(params);
        return entry;
      },
    },

    clock_out: {
      description: 'Clock out an employee',
      parameters: {
        type: 'object',
        properties: {
          entry_id: {
            type: 'string',
            description: 'Time entry ID (from clock in)',
          },
          notes: {
            type: 'string',
            description: 'Clock out notes',
          },
        },
        required: ['entry_id'],
      },
      handler: async (params: any) => {
        const entry = await client.clockOut(params.entry_id, params.notes);
        return entry;
      },
    },

    create_manual_time_entry: {
      description: 'Create a manual time entry (for past work)',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          job_id: {
            type: 'string',
            description: 'Associated job ID',
          },
          clock_in: {
            type: 'string',
            description: 'Clock in time (ISO 8601)',
          },
          clock_out: {
            type: 'string',
            description: 'Clock out time (ISO 8601)',
          },
          notes: {
            type: 'string',
            description: 'Entry notes',
          },
        },
        required: ['employee_id', 'clock_in', 'clock_out'],
      },
      handler: async (params: any) => {
        const entry = await client.createManualTimeEntry(params);
        return entry;
      },
    },

    update_time_entry: {
      description: 'Update an existing time entry',
      parameters: {
        type: 'object',
        properties: {
          entry_id: {
            type: 'string',
            description: 'Time entry ID',
          },
          clock_in: {
            type: 'string',
            description: 'Updated clock in time (ISO 8601)',
          },
          clock_out: {
            type: 'string',
            description: 'Updated clock out time (ISO 8601)',
          },
          notes: {
            type: 'string',
            description: 'Updated notes',
          },
        },
        required: ['entry_id'],
      },
      handler: async (params: any) => {
        const { entry_id, ...updateData } = params;
        const entry = await client.updateTimeEntry(entry_id, updateData);
        return entry;
      },
    },

    delete_time_entry: {
      description: 'Delete a time entry',
      parameters: {
        type: 'object',
        properties: {
          entry_id: {
            type: 'string',
            description: 'Time entry ID',
          },
        },
        required: ['entry_id'],
      },
      handler: async (params: { entry_id: string }) => {
        const result = await client.deleteTimeEntry(params.entry_id);
        return result;
      },
    },

    get_employee_hours: {
      description: 'Get total hours worked by an employee for a period',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
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
        required: ['employee_id', 'start_date', 'end_date'],
      },
      handler: async (params: any) => {
        const hours = await client.getEmployeeHours(params);
        return hours;
      },
    },
  };
}
