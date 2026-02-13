/**
 * Payment Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';

export function registerPaymentsTools(client: HousecallProClient) {
  return {
    list_payments: {
      description: 'List all payments with optional filters',
      parameters: {
        type: 'object',
        properties: {
          invoice_id: {
            type: 'string',
            description: 'Filter by invoice ID',
          },
          customer_id: {
            type: 'string',
            description: 'Filter by customer ID',
          },
          method: {
            type: 'string',
            enum: ['cash', 'check', 'card', 'ach', 'other'],
            description: 'Filter by payment method',
          },
          start_date: {
            type: 'string',
            description: 'Filter payments on or after this date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'Filter payments on or before this date (ISO 8601)',
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
        const payments = await client.listPayments(params);
        return { payments, count: payments.length };
      },
    },

    get_payment: {
      description: 'Get detailed information about a specific payment',
      parameters: {
        type: 'object',
        properties: {
          payment_id: {
            type: 'string',
            description: 'Payment ID',
          },
        },
        required: ['payment_id'],
      },
      handler: async (params: { payment_id: string }) => {
        const payment = await client.getPayment(params.payment_id);
        return payment;
      },
    },

    create_payment: {
      description: 'Record a new payment for an invoice',
      parameters: {
        type: 'object',
        properties: {
          invoice_id: {
            type: 'string',
            description: 'Invoice ID',
          },
          amount: {
            type: 'number',
            description: 'Payment amount',
          },
          method: {
            type: 'string',
            enum: ['cash', 'check', 'card', 'ach', 'other'],
            description: 'Payment method',
          },
          reference: {
            type: 'string',
            description: 'Payment reference (check number, transaction ID, etc.)',
          },
          payment_date: {
            type: 'string',
            description: 'Payment date (ISO 8601), defaults to now',
          },
          notes: {
            type: 'string',
            description: 'Payment notes',
          },
        },
        required: ['invoice_id', 'amount', 'method'],
      },
      handler: async (params: any) => {
        const payment = await client.createPayment(params);
        return payment;
      },
    },

    refund_payment: {
      description: 'Process a refund for a payment',
      parameters: {
        type: 'object',
        properties: {
          payment_id: {
            type: 'string',
            description: 'Payment ID',
          },
          amount: {
            type: 'number',
            description: 'Refund amount (defaults to full payment amount)',
          },
          reason: {
            type: 'string',
            description: 'Refund reason',
          },
        },
        required: ['payment_id'],
      },
      handler: async (params: any) => {
        const refund = await client.refundPayment(params.payment_id, params.amount, params.reason);
        return refund;
      },
    },

    void_payment: {
      description: 'Void a payment (remove it completely)',
      parameters: {
        type: 'object',
        properties: {
          payment_id: {
            type: 'string',
            description: 'Payment ID',
          },
          reason: {
            type: 'string',
            description: 'Void reason',
          },
        },
        required: ['payment_id'],
      },
      handler: async (params: { payment_id: string; reason?: string }) => {
        const result = await client.voidPayment(params.payment_id, params.reason);
        return result;
      },
    },

    process_card_payment: {
      description: 'Process a credit card payment',
      parameters: {
        type: 'object',
        properties: {
          invoice_id: {
            type: 'string',
            description: 'Invoice ID',
          },
          amount: {
            type: 'number',
            description: 'Payment amount',
          },
          card_token: {
            type: 'string',
            description: 'Tokenized card information',
          },
          save_card: {
            type: 'boolean',
            description: 'Save card for future use',
          },
        },
        required: ['invoice_id', 'amount', 'card_token'],
      },
      handler: async (params: any) => {
        const payment = await client.processCardPayment(params);
        return payment;
      },
    },

    list_payment_methods: {
      description: 'List saved payment methods for a customer',
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
        const methods = await client.listPaymentMethods(params.customer_id);
        return methods;
      },
    },

    delete_payment_method: {
      description: 'Delete a saved payment method',
      parameters: {
        type: 'object',
        properties: {
          method_id: {
            type: 'string',
            description: 'Payment method ID',
          },
        },
        required: ['method_id'],
      },
      handler: async (params: { method_id: string }) => {
        const result = await client.deletePaymentMethod(params.method_id);
        return result;
      },
    },
  };
}
