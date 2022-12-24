<script lang="ts" setup>
import dayjs from 'dayjs';
import { Comment, dates } from '~~/composables/useData';

const route = useRoute();
const communityName = route.params.community as string;
const searchQuery = route.query.search as string;

const curPage = ref(1);
const curLabel = ref('출신');
const targetPage = ref('');
const searchQueryInput = ref(searchQuery);
const selectedDate = ref(dates[0]);

const counts = ref<{ [key: string]: number }>({});
const total = ref<number>(0);
const comments = ref<Comment[]>([]);
const maxPage = ref<number>(0);

async function fetchComment() {
  const paginator = await useComments(communityName, selectedDate.value, curLabel.value, curPage.value, searchQuery);
  comments.value = paginator.data;
  maxPage.value = paginator.maxPage;
}

async function fetchCount() {
  counts.value = await useCounts(communityName, selectedDate.value, searchQuery);
  total.value = Object.values(counts.value).reduce((prev, cur) => prev + cur, 0);
}

await Promise.all([fetchComment(), fetchCount()]);

watch(curPage, async () => {
  await fetchComment();
});
watch(curLabel, async () => {
  await fetchComment();
});
watch(selectedDate, async () => {
  await fetchComment();
  await fetchCount();
});

function onChangeTab(tab: string) {
  curLabel.value = tab;
  curPage.value = 1;
}

function prev() {
  if (curPage.value <= 1) {
    return;
  }
  curPage.value--;
}
function next() {
  if (curPage.value >= maxPage.value) {
    return;
  }
  curPage.value++;
}

function jumpPage() {
  const page = Number.parseInt(targetPage.value);
  if (page >= 1 && page <= maxPage.value) {
    curPage.value = page;
  }
}

function search() {
  if (searchQueryInput.value) {
    location.href = `/report/${communityName}?search=${searchQueryInput.value}`;
  }
}
</script>

<template>
  <div class="py-8">
    <div class="mb-5">
      <select v-model="selectedDate">
        <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
      </select>
    </div>
    <h1 class="text-center font-bold text-2xl">"{{ communityName }}" 혐오 보고서</h1>
    <div class="mt-8 mb-12">
      <h2 class="text-center font-semibold text-xl mb-3 tracking-widest">Summary ({{ Intl.NumberFormat('ko-KR').format(total) }} 개)</h2>
      <div class="overflow-x-auto">
        <table class="table-auto w-full text-center">
          <thead class="text-sm font-semibold uppercase text-white bg-blue-500">
            <tr>
              <th v-for="label in labels" :key="label" class="p-2 whitespace-nowrap">
                <div class="font-semibold">{{ label }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            <tr>
              <td v-for="label in labels" :key="label" class="p-2 whitespace-nowrap bg-blue-100 text-black">
                <div>
                  <span class="font-medium">{{ ((counts[label] / total) * 100).toFixed(2) }}%</span> ({{ counts[label] }})
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-8 mb-12">
      <h2 class="text-center font-semibold text-xl mb-3 tracking-widest">Hate Speeches</h2>
      <BaseTab @change-tab="onChangeTab">
        <BaseTabItem v-for="label in labels" :key="label" :title="label">
          <table class="table-fixed w-full text-left">
            <thead class="text-sm font-semibold uppercase text-black bg-blue-300">
              <tr>
                <th class="col1 p-2 whitespace-nowrap">
                  <div class="font-semibold">게시일</div>
                </th>
                <th class="col2 p-2 whitespace-nowrap">
                  <div class="font-semibold">게시글</div>
                </th>
                <th class="col3 p-2 whitespace-nowrap">
                  <div class="font-semibold">댓글 내용</div>
                </th>
                <th class="col4 p-2 whitespace-nowrap text-right">
                  <div class="font-semibold">게시글 링크</div>
                </th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
              <tr v-for="comment in comments" :key="comment.no" class="bg-blue-100 text-black">
                <td class="col1 p-2">
                  <div class="font-light single-line">{{ dayjs(comment.postDate).format('MM-DD') }}</div>
                </td>
                <td class="col2 p-2">
                  <a class="font-light text-blue-500 single-line" :href="comment.postLink" target="_blank">{{ comment.postTitle }}</a>
                </td>
                <td class="col3 p-2">
                  <div class="">{{ comment.content }}</div>
                </td>
                <td class="col4 p-2 text-blue-500 text-right">
                  <div class="font-medium">{{ comment.labels.join(', ') }}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="text-center my-5 font-medium text-xl">{{ curPage }} / {{ maxPage }}</div>

          <div class="flex justify-center">
            <input v-model="targetPage" placeholder="페이지" class="py-2 px-3 border rounded" type="text" @keypress.enter="jumpPage" />
          </div>

          <div class="flex justify-center">
            <input v-model="searchQueryInput" placeholder="키워드 검색(공백 구분)" class="py-2 px-3 border rounded" type="text" @keypress.enter="search" />
          </div>

          <div class="flex justify-center">
            <button class="p-2 bg-slate-500 text-white" @click="prev">이전</button>
            <button class="p-2 bg-slate-500 text-white" @click="next">다음</button>
          </div>
        </BaseTabItem>
      </BaseTab>
    </div>
  </div>
</template>

<style lang="postcss">
.col1 {
  width: 60px;
}
.col2 {
  width: 300px;
}
.col3 {
}
.col4 {
  width: 150px;
}

.single-line {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
