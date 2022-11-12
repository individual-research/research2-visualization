<script lang="ts" setup>
import communityData, { Community } from '@/assets/data';

const route = useRoute();

const communityName = route.params.community as string;

const community = communityData.find(c => (c.community = communityName)) as Community;
const groups = Object.keys(community.relationships);
</script>

<template>
  <div class="py-8">
    <h1 class="text-center font-bold text-2xl">"{{ communityName }}" 커뮤니티 혐오 보고서</h1>
    <div class="mt-8 mb-12">
      <h2 class="text-center font-semibold text-xl mb-3 tracking-widest">Summary</h2>
      <div class="overflow-x-auto">
        <table class="table-auto w-full text-center">
          <thead class="text-sm font-semibold uppercase text-white bg-indigo-500">
            <tr>
              <th v-for="group in groups" :key="group" class="p-2 whitespace-nowrap">
                <div class="font-semibold">{{ group }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            <tr>
              <td v-for="group in groups" :key="group" class="p-2 whitespace-nowrap bg-indigo-100 text-black">
                <div class="font-medium">{{ community.relationships[group].score }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-8 mb-12">
      <h2 class="text-center font-semibold text-xl mb-3 tracking-widest">Hate Speeches</h2>
      <BaseTab>
        <BaseTabItem v-for="group in groups" :key="group" :title="group">
          <table class="table-auto w-full text-left">
            <thead class="text-sm font-semibold uppercase text-black bg-indigo-300">
              <tr>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold">게시일</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold">게시글</div>
                </th>
                <th class="p-2 whitespace-nowrap">
                  <div class="font-semibold">혐오댓글</div>
                </th>
                <th class="p-2 whitespace-nowrap text-right">
                  <div class="font-semibold">게시글 링크</div>
                </th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
              <tr v-for="hate in community.relationships[group].hates" :key="hate.content">
                <td class="p-2 whitespace-nowrap bg-indigo-100 text-black">
                  <div class="font-medium">{{ hate.postDate }}</div>
                </td>
                <td class="p-2 whitespace-nowrap bg-indigo-100 text-black">
                  <div class="font-medium">{{ hate.postTitle }}</div>
                </td>
                <td class="p-2 whitespace-nowrap bg-indigo-100 text-black">
                  <div class="font-medium">{{ hate.content }}</div>
                </td>
                <td class="p-2 whitespace-nowrap bg-indigo-100 text-blue-500 text-right">
                  <a class="font-medium" :href="hate.postLink" target="_blank">{{ hate.postLink }}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </BaseTabItem>
      </BaseTab>
    </div>
  </div>
</template>
