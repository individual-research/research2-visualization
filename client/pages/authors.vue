<script lang="ts" setup>
const authors = await useAuthors(500);
</script>

<template>
  <div>
    <NuxtLink
      v-for="(author, idx) in authors"
      :key="author"
      :to="`/report/${author}`"
      class="inline-block p-2 text-black text-opacity-75 hover:text-opacity-100"
    >
      {{ idx + 1 }}. {{ author }}
    </NuxtLink>
  </div>
</template>
