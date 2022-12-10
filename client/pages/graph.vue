<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { dates, labels } from '~~/composables/useData';

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, CategoryScale, LinearScale);

async function fetchCounts(label: string) {
  const dcCounts = [];
  for (const date of dates) {
    const counts = await useCounts('dcinside', date);
    const total = Object.values(counts).reduce((prev, cur) => prev + cur, 0);
    const percents: { [key: string]: number } = {};
    for (const label in counts) {
      percents[label] = (counts[label] / total) * 100;
    }
    dcCounts.push(percents);
  }
  const fmCounts = [];
  for (const date of dates) {
    const counts = await useCounts('fmkorea', date);
    const total = Object.values(counts).reduce((prev, cur) => prev + cur, 0);
    const percents: { [key: string]: number } = {};
    for (const label in counts) {
      percents[label] = (counts[label] / total) * 100;
    }
    fmCounts.push(percents);
  }

  return [dcCounts.map(c => c[label]), fmCounts.map(c => c[label])];
}

const route = useRoute();

const selectedLabel = ref<string>((route.query.label as string) || '출신');
watch(selectedLabel, () => {
  window.location.href = `?label=${selectedLabel.value}`;
});

const [dcCounts, fmCounts] = await fetchCounts(selectedLabel.value);

const data = computed(() => ({
  labels: dates,
  datasets: [
    {
      label: '디시인사이드',
      backgroundColor: '#3b82f6',
      data: dcCounts,
    },
    {
      label: '에펨코리아',
      backgroundColor: '#22c55e',
      data: fmCounts,
    },
  ],
}));
</script>

<template>
  <div>
    <div>
      <select v-model="selectedLabel">
        <option v-for="label in labels" :key="label" :value="label">{{ label }}</option>
      </select>
    </div>
    <Line :data="data"></Line>
  </div>
</template>
