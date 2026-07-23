import { defineConfig } from 'orval';

export default defineConfig({
  gateway: {
    input: './swagger.json',
    output: {
      mode: 'split',
      target: 'libs/shared-web/src/lib/api/gateway.service.ts',
      schemas: 'libs/shared-web/src/lib/api/model',
      client: 'angular',
      mock: false,
    },
  },
});
