#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SunEcommerceApiClient } from './client/api-client.js';
import { toolDefinitions } from './tools/index.js';
import { resourceDefinitions } from './resources/index.js';
import { promptDefinitions } from './prompts/index.js';
import { ToolHandler } from './tools/tool-handler.js';

/**
 * Sun eCommerce MCP Server - Pure JavaScript Implementation
 * Provides Model Context Protocol interface for Sun eCommerce Platform
 */
class SunEcommerceMCPServer {
  constructor() {
    try {
      console.error('Creating MCP Server instance...');
      
      this.server = new Server(
        {
          name: '@sun-ecommerce/mcp-server-js',
          version: '1.0.0',
        },
        {
          capabilities: {
            tools: {},
            resources: {},
            prompts: {},
          },
        }
      );
      console.error('MCP Server created successfully');

      // Initialize API client with environment variables
      const config = {
        baseUrl: process.env.SUN_ECOMMERCE_API_URL || 'http://42.96.60.253:8081',
        apiVersion: process.env.SUN_ECOMMERCE_API_VERSION || 'v1',
        timeout: parseInt(process.env.SUN_ECOMMERCE_API_TIMEOUT || '30000'),
        retries: parseInt(process.env.SUN_ECOMMERCE_API_RETRIES || '3'),
        authToken: process.env.SUN_ECOMMERCE_API_TOKEN || 'sun-ecommerce',
      };

      console.error('Initializing API client with config:', {
        baseUrl: config.baseUrl,
        apiVersion: config.apiVersion,
        timeout: config.timeout,
        retries: config.retries,
        authToken: config.authToken ? '[REDACTED]' : 'none'
      });

      this.apiClient = new SunEcommerceApiClient(config);
      this.toolHandler = new ToolHandler(this.apiClient);
      
      this.setupHandlers();
      console.error('MCP Server initialized successfully');
    } catch (error) {
      console.error('Failed to initialize MCP Server:', error);
      throw error;
    }
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: toolDefinitions,
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      return await this.toolHandler.handleToolCall(name, args || {});
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'sun-ecommerce://api/documentation',
            name: 'API Documentation',
            description: 'Complete API documentation for Sun eCommerce Platform',
            mimeType: 'application/json',
          },
          {
            uri: 'sun-ecommerce://system/info',
            name: 'System Information',
            description: 'Current system status and capabilities',
            mimeType: 'application/json',
          },
          {
            uri: 'sun-ecommerce://guides/getting-started',
            name: 'Getting Started Guide',
            description: 'Quick start guide for the Sun eCommerce Platform',
            mimeType: 'application/json',
          },
          {
            uri: 'sun-ecommerce://guides/product-management',
            name: 'Product Management Guide',
            description: 'Complete guide to managing products',
            mimeType: 'application/json',
          },
          {
            uri: 'sun-ecommerce://guides/pricing-rules',
            name: 'Pricing Rules Guide',
            description: 'Advanced pricing and discount management',
            mimeType: 'application/json',
          },
          {
            uri: 'sun-ecommerce://guides/api-integration',
            name: 'API Integration Guide',
            description: 'Best practices for API integration',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(await this.handleResourceRead(uri), null, 2),
          },
        ],
      };
    });

    // List available prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: promptDefinitions,
      };
    });

    // Handle prompt requests
    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      return await this.handlePromptRequest(name, args || {});
    });
  }

  async handleResourceRead(uri) {
    switch (uri) {
      case 'sun-ecommerce://api/documentation':
        return await this.getApiDocumentation();
      case 'sun-ecommerce://system/info':
        return await this.getSystemInfo();
      case 'sun-ecommerce://guides/getting-started':
        return this.getGettingStartedGuide();
      case 'sun-ecommerce://guides/product-management':
        return this.getProductManagementGuide();
      case 'sun-ecommerce://guides/pricing-rules':
        return this.getPricingRulesGuide();
      case 'sun-ecommerce://guides/api-integration':
        return this.getApiIntegrationGuide();
      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  }

  async handlePromptRequest(name, args) {
    switch (name) {
      case 'create-product-wizard':
        return this.getCreateProductWizard(args);
      case 'setup-pricing-rule':
        return this.getSetupPricingRulePrompt(args);
      case 'troubleshoot-api':
        return this.getTroubleshootApiPrompt(args);
      case 'ecommerce-consultant':
        return this.getEcommerceConsultantPrompt(args);
      default:
        throw new Error(`Unknown prompt: ${name}`);
    }
  }

  async getApiDocumentation() {
    return {
      title: 'Sun eCommerce Platform API Documentation',
      version: '1.0.0',
      description: 'Complete API documentation for the Sun eCommerce Platform',
      baseUrl: this.apiClient.config.baseUrl,
      endpoints: {
        products: {
          create: 'POST /api/v1/products',
          list: 'GET /api/v1/products',
          get: 'GET /api/v1/products/{id}',
          update: 'PUT /api/v1/products/{id}',
          delete: 'DELETE /api/v1/products/{id}',
        },
        categories: {
          create: 'POST /api/v1/categories',
          list: 'GET /api/v1/categories',
          get: 'GET /api/v1/categories/{id}',
          tree: 'GET /api/v1/categories/tree',
        },
        pricingRules: {
          create: 'POST /api/v1/pricing-rules',
          list: 'GET /api/v1/pricing-rules',
          apply: 'POST /api/v1/pricing-rules/apply',
          validate: 'POST /api/v1/pricing-rules/validate',
        },
        cart: {
          create: 'POST /api/v1/carts',
          get: 'GET /api/v1/carts/{id}',
          addItem: 'POST /api/v1/carts/{id}/items',
          summary: 'GET /api/v1/carts/{id}/summary',
        },
        inventory: {
          create: 'POST /api/v1/inventory',
          check: 'POST /api/v1/inventory/check-availability',
          reserve: 'POST /api/v1/inventory/reserve',
        },
        media: {
          upload: 'POST /api/v1/media/upload',
          list: 'GET /api/v1/media',
          get: 'GET /api/v1/media/{id}',
        },
        partners: {
          create: 'POST /api/v1/partners',
          list: 'GET /api/v1/partners',
          get: 'GET /api/v1/partners/{id}',
        },
        salesChannels: {
          create: 'POST /api/v1/sales-channels',
          list: 'GET /api/v1/sales-channels',
          get: 'GET /api/v1/sales-channels/{id}',
        },
        translations: {
          create: 'POST /api/v1/translations/products',
          get: 'GET /api/v1/translations/products/{id}/{language}',
          languages: 'GET /api/v1/translations/languages',
        },
      },
    };
  }

  async getSystemInfo() {
    try {
      const health = await this.apiClient.healthCheck();
      return {
        platform: 'Sun eCommerce Platform',
        version: '1.0.0',
        status: 'operational',
        services: health.services || {},
        capabilities: [
          'Product Management',
          'Category Management',
          'Pricing Rules',
          'Cart Management',
          'Inventory Management',
          'Media Management',
          'Partner Management',
          'Sales Channel Management',
          'Multi-language Support',
        ],
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      return {
        platform: 'Sun eCommerce Platform',
        version: '1.0.0',
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  getGettingStartedGuide() {
    return {
      title: 'Getting Started with Sun eCommerce Platform',
      sections: [
        {
          title: 'Quick Start',
          content: 'Learn how to set up and use the Sun eCommerce Platform APIs',
          steps: [
            'Configure your API endpoint and authentication',
            'Create your first product category',
            'Add products to your catalog',
            'Set up pricing rules',
            'Configure inventory management',
          ],
        },
        {
          title: 'Authentication',
          content: 'How to authenticate with the API',
          example: 'Bearer token authentication required for most endpoints',
        },
        {
          title: 'Rate Limiting',
          content: 'API rate limits and best practices',
          limits: '1000 requests per hour per API key',
        },
      ],
    };
  }

  getCreateProductWizard(args) {
    return {
      description: 'Interactive wizard to guide product creation',
      messages: [
        {
          role: 'assistant',
          content: {
            type: 'text',
            text: `I'll help you create a new product step by step. Let's start with the basics:

1. **Product Name**: What would you like to call your product?
2. **Product Type**: Choose from:
   - Simple (single variant)
   - Configurable (multiple variants)
   - Bundle (multiple products sold together)
   - Virtual (no physical shipping)

3. **Category**: Which category should this product belong to?
4. **SKU**: Unique product identifier
5. **Pricing**: Base price and any special pricing rules

Please provide the product name and type to get started.`,
          },
        },
      ],
    };
  }

  getSetupPricingRulePrompt(args) {
    const ruleType = args.ruleType || 'percentage_discount';

    return {
      description: 'Guide for setting up pricing rules',
      messages: [
        {
          role: 'assistant',
          content: {
            type: 'text',
            text: `Let's set up a ${ruleType} pricing rule. Here's what we need:

**Rule Configuration:**
1. **Name**: Descriptive name for the rule
2. **Type**: ${ruleType}
3. **Discount Value**: Amount or percentage
4. **Conditions**: When should this rule apply?
   - Minimum quantity
   - Customer groups
   - Product categories
   - Date range

**Example for ${ruleType}:**
- Name: "Summer Sale 20% Off"
- Discount: 20%
- Conditions: Category = "Summer Collection", Valid from June 1-30
- Priority: 10

What type of discount would you like to create?`,
          },
        },
      ],
    };
  }

  getTroubleshootApiPrompt(args) {
    const issue = args.issue || 'general';

    return {
      description: 'API troubleshooting assistant',
      messages: [
        {
          role: 'assistant',
          content: {
            type: 'text',
            text: `I'll help you troubleshoot API issues. Common problems and solutions:

**Authentication Issues:**
- Check if your API token is valid and not expired
- Ensure the Authorization header is properly formatted: "Bearer YOUR_TOKEN"

**Rate Limiting:**
- You may be hitting rate limits (1000 requests/hour)
- Implement exponential backoff for retries

**404 Errors:**
- Verify the endpoint URL is correct
- Check if the resource ID exists

**Validation Errors:**
- Review required fields in the request body
- Check data types and formats (UUIDs, dates, etc.)

**Network Issues:**
- Verify the base URL is accessible
- Check firewall and proxy settings

What specific issue are you experiencing? Please share:
1. The API endpoint you're calling
2. The error message or status code
3. Your request payload (without sensitive data)`,
          },
        },
      ],
    };
  }

  getEcommerceConsultantPrompt(args) {
    const topic = args.topic || 'general';

    return {
      description: 'eCommerce strategy and best practices consultant',
      messages: [
        {
          role: 'assistant',
          content: {
            type: 'text',
            text: `Welcome! I'm your eCommerce consultant for the Sun eCommerce Platform. I can help with:

**Product Strategy:**
- Product catalog organization
- Category structure optimization
- Attribute management
- SEO best practices

**Pricing Strategy:**
- Dynamic pricing rules
- Promotional campaigns
- Tier pricing strategies
- Competitive pricing analysis

**Inventory Management:**
- Stock level optimization
- Demand forecasting
- Multi-location inventory
- Backorder management

**Customer Experience:**
- Cart optimization
- Checkout flow improvement
- Personalization strategies
- Multi-language support

**Technical Integration:**
- API best practices
- Performance optimization
- Scalability planning
- Third-party integrations

What aspect of your eCommerce strategy would you like to discuss? I can provide specific recommendations based on your business needs.`,
          },
        },
      ],
    };
  }

  getProductManagementGuide() {
    return {
      title: 'Product Management Guide',
      description: 'Complete guide to managing products in the Sun eCommerce Platform',
      sections: [
        {
          title: 'Creating Products',
          content: 'How to create and configure products',
          examples: [
            'Simple products',
            'Configurable products with variants',
            'Bundle products'
          ],
        },
        {
          title: 'Product Attributes',
          content: 'Managing product attributes and values',
          features: [
            'Custom attributes',
            'Attribute groups',
            'Multi-language attribute values',
          ],
        },
        {
          title: 'Categories',
          content: 'Organizing products with categories',
          features: [
            'Hierarchical category structure',
            'Category-specific attributes',
            'SEO-friendly URLs',
          ],
        },
      ],
    };
  }

  getPricingRulesGuide() {
    return {
      title: 'Pricing Rules Guide',
      description: 'Advanced pricing and discount management',
      sections: [
        {
          title: 'Rule Types',
          content: 'Different types of pricing rules available',
          types: [
            'Percentage discounts',
            'Fixed amount discounts',
            'Buy X Get Y offers',
            'Tier pricing',
            'Bulk discounts',
          ],
        },
        {
          title: 'Conditions',
          content: 'Setting up rule conditions',
          examples: [
            'Minimum quantity',
            'Customer groups',
            'Date ranges',
            'Product categories',
          ],
        },
        {
          title: 'Priority and Stacking',
          content: 'How rules are applied and combined',
        },
      ],
    };
  }

  getApiIntegrationGuide() {
    return {
      title: 'API Integration Guide',
      description: 'Best practices for integrating with the Sun eCommerce Platform',
      sections: [
        {
          title: 'SDKs and Libraries',
          content: 'Available SDKs for different programming languages',
        },
        {
          title: 'Webhooks',
          content: 'Real-time notifications for events',
        },
        {
          title: 'Error Handling',
          content: 'How to handle API errors gracefully',
        },
        {
          title: 'Performance Optimization',
          content: 'Tips for optimal API usage',
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    // Log startup information
    if (process.env.SUN_ECOMMERCE_ENABLE_LOGGING !== 'false') {
      console.error('Sun eCommerce MCP Server (JavaScript) started successfully');
      console.error(`Base URL: ${this.apiClient.config.baseUrl}`);
      console.error(`Available tools: ${toolDefinitions.length}`);
      console.error(`Available resources: ${resourceDefinitions.length}`);
      console.error(`Available prompts: ${promptDefinitions.length}`);
    }
  }
}

/**
 * Main function to start the MCP server
 */
async function main() {
  try {
    const server = new SunEcommerceMCPServer();
    await server.run();
  } catch (error) {
    console.error('Failed to start Sun eCommerce MCP Server:', error);
    process.exit(1);
  }
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { SunEcommerceMCPServer };