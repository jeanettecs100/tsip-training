import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function localApiPlugin(): Plugin {
  let passwords: Record<string, string | undefined> = {};

  return {
    name: 'local-api',
    configResolved({ mode }) {
      const env = loadEnv(mode, process.cwd(), '');
      passwords = {
        contributor: env.CONTRIBUTOR_PASSWORD,
        reviewer: env.REVIEWER_PASSWORD,
      };
    },
    configureServer(server) {
      server.middlewares.use('/api/verify-password', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }
        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { password, training } = JSON.parse(body);
            const expected = passwords[training];
            res.setHeader('Content-Type', 'application/json');
            if (!expected) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid training type' }));
            } else if (password === expected) {
              res.statusCode = 200;
              res.end(JSON.stringify({ valid: true }));
            } else {
              res.statusCode = 401;
              res.end(JSON.stringify({ valid: false }));
            }
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid request' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
