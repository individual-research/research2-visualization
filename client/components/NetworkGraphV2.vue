<script lang="ts" setup>
import * as vNG from 'v-network-graph';

interface Node {
  name: string;
  id?: string;
  type: 'label' | 'community';
}

interface Nodes {
  [key: string]: Node;
}

const { labels, counts, total } = await useData('dcinside');
const router = useRouter();

function makeLabelNode(name: string, id?: string): Nodes {
  return { [name]: { name, id, type: 'label' } };
}
function makeCommunityNode(name: string, id?: string): Nodes {
  return { [name]: { name, id, type: 'community' } };
}

function makeEdge(n1: string, n2: string, weight: number) {
  return { [`${n1}-${n2}`]: { source: n1, target: n2, weight } };
}

// nodes
let nodes = reactive<{ [key: string]: Node }>({});
labels
  .map(l => makeLabelNode(l))
  .forEach(node => {
    nodes = { ...nodes, ...node };
  });

const communityNodes = {
  ...makeCommunityNode('디시인사이드', 'dcinside'),
  ...makeCommunityNode('에펨코리아', 'fmkorea'),
  ...makeCommunityNode('에브리타임', 'everytime'),
};
nodes = { ...nodes, ...communityNodes };

// edges
let edges = reactive({});
labels
  .map(l => makeEdge('디시인사이드', l, (counts[l] / total) * 100))
  .forEach(edge => {
    edges = { ...edges, ...edge };
  });

// layouts
const layouts = {
  nodes: {
    일반: { x: -400, y: 0 },
    욕설: { x: -300, y: 0 },
    성: { x: -200, y: 0 },
    출신: { x: -100, y: 0 },
    외모: { x: 0, y: 0 },
    인종: { x: 100, y: 0 },
    정치성향: { x: 200, y: 0 },
    연령: { x: 300, y: 0 },
    종교: { x: 400, y: 0 },
    디시인사이드: { x: 0, y: -200 },
    에펨코리아: { x: -200, y: 200 },
    에브리타임: { x: 200, y: 200 },
  },
};

// configs
const configs = vNG.defineConfigs({
  view: {
    panEnabled: false,
    zoomEnabled: false,
  },
  node: {
    selectable: true,
    normal: {
      color: node => (node.type === 'label' ? '#6366f1' : '#f97316'),
      radius: node => (node.type === 'label' ? 48 : 28),
    },
    hover: {
      color: node => (node.type === 'label' ? '#4338ca' : '#c2410c'),
    },
    label: {
      fontSize: node => (node.type === 'label' ? 18 : 13),
      margin: 4,

      color: node => (node.type === 'label' ? '#ffffff' : '#000000'),
      direction: node => (node.type === 'label' ? 'center' : 'south'),
    },
  },
  edge: {
    selectable: true,
    margin: 0,
    label: {
      color: '#64748b',
      fontSize: 16,
    },
    normal: {
      color: '#cbd5e1',
      width: edge => (edge.weight / 100) * 10 + 1, // Use the value of each edge object
    },
    hover: {
      color: '#334155',
    },
    selected: {
      color: '#6366f1',
      dasharray: '0',
    },
    // marker: {
    //   source: {
    //     type: 'none',
    //     width: 4,
    //     height: 4,
    //     margin: -1,
    //     units: 'strokeWidth',
    //     color: null,
    //   },
    //   target: {
    //     type: 'arrow',
    //     width: 4,
    //     height: 4,
    //     margin: -1,
    //     units: 'strokeWidth',
    //     color: null,
    //   },
    // },
  },
});

// eventHandlers
const eventHandlers: vNG.EventHandlers = {
  'node:click': ({ node }) => {
    // toggle
    const target = nodes[node];
    if (target.id) {
      router.push(`/report/${target.id}`);
    }
  },
};

// refs
const graph = ref<vNG.Instance>();

onMounted(() => {
  graph.value?.panToCenter();
  graph.value?.fitToContents();
});
</script>

<template>
  <div>
    <VNetworkGraph ref="graph" class="graph" :nodes="nodes" :edges="edges" :layouts="layouts" :configs="configs" :event-handlers="eventHandlers">
      <template #edge-label="{ edge, ...slotProps }">
        <v-edge-label :text="`${edge.weight.toFixed(2)}%`" align="center" vertical-align="center" v-bind="slotProps" />
      </template>
    </VNetworkGraph>
  </div>
</template>

<style>
.graph {
  @apply border w-full my-3;
  height: calc(100vh - 100px);
}
</style>
