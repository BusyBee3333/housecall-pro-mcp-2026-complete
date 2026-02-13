/**
 * Notification Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Notification } from '../types/index.js';

export function registerNotificationsTools(client: HousecallProClient) {
  return {
    list_notifications: {
      description: 'List notifications with optional filters',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['sms', 'email', 'push'],
            description: 'Filter by notification type',
          },
          status: {
            type: 'string',
            enum: ['queued', 'sent', 'delivered', 'failed'],
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
        const notifications = await client.listNotifications(params);
        return { notifications, count: notifications.length };
      },
    },

    send_notification: {
      description: 'Send a notification to a customer',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['sms', 'email'],
            description: 'Notification type',
          },
          recipient: {
            type: 'string',
            description: 'Recipient (phone number for SMS, email address for email)',
          },
          subject: {
            type: 'string',
            description: 'Subject (email only)',
          },
          message: {
            type: 'string',
            description: 'Message content',
          },
        },
        required: ['type', 'recipient', 'message'],
      },
      handler: async (params: any) => {
        const notification = await client.sendNotification(params);
        return notification;
      },
    },

    mark_notification_read: {
      description: 'Mark a notification as read',
      parameters: {
        type: 'object',
        properties: {
          notification_id: {
            type: 'string',
            description: 'Notification ID',
          },
        },
        required: ['notification_id'],
      },
      handler: async (params: { notification_id: string }) => {
        const result = await client.markNotificationRead(params.notification_id);
        return result;
      },
    },
  };
}
