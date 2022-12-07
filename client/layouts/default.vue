<script lang="ts" setup>
const communities = [
  { text: '디시인사이드', href: '/report/dcinside' },
  { text: '에펨코리아', href: '/report/fmkorea' },
];
</script>

<template>
  <div>
    <header class="flex items-center shadow border-b p-4">
      <NuxtLink class="font-semibold" to="/"> 커뮤니티 혐오 데이터 시각화 </NuxtLink>
      <nav class="ml-auto text-sm">
        <NuxtLink class="nav-link" to="/">그래프</NuxtLink>
        <NuxtLink v-for="community in communities" :key="community.text" class="nav-link" :to="community.href">{{ community.text }}</NuxtLink>
      </nav>
    </header>
    <main class="px-4">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="postcss">
.nav-link {
  @apply text-opacity-75 text-black mx-2 hover:text-opacity-100 transition-all;
}
</style>
