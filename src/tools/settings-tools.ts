/**
 * Company Settings Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerSettingsTools(client: HousecallProClient) {
  return {
    get_company_info: {
      description: 'Get company information and settings',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (params: any) => {
        const info = await client.getCompanyInfo();
        return info;
      },
    },

    update_company_info: {
      description: 'Update company information',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Company name',
          },
          phone: {
            type: 'string',
            description: 'Company phone number',
          },
          email: {
            type: 'string',
            description: 'Company email',
          },
          website: {
            type: 'string',
            description: 'Company website',
          },
          address: {
            type: 'object',
            description: 'Company address',
          },
        },
      },
      handler: async (params: any) => {
        const info = await client.updateCompanyInfo(params);
        return info;
      },
    },

    get_business_hours: {
      description: 'Get business operating hours',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (params: any) => {
        const hours = await client.getBusinessHours();
        return hours;
      },
    },

    update_business_hours: {
      description: 'Update business operating hours',
      parameters: {
        type: 'object',
        properties: {
          monday: {
            type: 'object',
            description: 'Monday hours { open: "08:00", close: "17:00" }',
          },
          tuesday: {
            type: 'object',
            description: 'Tuesday hours',
          },
          wednesday: {
            type: 'object',
            description: 'Wednesday hours',
          },
          thursday: {
            type: 'object',
            description: 'Thursday hours',
          },
          friday: {
            type: 'object',
            description: 'Friday hours',
          },
          saturday: {
            type: 'object',
            description: 'Saturday hours',
          },
          sunday: {
            type: 'object',
            description: 'Sunday hours',
          },
        },
      },
      handler: async (params: any) => {
        const hours = await client.updateBusinessHours(params);
        return hours;
      },
    },

    get_notification_settings: {
      description: 'Get notification settings',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (params: any) => {
        const settings = await client.getNotificationSettings();
        return settings;
      },
    },

    update_notification_settings: {
      description: 'Update notification settings',
      parameters: {
        type: 'object',
        properties: {
          customer_notifications: {
            type: 'boolean',
            description: 'Enable customer notifications',
          },
          employee_notifications: {
            type: 'boolean',
            description: 'Enable employee notifications',
          },
          reminder_hours: {
            type: 'number',
            description: 'Hours before job to send reminder',
          },
        },
      },
      handler: async (params: any) => {
        const settings = await client.updateNotificationSettings(params);
        return settings;
      },
    },

    get_tax_settings: {
      description: 'Get tax calculation settings',
      parameters: {
        type: 'object',
        properties: {},
      },
      handler: async (params: any) => {
        const settings = await client.getTaxSettings();
        return settings;
      },
    },

    update_tax_settings: {
      description: 'Update tax calculation settings',
      parameters: {
        type: 'object',
        properties: {
          default_tax_rate: {
            type: 'number',
            description: 'Default tax rate (percentage)',
          },
          tax_label: {
            type: 'string',
            description: 'Tax label (e.g., "Sales Tax", "VAT")',
          },
        },
      },
      handler: async (params: any) => {
        const settings = await client.updateTaxSettings(params);
        return settings;
      },
    },
  };
}
