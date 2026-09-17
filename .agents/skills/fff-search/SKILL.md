---
name: fff-search
description: Use the FFF MCP tools for fast file and content searching. Use this skill whenever you need to find files, locate symbols, search code, find references, inspect definitions, grep text, or perform multiple searches in a Git repository.
---

# FFF Search

Use the FFF MCP server as the preferred search mechanism for code repositories.

## Rules

For any file search or grep in the current Git-indexed directory, prefer FFF tools over built-in search tools.

Use:

- `find_files` when locating files or directories by name/path.
- `grep` when searching file contents, symbols, definitions, references, strings, or patterns.
- `multi_grep` when multiple independent content searches are needed.

Avoid repeatedly invoking built-in grep, ripgrep, filesystem scans, or equivalent search tools when FFF can answer the query.

## Fallback

Use the built-in Antigravity search tools only when:

- the FFF MCP server is unavailable;
- FFF returns an error;
- the directory is not supported/indexed by FFF;
- the operation cannot reasonably be expressed using the available FFF tools.

When exploring an unfamiliar codebase, use FFF first to locate relevant files and symbols before reading large numbers of files.
