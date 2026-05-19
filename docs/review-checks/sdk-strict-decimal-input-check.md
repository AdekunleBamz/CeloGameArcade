# SDK Strict Decimal Input Check

- Pass supported decimal strings through the SDK amount parser.
- Confirm values like `1`, `1.`, and `.5` parse as documented.
- Verify scientific notation is rejected before contract calls are prepared.
