<script lang="ts" setup>
import communityData from '@/assets/data';

const communities = communityData.map(c => c.community);
</script>

<template>
  <div>
    <header class="flex items-center shadow border-b p-4">
      <span class="font-semibold"> 커뮤니티-집단 혐오 데이터 시각화 </span>
      <nav class="ml-auto text-sm">
        <NuxtLink class="nav-link" to="/">그래프</NuxtLink>
        <NuxtLink v-for="community in communities" :key="community" :to="`/report/${community}`" class="nav-link capitalize">{{ community }}</NuxtLink>
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
