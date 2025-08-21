import { createHash } from 'crypto';

globalThis.crypto = {
    ...globalThis.crypto,
    subtle: globalThis.crypto?.subtle,
    getRandomValues: globalThis.crypto?.getRandomValues,
    hash: (alg) => createHash(alg),
};

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
