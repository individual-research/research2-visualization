<script lang="ts" setup>
import { VNode, VNodeArrayChildren } from 'vue';

defineEmits(['changeTab']);

const slot = useSlots().default!();

const tabTitles = ref<string[]>([]);
(slot[0].children as VNodeArrayChildren).forEach(children => {
  tabTitles.value.push((children as VNode)?.props?.title);
});

const selectedTitle = ref(tabTitles.value[0]);

provide('selectedTitle', selectedTitle);
</script>

<template>
  <div>
    <nav class="flex">
      <button
        v-for="title in tabTitles"
        :key="title"
        class="flex-grow"
        :class="{ selected: selectedTitle === title }"
        @click="
          selectedTitle = title;
          $emit('changeTab', title);
        "
      >
        {{ title }}
      </button>
    </nav>

    <slot />
  </div>
</template>

<style lang="postcss" scoped>
button {
  @apply py-3 px-6 bg-indigo-500 text-white text-sm font-semibold transition-all;
}
button:hover {
  @apply bg-indigo-600;
}
button.selected {
  @apply bg-indigo-800;
}
</style>
