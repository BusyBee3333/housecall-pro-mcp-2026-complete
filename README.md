> **🚀 Don't want to self-host?** [Join the waitlist for our fully managed solution →](https://mcpengage.com/housecallpro)
> 
> Zero setup. Zero maintenance. Just connect and automate.

---

# 🚀 Housecall Pro MCP Server — 2026 Complete Version

## 💡 What This Unlocks

**This MCP server gives AI direct access to your entire Housecall Pro workspace.** Instead of clicking through interfaces, you just *tell* it what you need — and AI handles job scheduling, estimates, invoicing, and customer management at scale.

### ⚡ Home Service Power Moves

Real automation that plumbing, HVAC, electrical, and home service pros actually use:

1. **Smart Scheduling** — *"Show me all unscheduled jobs, find available pros today, and book same-day HVAC repairs with customer notifications"*
2. **Estimate to Job Pipeline** — *"Pull all approved estimates from last week, convert them to jobs, assign techs based on specialty, and schedule for this week"*
3. **Revenue Intelligence** — *"List all invoices marked partial payment, calculate outstanding balances by customer, and flag accounts over 30 days"*
4. **Customer Lifecycle** — *"Find customers who booked plumbing jobs 6+ months ago but haven't returned, create follow-up estimates for drain cleaning or water heater checks"*
5. **Employee Optimization** — *"Show all employees with fewer than 5 jobs this week, list unassigned work, and suggest optimal job assignments by location and skill"*

### 🔗 The Real Power: Combining Tools

AI can chain multiple Housecall Pro operations together:

- Query jobs → Filter by urgency → Auto-assign pros → Send customer updates
- Search estimates → Identify approval patterns → Create follow-up jobs → Schedule dispatch
- Analyze customer data → Identify repeat business → Generate targeted service offers
- Pull invoice history → Export to QuickBooks → Generate cash flow reports

## 📦 What's Inside

**8 Home Service API Tools** covering job management, estimates, invoicing, and customer data:

- `list_jobs` — Query jobs by status, customer, date range with pagination
- `get_job` — Get full job details (line items, schedule, assigned pros, customer info)
- `create_job` — Create new service jobs with scheduling, assignments, and tags
- `list_estimates` — Query estimates by status and customer
- `create_estimate` — Build multi-option estimates with line items and pricing
- `list_customers` — Search customers by name, email, phone
- `list_invoices` — Pull invoicing data by status and customer
- `list_employees` — Get employee/pro roster with active status

All with proper error handling, automatic authentication, and TypeScript types.

## 🚀 Quick Start

### Option 1: Claude Desktop (Local)

1. **Clone and build:**
   ```bash
   git clone https://github.com/BusyBee3333/Housecall-Pro-MCP-2026-Complete.git
   cd housecall-pro-mcp-2026-complete
   npm install
   npm run build
   ```

2. **Get your Housecall Pro API credentials:**
   
   - Log in to your Housecall Pro account
   - Navigate to Settings → Integrations → API
   - Generate a new API key with appropriate permissions
   - See [Housecall Pro API Documentation](https://docs.housecallpro.com/reference) for details

3. **Configure Claude Desktop:**
   
   On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "housecallpro": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/housecall-pro-mcp-2026-complete/dist/index.js"],
         "env": {
           "HOUSECALL_PRO_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop**

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/housecallpro-mcp)

1. Click the button above
2. Set your Housecall Pro API credentials in Railway dashboard
3. Use the Railway URL as your MCP server endpoint

### Option 3: Docker

```bash
docker build -t housecallpro-mcp .
docker run -p 3000:3000 \
  -e HOUSECALL_PRO_API_KEY=your-key \
  housecallpro-mcp
```

## 🔐 Authentication

Housecall Pro uses **API Key authentication** via bearer token.

**API Base URL:** `https://api.housecallpro.com/v1`

**Required Header:**
- `Authorization: Bearer YOUR_API_KEY`

The MCP server handles authentication automatically once you provide credentials in your environment variables.

**Getting credentials:**
1. Log in to Housecall Pro
2. Settings → Integrations → API Access
3. Generate API Key
4. Set appropriate scopes (jobs:read, jobs:write, customers:read, etc.)

See the official [Housecall Pro API documentation](https://docs.housecallpro.com/reference) for detailed authentication steps.

## 🎯 Example Prompts for Home Service Pros

Once connected to Claude, use natural language for plumbing, HVAC, electrical, landscaping, and home service workflows:

**Job Management:**
- *"Show me all jobs scheduled for today with status 'in_progress'"*
- *"Create an emergency plumbing job for customer ID abc123 at their primary address, schedule for 2 hours from now"*
- *"List unscheduled jobs from the past week and show customer contact info"*

**Estimates & Sales:**
- *"Pull all estimates sent in the last 30 days that are still pending customer approval"*
- *"Create a two-option estimate for HVAC replacement: basic unit at $4,500 and premium at $6,800"*
- *"Show approved estimates that haven't been converted to jobs yet"*

**Customer Intelligence:**
- *"Search for customers in Austin with 'HVAC' in their service history"*
- *"Find customers who had jobs completed over 6 months ago but no recent activity"*

**Invoicing & Revenue:**
- *"List all unpaid invoices and calculate total outstanding revenue"*
- *"Show invoices marked 'partial' payment and identify customers with balances over $500"*

**Team Management:**
- *"List active employees and show who's available (no jobs assigned today)"*
- *"Show all jobs assigned to employee ID xyz789 this week"*

**Bulk Operations:**
- *"For all customers with completed HVAC jobs last fall, create maintenance reminder estimates for spring tune-ups"*
- *"Export job data for Q1, group by service type, and calculate average job value"*

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Housecall Pro account with API access

### Setup

```bash
git clone https://github.com/BusyBee3333/Housecall-Pro-MCP-2026-Complete.git
cd housecall-pro-mcp-2026-complete
npm install
cp .env.example .env
# Edit .env with your Housecall Pro credentials
npm run build
npm start
```

### Testing

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 🐛 Troubleshooting

### "Authentication failed"
- Verify your API key is correct
- Check that your key hasn't been revoked in Housecall Pro settings
- Ensure you have the necessary scopes for the operations you're attempting
- Test credentials directly via [Housecall Pro API docs](https://docs.housecallpro.com/reference)

### "Tools not appearing in Claude"
- Restart Claude Desktop after updating config
- Check that the path in `claude_desktop_config.json` is **absolute** (not relative)
- Verify the build completed successfully (`dist/index.js` exists)
- Check Claude Desktop logs (Help → View Logs)

### "Pagination issues"
- Housecall Pro uses cursor-based pagination
- Use `per_page` parameter to control result size (max 100)
- Capture `page` or pagination cursors from responses for subsequent calls

## 📖 Resources

- [Housecall Pro API Documentation](https://docs.housecallpro.com/reference)
- [Housecall Pro Developer Portal](https://developer.housecallpro.com)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Desktop Documentation](https://claude.ai/desktop)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Credits

Built by [MCPEngage](https://mcpengage.com) — AI infrastructure for home service and field service software.

Want more MCP servers? Check out our [full catalog](https://mcpengage.com) covering 30+ business platforms including FieldEdge, Jobber, ServiceTitan, and more.

---

**Questions?** Open an issue or join our [Discord community](https://discord.gg/mcpengage).
