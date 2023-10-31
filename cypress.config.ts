import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "e2e/tests/**/*.spec.{js,jsx,ts,tsx}",
    screenshotOnRunFailure: false,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    supportFile: "e2e/support/e2e.ts",
  },
});
