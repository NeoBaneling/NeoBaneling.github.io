// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import lottie from 'astro-integration-lottie';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), lottie()],

	vite: {
		plugins: [tailwindcss()]
	}
});
