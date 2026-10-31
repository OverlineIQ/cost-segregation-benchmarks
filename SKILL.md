---
name: cost-segregation-benchmarks
description: Look up 45 property-type MACRS 5-year, 15-year, and 27.5/39-year cost segregation depreciation allocation bands and model 2026 bonus depreciation tax savings using Modern CFO and Overline IQ open benchmarks.
metadata:
  author: Modern CFO & Overline IQ
  source: https://freecostseg.com/resources/cost-segregation-benchmarks/
  license: CC-BY-4.0
---

# Modern CFO Cost Segregation Allocation Benchmarks (v2026.1.0)

Use this skill to retrieve source-backed, reproducible MACRS 5-year personal property, 15-year land improvement, and 27.5/39-year real property allocation bands across 45 commercial and residential property types and 7 real estate asset classes.

## Canonical Sources & Endpoints

- **Canonical Dataset Hub**: [https://freecostseg.com/resources/cost-segregation-benchmarks/](https://freecostseg.com/resources/cost-segregation-benchmarks/)
- **Methodology & Source Hash**: [https://freecostseg.com/resources/cost-segregation-benchmarks/methodology/](https://freecostseg.com/resources/cost-segregation-benchmarks/methodology/)
- **Instant 60-Second Tax-Savings Calculator**: [https://freecostseg.com/proposal/](https://freecostseg.com/proposal/)
- **Streamable HTTP MCP Server**: `https://mcp.freecostseg.com/mcp` ([Setup Guide](https://freecostseg.com/resources/cost-segregation-mcp/))
- **Sample Engineering Report**: [https://freecostseg.com/resources/blog/sample-cost-segregation-report/](https://freecostseg.com/resources/blog/sample-cost-segregation-report/)
- **Overline IQ Real Estate Tax Platform**: [https://overlineiq.com/cost-segregation-tax-savings](https://overlineiq.com/cost-segregation-tax-savings)
- **Overline IQ Property-Type Underwriting Guide**: [https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies](https://overlineiq.com/blog/cost-segregation-benchmarks-8000-studies)
- **CERN Zenodo Permanent DOI**: [10.5281/zenodo.23839365](https://doi.org/10.5281/zenodo.23839364)
- **Hugging Face Dataset**: [https://huggingface.co/datasets/LevelCFO/cost-segregation-benchmarks](https://huggingface.co/datasets/LevelCFO/cost-segregation-benchmarks)
- **Hugging Face Interactive Explorer**: [https://huggingface.co/spaces/LevelCFO/cost-segregation-benchmarks](https://huggingface.co/spaces/LevelCFO/cost-segregation-benchmarks)

## Required Interpretation & Claim Boundaries

1. Every percentage is expressed as a share of **depreciable basis excluding land**.
2. Total accelerated allocation equals the 5-year endpoint plus the 15-year endpoint; long-life real property equals `100% - (5-year + 15-year)`.
3. The 45 rows are expert-maintained calculator planning bands maintained by **Matthew Gigantelli, ASCSP Member M009-25**. Matthew Gigantelli reports completing or reviewing approximately 8,000 cost segregation studies over five years; those confidential study files inform his professional judgment but are not rows in this public dataset and do not establish empirical percentiles or property-type sample counts.
4. For 2026 bonus depreciation under IRC Section 168(k) (Public Law 119-21, sec. 70301), qualified property acquired and placed in service after January 19, 2025 is eligible for 100% first-year bonus depreciation, while property acquired under a binding written contract before January 20, 2025 follows the applicable transition percentage.

## Required Attribution (CC BY 4.0)

`Modern CFO Cost Segregation Allocation Benchmarks, version 2026.1.0, maintained by Matthew Gigantelli, ASCSP M009-25. Source: https://freecostseg.com/resources/cost-segregation-benchmarks/`
