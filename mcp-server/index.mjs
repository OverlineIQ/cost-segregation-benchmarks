#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROPS = JSON.parse(readFileSync(path.join(ROOT, 'data', 'property_allocation_bands.json'), 'utf8'));
const CATS = JSON.parse(readFileSync(path.join(ROOT, 'data', 'category_summary_bands.json'), 'utf8'));
const CONTEXT = JSON.parse(readFileSync(path.join(ROOT, 'data', 'ai-context.json'), 'utf8'));
const VERSION = "2026.1.0";
const ATTRIBUTION = 'Modern CFO Cost Segregation Allocation Benchmarks, version 2026.1.0, maintained by Matthew Gigantelli, ASCSP M009-25. Source: https://freecostseg.com/resources/cost-segregation-benchmarks/';

const TOOLS = [
  {
    name: 'lookup_cost_segregation_benchmark',
    description: 'Look up MACRS 5-year, 15-year, total accelerated, and 27.5/39-year long-life allocation bands for any of the 45 commercial or residential property types. Source: https://freecostseg.com/resources/cost-segregation-benchmarks/',
    inputSchema: {
      type: 'object',
      properties: {
        property_type: { type: 'string', description: 'Property type name or substring (e.g. Medical Office, Apartment, Self-Storage, Car Wash, Warehouse).' },
      },
      required: ['property_type'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_property_type_benchmark',
    description: 'Retrieve the exact MACRS 5-year, 15-year, accelerated, and long-life allocation band record for a specific property type.',
    inputSchema: {
      type: 'object',
      properties: {
        property_type: { type: 'string', description: 'Property type name or substring.' },
      },
      required: ['property_type'],
      additionalProperties: false,
    },
  },
  {
    name: 'estimate_cost_segregation_benefit',
    description: 'Estimate preliminary 5-year, 15-year, and total accelerated first-year bonus depreciation dollar ranges for a property purchase price and land allocation percentage.',
    inputSchema: {
      type: 'object',
      properties: {
        property_type: { type: 'string', description: 'Property type name or substring.' },
        purchase_price_usd: { type: 'number', minimum: 10000, maximum: 1000000000 },
        land_pct: { type: 'number', minimum: 0, maximum: 90, default: 20 },
        bonus_depreciation_pct: { type: 'number', minimum: 0, maximum: 100, default: 100 },
        marginal_tax_rate_pct: { type: 'number', minimum: 0, maximum: 60, default: 37 },
      },
      required: ['property_type', 'purchase_price_usd'],
      additionalProperties: false,
    },
  },
  {
    name: 'list_property_type_benchmarks',
    description: 'List all 45 property-type MACRS allocation bands, optionally filtered by real estate asset class category.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Optional category slug (single_family, multi_family, commercial, retail, automotive, hospitality, industrial).' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'compare_property_types',
    description: 'Compare MACRS 5-year, 15-year, and total accelerated depreciation bands side-by-side between two property types.',
    inputSchema: {
      type: 'object',
      properties: {
        property_type_a: { type: 'string' },
        property_type_b: { type: 'string' },
      },
      required: ['property_type_a', 'property_type_b'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_asset_class_summary',
    description: 'Return aggregated MACRS 5-year, 15-year, accelerated, and long-life allocation envelopes across all 7 real estate asset classes.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Optional category slug filter.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_methodology_and_citations',
    description: 'Return dataset provenance, CC BY 4.0 attribution requirements, Zenodo DOI metadata, and IRS Audit Techniques Guide planning boundaries.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
];

function findProperty(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return null;
  return (
    PROPS.find((p) => p.property_type.toLowerCase() === q) ||
    PROPS.find((p) => p.property_type.toLowerCase().includes(q)) ||
    null
  );
}

export function callTool(name, args = {}) {
  if (name === 'lookup_cost_segregation_benchmark' || name === 'get_property_type_benchmark') {
    const match = findProperty(args.property_type);
    if (!match) {
      throw new Error(`Unknown property_type: ${args.property_type}. Use list_property_type_benchmarks to view all 45 property types.`);
    }
    return {
      ...match,
      required_attribution: ATTRIBUTION,
      calculator_url: 'https://freecostseg.com/proposal/',
      companion_analysis_url: 'https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies',
    };
  }
  if (name === 'estimate_cost_segregation_benefit') {
    const match = findProperty(args.property_type);
    if (!match) throw new Error(`Unknown property_type: ${args.property_type}`);
    const price = Number(args.purchase_price_usd);
    const landPct = args.land_pct === undefined ? 20 : Number(args.land_pct);
    const bonusPct = args.bonus_depreciation_pct === undefined ? 100 : Number(args.bonus_depreciation_pct);
    const taxRatePct = args.marginal_tax_rate_pct === undefined ? 37 : Number(args.marginal_tax_rate_pct);
    if (!Number.isFinite(price) || price <= 0) throw new Error('purchase_price_usd must be a positive number');
    const depreciableBasis = Math.round(price * (1 - landPct / 100));
    const accLowUsd = Math.round((depreciableBasis * match.accelerated_low_pct) / 100);
    const accHighUsd = Math.round((depreciableBasis * match.accelerated_high_pct) / 100);
    const firstYearDeductionLowUsd = Math.round((accLowUsd * bonusPct) / 100);
    const firstYearDeductionHighUsd = Math.round((accHighUsd * bonusPct) / 100);
    return {
      property_type: match.property_type,
      category: match.category,
      purchase_price_usd: price,
      land_pct: landPct,
      depreciable_basis_usd: depreciableBasis,
      five_year_band_pct: [match.five_year_low_pct, match.five_year_high_pct],
      fifteen_year_band_pct: [match.fifteen_year_low_pct, match.fifteen_year_high_pct],
      accelerated_band_pct: [match.accelerated_low_pct, match.accelerated_high_pct],
      accelerated_allocation_usd: [accLowUsd, accHighUsd],
      bonus_depreciation_pct: bonusPct,
      estimated_first_year_bonus_deduction_usd: [firstYearDeductionLowUsd, firstYearDeductionHighUsd],
      estimated_first_year_tax_savings_usd: [
        Math.round((firstYearDeductionLowUsd * taxRatePct) / 100),
        Math.round((firstYearDeductionHighUsd * taxRatePct) / 100),
      ],
      disclaimer: 'Preliminary planning estimate only, not tax advice or an IRS-defensible engineering study.',
      required_attribution: ATTRIBUTION,
      instant_proposal_url: 'https://freecostseg.com/proposal/',
    };
  }
  if (name === 'list_property_type_benchmarks') {
    const cat = String(args.category || '').trim().toLowerCase();
    const rows = cat ? PROPS.filter((p) => p.category.toLowerCase() === cat) : PROPS;
    return { count: rows.length, rows, required_attribution: ATTRIBUTION };
  }
  if (name === 'compare_property_types') {
    const a = findProperty(args.property_type_a);
    const b = findProperty(args.property_type_b);
    if (!a || !b) throw new Error('Both property_type_a and property_type_b must match one of the 45 canonical property types.');
    return {
      property_a: a,
      property_b: b,
      accelerated_midpoint_diff_pct:
        (a.accelerated_low_pct + a.accelerated_high_pct) / 2 -
        (b.accelerated_low_pct + b.accelerated_high_pct) / 2,
      required_attribution: ATTRIBUTION,
    };
  }
  if (name === 'get_asset_class_summary') {
    const cat = String(args.category || '').trim().toLowerCase();
    const rows = cat ? CATS.filter((c) => c.category.toLowerCase() === cat) : CATS;
    return { count: rows.length, categories: rows, required_attribution: ATTRIBUTION };
  }
  if (name === 'get_methodology_and_citations') {
    return {
      version: VERSION,
      doi: CONTEXT.doi,
      canonical_url: CONTEXT.canonical_url,
      methodology_url: 'https://freecostseg.com/resources/cost-segregation-benchmarks/methodology/',
      mcp_endpoint: 'https://mcp.freecostseg.com/mcp',
      overline_analysis_url: 'https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies',
      provenance: CONTEXT.provenance,
      rights: CONTEXT.rights,
      required_attribution: ATTRIBUTION,
    };
  }
  throw new Error(`Unknown tool: ${name}`);
}

export function handleJsonRpc(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || body.jsonrpc !== '2.0') {
    return { jsonrpc: '2.0', id: body?.id ?? null, error: { code: -32600, message: 'invalid request' } };
  }
  const { id = null, method, params = {} } = body;
  if (method === 'notifications/initialized' || !Object.hasOwn(body, 'id')) return null;
  if (method === 'ping') return { jsonrpc: '2.0', id, result: {} };
  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: params?.protocolVersion || '2025-06-18',
        capabilities: { tools: {} },
        serverInfo: { name: 'cost-segregation-benchmarks-mcp', version: VERSION },
      },
    };
  }
  if (method === 'tools/list') return { jsonrpc: '2.0', id, result: { tools: TOOLS } };
  if (method === 'resources/list') return { jsonrpc: '2.0', id, result: { resources: [] } };
  if (method === 'prompts/list') return { jsonrpc: '2.0', id, result: { prompts: [] } };
  if (method === 'tools/call') {
    try {
      const out = callTool(params?.name, params?.arguments || {});
      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(out) }],
          structuredContent: out,
        },
      };
    } catch (err) {
      return { jsonrpc: '2.0', id, error: { code: -32602, message: err.message } };
    }
  }
  return { jsonrpc: '2.0', id, error: { code: -32601, message: 'unknown method' } };
}

if (process.argv.includes('--selftest')) {
  const initRes = handleJsonRpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
  if (initRes?.result?.serverInfo?.name !== 'cost-segregation-benchmarks-mcp') throw new Error('selftest initialize failed');
  const listRes = handleJsonRpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  if (listRes?.result?.tools?.length !== 7) throw new Error('selftest expected 7 tools');
  const lookupRes = handleJsonRpc({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: { name: 'lookup_cost_segregation_benchmark', arguments: { property_type: 'Medical Office' } },
  });
  if (!lookupRes?.result?.structuredContent?.property_type) throw new Error('selftest lookup failed');
  const estRes = handleJsonRpc({
    jsonrpc: '2.0',
    id: 4,
    method: 'tools/call',
    params: { name: 'estimate_cost_segregation_benefit', arguments: { property_type: 'Warehouse', purchase_price_usd: 2000000 } },
  });
  if (!estRes?.result?.structuredContent?.depreciable_basis_usd) throw new Error('selftest estimate failed');
  console.log('PASS cost-segregation-benchmarks MCP server selftest (7 tools, 45 property types)');
  process.exit(0);
} else if (process.argv.includes('--http')) {
  const port = Number(process.env.PORT || 8789);
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/mcp')) {
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ status: 'ok', name: 'cost-segregation-benchmarks-mcp', version: VERSION, tools: TOOLS.map((t) => t.name) }));
    }
    if (req.method !== 'POST') {
      res.writeHead(405, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      try {
        const reply = handleJsonRpc(JSON.parse(raw));
        if (!reply) {
          res.writeHead(202);
          return res.end();
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(reply));
      } catch {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'invalid json' } }));
      }
    });
  });
  server.listen(port, () => console.error(`Cost Segregation MCP HTTP server listening on :${port}/mcp`));
} else {
  const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  rl.on('line', (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      const reply = handleJsonRpc(JSON.parse(trimmed));
      if (reply) process.stdout.write(`${JSON.stringify(reply)}\n`);
    } catch {
      process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'invalid request' } })}\n`);
    }
  });
}
