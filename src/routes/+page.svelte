<script lang="ts">
	import { site } from '$lib/site';
	import profile from '$lib/assets/profile.png';
	import mmHotelImg from '$lib/assets/mmhotelweb.png';
	import mmBuildingImg from '$lib/assets/mmcommercialbuildingweb.png';
	import restobarImg from '$lib/assets/restobarweb.png';
	import mdebtImg from '$lib/assets/mdebtweb.png';

	let mobileOpen = $state(false);
	let toast = $state<string | null>(null);
	let isLight = $state(false);
	let activeFilter = $state<'Web' | 'Graphic' | 'Video'>('Graphic');
	let graphicScrollEl: HTMLDivElement | null = $state(null);
	let selectedItem: Item | null = $state(null);

	type Item = {
		title: string;
		category: 'Web' | 'Graphic' | 'Video';
		desc: string;
		tools: string;
		image: string;
		year?: string;
		url?: string;
	};

	// All graphics — auto-import every .webp in src/lib/Graphics (32 files)
	const graphicModules = import.meta.glob('../lib/Graphics/*.webp', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;
	const graphicItems: Item[] = Object.entries(graphicModules)
		.sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
		.map(([path, url], idx) => {
			const name = path.split('/').pop()?.replace('.webp', '') ?? String(idx + 1);
			return {
				title: `Graphic — Sample ${name}`,
				category: 'Graphic' as const,
				desc: `Actual sample ${name} — brand / social / print. Canva · clean, consistent system.`,
				tools: 'Canva · Photoshop',
				image: url as string,
				year: '2024'
			};
		});

	const webItems: Item[] = [
		{
			title: 'MM Hotel Tandag',
			category: 'Web',
			desc: '“Redefining Comfort the M’M way” — modern design, warm hospitality & thoughtful service. HOME · ROOMS · FEATURES · DINING · FUNCTION HALL. Book Now + Watch Tour.',
			tools: 'HTML · CSS · JS · Gold/Black',
			image: mmHotelImg,
			year: '2024 · Live',
			url: 'https://mmhoteltandag.mmgroupcompanies.com/'
		},
		{
			title: 'MM Commercial Building',
			category: 'Web',
			desc: '“Elevate Your Aspirations” — Commercial + residential with Function Hall, Swimming Pool & Restobar. Sunset rooftop, gallery & tours.',
			tools: 'HTML · CSS · JS · Responsive',
			image: mmBuildingImg,
			year: '2024 · Live',
			url: 'https://mmcommercialbuilding.mmgroupcompanies.com/'
		},
		{
			title: "Michaela's Arabic Restobar",
			category: 'Web',
			desc: '“Food Made with Love, Served with Care” — Prk-3A Karaus, San Francisco Agusan del Sur. Daily 10am–12mn. HOME · MENUS · BOOK NOW · CONTACT.',
			tools: 'HTML · CSS · JS · Brand Gold',
			image: restobarImg,
			year: '2023 · Live',
			url: 'https://michaelasarabicrestobar.mmgroupcompanies.com/'
		},
		{
			title: 'M Debt Corporation',
			category: 'Web',
			desc: '“Client Service Through Commitment & Dedication” — Services, Practices, Testimony, Area Coverage. Mission & Core Values for Caraga debt specialists.',
			tools: 'HTML · CSS · JS · Corporate',
			image: mdebtImg,
			year: '2023 · Live',
			url: 'https://mdebtcorporation.mmgroupcompanies.com/'
		}
	];

	const videoItems: Item[] = [
		{
			title: 'Bayugan Festival — 60s Hype',
			category: 'Video',
			desc: 'Festival hype reel — cuts, kinetic type, sound design. 12k views. Cut in Capcut.',
			tools: 'Capcut · Premiere Pro',
			image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80&auto=format&fit=crop',
			year: '2024'
		},
		{
			title: 'Brand Launch — 45s Promo',
			category: 'Video',
			desc: 'Retail launch — script, VO, color & cut. Looped opening day. Edited in Capcut.',
			tools: 'Capcut · After Effects',
			image: 'https://images.unsplash.com/photo-1536243287037-7f14460f8d8a?w=800&q=80&auto=format&fit=crop',
			year: '2024'
		},
		{
			title: 'Product Promo — 30s Ad',
			category: 'Video',
			desc: 'Kinetic type + SFX — FB ad 4.2% CTR, cut for 9:16 & 16:9. Capcut workflow.',
			tools: 'Capcut · CapCut',
			image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80&auto=format&fit=crop',
			year: '2023'
		}
	];

	const items: Item[] = [...webItems, ...graphicItems, ...videoItems];

	let filtered = $derived(items.filter((i) => i.category === activeFilter));

	function showToast(msg: string) {
		toast = msg;
		setTimeout(() => (toast = null), 2600);
	}
	function toggleTheme() {
		isLight = !isLight;
		if (typeof document !== 'undefined') document.documentElement.classList.toggle('light', isLight);
	}
	let isSending = $state(false);

	async function handleContact(e: SubmitEvent) {
		e.preventDefault();
		if (isSending) return;
		const form = e.target as HTMLFormElement;
		const fd = new FormData(form);
		const name = String(fd.get('name') || '').trim();
		const email = String(fd.get('email') || '').trim();
		const project = String(fd.get('project') || '').trim();
		const message = String(fd.get('message') || '').trim();
		if (!name || !email || !message) {
			showToast('Please fill name, email and message.');
			return;
		}
		isSending = true;
		try {
			// Primary: FormSubmit AJAX — delivers directly to joemer.oclarit@gmail.com (no backend needed)
			// First submission requires one-time verification click sent to that inbox — check spam.
			const res = await fetch('https://formsubmit.co/ajax/joemer.oclarit@gmail.com', { 
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					name,
					email,
					project: project || 'Not specified',
					message,
					_subject: `Portfolio inquiry from ${name} — ${project || 'General'}`,
					_captcha: 'false',
					_template: 'table'
				})
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok || data.success === 'false') throw new Error(data.message || 'Send failed');
			showToast(`Thanks, ${name} — message sent to joemer.oclarit@gmail.com!`);
			form.reset();
		} catch (err) {
			console.error(err);
			// Fallback: open mail client with prefilled mailto so you never lose the lead
			const subject = encodeURIComponent(`Portfolio inquiry from ${name} — ${project || 'General'}`);
			const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${project || 'Not specified'}\n\nMessage:\n${message}\n`);
			window.location.href = `mailto:joemer.oclarit@gmail.com?subject=${subject}&body=${body}`;
			showToast(`Could not auto-send — opening your mail app for ${email}.`);
		} finally {
			isSending = false;
		}
	}
	function openItem(item: Item) {
		selectedItem = item;
		if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
	}
	function closeItem() {
		selectedItem = null;
		if (typeof document !== 'undefined') document.body.style.overflow = '';
	}
	// Scroll reveal — adds .visible when .reveal enters viewport
	$effect(() => {
		if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('visible');
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta name="theme-color" content={site.themeColor} />
	<link rel="canonical" href={site.siteUrl + '/'} />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.person.name,
		jobTitle: site.person.jobTitle,
		email: 'mailto:' + site.email,
		url: site.siteUrl
	})}</script>`}
</svelte:head>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') closeItem(); }} />

{#if toast}
	<div class="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a0f1e] text-white border border-[#1e2f4a] px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
		{toast}
	</div>
{/if}

<!-- HEADER — Minimal -->
<header class="sticky top-0 z-40 backdrop-blur-md bg-[rgba(7,10,18,0.7)] border-b border-[#0f1f38]/60">
	<div class="container-ja h-[56px] flex items-center justify-between">
		<a href="/" class="flex items-center gap-2.5">
			<span class="w-7 h-7 rounded-full bg-[#0f2a44] text-white grid place-items-center text-[10px] font-black border border-white/10">JO</span>
			<span class="hidden sm:block text-[11px] font-bold tracking-[0.16em] text-white">JOEMER OCLARIT</span>
		</a>
		<nav class="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.14em] text-[#64748b]">
			<a href="#work" class="hover:text-white transition-colors">WORK</a>
			<a href="#about" class="hover:text-white transition-colors">ABOUT</a>
			<a href="#tools" class="hover:text-white transition-colors">TOOLS</a>
			<a href="#contact" class="hover:text-white transition-colors">CONTACT</a>
		</nav>
		<div class="flex items-center gap-2">
			<button onclick={toggleTheme} aria-label="Toggle" class="w-8 h-8 rounded-full border border-[#1e2f4a] grid place-items-center text-[#64748b] hover:text-white transition-colors text-xs">
				{isLight ? '☀' : '◐'}
			</button>
			<a href="#contact" class="hidden sm:inline-flex h-8 px-4 rounded-full bg-white text-[#070a12] text-[11px] font-bold tracking-[0.08em] items-center">HIRE ME</a>
			<button class="md:hidden w-8 h-8 grid place-items-center text-white" onclick={() => (mobileOpen = !mobileOpen)} aria-label="Menu">{#if mobileOpen}✕{:else}☰{/if}</button>
		</div>
	</div>
	{#if mobileOpen}
		<div class="md:hidden border-t border-[#0f1f38] bg-[#070a12]">
			<div class="container-ja py-3 flex flex-col text-[13px] font-medium text-[#94a3b8]">
				<a href="#work" onclick={() => (mobileOpen=false)} class="py-3 border-b border-[#0f1f38]">WORK</a>
				<a href="#about" onclick={() => (mobileOpen=false)} class="py-3 border-b border-[#0f1f38]">ABOUT</a>
				<a href="#tools" onclick={() => (mobileOpen=false)} class="py-3 border-b border-[#0f1f38]">TOOLS</a>
				<a href="#contact" onclick={() => (mobileOpen=false)} class="py-3">CONTACT</a>
			</div>
		</div>
	{/if}
</header>

<!-- HERO — Minimal, airy -->
<section class="minimal-section">
	<div class="container-ja reveal visible">
		<div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
			<div class="space-y-6">
				<div class="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-[#64748b]">
					<span class="w-1.5 h-1.5 bg-[#0f2a44] rounded-full"></span> PRK-9 BAYUGAN CITY · AGUSAN DEL SUR · REMOTE
				</div>
				<h1 class="text-[42px] sm:text-[48px] font-black leading-[0.9] tracking-[-0.04em] text-[var(--text)]">
					Joemer<br />Oclarit<span class="text-[var(--border-strong)]">.</span>
				</h1>
				<div class="text-[11px] font-bold tracking-[0.16em] leading-5">
					<span class="text-[var(--text)]">GRAPHIC DESIGNER</span> <span class="text-[#1e2f4a]">—</span> <span class="text-[var(--text)]">WEB DEVELOPER</span> <span class="text-[#1e2f4a]">—</span> <span class="text-[var(--text)]">PROMO VIDEO EDITOR</span>
				</div>
				<p class="max-w-[520px] text-[15px] leading-[1.7] text-[var(--text-muted)] font-light">
					Brand, web & motion — one system. I build posters that stop the scroll, sites that convert, and promos that stick.
				</p>
				<div class="flex flex-wrap gap-3 pt-1">
					<a href="#work" class="h-10 px-6 rounded-full bg-[#0f2a44] text-white text-[12px] font-bold tracking-[0.08em] inline-flex items-center border border-white/10 hover:bg-[#14365e] transition-colors">VIEW WORK</a>
					<a href="mailto:{site.email}" class="h-10 px-6 rounded-full border border-[var(--border-strong)] text-[var(--text)] text-[12px] font-semibold inline-flex items-center hover:border-[var(--text)] transition-colors">{site.email}</a>
				</div>
				<div class="flex items-center gap-4 pt-2 text-[11px] font-medium text-[var(--text-faint)]">
					<a href={site.github} target="_blank" class="hover:text-[var(--text)] underline underline-offset-4 decoration-[#1e2f4a]">github.com/joemerdev →</a>
					<span class="w-1 h-1 bg-[#1e2f4a] rounded-full"></span>
					<a href={site.facebook} target="_blank" class="hover:text-[var(--text)] underline underline-offset-4 decoration-[#1e2f4a]">{site.facebookLabel} →</a>
				</div>
			</div>
			<div class="flex justify-center lg:justify-end">
				<div class="relative">
					<div class="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,_rgba(15,42,68,0.18),_transparent_70%)] blur-xl"></div>
					<img src={profile} alt="Joemer Oclarit" class="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] object-cover rounded-[24px] border border-[#1e2f4a] bg-[#0a0f1e]" />
					<div class="absolute -bottom-3 -left-3 bg-white text-[#070a12] rounded-2xl px-4 py-3 shadow-xl border border-black/5">
						<div class="text-[10px] font-bold tracking-[0.14em] text-[#64748b]">AVAILABLE</div>
						<div class="text-[12px] font-bold -mt-0.5">Freelance & part-time</div>
					</div>
					<div class="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#0f2a44] text-white grid place-items-center text-sm border border-white/10">✦</div>
				</div>
			</div>
		</div>
	</div>
</section>

<hr class="minimal-rule max-w-[1080px] mx-auto" />

<!-- ABOUT — Minimal -->
<section id="about" class="minimal-section">
	<div class="container-ja reveal">
		<div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
			<div>
				<div class="text-[10px] font-bold tracking-[0.18em] text-[#475569]">01 — ABOUT</div>
				<h2 class="mt-3 text-[28px] font-black tracking-tight text-[var(--text)]">Three crafts, one grid.</h2>
			</div>
			<div class="space-y-4 text-[14.5px] leading-[1.75] text-[var(--text-muted)]">
				<p><span class="text-[var(--text)] font-semibold">Joemer Oclarit</span> from Prk-9 Bayugan City — I do brand, web & video end-to-end. From mark to site to cut, one consistent system.</p>
				<p class="text-[13.5px]">BS Computer Science — NEMSU Tagbina. Certified Computer Systems Servicing NCII. Detail-obsessed, motion-aware, type-clean. {webItems.length + graphicItems.length + videoItems.length} pieces here: <span class="text-[var(--text)] font-semibold">{webItems.length} websites · {graphicItems.length} graphics · {videoItems.length} videos.</span> All real, all shipped.</p>
				<div class="grid grid-cols-3 gap-6 pt-6 border-t border-[#0f1f38] mt-6">
					<div><div class="text-[22px] font-black text-[var(--text)] leading-none">{webItems.length + graphicItems.length + videoItems.length}</div><div class="text-[10px] font-bold tracking-[0.14em] text-[#475569] mt-1">PIECES</div></div>
					<div><div class="text-[22px] font-black text-[var(--text)] leading-none">4.9</div><div class="text-[10px] font-bold tracking-[0.14em] text-[#475569] mt-1">RATING</div></div>
					<div><div class="text-[22px] font-black text-[var(--text)] leading-none">60fps</div><div class="text-[10px] font-bold tracking-[0.14em] text-[#475569] mt-1">MOTION</div></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- WORK — Minimal filter + counts -->
<section id="work" class="minimal-section bg-[#0a0f1e]/40 border-y border-[#0f1f38]/60">
	<div class="container-ja reveal">
		<div class="flex flex-wrap items-end justify-between gap-6">
			<div>
				<div class="text-[10px] font-bold tracking-[0.18em] text-[#475569]">02 — SELECTED WORK</div>
				<h2 class="mt-3 text-[28px] font-black tracking-tight text-white">Things I’ve Built</h2>
			</div>
			<div class="flex gap-1 p-1 rounded-full bg-[#070a12] border border-[#0f1f38]">
				{#each [{k:'Web',n:webItems.length},{k:'Graphic',n:graphicItems.length},{k:'Video',n:videoItems.length}] as f}
					<button onclick={() => (activeFilter = f.k as any)} class="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.08em] transition-colors flex items-center gap-1.5 {activeFilter===f.k ? 'bg-white text-[#070a12]' : 'text-[#64748b] hover:text-white'}">
						{f.k} <span class="text-[10px] opacity-60">· {f.n}</span>
					</button>
				{/each}
			</div>
		</div>

		{#if activeFilter === 'Graphic'}
			<!-- Graphic carousel — 3in x 2in (288×192) -->
			<div class="mt-10 relative">
				<div class="flex items-center justify-between mb-3">
					<div class="text-[11px] font-bold tracking-[0.14em] text-[#475569]">GRAPHIC SAMPLES · 3″ × 2″ · DRAG TO EXPLORE</div>
					<div class="hidden sm:flex gap-2">
						<button onclick={() => graphicScrollEl?.scrollBy({left: -320, behavior: 'smooth'})} class="w-8 h-8 rounded-full bg-[#070a12] border border-[#1e2f4a] grid place-items-center text-white hover:bg-white hover:text-[#070a12] transition-colors text-xs">‹</button>
						<button onclick={() => graphicScrollEl?.scrollBy({left: 320, behavior: 'smooth'})} class="w-8 h-8 rounded-full bg-[#070a12] border border-[#1e2f4a] grid place-items-center text-white hover:bg-white hover:text-[#070a12] transition-colors text-xs">›</button>
					</div>
				</div>
				<div bind:this={graphicScrollEl} class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pr-4 scrollbar-none scroll-smooth" style="scrollbar-width:none; -ms-overflow-style:none;">
					{#each filtered as it}
						<button onclick={() => openItem(it)} class="snap-start shrink-0 w-[288px] bg-[#0a0f1e] border border-[#1e2f4a] rounded-2xl overflow-hidden group hover:border-[#93c5fd]/40 hover:scale-[1.01] transition-all text-left">
							<div class="w-[288px] h-[192px] overflow-hidden bg-[#070a12] relative">
								<img src={it.image} alt={it.title} class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" loading="lazy" />
								<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
								<span class="absolute bottom-2 right-2 bg-black/70 backdrop-blur text-white text-[9px] font-bold tracking-[0.08em] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">CLICK TO EXPAND ↗</span>
							</div>
							<div class="p-3.5">
								<div class="text-[13px] font-bold text-white leading-tight line-clamp-1">{it.title}</div>
								<div class="text-[10px] font-bold tracking-[0.12em] text-[#93c5fd] mt-1">{it.tools.split('·')[0].trim().toUpperCase()} · 3″×2″</div>
								<div class="text-[12px] leading-5 text-[#64748b] mt-1 line-clamp-2">{it.desc}</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<div class="mt-10 grid md:grid-cols-2 gap-4">
				{#each filtered as it, i}
				<div class="bg-[#0a0f1e] border border-[#1e2f4a] rounded-2xl overflow-hidden group hover:border-[#243656] transition-colors reveal" style="transition-delay: {i * 70}ms">
					<button onclick={() => openItem(it)} class="relative h-[190px] overflow-hidden bg-[#070a12] block w-full text-left">
						<img src={it.image} alt={it.title} class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
						{#if it.category === 'Web'}
							<span class="absolute top-3 left-3 bg-[rgba(15,42,68,0.85)] backdrop-blur border border-white/15 text-white text-[9px] font-extrabold tracking-[0.12em] px-2.5 py-1 rounded-full flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span> LIVE
							</span>
						{:else}
							<span class="absolute top-3 left-3 bg-[rgba(0,0,0,0.65)] backdrop-blur border border-white/10 text-white text-[9px] font-extrabold tracking-[0.12em] px-2.5 py-1 rounded-full">
								{it.category.toUpperCase()} · {it.year ?? '2024'}
							</span>
						{/if}
						<span class="absolute bottom-3 right-3 bg-white text-[#070a12] text-[9px] font-bold tracking-[0.08em] px-2.5 py-1 rounded-full hidden sm:flex items-center gap-1 group-hover:bg-[#e2e8f0] transition-colors">EXPAND ↗</span>
					</button>
					<div class="p-4">
						<div class="flex items-start justify-between gap-3">
							<button onclick={() => openItem(it)} class="text-[15px] font-bold text-white leading-tight text-left hover:underline underline-offset-4 decoration-white/20">{it.title}</button>
							<button onclick={() => openItem(it)} class="w-7 h-7 rounded-full bg-[#070a12] border border-[#1e2f4a] grid place-items-center text-[#475569] group-hover:text-white group-hover:border-white/20 transition-colors text-[11px] shrink-0">↗</button>
						</div>
						<div class="text-[10.5px] font-extrabold tracking-[0.12em] text-[#93c5fd] mt-1">{it.category === 'Web' ? 'DEVOPS & HOSTING' : it.category.toUpperCase() + ' · ' + it.tools.split('·')[0].trim().toUpperCase()}</div>
						<div class="text-[13px] leading-[1.5] text-[#94a3b8] mt-2 line-clamp-2">{it.desc}</div>
						<div class="mt-3 flex flex-wrap gap-1.5">
							{#each it.tools.split('·').slice(0,2) as t}
								<span class="inline-flex px-2.5 py-1 rounded-full bg-[#070a12] border border-[#1e2f4a] text-[11px] font-medium text-[#cbd5e1]">{t.trim()}</span>
							{/each}
							{#if it.url}
								<button onclick={() => openItem(it)} class="inline-flex px-2.5 py-1 rounded-full bg-[#0f2a44] text-white text-[11px] font-bold border border-white/10 hover:bg-[#14365e] transition-colors">View live →</button>
							{/if}
						</div>
					</div>
				</div>
				{/each}
			</div>
		{/if}

		<div class="mt-8 text-center">
			<a href="#contact" class="inline-flex h-9 px-5 rounded-full border border-[#1e2f4a] text-[11px] font-bold tracking-[0.12em] text-white items-center hover:bg-[#0f2a44] hover:border-[#0f2a44] transition-colors">REQUEST FULL DECK →</a>
		</div>
	</div>
</section>

{#if selectedItem}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
		<button class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick={closeItem} aria-label="Close overlay"></button>
		<div class="relative bg-[#0a0f1e] border border-[#1e2f4a] rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
			<div class="relative bg-[#070a12]">
				<img src={selectedItem.image} alt={selectedItem.title} class="w-full max-h-[66vh] object-contain" />
				<button onclick={closeItem} class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white grid place-items-center hover:bg-white hover:text-black transition-colors text-sm">✕</button>
				<div class="absolute bottom-3 left-3 bg-[#0f2a44] border border-white/15 text-white text-[10px] font-bold tracking-[0.12em] px-3 py-1.5 rounded-full">
					{selectedItem.category.toUpperCase()} · {selectedItem.year ?? '2024'}
				</div>
			</div>
			<div class="p-5 flex flex-col gap-3 overflow-auto">
				<div class="text-[18px] font-bold text-white leading-tight">{selectedItem.title}</div>
				<div class="text-[13px] leading-6 text-[#94a3b8]">{selectedItem.desc}</div>
				<div class="flex flex-wrap items-center gap-2 pt-1">
					<span class="inline-flex px-3 py-1.5 rounded-full bg-[#070a12] border border-[#1e2f4a] text-[11px] font-medium text-[#cbd5e1]">{selectedItem.tools}</span>
					{#if selectedItem.url}
						<a href={selectedItem.url} target="_blank" rel="noopener noreferrer" class="ml-auto inline-flex h-8 px-4 rounded-full bg-white text-[#070a12] text-[11px] font-bold hover:bg-[#e2e8f0] transition-colors items-center gap-1">Visit live site ↗</a>
					{/if}
					<button onclick={closeItem} class="h-8 px-4 rounded-full border border-[#1e2f4a] text-white text-[11px] font-bold hover:bg-white hover:text-[#070a12] transition-colors">CLOSE</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- TOOLS — Minimal -->
<section id="tools" class="minimal-section bg-[#0a0f1e]/50 border-y border-[#0f1f38]/60">
	<div class="container-ja reveal">
		<div class="flex items-end justify-between gap-6 flex-wrap">
			<div>
				<div class="text-[10px] font-bold tracking-[0.18em] text-[#475569]">03 — TOOLS</div>
				<h2 class="mt-3 text-[28px] font-black tracking-tight text-white">What I build with.</h2>
				<p class="mt-2 text-[13.5px] leading-6 text-[#94a3b8] max-w-[520px]">Lean stack — one tool per job, mastered. No bloat, no noise.</p>
			</div>
			<div class="text-[11px] font-bold tracking-[0.12em] text-[#475569] hidden sm:block">CAPCUT · CANVA · SVELTEKIT · TAILWIND · BOOTSTRAP · GIT/GITHUB · VERCEL</div>
		</div>

		<div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Video Editing -->
			<div class="bg-[#070a12] border border-[#1e2f4a] rounded-2xl p-5">
				<div class="w-9 h-9 rounded-xl bg-[#0f2a44] border border-white/10 grid place-items-center text-white text-[13px]">▶</div>
				<div class="mt-3 text-[11px] font-extrabold tracking-[0.14em] text-[#93c5fd]">VIDEO EDITING</div>
				<div class="mt-1 text-[15px] font-bold text-white">Capcut</div>
				<div class="mt-2 text-[12.5px] leading-5 text-[#94a3b8]">Promos, reels & highlights — fast cuts, kinetic type & color in Capcut. 60fps, 9:16 & 16:9.</div>
				<div class="mt-3 flex flex-wrap gap-1.5">
					<span class="px-2.5 py-1 rounded-full bg-[#0f2a44] text-white text-[11px] font-semibold border border-white/10">Capcut</span>
					<span class="px-2.5 py-1 rounded-full bg-[#0a0f1e] border border-[#1e2f4a] text-[#cbd5e1] text-[11px]">Promo Video</span>
				</div>
			</div>
			<!-- Graphic Design -->
			<div class="bg-[#070a12] border border-[#1e2f4a] rounded-2xl p-5">
				<div class="w-9 h-9 rounded-xl bg-white text-[#070a12] grid place-items-center text-[13px] font-black">C</div>
				<div class="mt-3 text-[11px] font-extrabold tracking-[0.14em] text-[#475569]">GRAPHIC DESIGN</div>
				<div class="mt-1 text-[15px] font-bold text-white">Canva</div>
				<div class="mt-2 text-[12.5px] leading-5 text-[#94a3b8]">Brand, social & print — clean systems, social packs & decks.</div>
				<div class="mt-3 flex flex-wrap gap-1.5">
					<span class="px-2.5 py-1 rounded-full bg-white text-[#070a12] text-[11px] font-bold">Canva</span>
					<span class="px-2.5 py-1 rounded-full bg-[#0a0f1e] border border-[#1e2f4a] text-[#cbd5e1] text-[11px]">Brand · Social</span>
				</div>
			</div>
			<!-- Frontend -->
			<div class="bg-[#070a12] border border-[#1e2f4a] rounded-2xl p-5">
				<div class="w-9 h-9 rounded-xl bg-[#111827] border border-[#1e2f4a] grid place-items-center text-white text-[11px] font-black">〈〉</div>
				<div class="mt-3 text-[11px] font-extrabold tracking-[0.14em] text-white">WEB — FRONTEND</div>
				<div class="mt-1 text-[15px] font-bold text-white leading-tight">SvelteKit · TailwindCSS · Bootstrap 5</div>
				<div class="mt-2 text-[12.5px] leading-5 text-[#94a3b8]">Fast, responsive, accessible — design system to live site. 60fps motion.</div>
				<div class="mt-3 flex flex-wrap gap-1.5">
					<span class="px-2.5 py-1 rounded-full bg-[#0f2a44] text-white text-[11px] font-semibold border border-white/10">SvelteKit</span>
					<span class="px-2.5 py-1 rounded-full bg-white text-[#070a12] text-[11px] font-bold">TailwindCSS</span>
					<span class="px-2.5 py-1 rounded-full bg-[#0a0f1e] border border-[#1e2f4a] text-[#93c5fd] text-[11px]">Bootstrap 5</span>
				</div>
			</div>
			<!-- DevOps -->
			<div class="bg-[#0f2a44] border border-[#0f2a44] rounded-2xl p-5 text-white">
				<div class="w-9 h-9 rounded-xl bg-white text-[#0f2a44] grid place-items-center text-[11px]">⬢</div>
				<div class="mt-3 text-[11px] font-extrabold tracking-[0.14em] text-[#93c5fd]">TOOLS & DEVOPS</div>
				<div class="mt-1 text-[15px] font-bold leading-tight">Git & GitHub</div>
				<div class="text-[11px] font-bold tracking-[0.12em] text-[#93c5fd] -mt-0.5">Advanced</div>
				<div class="mt-2 text-[12.5px] leading-5 text-white/70">Branches, reviews & deploys — clean history, tested, Vercel shipping.</div>
				<div class="mt-3 flex flex-wrap gap-1.5">
					<span class="px-2.5 py-1 rounded-full bg-white text-[#0f2a44] text-[11px] font-bold">GitHub — Advanced</span>
					<span class="px-2.5 py-1 rounded-full bg-[#081525] text-white text-[11px] border border-white/10">Vercel</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CONTACT — Minimal -->
<section id="contact" class="minimal-section">
	<div class="container-ja reveal">
		<div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
			<div>
				<div class="text-[10px] font-bold tracking-[0.18em] text-[#475569]">04 — CONTACT</div>
				<h2 class="mt-3 text-[28px] font-black tracking-tight text-[var(--text)]">Let’s make it.</h2>
				<p class="mt-2 text-[14px] leading-6 text-[var(--text-muted)]">Brand, site or promo — tell me the goal. I reply in 24h with scope + price.</p>
				<div class="mt-8 space-y-0 divide-y divide-[#0f1f38] border-y border-[#0f1f38]">
					<a href="mailto:{site.email}" class="flex justify-between py-4 group">
						<span class="text-[11px] font-bold tracking-[0.12em] text-[#475569]">EMAIL</span>
						<span class="text-[13px] font-medium text-[var(--text)] group-hover:underline underline-offset-4">{site.email}</span>
					</a>
					<a href={site.facebook} target="_blank" class="flex justify-between py-4 group">
						<span class="text-[11px] font-bold tracking-[0.12em] text-[#475569]">FACEBOOK</span>
						<span class="text-[13px] font-medium text-[var(--text)] group-hover:underline">{site.facebookLabel}</span>
					</a>
					<a href={site.github} target="_blank" class="flex justify-between py-4 group">
						<span class="text-[11px] font-bold tracking-[0.12em] text-[#475569]">GITHUB</span>
						<span class="text-[13px] font-medium text-[var(--text)] group-hover:underline">{site.githubLabel}</span>
					</a>
					<div class="flex justify-between py-4">
						<span class="text-[11px] font-bold tracking-[0.12em] text-[#475569]">LOCATION</span>
						<span class="text-[13px] font-medium text-[var(--text)] text-right">{site.location}</span>
					</div>
				</div>
			</div>

			<form class="space-y-4" onsubmit={handleContact} novalidate>
				<div class="grid sm:grid-cols-2 gap-4">
					<label class="space-y-2">
						<span class="text-[10px] font-bold tracking-[0.14em] text-[var(--text-faint)]">NAME *</span>
						<input name="name" required placeholder="Your name" class="w-full h-[44px] bg-transparent border-b border-[var(--border-strong)] px-0 text-[14px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--text)] transition-colors" />
					</label>
					<label class="space-y-2">
						<span class="text-[10px] font-bold tracking-[0.14em] text-[var(--text-faint)]">EMAIL *</span>
						<input name="email" type="email" required placeholder="you@company.com" class="w-full h-[44px] bg-transparent border-b border-[var(--border-strong)] px-0 text-[14px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--text)] transition-colors" />
					</label>
				</div>
				<label class="space-y-2 block">
					<span class="text-[10px] font-bold tracking-[0.14em] text-[var(--text-faint)]">PROJECT</span>
					<select name="project" class="w-full h-[44px] bg-transparent border-b border-[var(--border-strong)] px-0 text-[14px] text-[var(--text)] focus:outline-none focus:border-[var(--text)] transition-colors">
						<option value="" class="bg-[var(--bg)]">Brand / Website / Promo Video</option>
						<option class="bg-[var(--bg)]">Graphic Design</option>
						<option class="bg-[var(--bg)]">Website Development</option>
						<option class="bg-[var(--bg)]">Promo Video Editing</option>
						<option class="bg-[var(--bg)]">All three</option>
					</select>
				</label>
				<label class="space-y-2 block">
					<span class="text-[10px] font-bold tracking-[0.14em] text-[var(--text-faint)]">MESSAGE *</span>
					<textarea name="message" required rows="4" placeholder="Goal, deadline, reference links..." class="w-full bg-transparent border border-[var(--border-strong)] rounded-2xl p-4 text-[14px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-[var(--text)] transition-colors resize-none"></textarea>
				</label>
				<button type="submit" disabled={isSending} class="w-full h-11 rounded-full bg-[var(--text)] text-[var(--bg)] text-[12px] font-bold tracking-[0.08em] hover:opacity-90 transition-colors border border-[var(--border-strong)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
					{#if isSending}<span class="w-3.5 h-3.5 border-2 border-[var(--bg)]/30 border-t-[var(--bg)] rounded-full animate-spin"></span>{/if}
					{isSending ? 'SENDING…' : 'SEND MESSAGE'}
				</button>
				
			</form>
		</div>
	</div>
</section>

<footer class="border-t border-[#0f1f38]/60 py-6">
	<div class="container-ja flex justify-center sm:justify-start text-[10px] font-bold tracking-[0.14em] text-[#334155]">
		<span>© 2026 JOEMER OCLARIT · PRK-9 BAYUGAN CITY</span>
	</div>
</footer>

<style>
	:global(html) { scroll-padding-top: 72px; }
</style>
