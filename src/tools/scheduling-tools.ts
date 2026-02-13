/**
 * Advanced Scheduling Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerSchedulingTools(client: HousecallProClient) {
  return {
    get_schedule: {
      description: 'Get schedule for a date range',
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
          employee_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter by employee IDs',
          },
        },
        required: ['start_date', 'end_date'],
      },
      handler: async (params: any) => {
        const schedule = await client.getSchedule(params);
        return schedule;
      },
    },

    check_availability: {
      description: 'Check employee availability for a time slot',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          start: {
            type: 'string',
            description: 'Start time (ISO 8601)',
          },
          end: {
            type: 'string',
            description: 'End time (ISO 8601)',
          },
        },
        required: ['employee_id', 'start', 'end'],
      },
      handler: async (params: any) => {
        const availability = await client.checkAvailability(params);
        return availability;
      },
    },

    find_available_slots: {
      description: 'Find available time slots for scheduling',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Date to search (ISO 8601)',
          },
          duration_minutes: {
            type: 'number',
            description: 'Required duration in minutes',
          },
          employee_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter by specific employees',
          },
          service_area: {
            type: 'string',
            description: 'Filter by service area/zip code',
          },
        },
        required: ['date', 'duration_minutes'],
      },
      handler: async (params: any) => {
        const slots = await client.findAvailableSlots(params);
        return slots;
      },
    },

    create_time_off: {
      description: 'Create a time-off block for an employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          start: {
            type: 'string',
            description: 'Start time (ISO 8601)',
          },
          end: {
            type: 'string',
            description: 'End time (ISO 8601)',
          },
          reason: {
            type: 'string',
            description: 'Reason for time off',
          },
        },
        required: ['employee_id', 'start', 'end'],
      },
      handler: async (params: any) => {
        const timeOff = await client.createTimeOff(params);
        return timeOff;
      },
    },

    delete_time_off: {
      description: 'Delete a time-off block',
      parameters: {
        type: 'object',
        properties: {
          time_off_id: {
            type: 'string',
            description: 'Time off ID',
          },
        },
        required: ['time_off_id'],
      },
      handler: async (params: { time_off_id: string }) => {
        const result = await client.deleteTimeOff(params.time_off_id);
        return result;
      },
    },

    list_recurring_schedules: {
      description: 'List recurring schedule templates',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Filter by employee ID',
          },
        },
      },
      handler: async (params: any) => {
        const schedules = await client.listRecurringSchedules(params);
        return schedules;
      },
    },

    create_recurring_schedule: {
      description: 'Create a recurring schedule template',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          days_of_week: {
            type: 'array',
            items: { type: 'number' },
            description: 'Days of week (0=Sunday, 6=Saturday)',
          },
          start_time: {
            type: 'string',
            description: 'Start time (HH:MM format)',
          },
          end_time: {
            type: 'string',
            description: 'End time (HH:MM format)',
          },
          effective_from: {
            type: 'string',
            description: 'Effective from date (ISO 8601)',
          },
          effective_until: {
            type: 'string',
            description: 'Effective until date (ISO 8601, optional)',
          },
        },
        required: ['employee_id', 'days_of_week', 'start_time', 'end_time'],
      },
      handler: async (params: any) => {
        const schedule = await client.createRecurringSchedule(params);
        return schedule;
      },
    },
  };
}
