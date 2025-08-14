/// <reference types="astro-integration-lottie/env" />

interface Window {
	particlesInit(Engine): Promise<void>;
	particlesLoaded(Container): void;
}
