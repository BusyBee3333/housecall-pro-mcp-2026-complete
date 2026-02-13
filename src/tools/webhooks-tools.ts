/**
 * Webhook Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerWebhooksTools(client: HousecallProClient) {
  return {
    list_webhooks: {
      description: 'List all configured webhooks',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (params: any) => {
        const webhooks = await client.listWebhooks();
        return webhooks;
      },
    },

    get_webhook: {
      description: 'Get detailed information about a webhook',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'Webhook ID',
          },
        },
        required: ['webhook_id'],
      },
      handler: async (params: { webhook_id: string }) => {
        const webhook = await client.getWebhook(params.webhook_id);
        return webhook;
      },
    },

    create_webhook: {
      description: 'Create a new webhook subscription',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Webhook endpoint URL',
          },
          events: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of event types to subscribe to (e.g., "job.created", "invoice.paid")',
          },
          secret: {
            type: 'string',
            description: 'Secret for webhook signature verification',
          },
          is_active: {
            type: 'boolean',
            description: 'Whether webhook is active',
          },
        },
        required: ['url', 'events'],
      },
      handler: async (params: any) => {
        const webhook = await client.createWebhook(params);
        return webhook;
      },
    },

    update_webhook: {
      description: 'Update an existing webhook',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'Webhook ID',
          },
          url: {
            type: 'string',
            description: 'Webhook endpoint URL',
          },
          events: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of event types to subscribe to',
          },
          is_active: {
            type: 'boolean',
            description: 'Whether webhook is active',
          },
        },
        required: ['webhook_id'],
      },
      handler: async (params: any) => {
        const { webhook_id, ...updateData } = params;
        const webhook = await client.updateWebhook(webhook_id, updateData);
        return webhook;
      },
    },

    delete_webhook: {
      description: 'Delete a webhook subscription',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'Webhook ID',
          },
        },
        required: ['webhook_id'],
      },
      handler: async (params: { webhook_id: string }) => {
        const result = await client.deleteWebhook(params.webhook_id);
        return result;
      },
    },

    test_webhook: {
      description: 'Send a test event to a webhook',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'Webhook ID',
          },
          event_type: {
            type: 'string',
            description: 'Event type to test',
          },
        },
        required: ['webhook_id'],
      },
      handler: async (params: any) => {
        const result = await client.testWebhook(params.webhook_id, params.event_type);
        return result;
      },
    },

    list_webhook_deliveries: {
      description: 'List recent webhook delivery attempts',
      parameters: {
        type: 'object',
        properties: {
          webhook_id: {
            type: 'string',
            description: 'Filter by webhook ID',
          },
          status: {
            type: 'string',
            enum: ['success', 'failed', 'pending'],
            description: 'Filter by delivery status',
          },
          limit: {
            type: 'number',
            description: 'Number of deliveries to return (default: 50)',
          },
        },
      },
      handler: async (params: any) => {
        const deliveries = await client.listWebhookDeliveries(params);
        return deliveries;
      },
    },
  };
}
