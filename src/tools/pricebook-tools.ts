/**
 * Price Book / Catalog Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerPriceBookTools(client: HousecallProClient) {
  return {
    list_pricebook_items: {
      description: 'List all items in the price book',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Filter by category',
          },
          search: {
            type: 'string',
            description: 'Search by name or description',
          },
          is_active: {
            type: 'boolean',
            description: 'Filter by active status',
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
        const items = await client.listPriceBookItems(params);
        return { items, count: items.length };
      },
    },

    get_pricebook_item: {
      description: 'Get detailed information about a price book item',
      parameters: {
        type: 'object',
        properties: {
          item_id: {
            type: 'string',
            description: 'Price book item ID',
          },
        },
        required: ['item_id'],
      },
      handler: async (params: { item_id: string }) => {
        const item = await client.getPriceBookItem(params.item_id);
        return item;
      },
    },

    create_pricebook_item: {
      description: 'Create a new price book item',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Item name',
          },
          description: {
            type: 'string',
            description: 'Item description',
          },
          unit_price: {
            type: 'number',
            description: 'Unit price',
          },
          unit: {
            type: 'string',
            description: 'Unit of measurement (e.g., "each", "hour")',
          },
          category: {
            type: 'string',
            description: 'Category name',
          },
          sku: {
            type: 'string',
            description: 'SKU / item code',
          },
          cost: {
            type: 'number',
            description: 'Cost per unit (for profit tracking)',
          },
          taxable: {
            type: 'boolean',
            description: 'Whether item is taxable',
          },
          is_active: {
            type: 'boolean',
            description: 'Whether item is active',
          },
        },
        required: ['name', 'unit_price'],
      },
      handler: async (params: any) => {
        const item = await client.createPriceBookItem(params);
        return item;
      },
    },

    update_pricebook_item: {
      description: 'Update an existing price book item',
      parameters: {
        type: 'object',
        properties: {
          item_id: {
            type: 'string',
            description: 'Price book item ID',
          },
          name: {
            type: 'string',
            description: 'Item name',
          },
          description: {
            type: 'string',
            description: 'Item description',
          },
          unit_price: {
            type: 'number',
            description: 'Unit price',
          },
          cost: {
            type: 'number',
            description: 'Cost per unit',
          },
          taxable: {
            type: 'boolean',
            description: 'Whether item is taxable',
          },
          is_active: {
            type: 'boolean',
            description: 'Whether item is active',
          },
        },
        required: ['item_id'],
      },
      handler: async (params: any) => {
        const { item_id, ...updateData } = params;
        const item = await client.updatePriceBookItem(item_id, updateData);
        return item;
      },
    },

    delete_pricebook_item: {
      description: 'Delete a price book item',
      parameters: {
        type: 'object',
        properties: {
          item_id: {
            type: 'string',
            description: 'Price book item ID',
          },
        },
        required: ['item_id'],
      },
      handler: async (params: { item_id: string }) => {
        const result = await client.deletePriceBookItem(params.item_id);
        return result;
      },
    },

    list_pricebook_categories: {
      description: 'List all price book categories',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (params: any) => {
        const categories = await client.listPriceBookCategories();
        return categories;
      },
    },

    create_pricebook_category: {
      description: 'Create a new price book category',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Category name',
          },
          description: {
            type: 'string',
            description: 'Category description',
          },
        },
        required: ['name'],
      },
      handler: async (params: any) => {
        const category = await client.createPriceBookCategory(params);
        return category;
      },
    },

    bulk_update_prices: {
      description: 'Bulk update prices for multiple items',
      parameters: {
        type: 'object',
        properties: {
          updates: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                item_id: { type: 'string' },
                unit_price: { type: 'number' },
              },
            },
            description: 'Array of item updates',
          },
        },
        required: ['updates'],
      },
      handler: async (params: any) => {
        const result = await client.bulkUpdatePrices(params.updates);
        return result;
      },
    },
  };
}
