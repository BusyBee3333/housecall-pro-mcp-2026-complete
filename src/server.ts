/**
 * Housecall Pro MCP Server
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { HousecallProClient } from './clients/housecall-pro.js';
import { registerAllTools } from './tools/index.js';

export class HousecallProServer {
  private server: Server;
  private client: HousecallProClient;
  private tools: Record<string, any>;

  constructor() {
    this.server = new Server(
      {
        name: 'housecall-pro',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    // Initialize client (API key will be set from env var)
    const apiKey = process.env.HOUSECALL_PRO_API_KEY;
    if (!apiKey) {
      throw new Error('HOUSECALL_PRO_API_KEY environment variable is required');
    }

    this.client = new HousecallProClient({
      apiKey,
      baseUrl: process.env.HOUSECALL_PRO_BASE_URL,
    });

    // Register all tools
    this.tools = registerAllTools(this.client);

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: Object.entries(this.tools).map(([name, tool]) => ({
          name,
          description: tool.description,
          inputSchema: tool.parameters,
        })),
      };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      const tool = this.tools[name];
      if (!tool) {
        throw new Error(`Unknown tool: ${name}`);
      }

      try {
        const result = await tool.handler(args || {});
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error: any) {
        // Handle API errors
        if (error.error === 'APIError') {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  error: error.error,
                  message: error.message,
                  status: error.status,
                }, null, 2),
              },
            ],
            isError: true,
          };
        }

        // Handle other errors
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                error: 'ExecutionError',
                message: error.message || 'Tool execution failed',
                details: error,
              }, null, 2),
            },
          ],
          isError: true,
        };
      }
    });

    // List resources (empty for now, but could include templates, reports, etc.)
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [],
      };
    });

    // Read resource (empty for now)
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      throw new Error(`Resource not found: ${request.params.uri}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Housecall Pro MCP server running on stdio');
  }
}
