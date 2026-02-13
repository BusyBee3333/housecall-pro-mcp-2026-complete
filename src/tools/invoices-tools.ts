/**
 * Invoice Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Invoice, CreateInvoiceRequest, Payment } from '../types/index.js';

export function registerInvoicesTools(client: HousecallProClient) {
  return {
    list_invoices: {
      description: 'List invoices with optional filters',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Filter by customer ID',
          },
          job_id: {
            type: 'string',
            description: 'Filter by job ID',
          },
          status: {
            type: 'string',
            enum: ['draft', 'sent', 'viewed', 'partial', 'paid', 'overdue'],
            description: 'Filter by status',
          },
          start_date: {
            type: 'string',
            description: 'Filter invoices created on or after this date (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'Filter invoices created on or before this date (ISO 8601)',
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
        const invoices = await client.listInvoices(params);
        return { invoices, count: invoices.length };
      },
    },

    get_invoice: {
      description: 'Get detailed information about a specific invoice',
      parameters: {
        type: 'object',
        properties: {
          invoice_id: {
            type: 'string',
            description: 'Invoice ID',
          },
        },
        required: ['invoice_id'],
      },
      handler: async (params: { invoice_id: string }) => {
        const invoice = await client.getInvoice(params.invoice_id);
        return invoice;
      },
    },

    create_invoice: {
      description: 'Create a new invoice',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
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
          due_date: {
            type: 'string',
            description: 'Due date (ISO 8601)',
          },
          send_immediately: {
            type: 'boolean',
            description: 'Send the invoice immediately after creation',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: CreateInvoiceRequest) => {
        const invoice = await client.createInvoice(params);
        return invoice;
      },
    },

    send_invoice: {
      description: 'Send an invoice to the customer',
      parameters: {
        type: 'object',
        properties: {
          invoice_id: {
            type: 'string',
            description: 'Invoice ID',
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
        required: ['invoice_id'],
      },
      handler: async (params: any) => {
        const { invoice_id, ...options } = params;
        const result = await client.sendInvoice(invoice_id, options);
        return result;
      },
    },

    mark_invoice_paid: {
      description: 'Record a payment for an invoice',
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
        },
        required: ['invoice_id', 'amount', 'method'],
      },
      handler: async (params: any) => {
        const { invoice_id, ...paymentData } = params;
        const payment = await client.markInvoicePaid(invoice_id, paymentData);
        return payment;
      },
    },

    list_invoice_payments: {
      description: 'List all payments for an invoice',
      parameters: {
        type: 'object',
        properties: {
          invoice_id: {
            type: 'string',
            description: 'Invoice ID',
          },
        },
        required: ['invoice_id'],
      },
      handler: async (params: { invoice_id: string }) => {
        const payments = await client.listInvoicePayments(params.invoice_id);
        return payments;
      },
    },
  };
}
