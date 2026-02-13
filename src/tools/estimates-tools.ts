/**
 * Estimate Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Estimate, CreateEstimateRequest } from '../types/index.js';

export function registerEstimatesTools(client: HousecallProClient) {
  return {
    list_estimates: {
      description: 'List estimates with optional filters',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Filter by customer ID',
          },
          status: {
            type: 'string',
            enum: ['draft', 'sent', 'approved', 'declined', 'expired'],
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
        const estimates = await client.listEstimates(params);
        return { estimates, count: estimates.length };
      },
    },

    get_estimate: {
      description: 'Get detailed information about a specific estimate',
      parameters: {
        type: 'object',
        properties: {
          estimate_id: {
            type: 'string',
            description: 'Estimate ID',
          },
        },
        required: ['estimate_id'],
      },
      handler: async (params: { estimate_id: string }) => {
        const estimate = await client.getEstimate(params.estimate_id);
        return estimate;
      },
    },

    create_estimate: {
      description: 'Create a new estimate',
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
          line_items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                quantity: { type: 'number' },
                unit_price: { type: 'number' },
              },
              required: ['name', 'quantity', 'unit_price'],
            },
            description: 'Array of line items',
          },
          notes: {
            type: 'string',
            description: 'Estimate notes',
          },
          valid_until: {
            type: 'string',
            description: 'Estimate expiration date (ISO 8601)',
          },
        },
        required: ['customer_id'],
      },
      handler: async (params: CreateEstimateRequest) => {
        const estimate = await client.createEstimate(params);
        return estimate;
      },
    },

    update_estimate: {
      description: 'Update an existing estimate',
      parameters: {
        type: 'object',
        properties: {
          estimate_id: {
            type: 'string',
            description: 'Estimate ID',
          },
          line_items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                quantity: { type: 'number' },
                unit_price: { type: 'number' },
              },
            },
            description: 'Array of line items',
          },
          notes: {
            type: 'string',
            description: 'Estimate notes',
          },
          valid_until: {
            type: 'string',
            description: 'Estimate expiration date (ISO 8601)',
          },
        },
        required: ['estimate_id'],
      },
      handler: async (params: any) => {
        const { estimate_id, ...updateData } = params;
        const estimate = await client.updateEstimate(estimate_id, updateData);
        return estimate;
      },
    },

    send_estimate: {
      description: 'Send an estimate to the customer',
      parameters: {
        type: 'object',
        properties: {
          estimate_id: {
            type: 'string',
            description: 'Estimate ID',
          },
          email: {
            type: 'string',
            description: 'Override customer email',
          },
          message: {
            type: 'string',
            description: 'Custom message to include',
          },
        },
        required: ['estimate_id'],
      },
      handler: async (params: any) => {
        const { estimate_id, ...options } = params;
        const result = await client.sendEstimate(estimate_id, options);
        return result;
      },
    },

    approve_estimate: {
      description: 'Mark an estimate as approved',
      parameters: {
        type: 'object',
        properties: {
          estimate_id: {
            type: 'string',
            description: 'Estimate ID',
          },
        },
        required: ['estimate_id'],
      },
      handler: async (params: { estimate_id: string }) => {
        const result = await client.approveEstimate(params.estimate_id);
        return result;
      },
    },

    decline_estimate: {
      description: 'Mark an estimate as declined',
      parameters: {
        type: 'object',
        properties: {
          estimate_id: {
            type: 'string',
            description: 'Estimate ID',
          },
          reason: {
            type: 'string',
            description: 'Reason for declining',
          },
        },
        required: ['estimate_id'],
      },
      handler: async (params: { estimate_id: string; reason?: string }) => {
        const result = await client.declineEstimate(params.estimate_id, params.reason);
        return result;
      },
    },

    convert_estimate_to_job: {
      description: 'Convert an approved estimate into a job',
      parameters: {
        type: 'object',
        properties: {
          estimate_id: {
            type: 'string',
            description: 'Estimate ID',
          },
        },
        required: ['estimate_id'],
      },
      handler: async (params: { estimate_id: string }) => {
        const job = await client.convertEstimateToJob(params.estimate_id);
        return job;
      },
    },
  };
}
