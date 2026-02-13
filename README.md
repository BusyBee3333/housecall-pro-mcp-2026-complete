# Housecall Pro MCP Server

Complete Model Context Protocol (MCP) server for Housecall Pro field service management platform. Built to GHL-quality standards with comprehensive tools, React apps, and full API integration.

## Features

- **109 MCP Tools** across 17 domains
- **15 React Apps** for visual management
- **Full API Coverage** with Bearer token auth, pagination, error handling, and rate limiting
- **TypeScript** with strict type checking
- **Dark Theme UI** for all React apps

## Installation

```bash
npm install
npm run build
```

## Configuration

Set the following environment variable:

```bash
export HOUSECALL_PRO_API_KEY="your_api_key_here"
```

Optional:
```bash
export HOUSECALL_PRO_BASE_URL="https://api.housecallpro.com"  # Default
```

## Usage

### As MCP Server (stdio)

```bash
npx housecall-pro-mcp
```

### Configuration in Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "housecall-pro": {
      "command": "npx",
      "args": ["-y", "@mcpengine/housecall-pro"],
      "env": {
        "HOUSECALL_PRO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools (109)

### Jobs (12 tools)
- `list_jobs` - List jobs with filters
- `get_job` - Get job details
- `create_job` - Create new job
- `update_job` - Update job
- `complete_job` - Mark job complete
- `cancel_job` - Cancel job
- `list_job_line_items` - List job line items
- `add_job_line_item` - Add line item to job
- `schedule_job` - Schedule a job
- `reschedule_job` - Reschedule job
- `assign_employee` - Assign employee to job
- `get_dispatch_board` - View dispatch board

### Customers (6 tools)
- `list_customers` - List all customers
- `get_customer` - Get customer details
- `create_customer` - Create new customer
- `update_customer` - Update customer
- `delete_customer` - Delete customer
- `search_customers` - Search customers

### Estimates (6 tools)
- `list_estimates` - List estimates
- `get_estimate` - Get estimate details
- `create_estimate` - Create new estimate
- `send_estimate` - Send estimate to customer
- `approve_estimate` - Mark estimate approved
- `convert_estimate_to_job` - Convert to job

### Invoices (6 tools)
- `list_invoices` - List invoices
- `get_invoice` - Get invoice details
- `create_invoice` - Create new invoice
- `send_invoice` - Send invoice to customer
- `mark_invoice_paid` - Mark invoice as paid
- `list_invoice_payments` - List payments for invoice

### Payments (8 tools)
- `list_payments` - List all payments
- `get_payment` - Get payment details
- `create_payment` - Record new payment
- `refund_payment` - Process refund
- `void_payment` - Void a payment
- `process_card_payment` - Process card payment
- `list_payment_methods` - List saved payment methods
- `delete_payment_method` - Delete payment method

### Employees (6 tools)
- `list_employees` - List all employees
- `get_employee` - Get employee details
- `create_employee` - Create new employee
- `update_employee` - Update employee
- `get_employee_schedule` - Get employee schedule
- `get_employee_performance` - Get performance metrics

### Scheduling (7 tools)
- `get_schedule` - Get schedule for date range
- `check_availability` - Check employee availability
- `find_available_slots` - Find available time slots
- `create_time_off` - Create time-off block
- `delete_time_off` - Delete time-off block
- `list_recurring_schedules` - List recurring schedules
- `create_recurring_schedule` - Create recurring schedule

### Dispatch (3 tools)
- `get_dispatch_board` - Get dispatch board view
- `assign_employee` - Assign employee to job
- `get_employee_availability` - Check availability

### Tags (5 tools)
- `list_tags` - List all tags
- `create_tag` - Create new tag
- `delete_tag` - Delete tag
- `add_tag_to_job` - Tag a job
- `add_tag_to_customer` - Tag a customer

### Notifications (2 tools)
- `list_notifications` - List notifications
- `send_notification` - Send SMS/email notification

### Reviews (3 tools)
- `list_reviews` - List customer reviews
- `get_review` - Get review details
- `request_review` - Request review from customer

### Reporting (3 tools)
- `get_revenue_report` - Revenue analytics
- `get_job_completion_report` - Job completion metrics
- `get_employee_performance_report` - Employee performance

### Price Book (8 tools)
- `list_pricebook_items` - List catalog items
- `get_pricebook_item` - Get item details
- `create_pricebook_item` - Create new item
- `update_pricebook_item` - Update item
- `delete_pricebook_item` - Delete item
- `list_pricebook_categories` - List categories
- `create_pricebook_category` - Create category
- `bulk_update_prices` - Bulk price update

### Leads (6 tools)
- `list_leads` - List all leads
- `get_lead` - Get lead details
- `create_lead` - Create new lead
- `update_lead` - Update lead
- `convert_lead_to_customer` - Convert to customer
- `delete_lead` - Delete lead

### Webhooks (7 tools)
- `list_webhooks` - List webhook subscriptions
- `get_webhook` - Get webhook details
- `create_webhook` - Create webhook subscription
- `update_webhook` - Update webhook
- `delete_webhook` - Delete webhook
- `test_webhook` - Send test event
- `list_webhook_deliveries` - List delivery attempts

### Time Tracking (8 tools)
- `list_time_entries` - List time entries
- `get_time_entry` - Get entry details
- `clock_in` - Clock in employee
- `clock_out` - Clock out employee
- `create_manual_time_entry` - Manual entry
- `update_time_entry` - Update entry
- `delete_time_entry` - Delete entry
- `get_employee_hours` - Get total hours

### Settings (8 tools)
- `get_company_info` - Get company information
- `update_company_info` - Update company info
- `get_business_hours` - Get business hours
- `update_business_hours` - Update business hours
- `get_notification_settings` - Get notification settings
- `update_notification_settings` - Update notifications
- `get_tax_settings` - Get tax settings
- `update_tax_settings` - Update tax settings

## React Apps (15)

All apps feature dark theme, responsive design, and MCP API integration.

1. **Job Board** - Grid view of all jobs with status filtering
2. **Job Detail** - Detailed job view with line items and timeline
3. **Customer List** - Searchable customer directory
4. **Customer Detail** - Customer profile with job history
5. **Schedule Calendar** - Visual scheduling interface
6. **Estimate Builder** - Create and manage estimates
7. **Invoice Dashboard** - Invoice tracking and management
8. **Employee Manager** - Team member management
9. **Review Dashboard** - Customer review analytics
10. **Payment Tracker** - Payment and revenue tracking
11. **Price Book** - Service catalog management
12. **Dispatch Map** - Geographic dispatch view
13. **Notification Center** - Notification management
14. **Report Dashboard** - Analytics and insights
15. **Settings Panel** - System configuration

### Building React Apps

Each app is independently buildable with Vite:

```bash
cd src/ui/react-app/src/apps/job-board
npm install
npm run dev
```

## API Client

The `HousecallProClient` class provides:

- **Bearer Token Authentication** - Secure API key auth
- **Automatic Pagination** - Handles multi-page responses
- **Error Handling** - Comprehensive error types
- **Rate Limiting** - Built-in retry logic
- **Type Safety** - Full TypeScript types

## Development

```bash
# Install dependencies
npm install

# Build server
npm run build

# Watch mode
npm run dev

# Type check
npx tsc --noEmit

# Clean build
npm run clean && npm run build
```

## Architecture

```
src/
├── clients/
│   └── housecall-pro.ts      # API client with all endpoints
├── tools/
│   ├── jobs-tools.ts          # Job management tools
│   ├── customers-tools.ts     # Customer management tools
│   ├── estimates-tools.ts     # Estimate tools
│   ├── invoices-tools.ts      # Invoice tools
│   ├── payments-tools.ts      # Payment processing tools
│   ├── employees-tools.ts     # Employee management tools
│   ├── scheduling-tools.ts    # Scheduling tools
│   ├── dispatch-tools.ts      # Dispatch tools
│   ├── tags-tools.ts          # Tag management tools
│   ├── notifications-tools.ts # Notification tools
│   ├── reviews-tools.ts       # Review tools
│   ├── reporting-tools.ts     # Analytics tools
│   ├── pricebook-tools.ts     # Price book tools
│   ├── leads-tools.ts         # Lead management tools
│   ├── webhooks-tools.ts      # Webhook management tools
│   ├── timetracking-tools.ts  # Time tracking tools
│   ├── settings-tools.ts      # Settings management tools
│   └── index.ts               # Tool registry
├── types/
│   └── index.ts               # TypeScript interfaces
├── ui/
│   └── react-app/
│       └── src/
│           └── apps/
│               ├── job-board/
│               ├── customer-list/
│               ├── invoice-dashboard/
│               ├── estimate-builder/
│               ├── schedule-calendar/
│               ├── employee-manager/
│               ├── payment-tracker/
│               ├── price-book/
│               ├── dispatch-map/
│               ├── review-dashboard/
│               ├── report-dashboard/
│               ├── settings-panel/
│               ├── notification-center/
│               ├── job-detail/
│               └── customer-detail/
├── server.ts                  # MCP server implementation
├── main.ts                    # Entry point (stdio)
└── index.ts                   # Main export
```

## License

MIT

## Support

For issues or questions, visit: https://github.com/mcpengine/housecall-pro
