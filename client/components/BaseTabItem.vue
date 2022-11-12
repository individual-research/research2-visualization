<script lang="ts" setup>
import { inject } from 'vue';

const props = defineProps<{
  title: string;
}>();

const selectedTitle = inject('selectedTitle');
</script>

<template>
  <div v-show="selectedTitle === props.title" class="tabs__content">
    <slot />
  </div>
</template>
