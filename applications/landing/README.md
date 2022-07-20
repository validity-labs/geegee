# GeeGee platform landingpage

## Testing

@see https://nextjs.org/docs/testing

- Run `npm run test:unit:update-snap` to update snapshot files on error.

### E2E tests

@see https://dev.to/alexcoding42/how-to-set-up-cypress-in-your-next-js-project-for-integration-test-159j

Since Cypress (our E2E testing framework) is testing a real Next.js application, it requires the Next.js server to be running prior to starting Cypress. We recommend running your tests against your production code to more closely resemble how your application will behave.

Run `npm run build`, then run `npm run test:e2e` afterwards to start Cypress.

For the CI, we can use `test:e2e:headless` to run the tests in headless mode.
