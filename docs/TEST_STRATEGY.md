# Test strategy

## Objective

Provide a fast release signal for the public portfolio while retaining deeper scheduled coverage for compatibility and non-functional risks.

## Risk model

| Risk | Customer impact | Coverage | Release policy |
| --- | --- | --- | --- |
| Site unavailable or malformed | Critical | HTTP contract and smoke navigation | Block |
| Visitors cannot discover work or make contact | High | Critical-path UI tests | Block |
| Serious accessibility regression | High | axe WCAG rules and keyboard checks | Block |
| Broken image delivery | Medium | Representative asset requests | Block |
| Localization regression | Medium | English-to-Spanish journey | Block |
| Browser-specific defect | Medium | Cross-browser scheduled suite | Investigate before release |
| Performance regression | Medium | Navigation timing budget | Trend and investigate |

## Test pyramid

This repository intentionally focuses on system-level signals because the application is a static site maintained in a separate repository. DOM behavior should be unit-tested at the source when it grows complex. Cross-browser tests here remain few, independent, and user-centered.

## Environments

- Production is the default target.
- A preview or local deployment can be selected with `BASE_URL`.
- Tests never submit the production contact form.

## Exit criteria

- Smoke, accessibility, and contract checks pass in Chromium.
- No focused tests are committed.
- Failure evidence is available in the CI artifact.
- Extended compatibility checks have no unresolved critical or high-risk regression.

## Known limitations

- Automated accessibility tools detect only a subset of accessibility problems; manual keyboard and assistive-technology reviews remain necessary.
- Browser timing is a guardrail, not a synthetic monitoring replacement.
- Only representative media assets are checked on each commit to keep traffic and runtime proportionate.

