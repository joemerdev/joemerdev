<script lang="ts">
	let mobileOpen = $state(false);
	let activeFilter = $state('All');
	let toast = $state<string | null>(null);

	type Project = {
		title: string;
		category: string;
		tags: string[];
		desc: string;
		image: string;
		year: string;
		stats: string;
		href: string;
	};

	const projects: Project[] = [
		{
			title: 'Atlas Commerce — Headless Storefront',
			category: 'Frontend',
			tags: ['Next.js', 'Edge', 'Design System'],
			desc: 'Rebuilt legacy storefront into composable headless stack. 58% faster LCP, 22% lift in checkout conversion.',
			image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80&auto=format&fit=crop',
			year: '2024 · E-commerce',
			stats: '58% faster LCP',
			href: '#work'
		},
		{
			title: 'Northwind Ops — Real-time Dashboard',
			category: 'Full Stack',
			tags: ['SvelteKit', 'WebSockets', 'Postgres'],
			desc: 'Operations dashboard streaming 12k events/min. Role-based views, offline queue, audit log.',
			image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
			year: '2024 · SaaS',
			stats: '12K ev / min',
			href: '#work'
		},
		{
			title: 'Forma Design System',
			category: 'Design System',
			tags: ['Tokens', 'A11y', 'CI'],
			desc: 'Token-driven system serving 4 products, 30+ components, 100% a11y test coverage. Figma → code single source.',
			image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop',
			year: '2023 · System',
			stats: '30+ components',
			href: '#work'
		},
		{
			title: 'MediSync — Patient Portal',
			category: 'Full Stack',
			tags: ['Remix', 'FHIR', 'WCAG AA'],
			desc: 'HIPAA-aware portal with encounter timeline, document vault, and appointment engine. 4.8/5 patient score.',
			image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop',
			year: '2023 · Healthcare',
			stats: '4.8/5 CSAT',
			href: '#work'
		},
		{
			title: 'Beacon API — Graph Gateway',
			category: 'Full Stack',
			tags: ['GraphQL', 'Rust', 'OpenTelemetry'],
			desc: 'Federated GraphQL gateway consolidating 8 REST services. p95 38ms, contract-tested, trace-propagated.',
			image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80&auto=format&fit=crop',
			year: '2023 · Platform',
			stats: 'p95 38ms',
			href: '#work'
		},
		{
			title: 'Aero Financial — Marketing Site',
			category: 'Frontend',
			tags: ['Astro', 'ISR', 'Motion'],
			desc: 'Content-heavy marketing site at 98 Lighthouse, 0 CLS, editors ship without engineers. 140 static pages.',
			image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
			year: '2022 · Fintech',
			stats: '98 Lighthouse',
			href: '#work'
		}
	];

	const filters = ['All', 'Frontend', 'Full Stack', 'Design System'] as const;
	let filtered = $derived(activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter));

	const capabilities = [
		{
			icon: '◧',
			title: 'Frontend Architecture',
			desc: 'Component systems, state machines, and edge-rendered apps that stay fast at 500k sessions/mo. Svelte, React, Next, Astro.'
		},
		{
			icon: '⬢',
			title: 'Backend Systems',
			desc: 'Type-safe APIs, Postgres + Drizzle, queues and event pipelines. Observability first — logs, traces, alerts wired day one.'
		},
		{
			icon: '⬔',
			title: 'Design Systems',
			desc: 'Tokens → Figma → code. Hairline-sharp specs, 2px-radius discipline, a11y baked in. One accent does all the work.'
		},
		{
			icon: '⬣',
			title: 'Performance Engineering',
			desc: 'Core Web Vitals as budget, not bonus. Bundle tracing, image pipelines, and cache strategy that survives real CDN traffic.'
		}
	];

	const writings = [
		{
			kicker: 'CASE STUDY',
			title: 'Cutting LCP 58% without a rewrite: the Atlas playbook',
			desc: 'How we sharded hydration, streamed the critical path, and made the CDN do the work — with traces to prove it.',
			tag: 'Engineering',
			date: 'Mar 12, 2026 · 8 min',
			img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop'
		},
		{
			kicker: 'FIELD NOTE',
			title: 'Why your design system drifts (and how tokens stop it)',
			desc: 'A CAD-precise contract between design and code. Tokens, hairlines, and the 2px discipline that keeps velocity high.',
			tag: 'Design System',
			date: 'Feb 04, 2026 · 6 min',
			img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop'
		},
		{
			kicker: 'WHITE PAPER',
			title: 'Offline-first ops: queuing writes at 12k events/min',
			desc: 'IndexedDB buffer, optimistic merges, and conflict resolution that operators trust when the network does not.',
			tag: 'Architecture',
			date: 'Jan 18, 2026 · 11 min',
			img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80&auto=format&fit=crop'
		}
	];

	const experience = [
		{
			role: 'Senior Full-Stack Engineer',
			company: 'Haven Labs',
			period: '2022 — Present',
			detail: 'Own storefront + ops surface for 3 products. Led design-system adoption across 12 engineers. Cut incident MTTR 44%.'
		},
		{
			role: 'Frontend Lead',
			company: 'Northwind',
			period: '2020 — 2022',
			detail: 'Shipped real-time dashboard, migrated legacy jQuery to SvelteKit. Mentored 5 engineers; established a11y audit cadence.'
		},
		{
			role: 'Web Developer',
			company: 'Freelance / Agency',
			period: '2018 — 2020',
			detail: 'Built 30+ marketing and product sites. Jamstack early adopter. Learned that constraints create the best systems.'
		}
	];

	function showToast(msg: string) {
		toast = msg;
		setTimeout(() => (toast = null), 3000);
	}

	function handleContact(e: SubmitEvent) {
		e.preventDefault();
		const fd = new FormData(e.target as HTMLFormElement);
		const name = String(fd.get('name') || '').trim();
		if (!name) return;
		showToast(`Message queued — thanks, ${name}. I'll reply within 24h.`);
		(e.target as HTMLFormElement).reset();
	}
</script>

<svelte:head>
	<title>Joemer Dev — Web Developer Portfolio</title>
	<meta name="description" content="Web developer portfolio — engineering web experiences with systems thinking. Full-stack, design systems, performance. Manila · Remote." />
</svelte:head>

<!-- TOAST -->
{#if toast}
	<div class="fixed bottom-4 right-4 z-[100] bg-[var(--colors-ink)] text-[var(--colors-on-dark)] px-4 py-3 rounded-[var(--rounded-sm)] border border-[var(--colors-hairline-strong)] t-body-sm flex items-center gap-3 shadow-[0_0_5px_rgba(0,0,0,0.3)]" role="status" aria-live="polite">
		<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-full animate-pulse"></span>
		{toast}
	</div>
{/if}

<!-- UTILITY BAR -->
<div class="utility-bar hidden md:flex">
	<div class="container-nvidia flex items-center justify-between w-full">
		<div class="flex items-center gap-4">
			<span class="t-caption-xs opacity-80">SYSTEM STATUS — AVAILABLE FOR NEW PROJECTS · Q3 2026</span>
			<span class="w-1 h-1 bg-[var(--colors-primary)] rounded-full"></span>
			<span class="t-caption-sm opacity-70 font-normal normal-case tracking-normal">Response time &lt; 24h</span>
		</div>
		<div class="flex items-center gap-5 t-caption-sm font-normal normal-case tracking-normal">
			<a href="#contact" class="hover:text-white transition-colors opacity-70 hover:opacity-100">Contact</a>
			<span class="opacity-20">|</span>
			<a href="mailto:hello@joemer.dev" class="hover:text-white transition-colors opacity-70 hover:opacity-100">hello@joemer.dev</a>
			<span class="opacity-20">|</span>
			<span class="opacity-70">Manila / Remote · UTC+8</span>
		</div>
	</div>
</div>

<!-- PRIMARY NAV -->
<nav class="primary-nav" class:scrolled={true} aria-label="Primary">
	<div class="container-nvidia flex items-center justify-between w-full gap-6">
		<!-- Wordmark -->
		<a href="/" class="flex items-center gap-3 shrink-0 group" aria-label="Joemer Dev home">
			<div class="w-8 h-8 bg-[var(--colors-primary)] rounded-[var(--rounded-sm)] grid place-items-center text-black font-bold text-[14px] leading-none">JD</div>
			<span class="t-body-strong tracking-[0.04em] uppercase">JOEMER<span class="font-normal opacity-60">.DEV</span></span>
			<span class="hidden sm:inline-flex items-center ml-2 px-2 py-1 bg-[var(--colors-surface-elevated)] border border-[var(--colors-hairline-strong)] rounded-[var(--rounded-sm)] t-caption-xs">Available</span>
		</a>

		<!-- Desktop center -->
		<div class="hidden lg:flex items-center gap-1 t-body-strong text-[14px] tracking-wide">
			{#each [{label:'Work', href:'#work'}, {label:'Capabilities', href:'#capabilities'}, {label:'Experience', href:'#experience'}, {label:'Writing', href:'#writing'}, {label:'Contact', href:'#contact'}] as link}
				<a href={link.href} class="px-4 py-2 hover:text-[var(--colors-primary)] transition-colors">{link.label}</a>
			{/each}
		</div>

		<!-- Right cluster -->
		<div class="flex items-center gap-3">
			<button class="hidden md:inline-flex w-10 h-10 grid place-items-center border border-[var(--colors-hairline-strong)] rounded-[var(--rounded-sm)] hover:bg-white hover:text-black transition-colors" aria-label="Search" onclick={() => showToast('Search — hook up your search overlay here.')}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
			</button>
			<button class="hidden md:inline-flex btn-outline-on-dark !h-10 !py-0 t-button-sm" onclick={() => showToast('CV download — replace with your PDF at static/Joemer_CV.pdf')}>Download CV</button>
			<a href="#contact" class="btn-primary !h-10 !py-0 t-button-sm">Start a project</a>
			<button class="lg:hidden w-10 h-10 grid place-items-center border border-[var(--colors-hairline-strong)] rounded-[var(--rounded-sm)]" aria-label="Menu" aria-expanded={mobileOpen} onclick={() => (mobileOpen = !mobileOpen)}>
				{#if mobileOpen}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile drawer -->
	{#if mobileOpen}
		<div class="absolute top-[64px] left-0 right-0 bg-[var(--colors-surface-dark)] border-t border-[var(--colors-hairline-strong)] lg:hidden">
			<div class="container-nvidia py-6 flex flex-col gap-1">
				{#each [{label:'Work', href:'#work'}, {label:'Capabilities', href:'#capabilities'}, {label:'Experience', href:'#experience'}, {label:'Writing', href:'#writing'}, {label:'Contact', href:'#contact'}] as link}
					<a href={link.href} onclick={() => (mobileOpen = false)} class="py-3 t-body-strong border-b border-[var(--colors-surface-elevated)] last:border-0 hover:text-[var(--colors-primary)]">{link.label}</a>
				{/each}
				<div class="pt-4 flex gap-3">
					<button class="btn-outline-on-dark flex-1 text-center" onclick={() => { mobileOpen=false; showToast('CV download — replace with your PDF at static/Joemer_CV.pdf'); }}>Download CV</button>
					<a href="#contact" onclick={() => (mobileOpen = false)} class="btn-primary flex-1 text-center">Start a project</a>
				</div>
			</div>
		</div>
	{/if}
</nav>

<!-- HERO — hero-card-dark -->
<section class="bg-[var(--colors-surface-dark)] text-[var(--colors-on-dark)] relative overflow-hidden">
	<div class="container-nvidia grid lg:grid-cols-[1.05fr_0.95fr] gap-0 items-stretch">
		<!-- Copy -->
		<div class="py-12 lg:py-[80px] lg:pr-[48px] flex flex-col justify-center gap-6 relative">
			<div class="inline-flex items-center gap-2 self-start">
				<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span>
				<span class="t-caption-md tracking-[0.08em] uppercase opacity-90">Full-Stack · Design Systems · Performance</span>
			</div>
			<h1 class="t-display-xl max-w-[22ch]">
				Engineering <span class="text-[var(--colors-primary)]">web experiences</span> with systems thinking.
			</h1>
			<p class="t-heading-lg text-[var(--colors-on-dark-mute)] max-w-[46ch]">
				I’m Joemer — a web developer in Manila working worldwide. I ship performant, accessible interfaces backed by type-safe APIs and token-driven design. 6+ years from idea → production → scale.
			</p>
			<div class="flex flex-wrap gap-3 pt-2">
				<a href="#work" class="btn-primary btn-primary-lg">View selected work →</a>
				<a href="#contact" class="btn-outline-on-dark btn-primary-lg">Book a 30-min intro</a>
			</div>
			<div class="flex flex-wrap items-center gap-3 pt-4 t-caption-xs">
				<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--colors-surface-elevated)] border border-[var(--colors-hairline-strong)] rounded-[var(--rounded-sm)]">
					<span class="w-1.5 h-1.5 bg-[var(--colors-primary)] rounded-full"></span> 48 PROJECTS SHIPPED
				</span>
				<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--colors-surface-elevated)] border border-[var(--colors-hairline-strong)] rounded-[var(--rounded-sm)]">98 AVG LIGHTHOUSE</span>
				<span class="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--colors-surface-elevated)] border border-[var(--colors-hairline-strong)] rounded-[var(--rounded-sm)]">100% A11Y COVERAGE</span>
			</div>
		</div>

		<!-- Imagery -->
		<div class="relative lg:min-h-[560px] min-h-[360px] bg-[var(--colors-surface-elevated)] border-t lg:border-t-0 lg:border-l border-[var(--colors-hairline-strong)] overflow-hidden">
			<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80&auto=format&fit=crop" alt="Developer workstation with code" class="absolute inset-0 w-full h-full object-cover opacity-70" />
			<div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-black/20 lg:to-black/60"></div>
			<!-- Floating spec card — engineering doc feel -->
			<div class="absolute bottom-4 left-4 right-4 lg:left-6 lg:right-6 bg-[var(--colors-canvas)] text-[var(--colors-ink)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4 flex flex-col gap-3">
				<div class="corner-square tl"></div>
				<div class="flex items-center justify-between">
					<span class="badge-tag !bg-[var(--colors-ink)] !text-white">LIVE SPEC</span>
					<span class="t-caption-xs text-[var(--colors-mute)]">BUILD_2026.08.30</span>
				</div>
				<div class="grid grid-cols-3 gap-3 t-caption-sm">
					<div class="bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-3">
						<div class="t-caption-xs text-[var(--colors-mute)]">STACK</div>
						<div class="t-body-strong text-[13px]">SvelteKit · TS</div>
					</div>
					<div class="bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-3">
						<div class="t-caption-xs text-[var(--colors-mute)]">PAGES</div>
						<div class="t-body-strong text-[13px]">140 ISR</div>
					</div>
					<div class="bg-[var(--colors-primary)] text-[var(--colors-ink)] rounded-[var(--rounded-sm)] p-3">
						<div class="t-caption-xs opacity-70">PERF</div>
						<div class="t-body-strong text-[13px]">p95 38ms</div>
					</div>
				</div>
				<div class="flex items-center gap-2 t-caption-sm text-[var(--colors-mute)]">
					<span class="w-2 h-2 bg-[var(--colors-success-deep)] rounded-full"></span> All systems operational — cached at edge.
				</div>
			</div>
		</div>
	</div>
</section>

<!-- BREADCRUMB BAR — availability strip -->
<div class="breadcrumb-bar">
	<div class="container-nvidia flex items-center gap-3 w-full overflow-hidden">
		<span class="hidden md:inline">Home</span>
		<span class="hidden md:inline text-[var(--colors-mute)]">›</span>
		<span>Portfolio</span>
		<span class="text-[var(--colors-mute)]">›</span>
		<span class="text-[var(--colors-ink)] truncate">Web Developer · Full-Stack · Design Systems</span>
		<span class="hidden lg:inline-flex ml-auto items-center gap-2 t-caption-xs normal-case tracking-normal font-normal">
			<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-full"></span> Open to freelance & full-time — remote worldwide
		</span>
	</div>
</div>

<!-- SUB-NAV STRIP — anchor nav -->
<div class="sub-nav-strip">
	<div class="container-nvidia flex items-center gap-2 w-full">
		<span class="t-caption-xs shrink-0 mr-2 hidden md:inline">JUMP TO:</span>
		<a href="#overview" class="t-button-sm whitespace-nowrap px-4 py-2 hover:bg-[var(--colors-canvas)] hover:border hover:border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] transition-colors">Overview</a>
		<a href="#capabilities" class="t-button-sm whitespace-nowrap px-4 py-2 hover:bg-[var(--colors-canvas)] hover:border hover:border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] transition-colors">Capabilities</a>
		<a href="#work" class="t-button-sm whitespace-nowrap px-4 py-2 bg-[var(--colors-ink)] text-white rounded-[var(--rounded-sm)]">Work — 6 Selected</a>
		<a href="#experience" class="t-button-sm whitespace-nowrap px-4 py-2 hover:bg-[var(--colors-canvas)] hover:border hover:border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] transition-colors">Experience</a>
		<a href="#writing" class="t-button-sm whitespace-nowrap px-4 py-2 hover:bg-[var(--colors-canvas)] hover:border hover:border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] transition-colors">Writing</a>
		<a href="#contact" class="t-button-sm whitespace-nowrap px-4 py-2 hover:bg-[var(--colors-canvas)] hover:border hover:border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] transition-colors">Contact</a>
		<span class="ml-auto hidden lg:inline-flex items-center gap-2 t-caption-sm font-normal normal-case tracking-normal text-[var(--colors-mute)]">
			Scroll · 6 sections · No fluff
		</span>
	</div>
</div>

<main>
	<!-- STATS — callout-stat 4-up -->
	<section id="overview" class="section-block bg-[var(--colors-canvas)]">
		<div class="container-nvidia">
			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
				{#each [{num:'48', label:'Projects shipped — SaaS, commerce, healthcare, fintech.'}, {num:'6+', label:'Years shipping → production → scale. Startup to scale-up.'}, {num:'98', label:'Avg. Lighthouse performance across last 12 launches.'}, {num:'30+', label:'Components in Forma Design System. Single token pipeline.'}] as stat}
					<div class="card-base callout-stat">
						<div class="corner-square tl"></div>
						<div class="num">{stat.num}</div>
						<div class="t-body-sm text-[var(--colors-body)] leading-[1.5]">{stat.label}</div>
						<div class="pt-2 flex items-center gap-2 t-caption-xs text-[var(--colors-mute)]">
							<span class="w-6 h-[2px] bg-[var(--colors-primary)]"></span> VERIFIED
						</div>
					</div>
				{/each}
			</div>

			<!-- Intro block 60/40 -->
			<div class="grid lg:grid-cols-[1.45fr_0.9fr] gap-8 lg:gap-12 pt-10 lg:pt-16 items-start">
				<div>
					<div class="t-caption-md tracking-[0.08em] uppercase text-[var(--colors-mute)] flex items-center gap-2">
						<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> About — Engineering mindset, product instinct
					</div>
					<h2 class="t-display-lg mt-3 max-w-[24ch]">Systems that survive the next 10 hires and the next 10× traffic.</h2>
					<p class="t-heading-lg text-[var(--colors-body)] mt-4 max-w-[58ch]">
						I build web products that feel inevitable to use and boring to maintain — in the best way. Every interface is a system: tokens, contracts, traces. No magic, just rigor.
					</p>
					<div class="t-body-md text-[var(--colors-body)] mt-4 space-y-3 max-w-[62ch]">
						<p>
							From Figma tokens to Postgres rows, I keep the same 2px discipline the NVIDIA system demands. Hairline borders, not shadows. One accent — <span class="font-bold text-[var(--colors-primary)]">#76b900</span> — doing all the work. Weight and scale for hierarchy, never color tinting.
						</p>
						<p>
							Recent focus: streaming architectures, design-system governance, and Core Web Vitals as a budget. If your roadmap says “fast, accessible, and shippable by a growing team,” we should talk.
							<a href="#writing" class="link-inline">Read the field notes →</a>
						</p>
					</div>
					<div class="flex flex-wrap gap-3 mt-6">
						<a href="#work" class="btn-primary">See how it ships</a>
						<a href="#experience" class="btn-outline">How I work →</a>
					</div>
				</div>

				<!-- Side panel — surface-soft comparison -->
				<div class="bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-6 flex flex-col gap-4">
					<div class="corner-square tr"></div>
					<div class="t-caption-md uppercase tracking-[0.06em]">At a glance</div>
					<dl class="grid grid-cols-2 gap-4 t-body-sm">
						<div class="bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4">
							<dt class="t-caption-xs text-[var(--colors-mute)]">BASED</dt>
							<dd class="t-body-strong mt-1">Manila · Remote</dd>
							<dd class="t-caption-sm text-[var(--colors-mute)]">UTC+8 · Overlap EU/US</dd>
						</div>
						<div class="bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4">
							<dt class="t-caption-xs text-[var(--colors-mute)]">WORK TYPE</dt>
							<dd class="t-body-strong mt-1">Full-Stack</dd>
							<dd class="t-caption-sm text-[var(--colors-mute)]">Frontend-heavy</dd>
						</div>
						<div class="bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4">
							<dt class="t-caption-xs text-[var(--colors-mute)]">STACK</dt>
							<dd class="t-body-strong mt-1">TS · SvelteKit</dd>
							<dd class="t-caption-sm text-[var(--colors-mute)]">Next · Postgres</dd>
						</div>
						<div class="bg-[var(--colors-primary)] rounded-[var(--rounded-sm)] p-4 text-[var(--colors-ink)]">
							<dt class="t-caption-xs opacity-70">AVAILABILITY</dt>
							<dd class="t-body-strong mt-1">Q3 2026 — 20–30h/wk</dd>
							<dd class="t-caption-sm opacity-70">Freelance / FT</dd>
						</div>
					</dl>
					<hr class="hr-hairline" />
					<div class="flex items-center gap-3">
						<img src="https://i.pravatar.cc/100?img=15" alt="Joemer avatar" class="w-10 h-10 rounded-full border border-[var(--colors-hairline)] object-cover" />
						<div>
							<div class="t-body-strong text-[14px]">Joemer Dev</div>
							<div class="t-caption-sm text-[var(--colors-mute)]">Web Developer · hello@joemer.dev</div>
						</div>
						<span class="ml-auto w-2.5 h-2.5 bg-[var(--colors-success-deep)] rounded-full border-2 border-white shadow"></span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CAPABILITIES — feature-card 4-up -->
	<section id="capabilities" class="section-block bg-[var(--colors-surface-soft)] border-y border-[var(--colors-hairline)]">
		<div class="container-nvidia">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<div class="t-caption-md uppercase tracking-[0.08em] text-[var(--colors-mute)] flex items-center gap-2">
						<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> Capabilities — 4 disciplines, one system
					</div>
					<h2 class="t-display-lg mt-2">What I do when the brief is “make it real.”</h2>
				</div>
				<p class="t-body-md text-[var(--colors-body)] max-w-[44ch]">No hand-wavy full-stack. Four sharp lanes with receipts — architecture, systems, design language, and performance that holds in production.</p>
			</div>

			<div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mt-8">
				{#each capabilities as cap}
					<div class="card-base feature-card">
						<div class="corner-square tl"></div>
						<div class="icon t-heading-xl font-bold">{cap.icon}</div>
						<h3 class="t-heading-md">{cap.title}</h3>
						<p class="t-body-md text-[var(--colors-body)] mt-2">{cap.desc}</p>
						<div class="mt-4 pt-4 border-t border-[var(--colors-hairline)] flex items-center gap-2 t-caption-xs text-[var(--colors-mute)]">
							<span class="w-6 h-[2px] bg-[var(--colors-primary)]"></span> SPEC GRADE
						</div>
					</div>
				{/each}
			</div>

			<!-- Tooling strip -->
			<div class="mt-8 bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4 lg:p-5 flex flex-wrap items-center gap-3">
				<span class="t-caption-xs">TOOLING:</span>
				{#each ['TypeScript', 'SvelteKit', 'Next.js', 'Astro', 'Tailwind', 'Postgres', 'Drizzle', 'GraphQL', 'WebSockets', 'Playwright', 'Vitest', 'Figma Tokens', 'Storybook', 'OpenTelemetry'] as t}
					<span class="px-2.5 py-1 bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] t-caption-sm font-bold uppercase tracking-wide text-[11px]">{t}</span>
				{/each}
				<span class="ml-auto t-caption-sm text-[var(--colors-mute)] hidden lg:inline">All instrumented. All contracted. No “works on my machine.”</span>
			</div>
		</div>
	</section>

	<!-- SELECTED WORK — product-card grid with pill tabs -->
	<section id="work" class="section-block bg-[var(--colors-canvas)]">
		<div class="container-nvidia">
			<div class="flex flex-wrap items-start justify-between gap-6">
				<div>
					<div class="t-caption-md uppercase tracking-[0.08em] text-[var(--colors-mute)] flex items-center gap-2">
						<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> Selected Work — 6 shipped, 0 hypothetical
					</div>
					<h2 class="t-display-lg mt-2">Explore the builds.</h2>
					<p class="t-body-md text-[var(--colors-body)] mt-3 max-w-[54ch]">Every card is a real shipment — metrics, stack, and role included. Filter by lane or scroll the full grid. Dense, factual, CAD-precise.</p>
				</div>
				<a href="#contact" class="btn-outline hidden md:inline-flex">Request full case study →</a>
			</div>

			<!-- Pill tabs -->
			<div class="mt-6 flex flex-wrap items-center gap-2 p-1 bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] w-fit">
				{#each filters as f}
					<button class="pill-tab" class:active={activeFilter === f} onclick={() => (activeFilter = f)} aria-pressed={activeFilter === f}>{f}</button>
				{/each}
				<span class="hidden md:inline-flex items-center gap-2 ml-3 pl-3 border-l border-[var(--colors-hairline)] t-caption-xs text-[var(--colors-mute)]">
					{filtered.length} RESULTS · 1.25 line-height · 2px radius throughout
				</span>
			</div>

			<!-- Grid: 3-up desktop -> 2 tablet -> 1 mobile per spec -->
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
				{#each filtered as p, i (p.title)}
					<article class="card-base product-card group">
						<div class="corner-square tl"></div>
						<div class="thumb relative">
							<img src={p.image} alt={p.title} loading="lazy" />
							<div class="absolute top-3 left-3 flex items-center gap-2">
								<span class="badge-tag !bg-[var(--colors-ink)] !text-white !border-[var(--colors-ink)]">{p.category}</span>
								<span class="badge-tag !bg-[var(--colors-primary)] !text-[var(--colors-ink)] !border-[var(--colors-primary)]">{p.stats}</span>
							</div>
							<span class="absolute bottom-3 right-3 w-8 h-8 bg-[var(--colors-primary)] rounded-[var(--rounded-sm)] grid place-items-center text-[var(--colors-ink)] font-bold text-[12px]">{String(i + 1).padStart(2, '0')}</span>
						</div>
						<div class="body">
							<div class="t-caption-xs text-[var(--colors-mute)]">{p.year}</div>
							<h3 class="t-card-title leading-tight">{p.title}</h3>
							<p class="t-body-sm text-[var(--colors-body)] line-clamp-3">{p.desc}</p>
							<div class="flex flex-wrap gap-1.5 pt-1">
								{#each p.tags as tag}
									<span class="px-2 py-1 bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] t-caption-xs normal-case tracking-normal">{tag}</span>
								{/each}
							</div>
							<div class="mt-auto pt-4 flex items-center justify-between border-t border-[var(--colors-hairline)]">
								<a href={p.href} class="btn-ghost-link text-[14px]" onclick={(e) => { e.preventDefault(); showToast('Case study — wire this to your detail page.'); }}>
									Read case study <span class="arrow">→</span>
								</a>
								<span class="t-caption-xs text-[var(--colors-mute)] hidden sm:inline">SPECS INCLUDED</span>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-3 t-caption-sm text-[var(--colors-mute)]">
				<span class="w-6 h-[2px] bg-[var(--colors-primary)]"></span>
				Want specs, trade-offs, and traces? Every build ships with a one-page teardown. <a href="#contact" class="link-inline">Ask for it.</a>
			</div>
		</div>
	</section>

	<!-- CTA STRIP DARK -->
	<section class="bg-[var(--colors-surface-dark)] text-[var(--colors-on-dark)] border-y border-[var(--colors-surface-elevated)]">
		<div class="container-nvidia py-8 lg:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
			<div class="flex items-start gap-4">
				<div class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px] mt-2 shrink-0"></div>
				<div>
					<h2 class="t-heading-xl">Have an idea that needs engineering rigor? Let’s build it right.</h2>
					<p class="t-body-md text-[var(--colors-on-dark-mute)] mt-1 max-w-[56ch]">I join as a fractional lead or embedded builder — spec → ship → instrument. Fixed-scope builds and retainer both available.</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-3 shrink-0">
				<a href="#contact" class="btn-primary">Start a project</a>
				<a href="mailto:hello@joemer.dev" class="btn-outline-on-dark">hello@joemer.dev</a>
			</div>
		</div>
	</section>

	<!-- EXPERIENCE — 60/40 split -->
	<section id="experience" class="section-block bg-[var(--colors-canvas)]">
		<div class="container-nvidia grid lg:grid-cols-[1.45fr_0.9fr] gap-8 lg:gap-10">
			<!-- Timeline -->
			<div>
				<div class="t-caption-md uppercase tracking-[0.08em] text-[var(--colors-mute)] flex items-center gap-2">
					<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> Experience — 6 years, 3 chapters
				</div>
				<h2 class="t-display-lg mt-2">Built with teams, not in isolation.</h2>
				<div class="mt-8 space-y-4">
					{#each experience as exp, idx}
						<div class="card-base p-6 flex gap-4">
							<div class="corner-square tl"></div>
							<div class="hidden sm:flex flex-col items-center gap-2 shrink-0">
								<div class="w-10 h-10 rounded-[var(--rounded-sm)] bg-[var(--colors-ink)] text-white grid place-items-center t-body-strong text-[12px]">{String(idx + 1).padStart(2, '0')}</div>
								{#if idx < experience.length - 1}
									<div class="w-[1px] flex-1 bg-[var(--colors-hairline)]"></div>
								{/if}
							</div>
							<div class="flex-1">
								<div class="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 class="t-heading-sm">{exp.role}</h3>
										<div class="t-body-sm text-[var(--colors-mute)]">{exp.company}</div>
									</div>
									<span class="badge-tag">{exp.period}</span>
								</div>
								<p class="t-body-md text-[var(--colors-body)] mt-3">{exp.detail}</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- Cert / education micro-grid -->
				<div class="mt-6 grid sm:grid-cols-3 gap-3">
					<div class="bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4">
						<div class="t-caption-xs text-[var(--colors-mute)]">EDUCATION</div>
						<div class="t-body-strong text-[13px] mt-1">BS Information Technology</div>
						<div class="t-caption-sm text-[var(--colors-mute)]">2014 — 2018</div>
					</div>
					<div class="bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-4">
						<div class="t-caption-xs text-[var(--colors-mute)]">CERTIFICATION</div>
						<div class="t-body-strong text-[13px] mt-1">AWS Cloud Practitioner</div>
						<div class="t-caption-sm text-[var(--colors-mute)]">2023</div>
					</div>
					<div class="bg-[var(--colors-primary)] rounded-[var(--rounded-sm)] p-4">
						<div class="t-caption-xs opacity-70">LANGUAGE</div>
						<div class="t-body-strong text-[13px] mt-1">English · Filipino</div>
						<div class="t-caption-sm opacity-70">Full working proficiency</div>
					</div>
				</div>
			</div>

			<!-- Right rail — skills, services, availability -->
			<div class="space-y-4">
				<div class="card-base p-6">
					<div class="corner-square tr"></div>
					<h3 class="t-heading-sm">Core stack</h3>
					<p class="t-body-sm text-[var(--colors-body)] mt-2">The short list I reach for without thinking. Everything else I learn on contract time, not yours.</p>
					<div class="mt-4 space-y-3">
						{#each [{k:'Frontend', v:'TypeScript, SvelteKit, Next.js, Astro, Tailwind, Radix, Vite', pct:92}, {k:'Backend', v:'Node, Postgres, Drizzle, GraphQL, REST, WebSockets, Rust (edge)', pct:84}, {k:'Platform', v:'Vercel, Cloudflare, AWS, Docker, CI/CD, OTEL, Playwright', pct:88}] as s}
							<div>
								<div class="flex items-baseline justify-between gap-2">
									<span class="t-caption-xs">{s.k}</span>
									<span class="t-caption-xs text-[var(--colors-mute)]">{s.pct}% PRODUCTION USE</span>
								</div>
								<div class="h-[2px] bg-[var(--colors-surface-soft)] border border-[var(--colors-hairline)] rounded-full mt-1 overflow-hidden">
									<div class="h-full bg-[var(--colors-primary)]" style:width={`${s.pct}%`}></div>
								</div>
								<div class="t-caption-sm text-[var(--colors-mute)] mt-1">{s.v}</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="card-base p-6">
					<div class="corner-square tl"></div>
					<h3 class="t-heading-sm">Services</h3>
					<ul class="mt-3 space-y-2.5">
						{#each ['Product build — 0→1 web app (6–10 wks, fixed-scope)', 'Design system — tokens + components + governance', 'Performance sprint — audit → fix → prove with traces', 'Fractional frontend lead — 20–30h/wk, embedded'] as svc}
							<li class="flex gap-3 t-body-sm">
								<span class="w-1.5 h-1.5 bg-[var(--colors-primary)] rounded-[1px] mt-2 shrink-0"></span>
								<span>{svc}</span>
							</li>
						{/each}
					</ul>
					<hr class="hr-hairline my-4" />
					<div class="flex items-center justify-between t-caption-xs">
						<span>STARTING AT</span>
						<span class="t-body-strong">$4.5k / sprint</span>
					</div>
					<a href="#contact" class="btn-primary w-full mt-3 justify-center">Check availability</a>
				</div>

				<div class="bg-[var(--colors-ink)] text-[var(--colors-on-dark)] rounded-[var(--rounded-sm)] p-6 border border-[var(--colors-hairline-strong)]">
					<div class="t-caption-xs opacity-60">TESTIMONIAL — VERIFIED</div>
					<blockquote class="t-body-md mt-3 leading-relaxed text-[var(--colors-on-dark-mute)]">
						“Joemer shipped our dashboard in 7 weeks. We expected a rebuild — we got a system. Onboarding new devs now takes days, not months.”
					</blockquote>
					<div class="mt-4 flex items-center gap-3">
						<img src="https://i.pravatar.cc/100?img=32" alt="Client avatar" class="w-9 h-9 rounded-full border border-[var(--colors-hairline-strong)]" />
						<div>
							<div class="t-body-strong text-[13px]">Mira Santos — CTO, Haven Labs</div>
							<div class="t-caption-sm opacity-60">SaaS · 40-person team</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- WRITING — resource-card 3-up -->
	<section id="writing" class="section-block bg-[var(--colors-surface-soft)] border-y border-[var(--colors-hairline)]">
		<div class="container-nvidia">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<div class="t-caption-md uppercase tracking-[0.08em] text-[var(--colors-mute)] flex items-center gap-2">
						<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> Writing — field notes from the build
					</div>
					<h2 class="t-display-lg mt-2">Latest in engineering.</h2>
				</div>
				<a href="#writing" class="btn-ghost-link hidden md:inline-flex" onclick={(e) => { e.preventDefault(); showToast('Wire this to your blog / Substack.'); }}>View all writing <span class="arrow">→</span></a>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-8">
				{#each writings as post}
					<article class="card-base resource-card group">
						<div class="corner-square tl"></div>
						<div class="thumb">
							<img src={post.img} alt={post.title} loading="lazy" />
						</div>
						<div class="body">
							<div class="flex items-center gap-2">
								<span class="badge-tag">{post.kicker}</span>
								<span class="t-caption-xs text-[var(--colors-mute)]">{post.date}</span>
							</div>
							<h3 class="t-card-title">{post.title}</h3>
							<p class="t-body-sm text-[var(--colors-body)]">{post.desc}</p>
							<div class="mt-auto pt-4 flex items-center justify-between border-t border-[var(--colors-hairline)]">
								<span class="badge-tag !bg-[var(--colors-surface-soft)]">{post.tag}</span>
								<a href="#writing" class="btn-ghost-link text-[14px]" onclick={(e) => { e.preventDefault(); showToast('Article — wire this to your CMS.'); }}>Read <span class="arrow">→</span></a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- CONTACT — 60/40 + form -->
	<section id="contact" class="section-block bg-[var(--colors-canvas)]">
		<div class="container-nvidia grid lg:grid-cols-[1.25fr_0.85fr] gap-8 lg:gap-10 items-start">
			<div>
				<div class="t-caption-md uppercase tracking-[0.08em] text-[var(--colors-mute)] flex items-center gap-2">
					<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> Contact — one form, real reply
				</div>
				<h2 class="t-display-lg mt-2">Let’s scope it in one call.</h2>
				<p class="t-body-md text-[var(--colors-body)] mt-3 max-w-[56ch]">Tell me the goal, the constraint, and the deadline. I’ll reply with a one-page scope, fixed price, and the trade-offs — within 24 hours.</p>

				<form class="mt-8 space-y-4" onsubmit={handleContact} novalidate>
					<div class="grid sm:grid-cols-2 gap-4">
						<label class="flex flex-col gap-1.5">
							<span class="t-caption-xs">FULL NAME *</span>
							<input class="text-input" name="name" placeholder="Ada Lovelace" required autocomplete="name" />
						</label>
						<label class="flex flex-col gap-1.5">
							<span class="t-caption-xs">WORK EMAIL *</span>
							<input class="text-input" name="email" type="email" placeholder="ada@company.com" required autocomplete="email" />
						</label>
					</div>
					<div class="grid sm:grid-cols-2 gap-4">
						<label class="flex flex-col gap-1.5">
							<span class="t-caption-xs">COMPANY / TEAM</span>
							<input class="text-input" name="company" placeholder="Haven Labs · 12 engineers" autocomplete="organization" />
						</label>
						<label class="flex flex-col gap-1.5">
							<span class="t-caption-xs">BUDGET RANGE</span>
							<select name="budget" class="text-input">
								<option value="">Select a range</option>
								<option>$4k – $8k — Sprint</option>
								<option>$8k – $20k — Build</option>
								<option>$20k+ — Retainer / fractional</option>
							</select>
						</label>
					</div>
					<label class="flex flex-col gap-1.5">
						<span class="t-caption-xs">PROJECT BRIEF *</span>
						<textarea class="text-input" name="brief" placeholder="Goal, constraint, deadline, stack. 3–5 sentences is perfect." required rows="5"></textarea>
						<span class="t-caption-sm text-[var(--colors-mute)]">No sales spam. Your brief goes directly to my inbox. NDA available on request.</span>
					</label>
					<div class="flex flex-wrap items-center gap-3 pt-2">
						<button type="submit" class="btn-primary btn-primary-lg">Send brief →</button>
						<span class="t-caption-sm text-[var(--colors-mute)]">Avg. reply 12h · Plain-text scope included</span>
					</div>
				</form>
			</div>

			<!-- Side info -->
			<div class="space-y-4 lg:sticky lg:top-[88px]">
				<div class="card-base p-6 bg-[var(--colors-surface-soft)]">
					<div class="corner-square tr"></div>
					<h3 class="t-heading-sm">Direct channels</h3>
					<div class="mt-4 space-y-3 t-body-sm">
						<a href="mailto:hello@joemer.dev" class="flex items-center justify-between p-3 bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] hover:border-[var(--colors-ink)] transition-colors">
							<span class="flex items-center gap-2"><span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> hello@joemer.dev</span>
							<span class="t-caption-xs">COPY →</span>
						</a>
						<a href="https://github.com" target="_blank" class="flex items-center justify-between p-3 bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] hover:border-[var(--colors-ink)] transition-colors">
							<span>github.com/joemerdev</span>
							<span class="t-caption-xs">EXTERNAL ↗</span>
						</a>
						<a href="https://linkedin.com" target="_blank" class="flex items-center justify-between p-3 bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] hover:border-[var(--colors-ink)] transition-colors">
							<span>LinkedIn — Joemer Dev</span>
							<span class="t-caption-xs">EXTERNAL ↗</span>
						</a>
					</div>
					<hr class="hr-hairline my-4" />
					<div class="grid grid-cols-2 gap-3">
						<div class="bg-[var(--colors-canvas)] border border-[var(--colors-hairline)] rounded-[var(--rounded-sm)] p-3">
							<div class="t-caption-xs text-[var(--colors-mute)]">LOCATION</div>
							<div class="t-body-strong text-[13px] mt-1">Manila, PH</div>
							<div class="t-caption-sm text-[var(--colors-mute)]">Remote worldwide</div>
						</div>
						<div class="bg-[var(--colors-primary)] rounded-[var(--rounded-sm)] p-3">
							<div class="t-caption-xs opacity-70">RESPONSE</div>
							<div class="t-body-strong text-[13px] mt-1">&lt; 24h</div>
							<div class="t-caption-sm opacity-70">Avg. 12h</div>
						</div>
					</div>
				</div>

				<div class="bg-[var(--colors-ink)] text-[var(--colors-on-dark)] rounded-[var(--rounded-sm)] p-6 border border-[var(--colors-hairline-strong)]">
					<div class="t-caption-xs opacity-60">WHAT HAPPENS NEXT</div>
					<ol class="mt-3 space-y-2.5 t-body-sm text-[var(--colors-on-dark-mute)] list-decimal list-inside">
						<li>You send brief → I send 1-page scope + price within 24h.</li>
						<li>30-min call to lock trade-offs and timeline.</li>
						<li>Build in weekly shippable slices — demo every Friday.</li>
					</ol>
					<div class="mt-4 flex items-center gap-2 t-caption-xs opacity-60">
						<span class="w-6 h-[2px] bg-[var(--colors-primary)]"></span> NO DISCOVERY THEATER
					</div>
				</div>

				<div class="flex items-center gap-2 t-caption-xs text-[var(--colors-mute)]">
					<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> PGP available on request · Contracts via HelloSign
				</div>
			</div>
		</div>
	</section>
</main>

<!-- FOOTER — footer-section 6-col -->
<footer class="footer-section">
	<div class="container-nvidia">
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-10">
			<div class="col-span-2 md:col-span-3 lg:col-span-2 pr-6">
				<div class="flex items-center gap-3">
					<div class="w-8 h-8 bg-[var(--colors-primary)] rounded-[var(--rounded-sm)] grid place-items-center text-black font-bold text-[14px]">JD</div>
					<span class="t-body-strong tracking-[0.04em] uppercase text-white">JOEMER<span class="font-normal opacity-60">.DEV</span></span>
				</div>
				<p class="t-body-sm text-[var(--colors-on-dark-mute)] mt-3 max-w-[32ch]">Web developer — engineering web experiences with systems thinking. Design tokens, hairline discipline, one accent doing all the work.</p>
				<div class="flex items-center gap-2 mt-4">
					<a href="https://github.com" aria-label="GitHub" class="w-9 h-9 rounded-full border border-[var(--colors-hairline-strong)] grid place-items-center hover:bg-white hover:text-black transition-colors">⌁</a>
					<a href="https://linkedin.com" aria-label="LinkedIn" class="w-9 h-9 rounded-full border border-[var(--colors-hairline-strong)] grid place-items-center hover:bg-white hover:text-black transition-colors">in</a>
					<a href="mailto:hello@joemer.dev" aria-label="Email" class="w-9 h-9 rounded-full border border-[var(--colors-hairline-strong)] grid place-items-center hover:bg-white hover:text-black transition-colors">@</a>
					<span class="ml-2 t-caption-xs opacity-50">UTC+8 · Manila</span>
				</div>
			</div>

			{#each [{head:'Products', links:[['Selected Work','#work'],['Case Studies','#work'],['Design System','#capabilities'],['Performance Audits','#capabilities'],['OSS','#work']]}, {head:'Capabilities', links:[['Frontend Architecture','#capabilities'],['Backend Systems','#capabilities'],['Design Systems','#capabilities'],['Performance','#capabilities'],['Accessibility','#capabilities']]}, {head:'Resources', links:[['Writing','#writing'],['Field Notes','#writing'],['White Papers','#writing'],['Reading List','#writing'],['Changelog','#writing']]}, {head:'Company', links:[['About','#overview'],['Experience','#experience'],['Colophon','#overview'],['Now','#overview'],['Uses','#overview']]}] as col}
				<div>
					<div class="t-body-strong text-[13px] text-white tracking-wide">{col.head}</div>
					<hr class="hr-hairline-strong mt-3 mb-3 opacity-30" />
					<ul class="space-y-2">
						{#each col.links as [label, href]}
							<li><a href={href} class="t-body-sm text-[13px] text-[var(--colors-on-dark-mute)] hover:text-white transition-colors">{label}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<hr class="hr-hairline-strong opacity-20" />
		<div class="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
			<div class="t-utility-xs text-[var(--colors-mute)]">
				© 2026 JOEMER DEV · BUILT WITH SVELTEKIT + TAILWIND · TOKENS FROM NVIDIA DESIGN.MD · NO TRACKERS · <button class="underline hover:text-white" onclick={() => showToast('Privacy — no cookies, no trackers.')}>PRIVACY</button> · <button class="underline hover:text-white" onclick={() => showToast('Legal — contracts available.')}>LEGAL</button>
			</div>
			<div class="flex items-center gap-2 t-caption-xs text-[var(--colors-mute)]">
				<span class="w-2 h-2 bg-[var(--colors-primary)] rounded-[1px]"></span> SYSTEM VERSION 1.0 · 2PX RADIUS · HAIRLINE ONLY
			</div>
		</div>
	</div>
</footer>

<style>
	:global(html) { scroll-padding-top: 120px; }
</style>
