import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'jspdf-autotable': path.resolve('node_modules/jspdf-autotable'),
    },
  },
});
