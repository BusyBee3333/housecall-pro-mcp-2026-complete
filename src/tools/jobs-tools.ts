/**
 * Job Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Job, CreateJobRequest } from '../types/index.js';

export function registerJobsTools(client: HousecallProClient) {
  return {
    list_jobs: {
      description: 'List jobs with optional filters',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Filter by customer ID',
          },
          work_status: {
            type: 'string',
            enum: ['scheduled', 'on_my_way', 'working', 'completed', 'cancelled'],
            description: 'Filter by work status',
          },
          invoice_status: {
            type: 'string',
            enum: ['not_invoiced', 'invoiced', 'paid', 'partial'],
            description: 'Filter by invoice status',
          },
          start_date: {
            type: 'string',
            description: 'Filter jobs scheduled on or after this date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'Filter jobs scheduled on or before this date (ISO 8601)',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter by tags',
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
        const jobs = await client.listJobs(params);
        return { jobs, count: jobs.length };
      },
    },

    get_job: {
      description: 'Get detailed information about a specific job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: { job_id: string }) => {
        const job = await client.getJob(params.job_id);
        return job;
      },
    },

    create_job: {
      description: 'Create a new job',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Customer ID',
          },
          address_id: {
            type: 'string',
            description: 'Service address ID',
          },
          description: {
            type: 'string',
            description: 'Job description',
          },
          notes: {
            type: 'string',
            description: 'Internal notes',
          },
          schedule_start: {
            type: 'string',
            description: 'Scheduled start time (ISO 8601)',
          },
          schedule_end: {
            type: 'string',
            description: 'Scheduled end time (ISO 8601)',
          },
          arrival_window: {
            type: 'string',
            description: 'Arrival window (e.g., "8am-12pm")',
          },
          assigned_employees: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of employee IDs to assign',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of tag IDs',
          },
        },
        required: ['customer_id'],
      },
      handler: async (params: any) => {
        const jobData: CreateJobRequest = {
          customer_id: params.customer_id,
          address_id: params.address_id,
          description: params.description,
          notes: params.notes,
          assigned_employees: params.assigned_employees,
          tags: params.tags,
        };

        if (params.schedule_start && params.schedule_end) {
          jobData.schedule = {
            start: params.schedule_start,
            end: params.schedule_end,
            arrival_window: params.arrival_window,
          };
        }

        const job = await client.createJob(jobData);
        return job;
      },
    },

    update_job: {
      description: 'Update an existing job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          description: {
            type: 'string',
            description: 'Job description',
          },
          notes: {
            type: 'string',
            description: 'Internal notes',
          },
          work_status: {
            type: 'string',
            enum: ['scheduled', 'on_my_way', 'working', 'completed', 'cancelled'],
            description: 'Work status',
          },
          assigned_employees: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of employee IDs to assign',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of tag IDs',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: any) => {
        const { job_id, ...updateData } = params;
        const job = await client.updateJob(job_id, updateData);
        return job;
      },
    },

    complete_job: {
      description: 'Mark a job as completed',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: { job_id: string }) => {
        const result = await client.completeJob(params.job_id);
        return result;
      },
    },

    cancel_job: {
      description: 'Cancel a job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          reason: {
            type: 'string',
            description: 'Cancellation reason',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: { job_id: string; reason?: string }) => {
        const result = await client.cancelJob(params.job_id, params.reason);
        return result;
      },
    },

    list_job_line_items: {
      description: 'List line items for a job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: { job_id: string }) => {
        const lineItems = await client.listJobLineItems(params.job_id);
        return lineItems;
      },
    },

    add_job_line_item: {
      description: 'Add a line item to a job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          name: {
            type: 'string',
            description: 'Line item name',
          },
          description: {
            type: 'string',
            description: 'Line item description',
          },
          quantity: {
            type: 'number',
            description: 'Quantity',
          },
          unit_price: {
            type: 'number',
            description: 'Unit price',
          },
          unit: {
            type: 'string',
            description: 'Unit of measurement (e.g., "hours", "each")',
          },
        },
        required: ['job_id', 'name', 'quantity', 'unit_price'],
      },
      handler: async (params: any) => {
        const { job_id, ...lineItemData } = params;
        const lineItem = await client.addJobLineItem(job_id, lineItemData);
        return lineItem;
      },
    },

    schedule_job: {
      description: 'Schedule a job (set initial schedule)',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          start: {
            type: 'string',
            description: 'Scheduled start time (ISO 8601)',
          },
          end: {
            type: 'string',
            description: 'Scheduled end time (ISO 8601)',
          },
          arrival_window: {
            type: 'string',
            description: 'Arrival window (e.g., "8am-12pm")',
          },
        },
        required: ['job_id', 'start', 'end'],
      },
      handler: async (params: any) => {
        const { job_id, ...schedule } = params;
        const result = await client.scheduleJob(job_id, schedule);
        return result;
      },
    },

    reschedule_job: {
      description: 'Reschedule an existing job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          start: {
            type: 'string',
            description: 'New scheduled start time (ISO 8601)',
          },
          end: {
            type: 'string',
            description: 'New scheduled end time (ISO 8601)',
          },
          arrival_window: {
            type: 'string',
            description: 'New arrival window (e.g., "8am-12pm")',
          },
        },
        required: ['job_id', 'start', 'end'],
      },
      handler: async (params: any) => {
        const { job_id, ...schedule } = params;
        const result = await client.rescheduleJob(job_id, schedule);
        return result;
      },
    },
  };
}
