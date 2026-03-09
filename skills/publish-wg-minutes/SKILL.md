---
name: publish-wg-minutes
description: Process and publish WebPerfWG meeting minutes from Google Docs zip exports. Read this before handling any WebPerfWG meeting minute zip files.
---

# Publish WG Minutes

## Overview

This skill covers processing WebPerfWG meeting minutes exported as zip files from Google Docs and publishing them to the web-performance repo.

## Working Directory

All work happens in the meetings directory of the web-performance repo:
`/Users/yoavweiss/OS/web-performance/meetings/`

## Input Format

Zip files are named like:
- `WebPerfWG call - December 18th, 2025.zip`
- `WebPerfWG call - October 9th 2025.zip`

Each zip contains:
- An HTML file (e.g., `WebPerfWGcallDecember18th2025.html`)
- An `images/` directory (optional, contains referenced PNGs)

## Process

### 1. Create the target directory

Use the pattern `{year}/{year}-{MM}-{DD}/` with zero-padded month and day:
```
2025/2025-12-18/
2025/2025-10-09/
2026/2026-01-15/
```

### 2. Copy, unzip, and clean up the zip

```bash
cp "WebPerfWG call - December 18th, 2025.zip" 2025/2025-12-18/
cd 2025/2025-12-18 && unzip *.zip && rm *.zip && cd ../..
```

### 3. Rename the HTML to index.html

```bash
mv 2025/2025-12-18/WebPerfWGcallDecember18th2025.html 2025/2025-12-18/index.html
```

### 4. Run cleaner.sh

The `cleaner.sh` script in the meetings directory applies formatting fixes (bold speaker names, remove Google Docs boilerplate, fix diacritics like Nicolás Peña, adjust layout):

```bash
bash cleaner.sh 2025/2025-12-18/index.html
```

### 5. Delete the original zip file

```bash
rm "WebPerfWG call - December 18th, 2025.zip"
```

### 6. Update README.md

Add links under the appropriate year heading in `README.md`, in reverse chronological order. The link format is:

```markdown
* [December 18th](https://w3c.github.io/web-performance/meetings/2025/2025-12-18/index.html)
```

If a new year section is needed, add it above the previous year's heading:

```markdown
# 2026

* [January 15th](https://w3c.github.io/web-performance/meetings/2026/2026-01-15/index.html)

# 2025
```

## Date Parsing

Extract the month, day, and year from the zip filename. Map month names to numbers:
- January=01, February=02, ..., December=12

Strip ordinal suffixes (st, nd, rd, th) from the day and zero-pad to 2 digits.

## Checklist

- [ ] Directory created with `{year}/{year}-{MM}-{DD}/` pattern
- [ ] Zip extracted and removed
- [ ] HTML renamed to `index.html`
- [ ] `cleaner.sh` run on the HTML
- [ ] Original zip deleted from meetings root
- [ ] `README.md` updated with link in correct chronological position
