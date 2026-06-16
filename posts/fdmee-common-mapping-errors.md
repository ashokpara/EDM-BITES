---
title: "Common FDMEE Mapping Errors and How to Fix Them"
date: "2026-06-01"
excerpt: "FDMEE mapping issues are one of the top causes of failed data loads. Here are the errors you'll encounter most often and exactly how to resolve them."
---

# Common FDMEE Mapping Errors and How to Fix Them

FDMEE (and its cloud successor, Data Management) sits at the heart of most EPM data pipelines. When mappings break, data loads fail — and tracing the root cause can be frustrating. Here are the errors you'll hit most often and how to fix them.

## 1. "No mapping found for source value"

The most common error. A source value arrived that has no matching mapping rule.

**Fix:**
- Check the Process Details log to identify the exact unmapped value
- Add an explicit mapping, or add a wildcard (`*`) catch-all rule at the bottom of your mapping table
- Consider using a "Like" mapping for patterns (e.g. `1*` to catch all accounts starting with 1)

## 2. Mapping Order Issues

FDMEE evaluates mapping rules top to bottom and stops at the first match. If your explicit rules sit below a wildcard, they'll never be reached.

**Fix:** Always order your mappings — explicit rules first, wildcards last. Use the sequence number column to control order.

## 3. "Target member not found in outline"

The mapping resolved to a target member that doesn't exist in the Essbase or Planning outline.

**Fix:**
- Verify the target member name matches exactly (case-sensitive in some environments)
- Check if the member was recently renamed or deleted in Planning
- Refresh the FDMEE metadata from the target application

## 4. Multi-Dimensional Mappings Not Firing

When you map across multiple dimensions (e.g. Account + Entity combined), the rule only fires when both conditions are true simultaneously.

**Fix:** Double-check that the source values for all dimensions in the condition are present in the same row of source data.

## 5. Import Format Mismatch

Data imports fail silently when the import format doesn't match the actual source file structure — wrong delimiter, wrong column positions, or header rows being treated as data.

**Fix:** Open the source file and compare column positions against your import format definition one by one. Enable "Show All Lines" in Process Details to catch the first failed row.

---

When in doubt, always start with the Process Details log — it tells you exactly which row failed and why.
