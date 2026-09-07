# Failure triage

1. Confirm whether the failure reproduces against the same `BASE_URL`.
2. Inspect the Playwright trace before retrying manually; it contains DOM snapshots, actions, console output, and network activity.
3. Classify the failure as product, test, environment, or third-party dependency.
4. For product regressions, record customer impact and the smallest failing journey.
5. For test defects, replace brittle implementation selectors or timing assumptions with observable behavior.
6. Quarantine only with an owner, a reason, and a removal date. Never hide a failing assertion with an unconditional skip.

CI stores the HTML report and failure artifacts for seven days. Retries are diagnostic evidence, not a substitute for fixing instability.

