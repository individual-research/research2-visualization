// https://v3.nuxtjs.org/api/configuration/nuxt.config
const title = '커뮤니티-집단 혐오 데이터 시각화';
const description = '리워드 기반 학술 정보 QnA 커뮤니티';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/fonts.css'],

  app: {
    head: {
      title,
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
    },
  },
});
