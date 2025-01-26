#!/bin/bash

# Install npm dependencies
npm install

# Check if Playwright is installed, if not, install it
if ! npx playwright --version &> /dev/null
then
  echo "Playwright is not installed. Installing Playwright..."
  npm install @playwright/test
fi

# Run Playwright end-to-end tests sequentially
npx playwright test

#Make sure to give it execute permissions by running:
# chmod +x scripts/run_e2e_tests.sh
