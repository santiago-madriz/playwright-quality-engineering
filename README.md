# Playwright Quality Engineering

[![Quality pipeline](https://github.com/santiago-madriz/playwright-quality-engineering/actions/workflows/quality.yml/badge.svg)](https://github.com/santiago-madriz/playwright-quality-engineering/actions/workflows/quality.yml)

![Playwright Quality Engineering](docs/assets/playwright-quality-engineering.png)

A production-style Playwright and TypeScript quality suite for [santiagomadriz.com](https://santiagomadriz.com). It demonstrates risk-based coverage across the browser UI, accessibility, HTTP contracts, responsive behavior, localization, and lightweight performance budgets.

The target is my public photography portfolio, so the suite can exercise a real product without relying on private employer code or data.

## Quality signals

| Layer | What is covered | Gate |
| --- | --- | --- |
| Smoke | Availability, metadata, hero content, primary navigation | Every push and pull request |
| User journeys | Work discovery, language switching, contact-form validation | Every push and pull request |
| Accessibility | Automated WCAG checks with axe plus semantic assertions | Every push and pull request |
| HTTP contract | Status, content type, security headers, asset integrity | Every push and pull request |
| Compatibility | Chromium, Firefox, WebKit, and mobile emulation | Scheduled and manual runs |
| Performance | Browser navigation timing budget | Scheduled and manual runs |

## Run it

Prerequisites: Node.js 20+.

```bash
npm ci
npx playwright install --with-deps
npm test
```

Useful commands:

```bash
npm run test:smoke       # Fast release signal
npm run test:a11y        # Accessibility suite
npm run test:contract    # HTTP and asset checks
npm run test:extended    # Full cross-browser suite
npm run test:ui          # Local Playwright UI
npm run typecheck        # Static TypeScript validation
```

Override the target without changing code:

```bash
BASE_URL=https://preview.example.com npm run test:smoke
```

## Design choices

- User-facing roles and labels are preferred over CSS implementation details.
- The page object contains navigation behavior; assertions remain close to the tests.
- Retries are limited to CI and always retain a trace on retry.
- Tests do not submit the live contact form or mutate production data.
- Performance checks are tagged as extended because network conditions vary.
- CI keeps HTML reports, traces, screenshots, and videos only when they help diagnose a failure.

See [Test strategy](docs/TEST_STRATEGY.md) for the risk model and [Failure triage](docs/FAILURE_TRIAGE.md) for the operational workflow.

## Skills demonstrated

Playwright, TypeScript, cross-browser testing, responsive testing, accessibility, API testing, test architecture, CI/CD with GitHub Actions, release gates, failure diagnostics, and quality documentation.

## Responsible use

This repository tests a site I own. If you adapt it, only automate systems you are authorized to test and keep load low in shared environments.

## License

[MIT](LICENSE)
