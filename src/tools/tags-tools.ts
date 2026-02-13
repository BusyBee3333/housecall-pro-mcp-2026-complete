/**
 * Tag Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Tag } from '../types/index.js';

export function registerTagsTools(client: HousecallProClient) {
  return {
    list_tags: {
      description: 'List all tags',
      parameters: {
        type: 'object',
        properties: {
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
        const tags = await client.listTags(params);
        return { tags, count: tags.length };
      },
    },

    create_tag: {
      description: 'Create a new tag',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Tag name',
          },
          color: {
            type: 'string',
            description: 'Tag color (hex code)',
          },
        },
        required: ['name'],
      },
      handler: async (params: { name: string; color?: string }) => {
        const tag = await client.createTag(params);
        return tag;
      },
    },

    delete_tag: {
      description: 'Delete a tag',
      parameters: {
        type: 'object',
        properties: {
          tag_id: {
            type: 'string',
            description: 'Tag ID',
          },
        },
        required: ['tag_id'],
      },
      handler: async (params: { tag_id: string }) => {
        const result = await client.deleteTag(params.tag_id);
        return result;
      },
    },

    add_tag_to_job: {
      description: 'Add a tag to a job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          tag_id: {
            type: 'string',
            description: 'Tag ID',
          },
        },
        required: ['job_id', 'tag_id'],
      },
      handler: async (params: { job_id: string; tag_id: string }) => {
        const result = await client.addTagToJob(params.job_id, params.tag_id);
        return result;
      },
    },

    add_tag_to_customer: {
      description: 'Add a tag to a customer',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Customer ID',
          },
          tag_id: {
            type: 'string',
            description: 'Tag ID',
          },
        },
        required: ['customer_id', 'tag_id'],
      },
      handler: async (params: { customer_id: string; tag_id: string }) => {
        const result = await client.addTagToCustomer(params.customer_id, params.tag_id);
        return result;
      },
    },
  };
}
