/**
 * Lead Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerLeadsTools(client: HousecallProClient) {
  return {
    list_leads: {
      description: 'List all leads with optional filters',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
            description: 'Filter by lead status',
          },
          source: {
            type: 'string',
            description: 'Filter by lead source',
          },
          assigned_to: {
            type: 'string',
            description: 'Filter by assigned employee ID',
          },
          created_after: {
            type: 'string',
            description: 'Filter leads created after this date (ISO 8601)',
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
        const leads = await client.listLeads(params);
        return { leads, count: leads.length };
      },
    },

    get_lead: {
      description: 'Get detailed information about a specific lead',
      parameters: {
        type: 'object',
        properties: {
          lead_id: {
            type: 'string',
            description: 'Lead ID',
          },
        },
        required: ['lead_id'],
      },
      handler: async (params: { lead_id: string }) => {
        const lead = await client.getLead(params.lead_id);
        return lead;
      },
    },

    create_lead: {
      description: 'Create a new lead',
      parameters: {
        type: 'object',
        properties: {
          first_name: {
            type: 'string',
            description: 'First name',
          },
          last_name: {
            type: 'string',
            description: 'Last name',
          },
          email: {
            type: 'string',
            description: 'Email address',
          },
          phone: {
            type: 'string',
            description: 'Phone number',
          },
          source: {
            type: 'string',
            description: 'Lead source (e.g., "Google", "Referral")',
          },
          notes: {
            type: 'string',
            description: 'Lead notes',
          },
          assigned_to: {
            type: 'string',
            description: 'Employee ID to assign to',
          },
        },
        required: ['first_name', 'last_name'],
      },
      handler: async (params: any) => {
        const lead = await client.createLead(params);
        return lead;
      },
    },

    update_lead: {
      description: 'Update an existing lead',
      parameters: {
        type: 'object',
        properties: {
          lead_id: {
            type: 'string',
            description: 'Lead ID',
          },
          status: {
            type: 'string',
            enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
            description: 'Lead status',
          },
          notes: {
            type: 'string',
            description: 'Lead notes',
          },
          assigned_to: {
            type: 'string',
            description: 'Employee ID to assign to',
          },
        },
        required: ['lead_id'],
      },
      handler: async (params: any) => {
        const { lead_id, ...updateData } = params;
        const lead = await client.updateLead(lead_id, updateData);
        return lead;
      },
    },

    convert_lead_to_customer: {
      description: 'Convert a lead to a customer',
      parameters: {
        type: 'object',
        properties: {
          lead_id: {
            type: 'string',
            description: 'Lead ID',
          },
          create_job: {
            type: 'boolean',
            description: 'Also create an initial job',
          },
        },
        required: ['lead_id'],
      },
      handler: async (params: any) => {
        const result = await client.convertLeadToCustomer(params.lead_id, params.create_job);
        return result;
      },
    },

    delete_lead: {
      description: 'Delete a lead',
      parameters: {
        type: 'object',
        properties: {
          lead_id: {
            type: 'string',
            description: 'Lead ID',
          },
        },
        required: ['lead_id'],
      },
      handler: async (params: { lead_id: string }) => {
        const result = await client.deleteLead(params.lead_id);
        return result;
      },
    },
  };
}
