<script lang="ts" setup>
import { GraphlyD3 } from '@livereader/graphly-d3-vue';
import Hexagon from '@/d3_templates/hexagon';
import Circle from '@/d3_templates/circle';
import '@livereader/graphly-d3-vue/style.css';

const graphly = ref<any>(null);
const { labels, counts, total } = await useData('dcinside');

function makeGroupNode(name: string, x: number, y: number) {
  return {
    id: name,
    shape: {
      type: 'hexagon',
      scale: 1,
    },
    x,
    y,
    anchor: {
      type: 'hard',
      x,
      y,
    },
    gravity: -1,
    payload: {
      text: name,
    },
  };
}

function makeCommunityNode(name: string, x: number, y: number) {
  return {
    id: name,
    shape: {
      type: 'circle',
      scale: 1,
    },
    x,
    y,
    anchor: {
      type: 'soft',
      x,
      y,
    },
    gravity: 1,
    payload: {
      text: name,
    },
  };
}

function makeLink(community: string, group: string, label: string) {
  return {
    source: community,
    target: group,
    directed: true,
    strength: 'strong',
    label,
    padding: 0,
    width: 2,
  };
}

const groupNodes = labels.map((l, idx) => makeGroupNode(l, 175 * idx - 700, 0));
const communityNodes = [makeCommunityNode('디시인사이드', 0, -450), makeCommunityNode('에펨코리아', 450, 450), makeCommunityNode('에브리타임', -450, 450)];

onMounted(() => {
  const simulation = graphly.value.simulation;

  simulation.templateStore.add('hexagon', Hexagon);
  simulation.templateStore.add('circle', Circle);

  simulation.render({
    nodes: [...groupNodes, ...communityNodes],
    links: [
      ...labels.map(l => makeLink('디시인사이드', l, (counts[l] / total).toString())),
      ...labels.map(l => makeLink('에펨코리아', l, '<NO_DATA>')),
      ...labels.map(l => makeLink('에브리타임', l, '<NO_DATA>')),
    ],
  });
});
</script>

<template>
  <div class="graph-container">
    <GraphlyD3 ref="graphly" :draggable-nodes="true" :link-distance="100"></GraphlyD3>
  </div>
</template>

<style lang="postcss" scoped>
.graph-container {
  @apply border my-3;
  height: calc(100vh - 100px);
}
</style>
