<script lang="ts" setup>
import communityData from '@/assets/data';
</script>

<template>
  <div>
    (TODO: 그래프 Draw)
    <div>
      <div v-for="community in communityData" :key="community.community">
        <h1>{{ community.community }}</h1>
        <div v-for="[groupName, group] in Object.entries(community.relationships)" :key="groupName">
          <h2>{{ groupName }} - {{ group.score }}</h2>
          <div v-for="hate in group.hates" :key="hate.content">
            <a :href="hate.postLink">{{ hate.postLink }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
