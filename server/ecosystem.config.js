module.exports = {
  apps: [
    {
      name: 'ResearchServer',
      exec_mode: 'cluster',
      instances: 'max',
      script: './dist/src/index.js',
      env: {
        PORT: '8081',
      },
    },
  ],
};
