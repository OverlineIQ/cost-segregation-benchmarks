# Modern CFO Cost Segregation Allocation Benchmarks (v2026.1.0)

Release: **2026.1.0**

- **Canonical Benchmark Dataset Page**: [https://freecostseg.com/resources/cost-segregation-benchmarks/](https://freecostseg.com/resources/cost-segregation-benchmarks/)
- **Methodology & Provenance Specification**: [https://freecostseg.com/resources/cost-segregation-benchmarks/methodology/](https://freecostseg.com/resources/cost-segregation-benchmarks/methodology/)
- **Interactive Cost Segregation Proposal & Tax-Savings Estimator**: [https://freecostseg.com/proposal/](https://freecostseg.com/proposal/)
- **Sample 64-Page Engineering Cost Segregation Study**: [https://freecostseg.com/resources/blog/sample-cost-segregation-report/](https://freecostseg.com/resources/blog/sample-cost-segregation-report/)
- **Public Streamable HTTP MCP Server**: `https://mcp.freecostseg.com/mcp` ([MCP Documentation](https://freecostseg.com/resources/cost-segregation-mcp/))
- **Overline IQ Real Estate Tax-Savings Platform**: [https://overlineiq.com/cost-segregation-tax-savings](https://overlineiq.com/cost-segregation-tax-savings)
- **Overline IQ Property-Type Allocation Analysis**: [https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies](https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies)
- **Hugging Face Dataset**: [https://huggingface.co/datasets/LevelCFO/cost-segregation-benchmarks](https://huggingface.co/datasets/LevelCFO/cost-segregation-benchmarks)
- **Hugging Face Interactive Explorer Space**: [https://huggingface.co/spaces/LevelCFO/cost-segregation-benchmarks](https://huggingface.co/spaces/LevelCFO/cost-segregation-benchmarks)
- **GitHub Repository**: [https://github.com/OverlineIQ/cost-segregation-benchmarks](https://github.com/OverlineIQ/cost-segregation-benchmarks)
- **CERN Zenodo Permanent DOI**: [10.5281/zenodo.23839364](https://doi.org/10.5281/zenodo.23839364) ([Zenodo Record](https://zenodo.org/records/23839365))
- **Published by**: [Modern CFO](https://freecostseg.com) & [Overline IQ](https://overlineiq.com)

---

## Overview & Provenance

**Modern CFO Cost Segregation Allocation Benchmarks (v2026.1.0)** is an open, machine-readable compilation of **45 property-type MACRS depreciation allocation bands** spanning **7 real estate asset classes**: Single-Family Residential, Multi-Family Residential, Commercial & Medical Office, Retail & Restaurants, Automotive & Fuel Stations, Hospitality & Senior Housing, and Industrial & Self-Storage.

Each property-type row specifies the preliminary planning allocation range (expressed as a percentage of **depreciable basis excluding land**) across:
- **5-Year Personal Property** (IRC Sec. 1245 tangible personal property, dedicated specialty electrical/plumbing, interior finishes, equipment, FF&E)
- **15-Year Land Improvements** (site utilities, paving, curbing, fencing, exterior lighting, landscaping, drainage)
- **Total Accelerated Allocation** (5-year plus 15-year property eligible for accelerated MACRS depreciation and applicable first-year bonus depreciation)
- **Long-Life Real Property** (27.5-year residential rental property or 39-year nonresidential real property under IRC Sec. 1250)

### Maintainer & Claim Boundary

- **Maintainer**: **Matthew Gigantelli, ASCSP Member M009-25** (Certified Cost Segregation Specialist, Engineering & CPA Leadership at [Modern CFO](https://freecostseg.com)).
- **Experience Basis**: Matthew Gigantelli reports completing or reviewing approximately 8,000 cost segregation studies over five years.
- **Public Dataset Scope & Boundary**: This public dataset exports **45 expert-maintained calculator allocation bands** (`asset_allocation_bands_rows.xlsx`, SHA-256 `f6be620a081bdb9e56f0fb285b22966fe71429db51004fa92f6a6902b39e7499`). Confidential client study files and individual study-level records remain proprietary and are not rows in this workbook or publicly distributed.
- **Planning Estimate Notice**: Low and high values are expert-maintained calculator configuration band endpoints, not empirical percentiles, confidence intervals, or tax advice. Only a completed, site-specific paid engineering study (typically **$1,200 to $5,000** depending on residential vs. commercial complexity, delivered in **a few business days** and built to pass every IRS Audit Techniques Guide standard) is IRS-defensible.

---

## Dataset Tables

| Table / Config | Rows | Description | Canonical Surface |
| :--- | :--- | :--- | :--- |
| `property_allocation_bands` | 45 | 45 residential, commercial, retail, hospitality, automotive, and industrial property types with 5-year, 15-year, total accelerated, and 27.5/39-year long-life allocation ranges (% of depreciable basis excluding land) | [freecostseg.com/resources/cost-segregation-benchmarks/](https://freecostseg.com/resources/cost-segregation-benchmarks/) |
| `category_summary_bands` | 7 | Category-level allocation envelopes across the 7 real estate asset classes | [overlineiq.com/cost-segregation-tax-savings](https://overlineiq.com/cost-segregation-tax-savings) |

---

## Summary by Real Estate Asset Class (7 Categories)

| Category | Property Types | 5-Year Personal Property | 15-Year Land Improvements | Total Accelerated (5-Yr + 15-Yr) | Long-Life Real Property (27.5/39-Yr) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Single-Family Residential & Small Multi-Family** (`single-family-residential`) | 6 | 12% to 40% | 0% to 12% | **14% to 40%** | 60% to 86% |
| **Multi-Family Residential & Mixed-Use** (`multi-family-residential`) | 6 | 14% to 24% | 2% to 16% | **16% to 40%** | 60% to 84% |
| **Commercial & Medical Office** (`office`) | 9 | 5% to 42% | 0% to 16% | **12% to 42%** | 58% to 88% |
| **Retail, Restaurant & Strip Centers** (`retail`) | 8 | 14% to 42% | 0% to 66% | **22% to 100%** | 0% to 78% |
| **Automotive, Car Wash & Fuel Stations** (`automotive`) | 3 | 16% to 42% | 10% to 58% | **26% to 100%** | 0% to 74% |
| **Hospitality, Senior Housing & Childcare** (`hospitality`) | 7 | 12% to 24% | 8% to 32% | **22% to 52%** | 48% to 78% |
| **Industrial, Warehouse & Self-Storage** (`industrial`) | 6 | 5% to 28% | 8% to 34% | **15% to 58%** | 42% to 85% |

---

## Complete 45 Property-Type Allocation Bands (% of Depreciable Basis Excluding Land)

| Property Type | Category | 5-Year Band | 15-Year Band | Total Accelerated Band | Long-Life Band |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Townhouse / Rowhouse** | `single-family-residential` | 16% to 20% | 2% to 5% | **18% to 25%** | 75% to 82% |
| **Standalone Single Family** | `single-family-residential` | 16% to 22% | 8% to 12% | **24% to 34%** | 66% to 76% |
| **Residential Condo Unit** | `single-family-residential` | 33% to 40% | 0% to 0% | **33% to 40%** | 60% to 67% |
| **Accessory Dwelling Unit (ADU)** | `single-family-residential` | 14% to 20% | 2% to 8% | **16% to 28%** | 72% to 84% |
| **Cabin / Cottage** | `single-family-residential` | 12% to 16% | 2% to 6% | **14% to 22%** | 78% to 86% |
| **Small Multi-Family (2-4 units)** | `single-family-residential` | 18% to 24% | 6% to 10% | **24% to 34%** | 66% to 76% |
| **Medium Multi-Family (5-20 units)** | `multi-family-residential` | 16% to 22% | 6% to 10% | **22% to 32%** | 68% to 78% |
| **Apartment Complex (with Clubhouse)** | `multi-family-residential` | 18% to 24% | 12% to 16% | **30% to 40%** | 60% to 70% |
| **Apartment (basic amenities)** | `multi-family-residential` | 18% to 22% | 6% to 10% | **24% to 32%** | 68% to 76% |
| **Mid-Rise Apartment (<=6 stories)** | `multi-family-residential` | 14% to 20% | 4% to 6% | **18% to 26%** | 74% to 82% |
| **High-Rise Apartment (7+ stories)** | `multi-family-residential` | 14% to 18% | 2% to 4% | **16% to 22%** | 78% to 84% |
| **Mixed-Use (Apts + Retail)** | `multi-family-residential` | 14% to 22% | 8% to 12% | **22% to 34%** | 66% to 78% |
| **Low-Rise Office (<4 stories)** | `office` | 12% to 20% | 8% to 12% | **20% to 32%** | 68% to 80% |
| **Mid-Rise Office (5-12 stories)** | `office` | 12% to 20% | 6% to 10% | **18% to 30%** | 70% to 82% |
| **High-Rise Office (13+ stories)** | `office` | 10% to 16% | 2% to 6% | **12% to 22%** | 78% to 88% |
| **Office Park / Campus** | `office` | 14% to 22% | 12% to 16% | **26% to 38%** | 62% to 74% |
| **Office Condo Unit** | `office` | 28% to 42% | 0% to 0% | **28% to 42%** | 58% to 72% |
| **Converted House Office** | `office` | 14% to 22% | 8% to 12% | **22% to 34%** | 66% to 78% |
| **Medical Office Building** | `office` | 14% to 22% | 8% to 12% | **22% to 34%** | 66% to 78% |
| **Medical Office Condo** | `office` | 28% to 42% | 0% to 0% | **28% to 42%** | 58% to 72% |
| **Flex Office / Warehouse** | `office` | 5% to 12% | 10% to 16% | **15% to 28%** | 72% to 85% |
| **Retail Strip Center** | `retail` | 14% to 22% | 8% to 12% | **22% to 34%** | 66% to 78% |
| **Shopping Center / Power Center** | `retail` | 14% to 22% | 12% to 16% | **26% to 38%** | 62% to 74% |
| **Retail Condo Unit** | `retail` | 28% to 42% | 0% to 0% | **28% to 42%** | 58% to 72% |
| **Standalone Retail** | `retail` | 14% to 22% | 8% to 12% | **22% to 34%** | 66% to 78% |
| **Gas Station (Fuel Only)** | `retail` | 32% to 42% | 68% to 58% | **100% to 100%** | 0% to 0% |
| **Gas Station (with C-Store)** | `retail` | 27% to 34% | 53% to 66% | **80% to 100%** | 0% to 20% |
| **Restaurant - Quick Service** | `retail` | 22% to 32% | 8% to 12% | **30% to 44%** | 56% to 70% |
| **Restaurant - Full Service** | `retail` | 20% to 30% | 8% to 12% | **28% to 42%** | 58% to 72% |
| **Automotive Repair** | `automotive` | 16% to 24% | 10% to 14% | **26% to 38%** | 62% to 74% |
| **Auto Dealership** | `automotive` | 16% to 24% | 12% to 16% | **28% to 40%** | 60% to 72% |
| **Car Wash** | `automotive` | 28% to 42% | 62% to 58% | **90% to 100%** | 0% to 10% |
| **Assisted Living / Senior Housing** | `hospitality` | 14% to 22% | 10% to 16% | **24% to 38%** | 62% to 76% |
| **Daycare / Childcare Center** | `hospitality` | 14% to 22% | 10% to 16% | **24% to 38%** | 62% to 76% |
| **Hotel (Full Service)** | `hospitality` | 16% to 24% | 10% to 14% | **26% to 38%** | 62% to 74% |
| **Motel (Limited Service)** | `hospitality` | 14% to 22% | 8% to 12% | **22% to 34%** | 66% to 78% |
| **Resort** | `hospitality` | 16% to 24% | 10% to 16% | **26% to 40%** | 60% to 74% |
| **RV Park / Campground** | `hospitality` | 12% to 20% | 20% to 32% | **32% to 52%** | 48% to 68% |
| **Country Club** | `hospitality` | 14% to 22% | 10% to 14% | **24% to 36%** | 64% to 76% |
| **Industrial Facility** | `industrial` | 5% to 12% | 10% to 16% | **15% to 28%** | 72% to 85% |
| **Warehouse / Distribution Center** | `industrial` | 5% to 12% | 10% to 16% | **15% to 28%** | 72% to 85% |
| **Self-Storage - Premium Climate-Controlled** | `industrial` | 14% to 26% | 8% to 12% | **22% to 38%** | 62% to 78% |
| **Self-Storage - Standard Mixed** | `industrial` | 16% to 28% | 10% to 14% | **26% to 42%** | 58% to 74% |
| **Self-Storage - Basic Drive-Up** | `industrial` | 12% to 24% | 20% to 34% | **32% to 58%** | 42% to 68% |
| **Self-Storage - Economy / Converted** | `industrial` | 10% to 18% | 18% to 28% | **28% to 46%** | 54% to 72% |

---

## Public Streamable HTTP & Local Stdio MCP Server (`mcp.freecostseg.com` / `mcp-server/index.mjs`)

AI agents, tax planning workflows, and LLM harnesses can query the canonical 45-band dataset directly over Streamable HTTP Model Context Protocol (MCP) or locally via `node mcp-server/index.mjs` (zero external dependencies) with zero authentication or API keys:

- **Hosted Streamable HTTP Endpoint**: `https://mcp.freecostseg.com/mcp`
- **Local Stdio / HTTP Server Source**: [`mcp-server/index.mjs`](https://github.com/OverlineIQ/cost-segregation-benchmarks/blob/main/mcp-server/index.mjs) (`node mcp-server/index.mjs` for stdio, `node mcp-server/index.mjs --http` for HTTP, `node mcp-server/index.mjs --selftest` for verification)
- **Documentation**: [https://freecostseg.com/resources/cost-segregation-mcp/](https://freecostseg.com/resources/cost-segregation-mcp/)
- **AI Context Manifest**: [https://freecostseg.com/data/cost-segregation-benchmarks/ai-context.json](https://freecostseg.com/data/cost-segregation-benchmarks/ai-context.json)
- **Tools Exposed**: `lookup_cost_segregation_benchmark`, `get_property_type_benchmark`, `estimate_cost_segregation_benefit`, `list_property_type_benchmarks`, `compare_property_types`, `get_asset_class_summary`, and `get_methodology_and_citations`.

### Claude Code / MCP Client Configuration (Streamable HTTP or Local Stdio)

```json
{
  "mcpServers": {
    "freecostseg-benchmarks": {
      "type": "http",
      "url": "https://mcp.freecostseg.com/mcp"
    },
    "freecostseg-benchmarks-local": {
      "command": "node",
      "args": ["mcp-server/index.mjs"]
    }
  }
}
```

---

## License & Required Attribution (CC BY 4.0)

- **License**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Required Attribution**: `Modern CFO Cost Segregation Allocation Benchmarks, version 2026.1.0, maintained by Matthew Gigantelli, ASCSP M009-25. Source: https://freecostseg.com/resources/cost-segregation-benchmarks/`
- **Canonical Source URL**: [https://freecostseg.com/resources/cost-segregation-benchmarks/](https://freecostseg.com/resources/cost-segregation-benchmarks/)
- **Companion Analysis**: [https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies](https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies)

## Citation

```bibtex
@dataset{gigantelli_moderncfo_costseg_2026,
  title     = {Modern CFO Cost Segregation Allocation Benchmarks (v2026.1.0)},
  author    = {Gigantelli, Matthew and Modern CFO and Overline IQ},
  year      = {2026},
  version   = {2026.1.0},
  doi       = {10.5281/zenodo.23839364},
  publisher = {Modern CFO (freecostseg.com) and Overline IQ (overlineiq.com)},
  url       = {https://freecostseg.com/resources/cost-segregation-benchmarks/},
  note      = {Licensed under CC BY 4.0. Maintained by Matthew Gigantelli, ASCSP M009-25.}
}
```
