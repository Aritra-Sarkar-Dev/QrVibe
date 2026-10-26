import express from 'express';
import dotenv from 'dotenv';
import uploadHandler from './api/upload.ts';
import statusHandler from './api/status.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parse JSON bodies with 10MB limit for base64 encoded images
app.use(express.json({ limit: '10mb' }));

// Mount API routes with method guards
app.all('/api/status', (req, res) => statusHandler(req, res));
app.all('/api/upload', (req, res) => uploadHandler(req, res));

// Mount Vite middleware in development
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static('dist'));
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
