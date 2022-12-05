<template>
  <div>
    <header class="flex items-center shadow border-b p-4">
      <NuxtLink class="font-semibold" to="/"> 커뮤니티 혐오 데이터 시각화 </NuxtLink>
      <nav class="ml-auto text-sm">
        <NuxtLink class="nav-link" to="/">그래프</NuxtLink>
        <NuxtLink class="nav-link" to="/authors">작성자 목록</NuxtLink>
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
