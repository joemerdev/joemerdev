/**
 * Central site metadata — single source for SEO, Open Graph, Twitter, JSON-LD.
 * Update `siteUrl` when deploying. All tags derive from this file.
 * @see src/routes/+page.svelte:169 — `<svelte:head>` consumes `site`
 */

export const site = {
	// Core
	siteUrl: 'https://joemer.dev',
	title: 'Joemer Dev — Web Developer · Full-Stack · Design Systems · Performance',
	titleShort: 'Joemer Dev',
	description:
		'Systems-minded web developer in Manila. SvelteKit, TypeScript, Next.js & Postgres. 48 projects shipped, 98 avg Lighthouse, token-driven design systems. Available Q3 2026 — remote worldwide.',
	keywords: [
		'Joemer Dev',
		'web developer',
		'full stack developer',
		'frontend engineer',
		'SvelteKit',
		'TypeScript',
		'Next.js',
		'design systems',
		'performance engineering',
		'Manila developer',
		'remote developer',
		'Jamstack',
		'Postgres'
	],
	author: 'Joemer Dev',
	locale: 'en_PH',
	lang: 'en',

	// Brand — mirrors design.md tokens
	themeColor: '#76b900', // {colors.primary}
	backgroundColor: '#ffffff', // {colors.canvas}
	accentColor: '#76b900',

	// Social
	email: 'hello@joemer.dev',
	github: 'https://github.com/joemerdev',
	linkedin: 'https://linkedin.com/in/joemerdev',
	twitter: '@joemerdev',
	twitterHandle: '@joemerdev',

	// Images — replace with real OG image at static/og-image.jpg (1200x630)
	ogImage: 'https://joemer.dev/og-image.jpg',
	ogImageAlt: 'Joemer Dev — Engineering web experiences with systems thinking. 48 projects · 98 Lighthouse · SvelteKit / TypeScript',
	ogImageWidth: '1200',
	ogImageHeight: '630',

	// Verification (replace with real tokens)
	verification: {
		google: '',
		bing: ''
	},

	// Structured data helpers
	person: {
		name: 'Joemer Dev',
		jobTitle: 'Web Developer · Full-Stack Engineer',
		addressLocality: 'Manila',
		addressCountry: 'PH',
		url: 'https://joemer.dev'
	}
} as const;

export type Site = typeof site;
