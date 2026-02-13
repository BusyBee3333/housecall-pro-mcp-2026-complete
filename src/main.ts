#!/usr/bin/env node

/**
 * Housecall Pro MCP Server Entry Point
 */

import { HousecallProServer } from './server.js';

async function main() {
  try {
    const server = new HousecallProServer();
    await server.run();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
