/**
 * Customer Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Customer, CreateCustomerRequest } from '../types/index.js';

export function registerCustomersTools(client: HousecallProClient) {
  return {
    list_customers: {
      description: 'List customers with optional filters',
      parameters: {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            description: 'Search query (name, email, phone)',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Filter by tags',
          },
          lead_source: {
            type: 'string',
            description: 'Filter by lead source',
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
        const customers = await client.listCustomers(params);
        return { customers, count: customers.length };
      },
    },

    get_customer: {
      description: 'Get detailed information about a specific customer',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Customer ID',
          },
        },
        required: ['customer_id'],
      },
      handler: async (params: { customer_id: string }) => {
        const customer = await client.getCustomer(params.customer_id);
        return customer;
      },
    },

    create_customer: {
      description: 'Create a new customer',
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
          mobile_number: {
            type: 'string',
            description: 'Mobile phone number',
          },
          home_number: {
            type: 'string',
            description: 'Home phone number',
          },
          work_number: {
            type: 'string',
            description: 'Work phone number',
          },
          company: {
            type: 'string',
            description: 'Company name',
          },
          notifications_enabled: {
            type: 'boolean',
            description: 'Enable notifications for this customer',
          },
          lead_source: {
            type: 'string',
            description: 'Lead source',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of tag IDs',
          },
        },
        required: ['first_name', 'last_name'],
      },
      handler: async (params: CreateCustomerRequest) => {
        const customer = await client.createCustomer(params);
        return customer;
      },
    },

    update_customer: {
      description: 'Update an existing customer',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Customer ID',
          },
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
          mobile_number: {
            type: 'string',
            description: 'Mobile phone number',
          },
          home_number: {
            type: 'string',
            description: 'Home phone number',
          },
          work_number: {
            type: 'string',
            description: 'Work phone number',
          },
          company: {
            type: 'string',
            description: 'Company name',
          },
          notifications_enabled: {
            type: 'boolean',
            description: 'Enable notifications for this customer',
          },
          lead_source: {
            type: 'string',
            description: 'Lead source',
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
        const { customer_id, ...updateData } = params;
        const customer = await client.updateCustomer(customer_id, updateData);
        return customer;
      },
    },

    delete_customer: {
      description: 'Delete a customer',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Customer ID',
          },
        },
        required: ['customer_id'],
      },
      handler: async (params: { customer_id: string }) => {
        const result = await client.deleteCustomer(params.customer_id);
        return result;
      },
    },

    search_customers: {
      description: 'Search customers by name, email, or phone',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query',
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
        required: ['query'],
      },
      handler: async (params: any) => {
        const customers = await client.searchCustomers(params.query, {
          page: params.page,
          page_size: params.page_size,
        });
        return { customers, count: customers.length };
      },
    },

    list_customer_addresses: {
      description: 'List all addresses for a customer',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Customer ID',
          },
        },
        required: ['customer_id'],
      },
      handler: async (params: { customer_id: string }) => {
        const addresses = await client.listCustomerAddresses(params.customer_id);
        return addresses;
      },
    },
  };
}
