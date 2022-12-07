<script lang="ts" setup>
import * as vNG from 'v-network-graph';
import { labels } from '~~/composables/useData';

interface Node {
  name: string;
  id?: string;
  type: 'label' | 'community';
}

interface Nodes {
  [key: string]: Node;
}

const dcinside = await useCounts('dcinside');
const fmkorea = await useCounts('fmkorea');
const communitiesData = ref([
  { community: 'dcinside', counts: dcinside },
  { community: 'fmkorea', counts: fmkorea },
]);

function makeLabelNode(name: string, id?: string): Nodes {
  return { [name]: { name, id, type: 'label' } };
}
function makeCommunityNode(name: string, id?: string): Nodes {
  return { [name]: { name, id, type: 'community' } };
}

function makeEdge(n1: string, n2: string, weight: number) {
  return { [`${n1}-${n2}`]: { source: n1, target: n2, weight } };
}

function makeLabelNodeList(data: { name: string; id?: string }[]): Nodes {
  let result = {};

  for (const item of data) {
    result = { ...result, ...makeLabelNode(item.name, item.id) };
  }

  return result;
}
function makeCommunityNodeList(data: { name: string; id?: string }[]): Nodes {
  let result = {};

  for (const item of data) {
    result = { ...result, ...makeCommunityNode(item.name, item.id) };
  }

  return result;
}
function makeEdgeList(data: { n1: string; n2: string; weight: number }[]): Nodes {
  let result = {};

  for (const item of data) {
    result = { ...result, ...makeEdge(item.n1, item.n2, item.weight) };
  }

  return result;
}

// nodes
let nodes = reactive<{ [key: string]: Node }>({});
const labelNodes = makeLabelNodeList(labels.map(l => ({ name: l })));
const communityNodes = makeCommunityNodeList(communitiesData.value.map(a => ({ name: a.community, id: a.community })));
nodes = { ...labelNodes, ...communityNodes };

// edges
const edges = ref<any>({});
// let pair: { n1: string; n2: string; weight: number }[] = [];
// for (const data of authorsData.value) {
//   const edges = labels.map(l => ({
//     n1: data.author,
//     n2: l,
//     weight: (data.counts[l] / data.total) * 100,
//   }));
//   pair = pair.concat(edges);
// }

// edges = makeEdgeList(pair);

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
  },
};
communitiesData.value
  .map((a, idx) => ({
    [a.community]: {
      x: ((idx % 5) - 1) * 200 + 100,
      y: idx < 5 ? -200 : 200,
    },
  }))
  .forEach(d => {
    layouts.nodes = { ...layouts.nodes, ...d };
  });

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

function showCommunityEdge(community: string) {
  const data = communitiesData.value.find(a => a.community === community)!;
  const myEdges = labels.map(l => ({
    n1: data.community,
    n2: l,
    weight: (data.counts[l] / Object.values(data.counts).reduce((prev, cur) => prev + cur, 0)) * 100,
  }));

  // if (edges.value) {
  // }

  edges.value = { ...makeEdgeList(myEdges) };
}

function showLabelEdge(label: string) {
  const myEdges = communitiesData.value.map(data => ({
    n1: data.community,
    n2: label,
    weight: (data.counts[label] / Object.values(data.counts).reduce((prev, cur) => prev + cur, 0)) * 100,
  }));

  edges.value = { ...makeEdgeList(myEdges) };

  console.log(edges.value);
}

// eventHandlers
const eventHandlers: vNG.EventHandlers = {
  'node:click': ({ node }) => {
    // toggle
    const target = nodes[node];
    // if (target.id) {
    //   router.push(`/report/${target.id}`);
    // }
    if (target.type === 'community' && target.id) {
      showCommunityEdge(target.id);
    } else {
      showLabelEdge(target.name);
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
