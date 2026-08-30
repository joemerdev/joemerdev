<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { site } from '$lib/site';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={favicon} />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="msapplication-TileColor" content={site.themeColor} />
</svelte:head>
{@render children()}
