<template>
  <div class="mb-28 flex flex-wrap justify-center gap-3 md:gap-5">
    <FeatureCard
      class="w-full md:w-[350px] lg:w-[450px] xl:w-[392px]"
      icon="heroicons:magnifying-glass"
      title="Open apps quickly"
      description="Find your app in Spotlight, Rofi, Start menu, etc. Just like any other native apps."
    />

    <FeatureCard
      class="w-full md:w-[350px] lg:w-[450px] xl:w-[392px]"
      icon="heroicons:battery-100-solid"
      title="Save on resources"
      description="FTWAs are super lightweight and fast. They use the browser you already have open."
    />

    <FeatureCard
      class="hidden w-full md:block md:w-[350px] lg:w-[450px] xl:w-[392px]"
      icon="heroicons:server"
      title="Almost no disk space"
      description="FTWAs just use a few kilobytes of disk space. They are just link shortcuts."
    />

    <FeatureCard
      class="w-full md:w-[350px] lg:w-[450px] xl:w-[392px]"
      icon="heroicons:bolt-16-solid"
      title="Fast"
      description="Fast to create, fast to launch and fast to use. Just like native apps."
    />

    <FeatureCard
      class="hidden w-full md:block md:w-[350px] lg:w-[450px] xl:w-[392px]"
      icon="heroicons:face-smile"
      title="Better than Electron"
      description="Forget about the memory-hogging Electron apps. A browser tab is way lighter."
    />

    <FeatureCard
      class="w-full md:w-[350px] lg:w-[450px] xl:w-[392px]"
      icon="heroicons:sparkles"
      title="Beautiful UI"
      description="Unlock the full potential of your favorite websites. No more browser frame."
    />
  </div>
</template>
