/**
 * Site metadata — Joemer Oclarit
 * Graphic Designer · Web Developer · Promotional Video Editor
 * Navy · White · Black theme (#0f2a44)
 */

export const site = {
	siteUrl: 'https://joemeroclarit.dev',
	title: 'Joemer Oclarit — Graphic Designer · Web Developer · Promo Video Editor',
	titleShort: 'JO',
	description:
		'Joemer Oclarit — Graphic Designer, Web Developer & Promotional Video Editor in Prk-9 Bayugan City, Agusan del Sur. Brand, web & motion that converts — fast, responsive, visually polished.',
	keywords: [
		'Joemer Oclarit',
		'Graphic Designer',
		'Web Developer',
		'Promotional Video Editor',
		'Video Editor',
		'Brand Designer',
		'SvelteKit',
		'Vue.js',
		'Premiere Pro',
		'After Effects',
		'Prk-9 Bayugan City',
		'Agusan del Sur designer'
	],
	author: 'Joemer Oclarit',
	locale: 'en_PH',
	lang: 'en',
	themeColor: '#0f2a44',
	backgroundColor: '#070a12',
	accentColor: '#0f2a44',
	email: 'Oclaritjoemer@gmail.com',
	facebook: 'https://facebook.com/joemer.oclarit',
	facebookLabel: 'Joemer Oclarit',
	github: 'https://github.com/joemerdev',
	githubLabel: 'github.com/joemerdev',
	location: 'Prk-9 Bayugan City, Agusan del Sur, Philippines',
	locationShort: 'Bayugan City, Agusan del Sur',
	ogImage: 'https://joemeroclarit.dev/og-image.jpg',
	ogImageAlt: 'Joemer Oclarit — Graphic Designer · Web Developer · Promo Video Editor. Navy / White / Black. Bayugan City — remote worldwide.',
	ogImageWidth: '1200',
	ogImageHeight: '630',
	twitterHandle: '@joemeroclarit',
	verification: { google: '', bing: '' },
	person: {
		name: 'Joemer Oclarit',
		jobTitle: 'Graphic Designer · Web Developer · Promotional Video Editor',
		addressLocality: 'Bayugan City',
		addressCountry: 'PH',
		url: 'https://joemeroclarit.dev'
	}
} as const;

export type Site = typeof site;
