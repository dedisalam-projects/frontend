import { defineConfig } from 'orval';

export default defineConfig({
  gateway: {
    input: './swagger.json',
    output: {
      mode: 'split',
      target: 'libs/shared/data-access/src/lib/api/gateway.service.ts',
      schemas: 'libs/shared/data-access/src/lib/api/model',
      client: 'angular',
      mock: false,
    },
  },
});
