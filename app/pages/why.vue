<script setup lang="ts">
useSeoMeta({
  title: "Why FTWA — A Manifesto",
  description: "Electron is bloated. PWA is half-finished. FTWA is the third way: a featherweight, native-feeling shortcut to any website.",
});

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
    },
  ],
});

onMounted(() => {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-revealed"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
  els.forEach(el => io.observe(el));
});

const ftwaStack = [
  { label: "Disk", value: "≈ 1.5 KB", note: "a shortcut, nothing more" },
  { label: "RAM", value: "0 MB", note: "uses the browser already open" },
  { label: "Cold start", value: "≈ 50 ms", note: "instant, in the active session" },
  { label: "Updates", value: "Automatic", note: "as fresh as the website itself" },
];

const electronStack = [
  { label: "Disk", value: "150–300 MB", note: "every app ships its own Chromium" },
  { label: "RAM", value: "150–500 MB", note: "Slack, Discord, Teams, all at once" },
  { label: "Cold start", value: "2–5 s", note: "boot a browser engine to read a tab" },
  { label: "Updates", value: "Self-managed", note: "yet another updater in your tray" },
];

const pwaStack = [
  { label: "Process", value: "+1 Chromium", note: "a separate Chromium-app process per install" },
  { label: "RAM", value: "100–200 MB", note: "an isolated renderer per installed app" },
  { label: "Session", value: "Detached", note: "no shared cookies, extensions or password manager" },
  { label: "Opt-in", value: "Required", note: "manifest + service-worker, set by the developer" },
];
</script>

<template>
  <main class="why-page relative isolate overflow-hidden bg-[#fbf9f4] text-stone-900 dark:bg-[#0e0a14] dark:text-stone-100">
    <AppStickyHeader title="Manifesto" />
    <section class="relative isolate">
      <div
        aria-hidden="true"
        class="absolute -right-1/3 top-0 -z-10 h-[140%] w-4/5 skew-x-[-18deg] bg-gradient-to-b from-primary-500/15 via-primary-500/5 to-transparent dark:from-primary-400/15 dark:via-primary-400/5"
      />

      <div class="mx-auto max-w-7xl px-6 pt-10 sm:pt-16 lg:px-10 lg:pt-24">
        <div class="grid grid-cols-12 items-end gap-x-6 pb-16 pt-12 sm:pt-20 lg:pb-32 lg:pt-28">
          <div
            class="col-span-12 mb-4 lg:col-span-2 lg:mb-0"
            data-reveal
            style="--reveal-delay: 0ms"
          >
            <span class="serif block text-[8rem] italic leading-[0.8] text-primary-600 dark:text-primary-400 sm:text-[10rem] lg:text-[12rem]">
              §
            </span>
          </div>
          <div class="col-span-12 lg:col-span-10">
            <h1
              class="font-title font-black uppercase italic tracking-tight"
              data-reveal
              style="--reveal-delay: 80ms"
            >
              <span class="block text-[clamp(2.75rem,9vw,9rem)] leading-[0.86]">Web apps</span>
              <span class="block text-[clamp(2.75rem,9vw,9rem)] leading-[0.86]">
                deserve to live
              </span>
              <span class="serif inline-block translate-y-2 text-[clamp(3.5rem,12vw,12rem)] font-normal not-italic leading-[0.8] text-primary-600 dark:text-primary-400">
                <em class="italic">free.</em>
              </span>
            </h1>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-stone-900/15 pt-10 dark:border-white/15">
          <div
            class="col-span-12 lg:col-span-5"
            data-reveal
            style="--reveal-delay: 160ms"
          >
            <p class="serif text-2xl italic leading-snug text-stone-700 dark:text-stone-300 sm:text-3xl">
              Three ways to put a website on your desktop. Two of them are wrong.
            </p>
          </div>
          <div
            class="col-span-12 space-y-4 text-base leading-relaxed text-stone-700 dark:text-stone-300 sm:text-lg lg:col-span-6 lg:col-start-7"
            data-reveal
            style="--reveal-delay: 220ms"
          >
            <p>
              <strong class="font-semibold text-stone-900 dark:text-white">Electron</strong> ships
              an entire browser engine inside every single app. The next app does it again.
              And the next. Your laptop pays the bill.
            </p>
            <p>
              <strong class="font-semibold text-stone-900 dark:text-white">PWA</strong> is a
              beautiful idea trapped in a vendor turf war — gated by Safari, abandoned by
              Firefox desktop, and only available on websites that bothered to opt in.
            </p>
            <p>
              <strong class="font-semibold text-primary-600 dark:text-primary-400">FTWA</strong>
              is the third way. A native shortcut to the Chromium-based or Firefox browser
              you already trust. Featherweight. Honest. Yours.
            </p>
            <div class="flex flex-wrap gap-3 pt-4">
              <UButton
                size="xl"
                :ui="{ rounded: 'rounded-full' }"
                label="Free a web app"
                trailing-icon="heroicons:arrow-right"
                to="/#create-web-app"
              />
              <UButton
                size="xl"
                :ui="{ rounded: 'rounded-full' }"
                variant="outline"
                color="gray"
                label="Skip to the verdict"
                to="#verdict"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
      <div
        class="mb-12 grid grid-cols-12 items-baseline gap-x-6 border-b border-stone-900/15 pb-4 dark:border-white/15"
        data-reveal
      >
        <span class="serif col-span-12 text-3xl italic text-stone-500 sm:col-span-2 sm:text-4xl">Nº 01</span>
        <h2 class="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-stone-700 dark:text-stone-300 sm:col-span-10">
          Pick your weapon
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article
          class="contender contender--bad col-span-1 lg:col-span-4"
          data-reveal
          style="--reveal-delay: 0ms"
        >
          <header class="mb-6 flex items-baseline justify-between">
            <span class="font-mono text-[0.7rem] uppercase tracking-[0.3em] opacity-70">Option A</span>
            <span class="font-mono text-[0.7rem] tracking-widest text-red-600 dark:text-red-400">FAIL</span>
          </header>
          <h3 class="font-title text-5xl font-black uppercase italic leading-none text-stone-400 line-through decoration-red-500 decoration-[3px] dark:text-stone-600">
            Electron
          </h3>
          <p class="serif mt-4 text-xl italic leading-snug text-stone-600 dark:text-stone-400">
            A whole browser, repackaged, again and again, until your fan kicks on.
          </p>
          <ul class="mt-6 space-y-2 text-sm">
            <li class="flex gap-2">
              <span class="text-red-500">✕</span> Hundreds of MB per app
            </li>
            <li class="flex gap-2">
              <span class="text-red-500">✕</span> Multiple Chromium instances
            </li>
            <li class="flex gap-2">
              <span class="text-red-500">✕</span> Battery vampire
            </li>
            <li class="flex gap-2">
              <span class="text-red-500">✕</span> Self-managed updater hell
            </li>
          </ul>
        </article>
        <article
          class="contender contender--meh col-span-1 lg:col-span-4"
          data-reveal
          style="--reveal-delay: 100ms"
        >
          <header class="mb-6 flex items-baseline justify-between">
            <span class="font-mono text-[0.7rem] uppercase tracking-[0.3em] opacity-70">Option B</span>
            <span class="font-mono text-[0.7rem] tracking-widest text-amber-600 dark:text-amber-400">HALF</span>
          </header>
          <h3 class="font-title text-5xl font-black uppercase italic leading-none text-stone-400 line-through decoration-amber-500 decoration-[3px] dark:text-stone-600">
            PWA
          </h3>
          <p class="serif mt-4 text-xl italic leading-snug text-stone-600 dark:text-stone-400">
            A standard built by committee, gated by browsers that don't agree.
          </p>
          <ul class="mt-6 space-y-2 text-sm">
            <li class="flex gap-2">
              <span class="text-amber-500">~</span> Fragmented browser support
            </li>
            <li class="flex gap-2">
              <span class="text-amber-500">~</span> Requires developer opt-in
            </li>
            <li class="flex gap-2">
              <span class="text-amber-500">~</span> Spawns its own process
            </li>
            <li class="flex gap-2">
              <span class="text-amber-500">~</span> Updates often stuck on stale cache
            </li>
          </ul>
        </article>
        <article
          class="contender contender--good col-span-1 lg:col-span-4"
          data-reveal
          style="--reveal-delay: 200ms"
        >
          <header class="mb-6 flex items-baseline justify-between">
            <span class="font-mono text-[0.7rem] uppercase tracking-[0.3em]">Option C</span>
            <span class="font-mono text-[0.7rem] tracking-widest">THE WAY</span>
          </header>
          <h3 class="font-title text-5xl font-black uppercase italic leading-none">
            FTWA
          </h3>
          <p class="serif mt-4 text-xl italic leading-snug text-primary-100">
            A native shortcut, into the browser you already love. That's it.
          </p>
          <ul class="mt-6 space-y-2 text-sm">
            <li class="flex gap-2">
              <span class="font-bold">✓</span> Kilobytes, not megabytes
            </li>
            <li class="flex gap-2">
              <span class="font-bold">✓</span> Works on every website
            </li>
            <li class="flex gap-2">
              <span class="font-bold">✓</span> Native search &amp; launchers
            </li>
            <li class="flex gap-2">
              <span class="font-bold">✓</span> Updates with the web
            </li>
          </ul>
        </article>
      </div>
    </section>
    <section class="relative border-y border-stone-900/15 bg-stone-900 text-stone-50 dark:border-white/10 dark:bg-black">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <div
          class="mb-12 grid grid-cols-12 items-baseline gap-x-6 border-b border-white/15 pb-4"
          data-reveal
        >
          <span class="serif col-span-12 text-3xl italic text-stone-500 sm:col-span-2 sm:text-4xl">Nº 02</span>
          <h2 class="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-stone-300 sm:col-span-10">
            The case against Electron
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-12">
          <div
            class="col-span-12 lg:col-span-7"
            data-reveal
          >
            <p class="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
              The bloat in numbers
            </p>
            <div class="mt-4 pl-[0.05em] leading-none">
              <span class="font-title text-[clamp(3.5rem,10vw,9rem)] font-black italic tracking-tighter text-primary-400">
                300<span class="text-stone-50">MB</span>
              </span>
            </div>
            <p class="serif mt-4 max-w-xl text-2xl italic leading-snug text-stone-300">
              of disk, per app, before you've sent a single message. Slack alone is reportedly heavier than the install size of GTA V.
            </p>
          </div>
          <div
            class="col-span-12 space-y-5 text-lg leading-relaxed text-stone-300 lg:col-span-5"
            data-reveal
            style="--reveal-delay: 120ms"
          >
            <p>
              Electron is honest about what it is: <em class="serif italic">a browser, repackaged</em>.
              The trouble is the math. Ten Electron apps means ten copies of Chromium running
              in parallel — gigabytes of duplicated runtime, fighting for the same RAM.
            </p>
            <p>
              FTWA breaks the loop. The browser engine you've already paid for, in memory,
              warmed up, signed-in — does the work. Once. For everything.
            </p>
          </div>
        </div>
        <div
          class="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-2"
          data-reveal
        >
          <div class="bg-stone-900 p-8">
            <div class="mb-6 flex items-baseline justify-between">
              <h3 class="font-title text-3xl font-black uppercase italic text-stone-400 line-through decoration-red-500 decoration-[3px]">
                Electron
              </h3>
              <span class="font-mono text-xs uppercase tracking-widest text-red-400">heavy</span>
            </div>
            <dl class="space-y-4">
              <div
                v-for="row in electronStack"
                :key="row.label"
                class="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0"
              >
                <dt class="font-mono text-xs uppercase tracking-widest text-stone-400">
                  {{ row.label }}
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic text-stone-100">{{ row.value }}</span>
                  <span class="block text-xs text-stone-500">{{ row.note }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div class="bg-primary-600 p-8 text-white">
            <div class="mb-6 flex items-baseline justify-between">
              <h3 class="font-title text-3xl font-black uppercase italic">
                FTWA
              </h3>
              <span class="font-mono text-xs uppercase tracking-widest text-primary-100">featherweight</span>
            </div>
            <dl class="space-y-4">
              <div
                v-for="row in ftwaStack"
                :key="row.label"
                class="flex items-baseline justify-between gap-4 border-b border-white/20 pb-3 last:border-0"
              >
                <dt class="font-mono text-xs uppercase tracking-widest text-primary-100">
                  {{ row.label }}
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic">{{ row.value }}</span>
                  <span class="block text-xs text-primary-100/80">{{ row.note }}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <section class="relative">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <div
          class="mb-12 grid grid-cols-12 items-baseline gap-x-6 border-b border-stone-900/15 pb-4 dark:border-white/15"
          data-reveal
        >
          <span class="serif col-span-12 text-3xl italic text-stone-500 sm:col-span-2 sm:text-4xl">Nº 03</span>
          <h2 class="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-stone-700 dark:text-stone-300 sm:col-span-10">
            The case against PWA
          </h2>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-12">
          <div
            class="col-span-12 space-y-5 text-lg leading-relaxed text-stone-700 dark:text-stone-300 lg:col-span-5"
            data-reveal
          >
            <p>
              A PWA looks a lot like FTWA — a shortcut, a window, a website. But the moment
              you install one, your OS spawns a <em class="serif italic">separate</em>
              Chromium-app process: its own renderer, its own GPU process, its own session
              storage. A second browser, running next to the one you already have open.
            </p>
            <p>
              FTWA opens in the browser that's already running. The renderer is warm.
              The session is signed-in. Your ad-blocker, password manager, sync, and reader
              mode — all already there.
            </p>
            <p class="font-medium text-stone-900 dark:text-white">
              PWA is a second runtime pretending to be the first. FTWA is the first.
            </p>
            <p class="text-sm text-stone-500 dark:text-stone-400">
              (PWAs also need the developer's opt-in — a manifest, a service worker, a
              maintained icon set — and install support is fragmented across browsers.
              And those service workers? They cache aggressively, get stuck, and ship
              old versions for days after the website has moved on. FTWA hits the live
              web every time.)
            </p>
          </div>
          <div
            class="col-span-12 lg:col-span-7"
            data-reveal
            style="--reveal-delay: 120ms"
          >
            <p class="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
              The hidden cost of installing a PWA
            </p>
            <div class="mt-4 pl-[0.15em] leading-[0.85]">
              <span class="font-title block text-[clamp(3rem,9vw,8rem)] font-black italic tracking-tighter text-stone-900 dark:text-stone-100">
                Another
              </span>
              <span class="font-title block text-[clamp(3rem,9vw,8rem)] font-black italic tracking-tighter text-stone-900 dark:text-stone-100">
                <span class="serif font-normal italic text-primary-600 dark:text-primary-400">·</span>runtime
              </span>
            </div>
            <p class="serif mt-4 max-w-xl text-2xl italic leading-snug text-stone-600 dark:text-stone-400">
              Each installed PWA is a fresh Chromium process — extra RAM, a detached session, none of your extensions. FTWA reuses the runtime you already paid for.
            </p>
          </div>
        </div>
        <div
          class="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stone-900/10 bg-stone-900/10 dark:border-white/10 dark:bg-white/10 lg:grid-cols-2"
          data-reveal
        >
          <div class="bg-[#fbf9f4] p-8 dark:bg-[#0e0a14]">
            <div class="mb-6 flex items-baseline justify-between">
              <h3 class="font-title text-3xl font-black uppercase italic text-stone-400 line-through decoration-amber-500 decoration-[3px] dark:text-stone-600">
                PWA
              </h3>
              <span class="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400">half</span>
            </div>
            <dl class="space-y-4">
              <div
                v-for="row in pwaStack"
                :key="row.label"
                class="flex items-baseline justify-between gap-4 border-b border-stone-900/10 pb-3 last:border-0 dark:border-white/10"
              >
                <dt class="font-mono text-xs uppercase tracking-widest text-stone-500">
                  {{ row.label }}
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic">{{ row.value }}</span>
                  <span class="block text-xs text-stone-500">{{ row.note }}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div class="bg-primary-600 p-8 text-white">
            <div class="mb-6 flex items-baseline justify-between">
              <h3 class="font-title text-3xl font-black uppercase italic">
                FTWA
              </h3>
              <span class="font-mono text-xs uppercase tracking-widest text-primary-100">reused</span>
            </div>
            <dl class="space-y-4">
              <div class="flex items-baseline justify-between gap-4 border-b border-white/20 pb-3">
                <dt class="font-mono text-xs uppercase tracking-widest text-primary-100">
                  Process
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic">Reused</span>
                  <span class="block text-xs text-primary-100/80">the browser already running</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 border-b border-white/20 pb-3">
                <dt class="font-mono text-xs uppercase tracking-widest text-primary-100">
                  RAM
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic">~ 0 MB</span>
                  <span class="block text-xs text-primary-100/80">no extra renderer, no extra process</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 border-b border-white/20 pb-3">
                <dt class="font-mono text-xs uppercase tracking-widest text-primary-100">
                  Session
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic">Shared</span>
                  <span class="block text-xs text-primary-100/80">cookies, extensions, sync, password manager</span>
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 pb-3">
                <dt class="font-mono text-xs uppercase tracking-widest text-primary-100">
                  Opt-in
                </dt>
                <dd class="text-right">
                  <span class="font-title text-xl font-black italic">None</span>
                  <span class="block text-xs text-primary-100/80">works on any website</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <section class="relative border-y border-stone-900/15 bg-stone-100 dark:border-white/10 dark:bg-stone-950/50">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10">
        <div
          class="mb-12 grid grid-cols-12 items-baseline gap-x-6 border-b border-stone-900/15 pb-4 dark:border-white/15"
          data-reveal
        >
          <span class="serif col-span-12 text-3xl italic text-stone-500 sm:col-span-2 sm:text-4xl">Nº 04</span>
          <h2 class="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.35em] text-stone-700 dark:text-stone-300 sm:col-span-10">
            The scoreboard
          </h2>
        </div>

        <div
          class="overflow-x-auto"
          data-reveal
        >
          <table class="w-full min-w-[640px] border-collapse">
            <thead>
              <tr class="border-b-2 border-stone-900 dark:border-white">
                <th class="py-4 pr-4 text-left font-mono text-xs uppercase tracking-widest text-stone-500" />
                <th class="py-4 pr-4 text-left">
                  <span class="font-title text-xl font-black uppercase italic text-stone-400 line-through decoration-red-500 decoration-[3px] dark:text-stone-600">Electron</span>
                </th>
                <th class="py-4 pr-4 text-left">
                  <span class="font-title text-xl font-black uppercase italic text-stone-400 line-through decoration-amber-500 decoration-[3px] dark:text-stone-600">PWA</span>
                </th>
                <th class="py-4 pr-4 text-left">
                  <span class="font-title text-xl font-black uppercase italic text-primary-600 dark:text-primary-400">FTWA</span>
                </th>
              </tr>
            </thead>
            <tbody class="font-mono text-sm">
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Disk per app
                </td>
                <td class="py-4 pr-4">
                  150–300 MB
                </td>
                <td class="py-4 pr-4">
                  ~ 1 MB cache
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  ≈ 1.5 KB
                </td>
              </tr>
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  RAM cost
                </td>
                <td class="py-4 pr-4">
                  150–500 MB
                </td>
                <td class="py-4 pr-4">
                  100–200 MB · new process
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  ~ 0 · reuses tab
                </td>
              </tr>
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Cold start
                </td>
                <td class="py-4 pr-4">
                  2 – 5 s
                </td>
                <td class="py-4 pr-4">
                  ~ 1 s
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  ~ 50 ms
                </td>
              </tr>
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Browser session
                </td>
                <td class="py-4 pr-4">
                  N/A
                </td>
                <td class="py-4 pr-4">
                  Detached
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  Shared
                </td>
              </tr>
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Browser support
                </td>
                <td class="py-4 pr-4">
                  Per app
                </td>
                <td class="py-4 pr-4">
                  Fragmented
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  Chromium &amp; Firefox
                </td>
              </tr>
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Requires opt-in
                </td>
                <td class="py-4 pr-4">
                  Yes (vendor)
                </td>
                <td class="py-4 pr-4">
                  Yes (manifest + SW)
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  No
                </td>
              </tr>
              <tr class="border-b border-stone-900/10 dark:border-white/10">
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Native launcher
                </td>
                <td class="py-4 pr-4">
                  Yes
                </td>
                <td class="py-4 pr-4">
                  Maybe
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  Yes
                </td>
              </tr>
              <tr>
                <td class="py-4 pr-4 uppercase tracking-widest text-stone-500">
                  Updates
                </td>
                <td class="py-4 pr-4">
                  Self-managed
                </td>
                <td class="py-4 pr-4">
                  Often stale · stuck SW
                </td>
                <td class="py-4 pr-4 font-bold text-primary-600 dark:text-primary-400">
                  Live web
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <blockquote
          class="serif mx-auto mt-20 max-w-4xl text-center text-3xl italic leading-snug text-stone-700 dark:text-stone-300 sm:text-4xl lg:text-5xl"
          data-reveal
        >
          <span class="serif text-primary-600 dark:text-primary-400">"</span>The browser is the runtime. Why ship another one?<span class="serif text-primary-600 dark:text-primary-400">"</span>
        </blockquote>
      </div>
    </section>
    <section
      id="verdict"
      class="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        class="absolute -left-1/4 top-0 -z-10 h-full w-[120%] -skew-y-3 bg-primary-600 dark:bg-primary-700"
      />

      <div class="mx-auto grid max-w-7xl grid-cols-12 gap-x-6 gap-y-10 px-6 py-32 text-white sm:py-40 lg:px-10">
        <div
          class="col-span-12 lg:col-span-2"
          data-reveal
        >
          <span class="serif block text-7xl italic text-primary-200 sm:text-8xl lg:text-9xl">¶</span>
        </div>

        <div
          class="col-span-12 lg:col-span-10"
          data-reveal
          style="--reveal-delay: 120ms"
        >
          <p class="font-mono text-xs uppercase tracking-[0.35em] text-primary-200">
            Nº 05 · The verdict
          </p>
          <h2 class="mt-4 font-title text-[clamp(2.25rem,5.5vw,5rem)] font-black uppercase italic leading-[0.95] tracking-tight">
            Stop installing
            <span class="serif font-normal not-italic text-primary-100">
              <em class="italic">browsers.</em>
            </span>
            Start freeing
            <span class="text-primary-200">web&nbsp;apps.</span>
          </h2>

          <p class="serif mt-10 max-w-3xl text-2xl italic leading-snug text-primary-100 sm:text-3xl">
            Electron is the past — heavy, duplicated, opaque. PWA installs another runtime
            next to the one you already trust. FTWA is the working answer: a tiny shortcut
            into the browser already running, on any website you choose.
          </p>

          <div class="mt-12 flex flex-wrap items-center gap-4">
            <UButton
              size="xl"
              :ui="{ rounded: 'rounded-full' }"
              color="white"
              label="Free your first web app"
              trailing-icon="heroicons:arrow-right"
              to="/#create-web-app"
            />
            <UButton
              size="xl"
              :ui="{ rounded: 'rounded-full' }"
              variant="outline"
              color="white"
              label="Browse the gallery"
              leading-icon="heroicons:rectangle-stack"
              to="/store"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.serif {
  font-family: "Instrument Serif", "Apple Garamond", "Garamond", "Georgia", serif;
  font-feature-settings: "liga", "dlig", "calt";
}

.why-page {
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-repeat: repeat;
  background-size: 240px 240px;
  background-attachment: fixed;
  background-blend-mode: multiply;
}
:global(.dark) .why-page {
  background-blend-mode: screen;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

/* Reveal animation */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) var(--reveal-delay, 0ms),
    transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
[data-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Contender cards */
.contender {
  position: relative;
  padding: 2.25rem 1.75rem;
  border-radius: 1.25rem;
  border: 1px solid rgb(28 25 23 / 0.1);
  background: rgb(255 255 255 / 0.45);
  backdrop-filter: blur(6px);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}
:global(.dark) .contender {
  border-color: rgb(255 255 255 / 0.08);
  background: rgb(255 255 255 / 0.03);
}
.contender:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 60px -30px rgb(28 25 23 / 0.25);
}
:global(.dark) .contender:hover {
  box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.7);
}

.contender--good {
  background: linear-gradient(155deg, rgb(124 58 237) 0%, rgb(91 33 182) 100%);
  color: white;
  border-color: transparent;
  transform: rotate(-1deg);
}
.contender--good:hover {
  transform: translateY(-4px) rotate(-1deg);
}
.contender--bad {
  transform: rotate(0.6deg);
  background: linear-gradient(155deg, rgba(254, 226, 226, 0.55) 0%, rgba(255, 255, 255, 0.35) 100%);
  border-color: rgba(220, 38, 38, 0.2);
}
.contender--bad:hover {
  transform: translateY(-4px) rotate(0.6deg);
}
:global(.dark) .contender--bad {
  background: linear-gradient(155deg, rgba(127, 29, 29, 0.32) 0%, rgba(28, 25, 23, 0.55) 100%);
  border-color: rgba(248, 113, 113, 0.22);
}
.contender--meh {
  transform: rotate(-0.4deg);
  background: linear-gradient(155deg, rgba(254, 243, 199, 0.6) 0%, rgba(255, 255, 255, 0.35) 100%);
  border-color: rgba(217, 119, 6, 0.22);
}
.contender--meh:hover {
  transform: translateY(-4px) rotate(-0.4deg);
}
:global(.dark) .contender--meh {
  background: linear-gradient(155deg, rgba(120, 53, 15, 0.32) 0%, rgba(28, 25, 23, 0.55) 100%);
  border-color: rgba(252, 211, 77, 0.22);
}
@media (max-width: 1023px) {
  .contender,
  .contender:hover,
  .contender--good,
  .contender--good:hover,
  .contender--bad,
  .contender--bad:hover,
  .contender--meh,
  .contender--meh:hover {
    transform: none;
  }
  .contender:hover {
    transform: translateY(-2px);
  }
}
</style>
