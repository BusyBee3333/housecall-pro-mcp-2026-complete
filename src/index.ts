#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============================================
// CONFIGURATION
// ============================================
const MCP_NAME = "housecall-pro";
const MCP_VERSION = "1.0.0";
const API_BASE_URL = "https://api.housecallpro.com/v1";

// ============================================
// API CLIENT
// ============================================
class HousecallProClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Housecall Pro API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // Jobs
  async listJobs(params: { page?: number; per_page?: number; status?: string; customer_id?: string }) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.per_page) query.append("per_page", params.per_page.toString());
    if (params.status) query.append("status", params.status);
    if (params.customer_id) query.append("customer_id", params.customer_id);
    return this.get(`/jobs?${query.toString()}`);
  }

  async getJob(id: string) {
    return this.get(`/jobs/${id}`);
  }

  async createJob(data: {
    customer_id: string;
    address_id?: string;
    description?: string;
    scheduled_start?: string;
    scheduled_end?: string;
    assigned_employee_ids?: string[];
    tags?: string[];
  }) {
    return this.post("/jobs", data);
  }

  // Estimates
  async listEstimates(params: { page?: number; per_page?: number; status?: string; customer_id?: string }) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.per_page) query.append("per_page", params.per_page.toString());
    if (params.status) query.append("status", params.status);
    if (params.customer_id) query.append("customer_id", params.customer_id);
    return this.get(`/estimates?${query.toString()}`);
  }

  async createEstimate(data: {
    customer_id: string;
    address_id?: string;
    message?: string;
    options?: Array<{
      name: string;
      total_amount?: number;
      line_items?: Array<{
        name: string;
        description?: string;
        quantity?: number;
        unit_price?: number;
      }>;
    }>;
  }) {
    return this.post("/estimates", data);
  }

  // Customers
  async listCustomers(params: { page?: number; per_page?: number; q?: string; sort?: string }) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.per_page) query.append("per_page", params.per_page.toString());
    if (params.q) query.append("q", params.q);
    if (params.sort) query.append("sort", params.sort);
    return this.get(`/customers?${query.toString()}`);
  }

  // Invoices
  async listInvoices(params: { page?: number; per_page?: number; status?: string; customer_id?: string }) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.per_page) query.append("per_page", params.per_page.toString());
    if (params.status) query.append("status", params.status);
    if (params.customer_id) query.append("customer_id", params.customer_id);
    return this.get(`/invoices?${query.toString()}`);
  }

  // Employees
  async listEmployees(params: { page?: number; per_page?: number; active?: boolean }) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.per_page) query.append("per_page", params.per_page.toString());
    if (params.active !== undefined) query.append("active", params.active.toString());
    return this.get(`/employees?${query.toString()}`);
  }
}

// ============================================
// TOOL DEFINITIONS
// ============================================
const tools = [
  {
    name: "list_jobs",
    description: "List jobs from Housecall Pro. Filter by status, customer, and paginate results.",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number for pagination (default: 1)" },
        per_page: { type: "number", description: "Number of results per page (default: 25, max: 100)" },
        status: { 
          type: "string", 
          description: "Filter by job status",
          enum: ["unscheduled", "scheduled", "in_progress", "complete", "canceled"]
        },
        customer_id: { type: "string", description: "Filter jobs by customer ID" },
      },
    },
  },
  {
    name: "get_job",
    description: "Get detailed information about a specific job by ID",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "The job ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "create_job",
    description: "Create a new job in Housecall Pro",
    inputSchema: {
      type: "object" as const,
      properties: {
        customer_id: { type: "string", description: "The customer ID to associate with this job (required)" },
        address_id: { type: "string", description: "The address ID for the job location" },
        description: { type: "string", description: "Job description or work to be performed" },
        scheduled_start: { type: "string", description: "Scheduled start time in ISO 8601 format" },
        scheduled_end: { type: "string", description: "Scheduled end time in ISO 8601 format" },
        assigned_employee_ids: { 
          type: "array", 
          items: { type: "string" },
          description: "Array of employee IDs to assign to this job" 
        },
        tags: { 
          type: "array", 
          items: { type: "string" },
          description: "Tags to categorize the job" 
        },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "list_estimates",
    description: "List estimates from Housecall Pro with optional filters",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number for pagination" },
        per_page: { type: "number", description: "Number of results per page (max: 100)" },
        status: { 
          type: "string", 
          description: "Filter by estimate status",
          enum: ["pending", "sent", "approved", "declined", "converted"]
        },
        customer_id: { type: "string", description: "Filter estimates by customer ID" },
      },
    },
  },
  {
    name: "create_estimate",
    description: "Create a new estimate for a customer",
    inputSchema: {
      type: "object" as const,
      properties: {
        customer_id: { type: "string", description: "The customer ID (required)" },
        address_id: { type: "string", description: "The address ID for the estimate" },
        message: { type: "string", description: "Message or notes for the estimate" },
        options: {
          type: "array",
          description: "Estimate options/packages",
          items: {
            type: "object",
            properties: {
              name: { type: "string", description: "Option name (e.g., 'Basic', 'Premium')" },
              total_amount: { type: "number", description: "Total amount for this option in cents" },
              line_items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string", description: "Line item name" },
                    description: { type: "string", description: "Line item description" },
                    quantity: { type: "number", description: "Quantity" },
                    unit_price: { type: "number", description: "Unit price in cents" },
                  },
                },
              },
            },
          },
        },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "list_customers",
    description: "List customers from Housecall Pro with search and pagination",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number for pagination" },
        per_page: { type: "number", description: "Number of results per page (max: 100)" },
        q: { type: "string", description: "Search query to filter customers by name, email, or phone" },
        sort: { type: "string", description: "Sort field (e.g., 'created_at', 'updated_at')" },
      },
    },
  },
  {
    name: "list_invoices",
    description: "List invoices from Housecall Pro",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number for pagination" },
        per_page: { type: "number", description: "Number of results per page (max: 100)" },
        status: { 
          type: "string", 
          description: "Filter by invoice status",
          enum: ["draft", "sent", "paid", "partial", "void"]
        },
        customer_id: { type: "string", description: "Filter invoices by customer ID" },
      },
    },
  },
  {
    name: "list_employees",
    description: "List employees/technicians from Housecall Pro",
    inputSchema: {
      type: "object" as const,
      properties: {
        page: { type: "number", description: "Page number for pagination" },
        per_page: { type: "number", description: "Number of results per page (max: 100)" },
        active: { type: "boolean", description: "Filter by active status" },
      },
    },
  },
];

// ============================================
// TOOL HANDLERS
// ============================================
async function handleTool(client: HousecallProClient, name: string, args: any) {
  switch (name) {
    case "list_jobs":
      return await client.listJobs(args);
    
    case "get_job":
      return await client.getJob(args.id);
    
    case "create_job":
      return await client.createJob(args);
    
    case "list_estimates":
      return await client.listEstimates(args);
    
    case "create_estimate":
      return await client.createEstimate(args);
    
    case "list_customers":
      return await client.listCustomers(args);
    
    case "list_invoices":
      return await client.listInvoices(args);
    
    case "list_employees":
      return await client.listEmployees(args);
    
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================
// SERVER SETUP
// ============================================
async function main() {
  const apiKey = process.env.HOUSECALL_PRO_API_KEY;
  if (!apiKey) {
    console.error("Error: HOUSECALL_PRO_API_KEY environment variable required");
    process.exit(1);
  }

  const client = new HousecallProClient(apiKey);

  const server = new Server(
    { name: `${MCP_NAME}-mcp`, version: MCP_VERSION },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      const result = await handleTool(client, name, args || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${MCP_NAME} MCP server running on stdio`);
}

main().catch(console.error);
