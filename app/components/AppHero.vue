<template>
  <div class="mb-5">
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 dark:from-primary-900/20">
      <div class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <AppLogo />
              <div class="mt-8 sm:mt-16 lg:mt-16">
                <NuxtLink
                  data-umami-event="See Gallery"
                  href="/store"
                  class="inline-flex space-x-6"
                >
                  <span class="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-primary-400/10">
                    App Store
                  </span>
                  <span class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                    <span>Discover all the freed apps</span>
                    <Icon
                      name="heroicons:chevron-right-20-solid"
                      class="size-5 text-gray-400 dark:text-gray-600"
                      aria-hidden="true"
                    />
                  </span>
                </NuxtLink>
              </div>
              <h1 class="mt-10 font-title text-4xl font-black italic tracking-tight sm:text-6xl">
                Let's unchain your web apps!
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Turn any website into an app in seconds! Let websites be free from your browser's frame, Free The Web Apps!
              </p>
              <div class="mt-10 flex items-center gap-x-6">
                <UButton
                  class="font-bold"
                  size="xl"
                  data-umami-event="Free a web app"
                  to="#create-web-app"
                >
                  Free a web app!
                </UButton>
                <UButton
                  size="xl"
                  class="black:text-white text-gray-900"
                  :ui="{
                    color: {
                      primary: {
                        ghost: 'text-gray-900 dark:text-white hover:bg-primary-600/10 dark:hover:bg-primary-400/10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
                      },
                    },
                  }"
                  color="primary"
                  variant="ghost"
                  data-umami-event="Leave a Star"
                  icon="simple-icons:github"
                  target="_blank"
                  external
                  rel="nofollow"
                  to="https://github.com/mathix420/free-the-web-apps?utm_source=ftwa.mathix.dev&utm_medium=hero-btn"
                >
                  Leave a Star
                </UButton>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 dark:shadow-primary-400/10 dark:ring-primary-950 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div class="shadow-lg md:rounded-3xl">
            <div class="bg-primary-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div
                class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-primary-100 opacity-20 ring-1 ring-inset ring-white dark:bg-primary-900 md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <NuxtPicture
                    format="avif,webp"
                    src="/screenshot/todomate.png"
                    alt="Screenshot of TodoMate"
                    sizes="320px sm:672px md:608px"
                    :img-attrs="{ class: 'w-screen overflow-hidden rounded-t-lg sm:rounded-t-xl md:rounded-tr-none' }"
                  />
                </div>
                <div
                  class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white dark:from-gray-900 sm:h-32" />
    </div>
  </div>
</template>
