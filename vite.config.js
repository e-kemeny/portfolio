import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel sets these automatically during production builds — they're
    // undefined during local `npm run dev`, so we fall back to 'local'.
    // This is what powers the deploy-commit footer link: it proves the
    // live page corresponds to a real, inspectable git commit.
    'import.meta.env.VITE_COMMIT_SHA': JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA || 'local'),
    'import.meta.env.VITE_COMMIT_MESSAGE': JSON.stringify(process.env.VERCEL_GIT_COMMIT_MESSAGE || ''),
    'import.meta.env.VITE_REPO_OWNER': JSON.stringify(process.env.VERCEL_GIT_REPO_OWNER || 'e-kemeny'),
    'import.meta.env.VITE_REPO_SLUG': JSON.stringify(process.env.VERCEL_GIT_REPO_SLUG || 'portfolio'),
  },
})
 
