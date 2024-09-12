import { defineConfig } from "cypress";
import { cypressConfig } from '@axe-core/watcher';
import dotenv from 'dotenv';
dotenv.config()

const { AXE_API_KEY } = process.env

export default defineConfig(
  cypressConfig({
    axe: {
      apiKey: AXE_API_KEY,
    },
    defaultCommandTimeout: 10000,
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
    },
  })
);
