# Regex Onboarding Hackathon Assignment

## Overview
This program uses regular expressions to extract structured data (phone numbers, credit card numbers, emails, and hashtags) from raw text. It also performs basic security checks to detect potentially malicious content, e.g., injected `<script>` tags, instead of blindly trusting all input it receives.

## How to Run
1. Make sure [Node.js](https://nodejs.org) is installed (use `node -v` to check).
2. From the project root folder, run: `node src/main.js`
3. The results will show in the console and will also be saved to `output/sample-output.json`.

## Data Types Extracted
- **Phone numbers**: supports Rwandan numbers using either `+250` or local `0` prefixes, with optional spaces or dashes between digit groups, and optional parentheses around the country code.
- **Credit card numbers**: matches 16 digit card numbers in groups of 4 separated by spaces or dashes, as well as numbers with no separators.
- **Email addresses**: general email format and categorises ALU addresses based on the domain:
  - `@alueducation.com` → "official"
  - `@alumni.alueducation.com` → "alumni"
  - `@si.alueducation.com` → "si"
  - anything else → "other"
- **Hashtags**: matches hashtags starting with `#` followed by one or more word characters.

## Security Considerations
- **Malicious content detection**: the program scans for `<script>` tags, `javascript:` URIs, and inline event handlers such as `onclick=`. If it finds any of these, it flags them as security warnings instead of treating them as normal text.
- **Sensitive data masking**: credit card numbers are masked in all output, with only the last 4 digits shown, for example `**** **** **** 1111`. This helps avoid unnecessarily exposing sensitive data in logs or output files.
- **Limitations**: regex validates the *shape* of a credit card number (16 digits, correct grouping) but does not perform full validity checks using something like the Luhn algorithm, which is outside the scope of this regex-based check.

## Sample Input
See `input/raw-text.txt` for a Slack-style message containing a mix of all required data types, plus an intentionally malformed/malicious example for security testing.

## Sample Output
See `output/sample-output.json` for an example of the program's structured output.