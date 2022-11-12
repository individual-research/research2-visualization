module.exports = {
  apps: [
    {
      name: 'ResearchClient',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NITRO_PORT: '3001',
      },
    },
  ],
};
